import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { APIError, AuthenticationError, NetworkError, TimeoutError } from '../../errors/index.js';
import { Environment } from '../../types/common.js';
import { APIVersion } from '../../types/index.js';
import { HttpClient } from '../base.js';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('HttpClient', () => {
  const testConfig = {
    auth: {
      consumerKey: 'test_consumer_key',
      consumerSecret: 'test_consumer_secret',
      accessToken: 'test_access_token',
      accessTokenSecret: 'test_access_token_secret',
    },
  };

  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient(testConfig);
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create HttpClient with default sandbox environment', () => {
      expect(client).toBeInstanceOf(HttpClient);
    });

    it('should use production URL when environment is production', () => {
      const prodClient = new HttpClient({
        ...testConfig,
        environment: Environment.PRODUCTION,
      });
      expect(prodClient).toBeInstanceOf(HttpClient);
    });

    it('should use custom baseURL when provided', () => {
      const customClient = new HttpClient({
        ...testConfig,
        baseURL: 'https://custom.api.com',
      });
      expect(customClient).toBeInstanceOf(HttpClient);
    });
  });

  describe('request', () => {
    it('should make successful GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: expect.stringMatching(/^OAuth /),
          }),
        })
      );
      expect(result).toEqual({ data: 'test' });
    });

    it('should make successful POST request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockResolvedValue({ data: 'created' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const body = { name: 'test' };
      const result = await client.post('/test', body);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: expect.stringMatching(/^OAuth /),
          }),
        })
      );
      expect(result).toEqual({ data: 'created' });
    });

    it('should handle 401 authentication error', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        headers: new Headers(),
        json: vi.fn().mockResolvedValue({
          errors: [{ message: 'Unauthorized' }],
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(client.get('/test')).rejects.toThrow(AuthenticationError);
    });

    it('should handle rate limiting configuration', () => {
      const rateLimitClient = new HttpClient({
        ...testConfig,
        rateLimitOptions: { strategy: 'throw', defaultLimit: 100 },
      });

      expect(rateLimitClient).toBeInstanceOf(HttpClient);
    });

    it('should handle general API error', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        headers: new Headers(),
        json: vi.fn().mockResolvedValue({
          errors: [{ message: 'Bad Request', code: 'INVALID_PARAM' }],
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(client.get('/test')).rejects.toThrow(APIError);
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        ok: true,
        status: 204,
        headers: new Headers(),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');
      expect(result).toEqual({});
    });

    it('should handle network timeout', async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => {
              const error = new Error('Request timeout');
              error.name = 'AbortError';
              reject(error);
            }, 100);
          })
      );

      const shortTimeoutClient = new HttpClient({
        ...testConfig,
        timeout: 50,
      });

      await expect(shortTimeoutClient.get('/test')).rejects.toThrow(TimeoutError);
    });

    it('should include query parameters for GET requests', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await client.get('/test', { param1: 'value1', param2: 'value2' });

      const fetchCall = mockFetch.mock.calls[0];
      const url = new URL(fetchCall[0]);
      expect(url.searchParams.get('param1')).toBe('value1');
      expect(url.searchParams.get('param2')).toBe('value2');
    });

    it('should not include undefined or null parameters', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await client.get('/test', { param1: 'value1', param2: undefined, param3: null });

      const fetchCall = mockFetch.mock.calls[0];
      const url = new URL(fetchCall[0]);
      expect(url.searchParams.get('param1')).toBe('value1');
      expect(url.searchParams.has('param2')).toBe(false);
      expect(url.searchParams.has('param3')).toBe(false);
    });

    it('should handle network errors', async () => {
      const networkError = new TypeError('Failed to fetch');
      networkError.message = 'fetch failed';
      mockFetch.mockRejectedValue(networkError);

      await expect(client.get('/test')).rejects.toThrow(NetworkError);
    });

    it('should handle 429 rate limit error with dynamic import', async () => {
      // Mock retry behavior to avoid long waits
      const rateLimitClient = new HttpClient({
        ...testConfig,
        retryOptions: { maxRetries: 0 }, // Disable retries for this test
      });

      const mockResponse = {
        ok: false,
        status: 429,
        url: 'https://ads-api-sandbox.x.com/12/test',
        headers: new Headers({
          'x-rate-limit-reset': '1640995200',
        }),
        json: vi.fn().mockResolvedValue({
          errors: [{ message: 'Rate limit exceeded' }],
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      // The actual error message will be 'Rate limit exceeded' after processing
      await expect(rateLimitClient.get('/test')).rejects.toThrow();
    });

    it('should handle text responses when content-type is not json', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'text/plain',
        }),
        text: vi.fn().mockResolvedValue('plain text response'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');
      expect(result).toBe('plain text response');
    });

    it('should handle empty content-type header', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers(),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');
      expect(result).toEqual({});
    });

    it('should handle error parsing failure gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        url: 'https://ads-api-sandbox.x.com/12/test',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockRejectedValue(new Error('Failed to parse JSON')),
        text: vi.fn().mockRejectedValue(new Error('Failed to parse text')),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(client.get('/test')).rejects.toThrow(APIError);
    });

    it('should handle non-json error response', async () => {
      // Mock retry behavior to avoid long waits
      const errorClient = new HttpClient({
        ...testConfig,
        retryOptions: { maxRetries: 0 }, // Disable retries for this test
      });

      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        url: 'https://ads-api-sandbox.x.com/12/test',
        headers: new Headers({
          'content-type': 'text/plain',
        }),
        text: vi.fn().mockResolvedValue('Internal Server Error'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      // The error message will be from statusText when text parsing fails or from the parsed text
      await expect(errorClient.get('/test')).rejects.toThrow();
    });

    it('should handle POST request with string body', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockResolvedValue({ data: 'created' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const stringBody = 'raw string data';
      const result = await client.post('/test', stringBody);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: 'raw string data',
        })
      );
      expect(result).toEqual({ data: 'created' });
    });

    it('should handle API version headers processing', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
          'x-api-version': '11.0',
          'x-api-version-deprecated': 'true',
          'x-api-version-latest': '12.0',
        }),
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');
      expect(result).toEqual({ data: 'test' });

      // Verify that version processing happens by checking the version manager state
      const versionManager = client.getVersionManager();
      expect(versionManager).toBeDefined();
    });

    it('should handle plugin error recovery', async () => {
      // First mock the initial request to fail
      mockFetch.mockRejectedValueOnce(new Error('Initial error'));

      // Mock plugin error handling to return a successful response
      const mockPluginResponse = {
        data: { recovered: true },
        status: 200,
        statusText: 'OK',
        headers: {},
      };
      vi.spyOn(client.getPluginManager(), 'executeOnError').mockResolvedValueOnce(
        mockPluginResponse
      );

      const result = await client.get('/test');
      expect(result).toEqual({ recovered: true });
    });

    it('should handle plugin error handling failure', async () => {
      const originalError = new Error('Original request failed');
      mockFetch.mockRejectedValueOnce(originalError);

      // Mock plugin error handling to also fail
      vi.spyOn(client.getPluginManager(), 'executeOnError').mockRejectedValueOnce(
        new Error('Plugin error handling failed')
      );

      await expect(client.get('/test')).rejects.toThrow('Original request failed');
    });
  });

  describe('API Version methods', () => {
    it('should get current API version', () => {
      const version = client.getAPIVersion();
      expect(version).toBeDefined();
    });

    it('should set API version', () => {
      expect(() => {
        client.setAPIVersion(APIVersion.V12);
      }).not.toThrow();
    });

    it('should get version manager', () => {
      const versionManager = client.getVersionManager();
      expect(versionManager).toBeDefined();
    });

    it('should get version info', () => {
      const versionInfo = client.getVersionInfo();
      expect(versionInfo).toBeDefined();
    });

    it('should check if version is deprecated', () => {
      const isDeprecated = client.isVersionDeprecated();
      expect(typeof isDeprecated).toBe('boolean');
    });
  });

  describe('convenience methods', () => {
    beforeEach(() => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: vi.fn().mockResolvedValue({ success: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);
    });

    it('should make PUT request', async () => {
      const body = { name: 'updated' };
      const result = await client.put('/test', body);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual({ success: true });
    });

    it('should make DELETE request', async () => {
      const result = await client.delete('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual({ success: true });
    });

    it('should include custom headers in requests', async () => {
      const headers = { 'X-Custom-Header': 'custom-value' };
      await client.get('/test', undefined, headers);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'custom-value',
          }),
        })
      );
    });
  });

  describe('configuration options', () => {
    it('should handle custom timeout configuration', () => {
      const customClient = new HttpClient({
        ...testConfig,
        timeout: 60000,
      });
      expect(customClient).toBeInstanceOf(HttpClient);
    });

    it('should handle retry options configuration', () => {
      const retryClient = new HttpClient({
        ...testConfig,
        retryOptions: { maxRetries: 5, initialDelay: 2000 },
      });
      expect(retryClient).toBeInstanceOf(HttpClient);
    });

    it('should handle API version configuration', () => {
      const versionClient = new HttpClient({
        ...testConfig,
        apiVersion: APIVersion.V12,
        autoUpgradeVersion: true,
      });
      expect(versionClient).toBeInstanceOf(HttpClient);
    });
  });

  describe('API version warnings', () => {
    it('should log warnings when API version warnings are present', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Mock the version manager to return warnings
      const versionManagerSpy = vi
        .spyOn(client.getVersionManager(), 'parseResponseHeaders')
        .mockReturnValue({
          currentVersion: APIVersion.V11,
          warnings: ['API version v11 is deprecated'],
          isVersionSupported: true,
          recommendedAction: 'upgrade',
        });

      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Map([['content-type', 'application/json']]) as unknown as Headers,
        json: () => Promise.resolve({ data: 'test' }),
      };

      mockFetch.mockResolvedValue(mockResponse);

      await client.get('/test');

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[X Ads SDK] API Version Warnings:',
        expect.any(Array)
      );

      consoleWarnSpy.mockRestore();
      versionManagerSpy.mockRestore();
    });

    it('should not log warnings when no API version warnings are present', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Mock the version manager to return no warnings
      const versionManagerSpy = vi
        .spyOn(client.getVersionManager(), 'parseResponseHeaders')
        .mockReturnValue({
          currentVersion: APIVersion.V12,
          warnings: [],
          isVersionSupported: true,
          recommendedAction: 'none',
        });

      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Map([['content-type', 'application/json']]) as unknown as Headers,
        json: () => Promise.resolve({ data: 'test' }),
      };

      mockFetch.mockResolvedValue(mockResponse);

      await client.get('/test');

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
      versionManagerSpy.mockRestore();
    });
  });

  describe('error response handling', () => {
    it('should handle error response with JSON content', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Map([['content-type', 'application/json']]) as unknown as Headers,
        json: () => Promise.resolve({ error: 'Invalid request', code: 400 }),
      };

      mockFetch.mockResolvedValue(mockErrorResponse);

      await expect(client.get('/test')).rejects.toThrow();
    });

    it('should handle error response with text content', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Map([['content-type', 'text/plain']]) as unknown as Headers,
        text: () => Promise.resolve('Internal server error occurred'),
      };

      mockFetch.mockResolvedValue(mockErrorResponse);

      await expect(client.get('/test')).rejects.toThrow();
    });

    it('should handle error response without content-type', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Map() as unknown as Headers,
        text: () => Promise.resolve('Not found'),
      };

      mockFetch.mockResolvedValue(mockErrorResponse);

      await expect(client.get('/test')).rejects.toThrow();
    });
  });

  describe('response content handling', () => {
    it('should handle 204 No Content response', async () => {
      const mockResponse = {
        ok: true,
        status: 204,
        headers: new Map() as unknown as Headers,
      };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.delete('/test');
      expect(result).toEqual({});
    });

    it('should handle response without content-type', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Map() as unknown as Headers,
      };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');
      expect(result).toEqual({});
    });

    it('should handle non-JSON response', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Map([['content-type', 'text/plain']]) as unknown as Headers,
        text: () => Promise.resolve('plain text response'),
      };

      mockFetch.mockResolvedValue(mockResponse);

      const result = await client.get('/test');
      expect(result).toBe('plain text response');
    });
  });
});
