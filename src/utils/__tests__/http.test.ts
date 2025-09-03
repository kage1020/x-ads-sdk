import { describe, expect, it } from 'vitest';
import { buildURL, extractEndpointFromUrl, headersToRecord } from '../http.js';

describe('HTTP utilities', () => {
  describe('headersToRecord', () => {
    it('should convert Headers to plain record', () => {
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('X-Custom-Header', 'custom-value');
      headers.set('Authorization', 'Bearer token');

      const record = headersToRecord(headers);

      expect(record).toEqual({
        'content-type': 'application/json',
        'x-custom-header': 'custom-value',
        authorization: 'Bearer token',
      });
    });

    it('should handle empty headers', () => {
      const headers = new Headers();
      const record = headersToRecord(headers);

      expect(record).toEqual({});
    });

    it('should convert header keys to lowercase', () => {
      const headers = new Headers();
      headers.set('CONTENT-TYPE', 'application/json');
      headers.set('X-CUSTOM-HEADER', 'custom-value');

      const record = headersToRecord(headers);

      expect(record).toEqual({
        'content-type': 'application/json',
        'x-custom-header': 'custom-value',
      });
    });

    it('should handle duplicate header values', () => {
      const headers = new Headers();
      headers.append('Set-Cookie', 'cookie1=value1');
      headers.append('Set-Cookie', 'cookie2=value2');

      const record = headersToRecord(headers);

      // Note: Headers.forEach only gives the last value for duplicate keys
      expect(record['set-cookie']).toBeDefined();
    });
  });

  describe('buildURL', () => {
    it('should build URL without parameters', () => {
      const url = buildURL('https://api.example.com', '/users');
      expect(url).toBe('https://api.example.com/users');
    });

    it('should build URL with parameters', () => {
      const params = {
        page: 1,
        limit: 10,
        status: 'active',
      };
      const url = buildURL('https://api.example.com', '/users', params);
      expect(url).toBe('https://api.example.com/users?page=1&limit=10&status=active');
    });

    it('should handle undefined parameters', () => {
      const params = {
        page: 1,
        limit: undefined,
        status: 'active',
      };
      const url = buildURL('https://api.example.com', '/users', params);
      expect(url).toBe('https://api.example.com/users?page=1&status=active');
    });

    it('should handle null parameters', () => {
      const params = {
        page: 1,
        limit: null,
        status: 'active',
      };
      const url = buildURL('https://api.example.com', '/users', params);
      expect(url).toBe('https://api.example.com/users?page=1&status=active');
    });

    it('should handle boolean parameters', () => {
      const params = {
        active: true,
        deleted: false,
      };
      const url = buildURL('https://api.example.com', '/users', params);
      expect(url).toBe('https://api.example.com/users?active=true&deleted=false');
    });

    it('should handle number parameters', () => {
      const params = {
        count: 0,
        page: 1,
        ratio: 1.5,
      };
      const url = buildURL('https://api.example.com', '/users', params);
      expect(url).toBe('https://api.example.com/users?count=0&page=1&ratio=1.5');
    });

    it('should handle special characters in parameters', () => {
      const params = {
        query: 'hello world',
        filter: 'status=active&type=user',
      };
      const url = buildURL('https://api.example.com', '/users', params);
      // URL encodes spaces as + by default through URLSearchParams
      expect(url).toContain('query=hello+world');
      expect(url).toContain('filter=status%3Dactive%26type%3Duser');
    });

    it('should handle empty parameters object', () => {
      const url = buildURL('https://api.example.com', '/users', {});
      expect(url).toBe('https://api.example.com/users');
    });

    it('should handle endpoint starting with slash', () => {
      const url = buildURL('https://api.example.com', '/users');
      expect(url).toBe('https://api.example.com/users');
    });

    it('should handle endpoint not starting with slash', () => {
      const url = buildURL('https://api.example.com/', 'users');
      expect(url).toBe('https://api.example.com/users');
    });

    it('should handle baseUrl ending with slash', () => {
      const url = buildURL('https://api.example.com/', '/users');
      // URL constructor handles double slashes
      expect(url).toBe('https://api.example.com//users');
    });
  });

  describe('extractEndpointFromUrl', () => {
    it('should extract endpoint from URL without base path', () => {
      const fullUrl = 'https://api.example.com/12/accounts/123/campaigns';
      const endpoint = extractEndpointFromUrl(fullUrl);
      expect(endpoint).toBe('/12/accounts/123/campaigns');
    });

    it('should extract endpoint from URL with base path', () => {
      const fullUrl = 'https://api.example.com/12/accounts/123/campaigns';
      const endpoint = extractEndpointFromUrl(fullUrl, '/12');
      expect(endpoint).toBe('/accounts/123/campaigns');
    });

    it('should handle URL with query parameters', () => {
      const fullUrl = 'https://api.example.com/12/accounts/123/campaigns?page=1&limit=10';
      const endpoint = extractEndpointFromUrl(fullUrl, '/12');
      expect(endpoint).toBe('/accounts/123/campaigns');
    });

    it('should handle URL with fragment', () => {
      const fullUrl = 'https://api.example.com/12/accounts/123/campaigns#section1';
      const endpoint = extractEndpointFromUrl(fullUrl, '/12');
      expect(endpoint).toBe('/accounts/123/campaigns');
    });

    it('should handle empty base path', () => {
      const fullUrl = 'https://api.example.com/12/accounts/123/campaigns';
      const endpoint = extractEndpointFromUrl(fullUrl, '');
      expect(endpoint).toBe('/12/accounts/123/campaigns');
    });

    it('should handle root path', () => {
      const fullUrl = 'https://api.example.com/';
      const endpoint = extractEndpointFromUrl(fullUrl);
      expect(endpoint).toBe('/');
    });

    it('should handle invalid URL gracefully', () => {
      const invalidUrl = 'not-a-valid-url';
      const endpoint = extractEndpointFromUrl(invalidUrl);
      expect(endpoint).toBe('not-a-valid-url');
    });

    it('should handle relative URL gracefully', () => {
      const relativeUrl = '/12/accounts/123/campaigns';
      const endpoint = extractEndpointFromUrl(relativeUrl);
      expect(endpoint).toBe('/12/accounts/123/campaigns');
    });

    it('should handle malformed URL gracefully', () => {
      const malformedUrl = 'http://[invalid';
      const endpoint = extractEndpointFromUrl(malformedUrl);
      expect(endpoint).toBe('http://[invalid');
    });

    it('should handle URL with port number', () => {
      const fullUrl = 'https://api.example.com:8080/12/accounts/123/campaigns';
      const endpoint = extractEndpointFromUrl(fullUrl, '/12');
      expect(endpoint).toBe('/accounts/123/campaigns');
    });

    it('should handle complex base path', () => {
      const fullUrl = 'https://api.example.com/v1/api/12/accounts/123/campaigns';
      const endpoint = extractEndpointFromUrl(fullUrl, '/v1/api/12');
      expect(endpoint).toBe('/accounts/123/campaigns');
    });
  });
});
