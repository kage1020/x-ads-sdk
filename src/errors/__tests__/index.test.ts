import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  APIError,
  type APIErrorDetails,
  type APIErrorRequest,
  type APIErrorResponse,
  AuthenticationError,
  ConfigurationError,
  createAPIError,
  createAuthError,
  createRateLimitError,
  isAPIError,
  isAuthenticationError,
  isNetworkError,
  isRateLimitError,
  isTimeoutError,
  isXAdsError,
  NetworkError,
  PluginError,
  RateLimitError,
  TimeoutError,
  ValidationError,
  XAdsError,
} from '../index';

describe('XAdsError', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should create error with message only', () => {
      const error = new XAdsError('Test error');

      expect(error.message).toBe('Test error');
      expect(error.name).toBe('XAdsError');
      expect(error.code).toBeUndefined();
      expect(error.cause).toBeUndefined();
      expect(error.timestamp).toEqual(new Date('2023-01-01T10:00:00Z'));
    });

    it('should create error with message and code', () => {
      const error = new XAdsError('Test error', 'TEST_CODE');

      expect(error.message).toBe('Test error');
      expect(error.name).toBe('XAdsError');
      expect(error.code).toBe('TEST_CODE');
      expect(error.cause).toBeUndefined();
    });

    it('should create error with message, code, and cause', () => {
      const cause = new Error('Original error');
      const error = new XAdsError('Test error', 'TEST_CODE', cause);

      expect(error.message).toBe('Test error');
      expect(error.name).toBe('XAdsError');
      expect(error.code).toBe('TEST_CODE');
      expect(error.cause).toBe(cause);
    });

    it('should be instance of Error', () => {
      const error = new XAdsError('Test error');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(XAdsError);
    });

    it('should capture stack trace', () => {
      const error = new XAdsError('Test error');

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('XAdsError');
    });
  });

  describe('toJSON', () => {
    it('should serialize error to JSON', () => {
      const error = new XAdsError('Test error', 'TEST_CODE');
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'XAdsError',
        message: 'Test error',
        code: 'TEST_CODE',
        timestamp: '2023-01-01T10:00:00.000Z',
        stack: error.stack,
      });
    });

    it('should serialize error without code to JSON', () => {
      const error = new XAdsError('Test error');
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'XAdsError',
        message: 'Test error',
        code: undefined,
        timestamp: '2023-01-01T10:00:00.000Z',
        stack: error.stack,
      });
    });
  });
});

describe('AuthenticationError', () => {
  it('should create authentication error', () => {
    const error = new AuthenticationError('Invalid credentials');

    expect(error.message).toBe('Invalid credentials');
    expect(error.name).toBe('AuthenticationError');
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(AuthenticationError);
  });

  it('should create authentication error with code', () => {
    const error = new AuthenticationError('Invalid credentials', 'AUTH_FAILED');

    expect(error.message).toBe('Invalid credentials');
    expect(error.name).toBe('AuthenticationError');
    expect(error.code).toBe('AUTH_FAILED');
  });
});

describe('RateLimitError', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2023-01-01T10:00:00Z'));
  });

  it('should create rate limit error', () => {
    const error = new RateLimitError('Rate limit exceeded');

    expect(error.message).toBe('Rate limit exceeded');
    expect(error.name).toBe('RateLimitError');
    expect(error.resetTime).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(RateLimitError);
  });

  it('should create rate limit error with reset time', () => {
    const resetTime = new Date('2023-01-01T11:00:00Z');
    const error = new RateLimitError('Rate limit exceeded', resetTime);

    expect(error.message).toBe('Rate limit exceeded');
    expect(error.name).toBe('RateLimitError');
    expect(error.resetTime).toBe(resetTime);
  });

  it('should create rate limit error with reset time and code', () => {
    const resetTime = new Date('2023-01-01T11:00:00Z');
    const error = new RateLimitError('Rate limit exceeded', resetTime, 'RATE_LIMIT');

    expect(error.message).toBe('Rate limit exceeded');
    expect(error.name).toBe('RateLimitError');
    expect(error.resetTime).toBe(resetTime);
    expect(error.code).toBe('RATE_LIMIT');
  });
});

