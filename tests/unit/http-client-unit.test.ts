import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { OAuthService } from '@/auth/oauth';
import { HttpClient } from '@/client/http-client';
import type { RateLimiter } from '@/client/rate-limiter';
import type { AuthenticationContext, RequestOptions } from '@/types';
import {
  AuthenticationError,
  NetworkError,
  RateLimitError,
  ValidationError,
  XAdsError,
} from '@/types/errors';

describe('HttpClient Unit Tests', () => {
  let httpClient: HttpClient;
  let mockAuthService: OAuthService;
  let mockRateLimiter: RateLimiter;
  let mockContext: AuthenticationContext;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock dependencies
    mockAuthService = {
      signRequest: vi.fn(),
    } as unknown as OAuthService;

    mockRateLimiter = {
      wait: vi.fn().mockResolvedValue(undefined),
    } as unknown as RateLimiter;

    mockContext = {
      debug: false,
    } as AuthenticationContext;

    // Mock global fetch
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    httpClient = new HttpClient(mockAuthService, mockRateLimiter, mockContext, 30000);
  });

  describe('constructor', () => {
    it('should initialize with default timeout', () => {
      const client = new HttpClient(mockAuthService, mockRateLimiter, mockContext);
      expect(client).toBeDefined();
    });

    it('should initialize with custom timeout', () => {
      const client = new HttpClient(mockAuthService, mockRateLimiter, mockContext, 45000);
      expect(client).toBeDefined();
    });
  });

  describe('request method', () => {
    beforeEach(() => {
      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
        timeout: 30000,
      });
    });

    it('should make successful GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        text: vi.fn().mockResolvedValue('{"data": "test"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const options: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const result = await httpClient.request(options);

      expect(mockRateLimiter.wait).toHaveBeenCalled();
      expect(mockAuthService.signRequest).toHaveBeenCalledWith(options);
      expect(result).toEqual({ data: 'test' });
    });

    it('should handle request with query parameters', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"success": true}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
        params: { page: '1', limit: '10', nullParam: null, undefinedParam: undefined },
      });

      const options: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        params: { page: '1', limit: '10', nullParam: null, undefinedParam: undefined },
      };

      await httpClient.request(options);

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain('page=1');
      expect(calledUrl).toContain('limit=10');
      expect(calledUrl).not.toContain('nullParam');
      expect(calledUrl).not.toContain('undefinedParam');
    });

    it('should handle POST request with JSON data', async () => {
      const mockResponse = {
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"id": "123"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const postData = { name: 'Test', value: 42 };
      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'POST',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
        data: postData,
      });

      const options: RequestOptions = {
        method: 'POST',
        url: 'https://api.example.com/test',
        data: postData,
      };

      await httpClient.request(options);

      const requestInit = mockFetch.mock.calls[0][1] as RequestInit;
      expect(requestInit.method).toBe('POST');
      expect(requestInit.body).toBe(JSON.stringify(postData));
      expect((requestInit.headers as Record<string, string>)['Content-Type']).toBe(
        'application/json'
      );
    });

    it('should handle POST request with FormData', async () => {
      const mockResponse = {
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"id": "456"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('file', 'test-content');

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'POST',
        url: 'https://api.example.com/upload',
        headers: { Authorization: 'OAuth test' },
        data: formData,
      });

      const options: RequestOptions = {
        method: 'POST',
        url: 'https://api.example.com/upload',
        data: formData,
      };

      await httpClient.request(options);

      const requestInit = mockFetch.mock.calls[0][1] as RequestInit;
      expect(requestInit.method).toBe('POST');
      expect(requestInit.body).toBe(formData);
      expect((requestInit.headers as Record<string, string>)['Content-Type']).toBeUndefined();
    });

    it('should handle PUT request with data', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"updated": true}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const updateData = { name: 'Updated' };
      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'PUT',
        url: 'https://api.example.com/test/123',
        headers: { Authorization: 'OAuth test' },
        data: updateData,
      });

      const options: RequestOptions = {
        method: 'PUT',
        url: 'https://api.example.com/test/123',
        data: updateData,
      };

      await httpClient.request(options);

      const requestInit = mockFetch.mock.calls[0][1] as RequestInit;
      expect(requestInit.method).toBe('PUT');
      expect(requestInit.body).toBe(JSON.stringify(updateData));
    });

    it('should handle requests without data for GET/DELETE', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"success": true}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'DELETE',
        url: 'https://api.example.com/test/123',
        headers: { Authorization: 'OAuth test' },
      });

      const options: RequestOptions = {
        method: 'DELETE',
        url: 'https://api.example.com/test/123',
      };

      await httpClient.request(options);

      const requestInit = mockFetch.mock.calls[0][1] as RequestInit;
      expect(requestInit.body).toBeUndefined();
    });

    it('should use custom timeout when provided', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"data": "test"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
        timeout: 15000,
      });

      const options: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        timeout: 15000,
      };

      await httpClient.request(options);

      // Verify that AbortSignal.timeout was called (indirectly through the signal property)
      const requestInit = mockFetch.mock.calls[0][1] as RequestInit;
      expect(requestInit.signal).toBeDefined();
    });

    it('should handle empty response body', async () => {
      const mockResponse = {
        ok: true,
        status: 204,
        statusText: 'No Content',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(''),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await httpClient.request<null>({
        method: 'DELETE',
        url: 'https://api.example.com/test/123',
      });

      expect(result).toBeNull();
    });

    it('should handle non-JSON response', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('plain text response'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await httpClient.request({
        method: 'GET',
        url: 'https://api.example.com/text',
      });

      expect(result).toEqual({ raw: 'plain text response' });
    });
  });

  describe('debug mode', () => {
    beforeEach(() => {
      mockContext.debug = true;
      httpClient = new HttpClient(mockAuthService, mockRateLimiter, mockContext, 30000);

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'POST',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
        data: { test: 'data' },
      });
    });

    it('should log request and response in debug mode', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({ 'content-type': 'application/json' }),
        text: vi.fn().mockResolvedValue('{"success": true}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await httpClient.request({
        method: 'POST',
        url: 'https://api.example.com/test',
        data: { test: 'data' },
      });

      expect(consoleSpy).toHaveBeenCalledWith('X Ads SDK Request:', expect.any(Object));
      expect(consoleSpy).toHaveBeenCalledWith('X Ads SDK Response:', expect.any(Object));

      consoleSpy.mockRestore();
    });

    it('should log FormData correctly in debug mode', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const formData = new FormData();
      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'POST',
        url: 'https://api.example.com/upload',
        headers: { Authorization: 'OAuth test' },
        data: formData,
      });

      const mockResponse = {
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"id": "789"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await httpClient.request({
        method: 'POST',
        url: 'https://api.example.com/upload',
        data: formData,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'X Ads SDK Request:',
        expect.objectContaining({ body: '[FormData]' })
      );

      consoleSpy.mockRestore();
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
      });
    });

    it('should handle 401 authentication error', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"errors": [{"message": "Invalid credentials"}]}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error with Retry-After header', async () => {
      const mockResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers({ 'Retry-After': '120' }),
        text: vi.fn().mockResolvedValue('{"errors": [{"message": "Rate limit exceeded"}]}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(RateLimitError);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfter).toBe(120);
      }
    });

    it('should handle 429 rate limit error with X-Rate-Limit-Reset header', async () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 90;
      const mockResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers({ 'X-Rate-Limit-Reset': futureTimestamp.toString() }),
        text: vi.fn().mockResolvedValue('{"errors": [{"message": "Rate limit exceeded"}]}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfter).toBeCloseTo(90, 1);
      }
    });

    it('should handle 429 rate limit error with invalid headers', async () => {
      const mockResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers({ 'Retry-After': 'invalid' }),
        text: vi.fn().mockResolvedValue('{"errors": [{"message": "Rate limit exceeded"}]}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfter).toBe(60);
      }
    });

    it('should handle 429 rate limit error with past reset timestamp', async () => {
      const pastTimestamp = Math.floor(Date.now() / 1000) - 30;
      const mockResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers({ 'X-Rate-Limit-Reset': pastTimestamp.toString() }),
        text: vi.fn().mockResolvedValue('{"errors": [{"message": "Rate limit exceeded"}]}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfter).toBe(0);
      }
    });

    it('should handle 400 validation error with detailed errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            errors: [
              {
                code: 'INVALID_PARAMETER',
                message: 'Invalid budget amount',
                parameter: 'budget',
                details: 'Budget must be positive',
              },
            ],
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'POST', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).message).toBe('Invalid budget amount');
        expect((error as ValidationError).parameter).toBe('budget');
        expect((error as ValidationError).details).toBe('Budget must be positive');
      }
    });

    it('should handle 400 error without detailed errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"message": "General validation error"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        httpClient.request({ method: 'POST', url: 'https://api.example.com/test' })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle 404 client error', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"message": "Resource not found"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle 500 server error', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{"message": "Server error"}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(NetworkError);
    });

    it('should handle unknown HTTP status codes', async () => {
      const mockResponse = {
        ok: false,
        status: 418,
        statusText: "I'm a teapot",
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('{}'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(XAdsError);
    });

    it('should handle fetch network errors', async () => {
      mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(NetworkError);
    });

    it('should handle timeout errors', async () => {
      const abortError = new Error('Request timeout');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValue(abortError);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(NetworkError);
    });

    it('should handle unknown errors', async () => {
      mockFetch.mockRejectedValue(new Error('Unknown error'));

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(NetworkError);
    });

    it('should re-throw XAdsError instances', async () => {
      const customError = new ValidationError('Custom validation error', 'test');
      mockFetch.mockRejectedValue(customError);

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle non-Error objects', async () => {
      mockFetch.mockRejectedValue('String error');

      await expect(
        httpClient.request({ method: 'GET', url: 'https://api.example.com/test' })
      ).rejects.toThrow(NetworkError);
    });
  });

  describe('error message extraction', () => {
    beforeEach(() => {
      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
      });
    });

    it('should extract error message from errors array', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            errors: [{ message: 'Custom error message' }],
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect((error as AuthenticationError).details).toBe('Custom error message');
      }
    });

    it('should extract error message from message field', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            message: 'Direct error message',
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect((error as AuthenticationError).details).toBe('Direct error message');
      }
    });

    it('should extract error message from error field', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            error: 'Error field message',
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect((error as AuthenticationError).details).toBe('Error field message');
      }
    });

    it('should handle malformed error data', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            errors: [{ code: 'ERROR_CODE' }], // Missing message
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect((error as AuthenticationError).details).toBe('Unknown error');
      }
    });

    it('should handle non-object response data', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('null'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      try {
        await httpClient.request({ method: 'GET', url: 'https://api.example.com/test' });
      } catch (error) {
        expect((error as AuthenticationError).details).toBe('Unknown error');
      }
    });
  });

  describe('updateTimeout method', () => {
    it('should update timeout with valid value', () => {
      expect(() => httpClient.updateTimeout(45000)).not.toThrow();
    });

    it('should reject timeout of 0 or less', () => {
      expect(() => httpClient.updateTimeout(0)).toThrow(ValidationError);
      expect(() => httpClient.updateTimeout(-1000)).toThrow(ValidationError);
    });

    it('should reject timeout greater than 5 minutes', () => {
      expect(() => httpClient.updateTimeout(300001)).toThrow(ValidationError);
    });

    it('should accept maximum valid timeout', () => {
      expect(() => httpClient.updateTimeout(300000)).not.toThrow();
    });

    it('should accept minimum valid timeout', () => {
      expect(() => httpClient.updateTimeout(1)).not.toThrow();
    });
  });

  describe('updateContext method', () => {
    it('should update authentication context', () => {
      const newContext: AuthenticationContext = {
        credentials: {
          consumerKey: 'new-consumer-key',
          consumerSecret: 'new-consumer-secret',
          accessToken: 'new-access-token',
          accessTokenSecret: 'new-access-token-secret',
        },
        environment: 'production',
        baseUrl: 'https://ads-api.twitter.com/12',
        debug: true,
      };

      expect(() => httpClient.updateContext(newContext)).not.toThrow();
    });
  });

  describe('API error extraction', () => {
    it('should extract multiple API errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            errors: [
              { code: 'ERROR1', message: 'First error', parameter: 'param1' },
              { code: 'ERROR2', message: 'Second error', parameter: 'param2' },
            ],
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'POST',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
      });

      try {
        await httpClient.request({ method: 'POST', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).message).toBe('First error');
        expect((error as ValidationError).parameter).toBe('param1');
      }
    });

    it('should handle malformed API error objects', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        text: vi.fn().mockResolvedValue(
          JSON.stringify({
            errors: [
              'string error', // Not an object
              { malformed: 'object' }, // Missing required fields
            ],
          })
        ),
      };
      mockFetch.mockResolvedValue(mockResponse);

      vi.mocked(mockAuthService.signRequest).mockResolvedValue({
        method: 'POST',
        url: 'https://api.example.com/test',
        headers: { Authorization: 'OAuth test' },
      });

      try {
        await httpClient.request({ method: 'POST', url: 'https://api.example.com/test' });
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).message).toBe('Unknown error');
      }
    });
  });
});
