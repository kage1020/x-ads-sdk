import { OAuth } from '../auth/oauth';
import { AuthenticationError, createAPIError, NetworkError, TimeoutError } from '../errors';
import {
  DefaultPluginManager,
  type PluginClient,
  type PluginManager,
  type PluginRequestConfig,
  type PluginResponse,
} from '../plugins/base';
import { type APIVersion, APIVersionManager, type APIVersionResponse } from '../types/api-version';
import type { RequestOptions } from '../types/auth';
import { Environment } from '../types/common';
import {
  buildURL,
  extractErrorCode,
  extractErrorDetails,
  extractErrorMessage,
  fromPluginConfig,
  headersToRecord,
  toPluginConfig,
  toPluginResponse,
  unixTimestampToDate,
} from '../utils';
import { RateLimiter, type RateLimitOptions } from './rate-limit';
import { RetryHandler, type RetryOptions } from './retry';

export interface HttpClientConfig {
  auth: {
    consumer_key: string;
    consumer_secret: string;
    access_token: string;
    access_token_secret: string;
  };
  environment?: Environment;
  baseURL?: string;
  timeout?: number;
  rateLimitOptions?: Partial<RateLimitOptions>;
  retryOptions?: Partial<RetryOptions>;
  apiVersion?: APIVersion;
  autoUpgradeVersion?: boolean;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
}

export class HttpClient implements PluginClient {
  // PluginClient interface implementation
  public readonly config: {
    baseURL?: string;
    timeout?: number;
    maxRetries?: number;
  };
  private oauth: OAuth;
  private rateLimiter: RateLimiter;
  private retryHandler: RetryHandler;
  private baseURL: string;
  private timeout: number;
  private pluginManager: PluginManager;
  private versionManager: APIVersionManager;

  constructor(config: HttpClientConfig) {
    this.oauth = new OAuth(config.auth);
    this.rateLimiter = new RateLimiter(config.rateLimitOptions);
    this.retryHandler = new RetryHandler(config.retryOptions);
    this.timeout = config.timeout || 30000;

    // Set base URL based on environment
    this.baseURL = config.baseURL || this.getBaseURL(config.environment);

    // Initialize API version manager
    this.versionManager = new APIVersionManager(
      config.apiVersion,
      config.autoUpgradeVersion || false
    );

    // Set up config for plugin interface
    this.config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      maxRetries: this.retryHandler.options.maxRetries,
    };