describe('ValidationError', () => {
  it('should create validation error', () => {
    const error = new ValidationError('Invalid field value');

    expect(error.message).toBe('Invalid field value');
    expect(error.name).toBe('ValidationError');
    expect(error.field).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it('should create validation error with field', () => {
    const error = new ValidationError('Invalid field value', 'username');

    expect(error.message).toBe('Invalid field value');
    expect(error.name).toBe('ValidationError');
    expect(error.field).toBe('username');
  });

  it('should create validation error with field and code', () => {
    const error = new ValidationError('Invalid field value', 'username', 'INVALID_FORMAT');

    expect(error.message).toBe('Invalid field value');
    expect(error.name).toBe('ValidationError');
    expect(error.field).toBe('username');
    expect(error.code).toBe('INVALID_FORMAT');
  });
});

describe('APIError', () => {
  const mockRequest: APIErrorRequest = {
    method: 'POST',
    url: '/api/test',
    headers: { 'Content-Type': 'application/json' },
  };

  const mockResponse: APIErrorResponse = {
    headers: { 'Content-Type': 'application/json' },
    data: { error: 'Bad Request' },
  };

  const mockDetails: APIErrorDetails = {
    field: 'email',
    reason: 'invalid_format',
  };

  it('should create API error with status code', () => {
    const error = new APIError('Bad Request', 400);

    expect(error.message).toBe('Bad Request');
    expect(error.name).toBe('APIError');
    expect(error.statusCode).toBe(400);
    expect(error.errorCode).toBeUndefined();
    expect(error.details).toBeUndefined();
    expect(error.request).toBeUndefined();
    expect(error.response).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(APIError);
  });

  it('should create API error with all parameters', () => {
    const error = new APIError(
      'Bad Request',
      400,
      'INVALID_REQUEST',
      mockDetails,
      mockRequest,
      mockResponse
    );

    expect(error.message).toBe('Bad Request');
    expect(error.name).toBe('APIError');
    expect(error.statusCode).toBe(400);
    expect(error.errorCode).toBe('INVALID_REQUEST');
    expect(error.details).toBe(mockDetails);
    expect(error.request).toBe(mockRequest);
    expect(error.response).toBe(mockResponse);
  });

  describe('isRetryable', () => {
    it('should return true for retryable status codes', () => {
      const statusCodes = [429, 500, 502, 503, 504];

      for (const statusCode of statusCodes) {
        const error = new APIError('Server Error', statusCode);
        expect(error.isRetryable()).toBe(true);
      }
    });

    it('should return false for non-retryable status codes', () => {
      const statusCodes = [400, 401, 403, 404, 422];

      for (const statusCode of statusCodes) {
        const error = new APIError('Client Error', statusCode);
        expect(error.isRetryable()).toBe(false);
      }
    });
  });

  describe('isRateLimit', () => {
    it('should return true for 429 status code', () => {
      const error = new APIError('Rate Limit', 429);
      expect(error.isRateLimit()).toBe(true);
    });

    it('should return false for non-429 status codes', () => {
      const statusCodes = [400, 401, 403, 404, 500, 502, 503, 504];

      for (const statusCode of statusCodes) {
        const error = new APIError('Error', statusCode);
        expect(error.isRateLimit()).toBe(false);
      }
    });
  });

  describe('isServerError', () => {
    it('should return true for 5xx status codes', () => {
      const statusCodes = [500, 501, 502, 503, 504, 599];

      for (const statusCode of statusCodes) {
        const error = new APIError('Server Error', statusCode);
        expect(error.isServerError()).toBe(true);
      }
    });

    it('should return false for non-5xx status codes', () => {
      const statusCodes = [200, 400, 401, 403, 404, 429, 499];

      for (const statusCode of statusCodes) {
        const error = new APIError('Error', statusCode);
        expect(error.isServerError()).toBe(false);
      }
    });
  });

  describe('isClientError', () => {
    it('should return true for 4xx status codes', () => {
      const statusCodes = [400, 401, 403, 404, 422, 429, 499];

      for (const statusCode of statusCodes) {
        const error = new APIError('Client Error', statusCode);
        expect(error.isClientError()).toBe(true);
      }
    });

    it('should return false for non-4xx status codes', () => {
      const statusCodes = [200, 300, 302, 500, 502, 503, 504];

      for (const statusCode of statusCodes) {
        const error = new APIError('Error', statusCode);
        expect(error.isClientError()).toBe(false);
      }
    });
  });

  describe('toJSON', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('2023-01-01T10:00:00Z'));
    });

    it('should serialize API error to JSON', () => {
      const error = new APIError(
        'Bad Request',
        400,
        'INVALID_REQUEST',
        mockDetails,
        mockRequest,
        mockResponse
      );
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'APIError',
        message: 'Bad Request',
        code: 'INVALID_REQUEST',
        timestamp: '2023-01-01T10:00:00.000Z',
        stack: error.stack,
        statusCode: 400,
        errorCode: 'INVALID_REQUEST',
        details: mockDetails,
        request: mockRequest,
        response: mockResponse,
      });
    });

    it('should serialize minimal API error to JSON', () => {
      const error = new APIError('Not Found', 404);
      const json = error.toJSON();

      expect(json).toEqual({
        name: 'APIError',
        message: 'Not Found',
        code: undefined,
        timestamp: '2023-01-01T10:00:00.000Z',
        stack: error.stack,
        statusCode: 404,
        errorCode: undefined,
        details: undefined,
        request: undefined,
        response: undefined,
      });
    });
  });
});

