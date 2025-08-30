import { OAuth } from '../auth/oauth.js';
import { RateLimiter, RateLimitOptions } from './rate-limit.js';
import { RetryHandler, RetryOptions } from './retry.js';
import { AuthenticationError, TimeoutError, NetworkError, createAPIError } from '../errors/index.js';
import { RequestOptions } from '../types/auth.js';
import { Environment } from '../types/common.js';
import { PluginManager, DefaultPluginManager } from '../plugins/base.js';
import { APIVersionManager, APIVersion, APIVersionResponse } from '../types/api-version.js';

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
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}

export class HttpClient {
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
    
    // Initialize plugin manager
    this.pluginManager = new DefaultPluginManager(this);
  }

  private getBaseURL(environment: Environment = Environment.SANDBOX): string {
    const baseURLs = {
      [Environment.PRODUCTION]: 'https://ads-api.x.com',
      [Environment.SANDBOX]: 'https://ads-api-sandbox.x.com'
    };
    
    return baseURLs[environment];
  }

  private buildURL(endpoint: string, params?: Record<string, any>): string {
    // Add API version to the endpoint path
    const versionedEndpoint = `${this.versionManager.getVersionPath()}${endpoint}`;
    const url = new URL(`${this.baseURL}${versionedEndpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }
    
    return url.toString();
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
        ...config.headers
      }
    };
  }

  async request<T>(config: RequestConfig): Promise<T> {
    // Execute beforeRequest plugin hooks
    const modifiedConfig = await this.pluginManager.executeBeforeRequest(config);
    
    try {
      // Check rate limits before making request
      await this.rateLimiter.checkRateLimit(modifiedConfig.endpoint);

      const response = await this.retryHandler.executeWithRetry(
        async () => await this.makeRequest<T>(modifiedConfig),
        { endpoint: modifiedConfig.endpoint, method: modifiedConfig.method }
      );

      // Execute afterResponse plugin hooks
      return await this.pluginManager.executeAfterResponse(response, modifiedConfig);
    } catch (error) {
      // Execute onError plugin hooks
      return await this.pluginManager.executeOnError(error, modifiedConfig);
    }
  }

  private async makeRequest<T>(config: RequestConfig): Promise<T> {
    const requestOptions = this.buildRequestOptions(config);
    const signedOptions = this.oauth.signRequest(requestOptions);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const fetchOptions: RequestInit = {
        method: signedOptions.method,
        headers: signedOptions.headers,
        signal: controller.signal
      };

      // Add body for non-GET requests
      if (signedOptions.body && signedOptions.method !== 'GET') {
        fetchOptions.body = typeof signedOptions.body === 'string' 
          ? signedOptions.body 
          : JSON.stringify(signedOptions.body);
      }

      const response = await globalThis.fetch(signedOptions.url, fetchOptions);
      
      // Process API version information from headers
      const responseHeaders = this.headersToRecord(response.headers);
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

      return await response.text() as T;

    } catch (error) {
      clearTimeout(timeoutId);
      
      if ((error as Error).name === 'AbortError') {
        throw new TimeoutError(
          `Request timeout after ${this.timeout}ms`,
          this.timeout,
          'TIMEOUT'
        );
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new NetworkError(
          'Network request failed',
          error as Error,
          'NETWORK_ERROR'
        );
      }

      throw error;
    }
  }

  private async handleErrorResponse(response: Response): Promise<void> {
    let errorData: any;
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
    } catch {
      errorData = null;
    }

    const message = errorData?.errors?.[0]?.message || 
                   errorData?.error || 
                   `HTTP ${response.status}: ${response.statusText}`;

    const requestInfo = {
      method: 'unknown',
      url: response.url,
      headers: {}
    };

    const responseInfo = {
      headers: this.headersToRecord(response.headers),
      data: errorData
    };

    switch (response.status) {
      case 401: {
        throw new AuthenticationError(message, 'UNAUTHORIZED');
      }
      case 429: {
        const resetTime = response.headers.get('x-rate-limit-reset');
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : undefined;
        const { RateLimitError } = await import('../errors/index.js');
        throw new RateLimitError(message, resetDate, 'RATE_LIMIT_EXCEEDED');
      }
      default: {
        throw createAPIError(
          response.status,
          message,
          errorData?.errors?.[0]?.code || `HTTP_${response.status}`,
          errorData,
          requestInfo,
          responseInfo
        );
      }
    }
  }

  private headersToRecord(headers: Headers): Record<string, string> {
    const record: Record<string, string> = {};
    headers.forEach((value, key) => {
      record[key.toLowerCase()] = value;
    });
    return record;
  }

  // Convenience methods
  async get<T>(endpoint: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'GET',
      endpoint,
      params,
      headers
    });
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'POST',
      endpoint,
      body,
      headers
    });
  }

  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      endpoint,
      body,
      headers
    });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      endpoint,
      headers
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