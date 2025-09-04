export class XAdsError extends Error {
  public code: string;
  public details?: string;
  public parameter?: string;

  constructor(code: string, message: string, details?: string, parameter?: string) {
    super(message);
    this.name = 'XAdsError';
    this.code = code;
    this.details = details;
    this.parameter = parameter;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, XAdsError);
    }
  }
}

export class AuthenticationError extends XAdsError {
  constructor(message: string, details?: string) {
    super('AUTHENTICATION_ERROR', message, details);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends XAdsError {
  public retryAfter: number;

  constructor(message: string, retryAfter: number, details?: string) {
    super('RATE_LIMIT_ERROR', message, details);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class ValidationError extends XAdsError {
  constructor(message: string, parameter?: string, details?: string) {
    super('VALIDATION_ERROR', message, details, parameter);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends XAdsError {
  constructor(message: string, details?: string) {
    super('NETWORK_ERROR', message, details);
    this.name = 'NetworkError';
  }
}