describe('NetworkError', () => {
  it('should create network error', () => {
    const error = new NetworkError('Connection failed');

    expect(error.message).toBe('Connection failed');
    expect(error.name).toBe('NetworkError');
    expect(error.originalError).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(NetworkError);
  });

  it('should create network error with original error', () => {
    const originalError = new Error('ECONNREFUSED');
    const error = new NetworkError('Connection failed', originalError);

    expect(error.message).toBe('Connection failed');
    expect(error.name).toBe('NetworkError');
    expect(error.originalError).toBe(originalError);
    expect(error.cause).toBe(originalError);
  });

  it('should create network error with original error and code', () => {
    const originalError = new Error('ECONNREFUSED');
    const error = new NetworkError('Connection failed', originalError, 'NET_ERROR');

    expect(error.message).toBe('Connection failed');
    expect(error.name).toBe('NetworkError');
    expect(error.originalError).toBe(originalError);
    expect(error.code).toBe('NET_ERROR');
  });
});

describe('TimeoutError', () => {
  it('should create timeout error', () => {
    const error = new TimeoutError('Request timed out', 5000);

    expect(error.message).toBe('Request timed out');
    expect(error.name).toBe('TimeoutError');
    expect(error.timeoutMs).toBe(5000);
    expect(error.code).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(TimeoutError);
  });

  it('should create timeout error with code', () => {
    const error = new TimeoutError('Request timed out', 5000, 'TIMEOUT');

    expect(error.message).toBe('Request timed out');
    expect(error.name).toBe('TimeoutError');
    expect(error.timeoutMs).toBe(5000);
    expect(error.code).toBe('TIMEOUT');
  });
});

describe('ConfigurationError', () => {
  it('should create configuration error', () => {
    const error = new ConfigurationError('Invalid configuration');

    expect(error.message).toBe('Invalid configuration');
    expect(error.name).toBe('ConfigurationError');
    expect(error.configField).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(ConfigurationError);
  });

  it('should create configuration error with field', () => {
    const error = new ConfigurationError('Invalid configuration', 'apiKey');

    expect(error.message).toBe('Invalid configuration');
    expect(error.name).toBe('ConfigurationError');
    expect(error.configField).toBe('apiKey');
  });

  it('should create configuration error with field and code', () => {
    const error = new ConfigurationError('Invalid configuration', 'apiKey', 'MISSING_FIELD');

    expect(error.message).toBe('Invalid configuration');
    expect(error.name).toBe('ConfigurationError');
    expect(error.configField).toBe('apiKey');
    expect(error.code).toBe('MISSING_FIELD');
  });
});

describe('PluginError', () => {
  it('should create plugin error', () => {
    const error = new PluginError('Plugin failed');

    expect(error.message).toBe('Plugin failed');
    expect(error.name).toBe('PluginError');
    expect(error.pluginName).toBeUndefined();
    expect(error).toBeInstanceOf(XAdsError);
    expect(error).toBeInstanceOf(PluginError);
  });

  it('should create plugin error with plugin name', () => {
    const error = new PluginError('Plugin failed', 'auth-plugin');

    expect(error.message).toBe('Plugin failed');
    expect(error.name).toBe('PluginError');
    expect(error.pluginName).toBe('auth-plugin');
  });

  it('should create plugin error with plugin name and code', () => {
    const error = new PluginError('Plugin failed', 'auth-plugin', 'PLUGIN_INIT_FAILED');

    expect(error.message).toBe('Plugin failed');
    expect(error.name).toBe('PluginError');
    expect(error.pluginName).toBe('auth-plugin');
    expect(error.code).toBe('PLUGIN_INIT_FAILED');
  });
});

