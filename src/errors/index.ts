export class XAdsError extends Error {
  public readonly timestamp: Date;

  constructor(
    message: string,
    public readonly code?: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'XAdsError';
    this.timestamp = new Date();

    // Maintain stack trace (for V8 engine)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
    };
  }
}

export class AuthenticationError extends XAdsError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends XAdsError {
  constructor(
    message: string,
    public readonly resetTime?: Date,
    code?: string
  ) {
    super(message, code);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends XAdsError {
  constructor(
    message: string,
    public readonly field?: string,
    code?: string
  ) {
    super(message, code);
    this.name = 'ValidationError';
  }
}

// Type definitions for error details
export interface APIErrorDetails {
  [key: string]: unknown;
}

export interface APIErrorRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
}

export interface APIErrorResponse {
  headers: Record<string, string>;
  data?: unknown;
}

export class APIError extends XAdsError {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorCode?: string,
    public readonly details?: APIErrorDetails,
    public readonly request?: APIErrorRequest,
    public readonly response?: APIErrorResponse
  ) {
    super(message, errorCode);
    this.name = 'APIError';
  }

  isRetryable(): boolean {
    return [429, 500, 502, 503, 504].includes(this.statusCode);
  }

  isRateLimit(): boolean {
    return this.statusCode === 429;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }

  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      details: this.details,
      request: this.request,
      response: this.response,
    };
  }
}

export class NetworkError extends XAdsError {
  constructor(
    message: string,
    public readonly originalError?: Error,
    code?: string
  ) {
    super(message, code, originalError);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends XAdsError {
  constructor(
    message: string,
    public readonly timeoutMs: number,
    code?: string
  ) {
    super(message, code);
    this.name = 'TimeoutError';
  }
}

export class ConfigurationError extends XAdsError {
  constructor(
    message: string,
    public readonly configField?: string,
    code?: string
  ) {
    super(message, code);
    this.name = 'ConfigurationError';
  }
}

export class PluginError extends XAdsError {
  constructor(
    message: string,
    public readonly pluginName?: string,
    code?: string
  ) {
    super(message, code);
    this.name = 'PluginError';
  }
}

// Error factory functions for consistency
export const createAPIError = (
  statusCode: number,
  message: string,
  errorCode?: string,
  details?: APIErrorDetails,
  request?: APIErrorRequest,
  response?: APIErrorResponse
): APIError => {
  return new APIError(message, statusCode, errorCode, details, request, response);
};

export const createAuthError = (message: string, code?: string): AuthenticationError => {
  return new AuthenticationError(message, code);
};

export const createRateLimitError = (
  message: string,
  resetTime?: Date,
  code?: string
): RateLimitError => {
  return new RateLimitError(message, resetTime, code);
};

// Type guards for error checking
export const isXAdsError = (error: unknown): error is XAdsError => {
  return error instanceof XAdsError;
};

export const isAPIError = (error: unknown): error is APIError => {
  return error instanceof APIError;
};

export const isAuthenticationError = (error: unknown): error is AuthenticationError => {
  return error instanceof AuthenticationError;
};

export const isRateLimitError = (error: unknown): error is RateLimitError => {
  return error instanceof RateLimitError;
};

export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError;
};

export const isTimeoutError = (error: unknown): error is TimeoutError => {
  return error instanceof TimeoutError;
};
