import type { OAuthService } from '../auth/oauth';
import type { APIError, AuthenticationContext, RequestOptions } from '../types';
import {
  AuthenticationError,
  NetworkError,
  RateLimitError,
  ValidationError,
  XAdsError,
} from '../types/errors';
import type { RateLimiter } from './rate-limiter';

export class HttpClient {
  private authService: OAuthService;
  private rateLimiter: RateLimiter;
  private context: AuthenticationContext;
  private timeout: number;

  constructor(
    authService: OAuthService,
    rateLimiter: RateLimiter,
    context: AuthenticationContext,
    timeout: number = 60000
  ) {
    this.authService = authService;
    this.rateLimiter = rateLimiter;
    this.context = context;
    this.timeout = timeout;
  }

  public async request<T>(options: RequestOptions): Promise<T> {
    await this.rateLimiter.wait();

    const signedOptions = await this.authService.signRequest(options);
    const url = new URL(signedOptions.url);

    if (signedOptions.params) {
      Object.entries(signedOptions.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const isFormData = signedOptions.data instanceof FormData;

    const requestInit: RequestInit = {
      method: signedOptions.method,
      headers: {
        'User-Agent': 'x-ads-sdk/0.1.0',
        ...signedOptions.headers,
      },
      signal: AbortSignal.timeout(signedOptions.timeout || this.timeout),
    };

    // Don't set Content-Type for FormData, let the browser set it with boundary
    if (!isFormData) {
      (requestInit.headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    if (signedOptions.data && ['POST', 'PUT'].includes(signedOptions.method)) {
      if (isFormData) {
        requestInit.body = signedOptions.data as BodyInit;
      } else {
        requestInit.body = JSON.stringify(signedOptions.data);
      }
    }

    if (this.context.debug) {
      console.log('X Ads SDK Request:', {
        method: signedOptions.method,
        url: url.toString(),
        headers: requestInit.headers,
        body: isFormData ? '[FormData]' : requestInit.body,
      });
    }

    try {
      const response = await fetch(url.toString(), requestInit);

      if (this.context.debug) {
        console.log('X Ads SDK Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        });
      }

      const responseText = await response.text();
      let responseData: unknown;

      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseData = { raw: responseText };
      }

      if (!response.ok) {
        await this.handleErrorResponse(response, responseData);
      }

      return responseData as T;
    } catch (error) {
      if (error instanceof XAdsError) {
        throw error;
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new NetworkError('Network request failed', error.message);
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Request timeout', `Request exceeded ${this.timeout}ms`);
      }

      throw new NetworkError(
        'Unknown network error',
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  private async handleErrorResponse(response: Response, responseData: unknown): Promise<never> {
    const status = response.status;

    if (status === 401) {
      throw new AuthenticationError(
        'Authentication failed',
        this.extractErrorMessage(responseData)
      );
    }

    if (status === 429) {
      const retryAfter = this.extractRetryAfter(response);
      throw new RateLimitError(
        'Rate limit exceeded',
        retryAfter,
        this.extractErrorMessage(responseData)
      );
    }

    if (status >= 400 && status < 500) {
      const errors = this.extractAPIErrors(responseData);
      if (errors.length > 0) {
        const firstError = errors[0];
        throw new ValidationError(firstError.message, firstError.parameter, firstError.details);
      }
      throw new ValidationError(`Client error: ${status}`, undefined, response.statusText);
    }

    if (status >= 500) {
      throw new NetworkError('Server error', `HTTP ${status}: ${response.statusText}`);
    }

    throw new XAdsError(
      'UNKNOWN_ERROR',
      `HTTP ${status}: ${response.statusText}`,
      this.extractErrorMessage(responseData)
    );
  }

  private extractRetryAfter(response: Response): number {
    const retryAfter = response.headers.get('Retry-After');
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      return Number.isNaN(seconds) ? 60 : seconds;
    }

    const resetTime = response.headers.get('X-Rate-Limit-Reset');
    if (resetTime) {
      const resetTimestamp = parseInt(resetTime, 10);
      const now = Math.floor(Date.now() / 1000);
      return Math.max(0, resetTimestamp - now);
    }

    return 60;
  }

  private extractErrorMessage(responseData: unknown): string {
    if (this.isErrorResponseData(responseData)) {
      if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        const firstError = responseData.errors[0];
        if (
          firstError &&
          typeof firstError === 'object' &&
          'message' in firstError &&
          typeof firstError.message === 'string'
        ) {
          return firstError.message || 'Unknown error';
        }
      }

      if (typeof responseData.message === 'string') {
        return responseData.message;
      }

      if (typeof responseData.error === 'string') {
        return responseData.error;
      }
    }

    return 'Unknown error';
  }

  private isErrorResponseData(data: unknown): data is {
    errors?: unknown[];
    message?: string;
    error?: string;
  } {
    return typeof data === 'object' && data !== null;
  }

  private extractAPIErrors(responseData: unknown): APIError[] {
    if (this.isErrorResponseData(responseData) && Array.isArray(responseData.errors)) {
      return responseData.errors.map((error: unknown) => {
        if (this.isAPIErrorData(error)) {
          return {
            code: error.code || 'UNKNOWN_ERROR',
            message: error.message || 'Unknown error',
            parameter: error.parameter,
            details: error.details,
          };
        }
        return {
          code: 'UNKNOWN_ERROR',
          message: 'Unknown error',
        };
      });
    }

    return [];
  }

  private isAPIErrorData(data: unknown): data is {
    code?: string;
    message?: string;
    parameter?: string;
    details?: string;
  } {
    return typeof data === 'object' && data !== null;
  }

  public updateTimeout(timeout: number): void {
    if (timeout <= 0 || timeout > 300000) {
      throw new ValidationError('Timeout must be between 1ms and 300000ms (5 minutes)');
    }
    this.timeout = timeout;
  }

  public updateContext(context: AuthenticationContext): void {
    this.context = context;
  }
}