describe('Factory Functions', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date('2023-01-01T10:00:00Z'));
  });

  describe('createAPIError', () => {
    it('should create API error with minimal parameters', () => {
      const error = createAPIError(404, 'Not Found');

      expect(error).toBeInstanceOf(APIError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error.errorCode).toBeUndefined();
    });

    it('should create API error with all parameters', () => {
      const request: APIErrorRequest = { method: 'GET', url: '/api/test' };
      const response: APIErrorResponse = { headers: {}, data: {} };
      const details: APIErrorDetails = { field: 'test' };

      const error = createAPIError(400, 'Bad Request', 'INVALID', details, request, response);

      expect(error).toBeInstanceOf(APIError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad Request');
      expect(error.errorCode).toBe('INVALID');
      expect(error.details).toBe(details);
      expect(error.request).toBe(request);
      expect(error.response).toBe(response);
    });
  });

  describe('createAuthError', () => {
    it('should create authentication error', () => {
      const error = createAuthError('Unauthorized');

      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.message).toBe('Unauthorized');
      expect(error.code).toBeUndefined();
    });

    it('should create authentication error with code', () => {
      const error = createAuthError('Unauthorized', 'AUTH_FAILED');

      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.message).toBe('Unauthorized');
      expect(error.code).toBe('AUTH_FAILED');
    });
  });

  describe('createRateLimitError', () => {
    it('should create rate limit error', () => {
      const error = createRateLimitError('Rate limit exceeded');

      expect(error).toBeInstanceOf(RateLimitError);
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.resetTime).toBeUndefined();
      expect(error.code).toBeUndefined();
    });

    it('should create rate limit error with reset time and code', () => {
      const resetTime = new Date('2023-01-01T11:00:00Z');
      const error = createRateLimitError('Rate limit exceeded', resetTime, 'RATE_LIMIT');

      expect(error).toBeInstanceOf(RateLimitError);
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.resetTime).toBe(resetTime);
      expect(error.code).toBe('RATE_LIMIT');
    });
  });
});

describe('Type Guards', () => {
  const xadsError = new XAdsError('Test error');
  const apiError = new APIError('API Error', 400);
  const authError = new AuthenticationError('Auth Error');
  const rateLimitError = new RateLimitError('Rate Limit Error');
  const networkError = new NetworkError('Network Error');
  const timeoutError = new TimeoutError('Timeout Error', 5000);
  const regularError = new Error('Regular Error');
  const notAnError = 'not an error';

  describe('isXAdsError', () => {
    it('should return true for XAdsError instances', () => {
      expect(isXAdsError(xadsError)).toBe(true);
      expect(isXAdsError(apiError)).toBe(true);
      expect(isXAdsError(authError)).toBe(true);
      expect(isXAdsError(rateLimitError)).toBe(true);
      expect(isXAdsError(networkError)).toBe(true);
      expect(isXAdsError(timeoutError)).toBe(true);
    });

    it('should return false for non-XAdsError instances', () => {
      expect(isXAdsError(regularError)).toBe(false);
      expect(isXAdsError(notAnError)).toBe(false);
      expect(isXAdsError(null)).toBe(false);
      expect(isXAdsError(undefined)).toBe(false);
    });
  });

  describe('isAPIError', () => {
    it('should return true for APIError instances', () => {
      expect(isAPIError(apiError)).toBe(true);
    });

    it('should return false for non-APIError instances', () => {
      expect(isAPIError(xadsError)).toBe(false);
      expect(isAPIError(authError)).toBe(false);
      expect(isAPIError(regularError)).toBe(false);
      expect(isAPIError(notAnError)).toBe(false);
    });
  });

  describe('isAuthenticationError', () => {
    it('should return true for AuthenticationError instances', () => {
      expect(isAuthenticationError(authError)).toBe(true);
    });

    it('should return false for non-AuthenticationError instances', () => {
      expect(isAuthenticationError(xadsError)).toBe(false);
      expect(isAuthenticationError(apiError)).toBe(false);
      expect(isAuthenticationError(regularError)).toBe(false);
      expect(isAuthenticationError(notAnError)).toBe(false);
    });
  });

  describe('isRateLimitError', () => {
    it('should return true for RateLimitError instances', () => {
      expect(isRateLimitError(rateLimitError)).toBe(true);
    });

    it('should return false for non-RateLimitError instances', () => {
      expect(isRateLimitError(xadsError)).toBe(false);
      expect(isRateLimitError(apiError)).toBe(false);
      expect(isRateLimitError(regularError)).toBe(false);
      expect(isRateLimitError(notAnError)).toBe(false);
    });
  });

  describe('isNetworkError', () => {
    it('should return true for NetworkError instances', () => {
      expect(isNetworkError(networkError)).toBe(true);
    });

    it('should return false for non-NetworkError instances', () => {
      expect(isNetworkError(xadsError)).toBe(false);
      expect(isNetworkError(apiError)).toBe(false);
      expect(isNetworkError(regularError)).toBe(false);
      expect(isNetworkError(notAnError)).toBe(false);
    });
  });

  describe('isTimeoutError', () => {
    it('should return true for TimeoutError instances', () => {
      expect(isTimeoutError(timeoutError)).toBe(true);
    });

    it('should return false for non-TimeoutError instances', () => {
      expect(isTimeoutError(xadsError)).toBe(false);
      expect(isTimeoutError(apiError)).toBe(false);
      expect(isTimeoutError(regularError)).toBe(false);
      expect(isTimeoutError(notAnError)).toBe(false);
    });
  });
});

