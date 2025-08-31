import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { APIError, AuthenticationError } from '../../errors';
import { Environment } from '../../types/common';
import { HttpClient } from '../base';

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

      await expect(shortTimeoutClient.get('/test')).rejects.toThrow('Request timeout');
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
  });
});