    // Initialize plugin manager
    this.pluginManager = new DefaultPluginManager(this);
  }

  private getBaseURL(environment: Environment = Environment.SANDBOX): string {
    const baseURLs = {
      [Environment.PRODUCTION]: 'https://ads-api.x.com',
      [Environment.SANDBOX]: 'https://ads-api-sandbox.x.com',
    };

    return baseURLs[environment];
  }

  private buildURL(endpoint: string, params?: Record<string, unknown>): string {
    const versionedEndpoint = `${this.versionManager.getVersionPath()}${endpoint}`;
    return buildURL(this.baseURL, versionedEndpoint, params);
  }

  private buildRequestOptions(config: RequestConfig): RequestOptions {
    const url = this.buildURL(config.endpoint, config.method === 'GET' ? config.params : undefined);

    return {
      method: config.method,
      url,
      params: config.method === 'GET' ? config.params : undefined,
      body: config.body,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'x-ads-sdk/1.0.0',
        ...config.headers,
      },
    };
  }

  // Convert RequestConfig to PluginRequestConfig
  private toPluginConfig(config: RequestConfig): PluginRequestConfig {
    return toPluginConfig(config, this.baseURL, this.versionManager.getVersionPath());
  }

  // Convert PluginRequestConfig back to RequestConfig
  private fromPluginConfig(pluginConfig: PluginRequestConfig): RequestConfig {
    return fromPluginConfig(pluginConfig, this.versionManager.getVersionPath());
  }

  // Convert response to PluginResponse
  private toPluginResponse<T>(
    data: T,
    status = 200,
    statusText = 'OK',
    headers: Record<string, string> = {}
  ): PluginResponse<T> {
    return toPluginResponse(data, status, statusText, headers);
  }

  async request<T>(config: RequestConfig): Promise<T> {
    // Convert to plugin format and execute beforeRequest hooks
    const pluginConfig = this.toPluginConfig(config);
    const modifiedPluginConfig = await this.pluginManager.executeBeforeRequest(pluginConfig);
    const modifiedConfig = this.fromPluginConfig(modifiedPluginConfig);

    try {
      // Check rate limits before making request
      await this.rateLimiter.checkRateLimit(modifiedConfig.endpoint);

      const response = await this.retryHandler.executeWithRetry(
        async () => await this.makeRequest<T>(modifiedConfig),
        { endpoint: modifiedConfig.endpoint, method: modifiedConfig.method }
      );

      // Convert response to plugin format and execute afterResponse hooks
      const pluginResponse = this.toPluginResponse(response);
      const modifiedPluginResponse = await this.pluginManager.executeAfterResponse(
        pluginResponse,
        modifiedPluginConfig
      );
      return modifiedPluginResponse.data as T;
    } catch (error) {
      // Execute onError plugin hooks
      try {
        const errorResponse = await this.pluginManager.executeOnError(
          error as Error,
          modifiedPluginConfig
        );
        return errorResponse.data as T;
      } catch {
        // If plugins don't handle the error, throw the original error
        throw error;
      }
    }
  }

  private async makeRequest<T>(config: RequestConfig): Promise<T> {
    const requestOptions = this.buildRequestOptions(config);
    const signedOptions = await this.oauth.signRequest(requestOptions);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const fetchOptions: RequestInit = {
        method: signedOptions.method,
        headers: signedOptions.headers,
        signal: controller.signal,
      };

      // Add body for non-GET requests
      if (signedOptions.body && signedOptions.method !== 'GET') {
        fetchOptions.body =
          typeof signedOptions.body === 'string'
            ? signedOptions.body
            : JSON.stringify(signedOptions.body);
      }

      const response = await globalThis.fetch(signedOptions.url, fetchOptions);

      // Process API version information from headers
      const responseHeaders = headersToRecord(response.headers);
      const versionInfo = this.versionManager.parseResponseHeaders(responseHeaders);

      // Log version warnings if any
      if (versionInfo.warnings.length > 0) {
        console.warn('[X Ads SDK] API Version Warnings:', versionInfo.warnings);
      }

      // Update rate limits from response headers
      this.rateLimiter.updateLimits(config.endpoint, responseHeaders);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || response.status === 204) {
        return {} as T;
      }

      if (contentType.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if ((error as Error).name === 'AbortError') {
        throw new TimeoutError(`Request timeout after ${this.timeout}ms`, this.timeout, 'TIMEOUT');
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new NetworkError('Network request failed', error as Error, 'NETWORK_ERROR');
      }

      throw error;
    }
  }

  private async handleErrorResponse(response: Response): Promise<void> {
    let errorData: unknown;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
    } catch {
      errorData = null;
    }

    const message = extractErrorMessage(errorData, response);

    const requestInfo = {
      method: 'unknown',
      url: response.url,
      headers: {},
    };

    const responseInfo = {
      headers: headersToRecord(response.headers),
      data: errorData,
    };

    switch (response.status) {
      case 401: {
        throw new AuthenticationError(message, 'UNAUTHORIZED');
      }
      case 429: {
        const resetTime = response.headers.get('x-rate-limit-reset');
        const resetDate = resetTime ? unixTimestampToDate(resetTime) : undefined;
        const { RateLimitError } = await import('../errors/index.js');
        throw new RateLimitError(message, resetDate, 'RATE_LIMIT_EXCEEDED');
      }
      default: {
        throw createAPIError(
          response.status,
          message,
          extractErrorCode(errorData) || `HTTP_${response.status}`,
          extractErrorDetails(errorData),
          requestInfo,
          responseInfo
        );
      }
    }
  }

  // Convenience methods
  async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>({
      method: 'GET',
      endpoint,
      params,
      headers,
    });
  }

  async post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'POST',
      endpoint,
      body,
      headers,
    });
  }

  async put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      endpoint,
      body,
      headers,
    });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      endpoint,
      headers,
    });
  }

  // Plugin management methods
  getPluginManager(): PluginManager {
    return this.pluginManager;
  }

  // API Version management methods
  getAPIVersion(): APIVersion {
    return this.versionManager.getCurrentVersion();
  }

  setAPIVersion(version: APIVersion): void {
    this.versionManager.setVersion(version);
  }

  getVersionManager(): APIVersionManager {
    return this.versionManager;
  }

  getVersionInfo(): APIVersionResponse {
    return this.versionManager.getUpgradeRecommendation();
  }

  isVersionDeprecated(): boolean {
    return this.versionManager.isVersionDeprecated();
  }
}