describe('Error Inheritance Chain', () => {
  it('should maintain proper inheritance chain for all error types', () => {
    const xadsError = new XAdsError('XAds Error');
    const apiError = new APIError('API Error', 500);
    const authError = new AuthenticationError('Auth Error');
    const rateLimitError = new RateLimitError('Rate Limit Error');
    const networkError = new NetworkError('Network Error');
    const timeoutError = new TimeoutError('Timeout Error', 5000);
    const validationError = new ValidationError('Validation Error');
    const configError = new ConfigurationError('Config Error');
    const pluginError = new PluginError('Plugin Error');

    // All should be instances of Error
    expect(xadsError).toBeInstanceOf(Error);
    expect(apiError).toBeInstanceOf(Error);
    expect(authError).toBeInstanceOf(Error);
    expect(rateLimitError).toBeInstanceOf(Error);
    expect(networkError).toBeInstanceOf(Error);
    expect(timeoutError).toBeInstanceOf(Error);
    expect(validationError).toBeInstanceOf(Error);
    expect(configError).toBeInstanceOf(Error);
    expect(pluginError).toBeInstanceOf(Error);

    // All should be instances of XAdsError
    expect(xadsError).toBeInstanceOf(XAdsError);
    expect(apiError).toBeInstanceOf(XAdsError);
    expect(authError).toBeInstanceOf(XAdsError);
    expect(rateLimitError).toBeInstanceOf(XAdsError);
    expect(networkError).toBeInstanceOf(XAdsError);
    expect(timeoutError).toBeInstanceOf(XAdsError);
    expect(validationError).toBeInstanceOf(XAdsError);
    expect(configError).toBeInstanceOf(XAdsError);
    expect(pluginError).toBeInstanceOf(XAdsError);

    // Each should be instance of their specific type
    expect(apiError).toBeInstanceOf(APIError);
    expect(authError).toBeInstanceOf(AuthenticationError);
    expect(rateLimitError).toBeInstanceOf(RateLimitError);
    expect(networkError).toBeInstanceOf(NetworkError);
    expect(timeoutError).toBeInstanceOf(TimeoutError);
    expect(validationError).toBeInstanceOf(ValidationError);
    expect(configError).toBeInstanceOf(ConfigurationError);
    expect(pluginError).toBeInstanceOf(PluginError);
  });
});

describe('Error Stack Trace Handling', () => {
  it('should preserve stack trace information', () => {
    const error = new XAdsError('Test error');

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('Test error');
    expect(error.stack).toContain('XAdsError');
  });

  it('should handle Error.captureStackTrace when available', () => {
    // Mock Error.captureStackTrace
    const originalCaptureStackTrace = Error.captureStackTrace;
    const captureStackTraceSpy = vi.fn();
    (
      Error as typeof Error & { captureStackTrace?: typeof Error.captureStackTrace }
    ).captureStackTrace = captureStackTraceSpy;

    const error = new XAdsError('Test error');

    expect(captureStackTraceSpy).toHaveBeenCalledWith(error, XAdsError);

    // Restore original
    // biome-ignore lint/suspicious/noExplicitAny: Testing internal API behavior
    (Error as any).captureStackTrace = originalCaptureStackTrace;
  });

  it('should handle absence of Error.captureStackTrace gracefully', () => {
    // Mock Error.captureStackTrace to be undefined
    const originalCaptureStackTrace = Error.captureStackTrace;
    // biome-ignore lint/suspicious/noExplicitAny: Testing internal API behavior
    (Error as any).captureStackTrace = undefined;

    expect(() => {
      new XAdsError('Test error');
    }).not.toThrow();

    // Restore original
    // biome-ignore lint/suspicious/noExplicitAny: Testing internal API behavior
    (Error as any).captureStackTrace = originalCaptureStackTrace;
  });
});
