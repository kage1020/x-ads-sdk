import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OAuthService } from '@/auth/oauth';
import type { OAuthCredentials, RequestOptions } from '@/types';

describe('OAuth Service Unit Tests', () => {
  let oauthService: OAuthService;
  let validCredentials: OAuthCredentials;

  beforeEach(() => {
    validCredentials = {
      consumerKey: 'test-consumer-key',
      consumerSecret: 'test-consumer-secret',
      accessToken: 'test-access-token',
      accessTokenSecret: 'test-access-token-secret',
    };

    oauthService = new OAuthService(validCredentials);
  });

  describe('constructor and initialization', () => {
    it('should initialize with valid credentials', () => {
      expect(oauthService).toBeDefined();
    });
  });

  describe('validateCredentials', () => {
    it('should pass validation with all valid credentials', () => {
      expect(() => oauthService.validateCredentials()).not.toThrow();
    });

    it('should throw error when consumer key is missing', () => {
      const invalidCredentials = { ...validCredentials, consumerKey: '' };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Consumer key is required');
    });

    it('should throw error when consumer secret is missing', () => {
      const invalidCredentials = { ...validCredentials, consumerSecret: '' };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Consumer secret is required');
    });

    it('should throw error when access token is missing', () => {
      const invalidCredentials = { ...validCredentials, accessToken: '' };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Access token is required');
    });

    it('should throw error when access token secret is missing', () => {
      const invalidCredentials = { ...validCredentials, accessTokenSecret: '' };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Access token secret is required');
    });

    it('should throw error with invalid token format containing special characters', () => {
      const invalidCredentials = {
        ...validCredentials,
        accessToken: 'invalid@token.with#special$chars',
      };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Invalid token format');
    });

    it('should pass validation with valid token format containing allowed characters', () => {
      const validTokenCredentials = {
        ...validCredentials,
        accessToken: 'valid-token_with123allowed-characters',
      };
      const service = new OAuthService(validTokenCredentials);

      expect(() => service.validateCredentials()).not.toThrow();
    });

    it('should throw error with token containing spaces', () => {
      const invalidCredentials = {
        ...validCredentials,
        accessToken: 'token with spaces',
      };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Invalid token format');
    });

    it('should throw error with token containing dots', () => {
      const invalidCredentials = {
        ...validCredentials,
        accessToken: 'token.with.dots',
      };
      const service = new OAuthService(invalidCredentials);

      expect(() => service.validateCredentials()).toThrow('Invalid token format');
    });
  });

  describe('updateCredentials', () => {
    it('should update credentials successfully', () => {
      const newCredentials: OAuthCredentials = {
        consumerKey: 'new-consumer-key',
        consumerSecret: 'new-consumer-secret',
        accessToken: 'new-access-token',
        accessTokenSecret: 'new-access-token-secret',
      };

      expect(() => oauthService.updateCredentials(newCredentials)).not.toThrow();

      // Verify credentials were updated by testing validation with new format
      const invalidFormatCredentials = {
        ...newCredentials,
        accessToken: 'invalid@format',
      };
      oauthService.updateCredentials(invalidFormatCredentials);
      expect(() => oauthService.validateCredentials()).toThrow('Invalid token format');
    });

    it('should allow updating to credentials with different format requirements', () => {
      const newCredentials: OAuthCredentials = {
        consumerKey: 'updated-key',
        consumerSecret: 'updated-secret',
        accessToken: 'updated_token-123',
        accessTokenSecret: 'updated-secret',
      };

      oauthService.updateCredentials(newCredentials);
      expect(() => oauthService.validateCredentials()).not.toThrow();
    });
  });

  describe('signRequest', () => {
    it('should add Authorization header to request options', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const signedRequest = await oauthService.signRequest(requestOptions);

      expect(signedRequest.headers).toHaveProperty('Authorization');
      expect(signedRequest.headers?.Authorization).toMatch(/^OAuth /);
      expect(signedRequest.headers?.['Content-Type']).toBe('application/json');
    });

    it('should preserve existing headers when signing', async () => {
      const requestOptions: RequestOptions = {
        method: 'POST',
        url: 'https://api.example.com/test',
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value',
        },
      };

      const signedRequest = await oauthService.signRequest(requestOptions);

      expect(signedRequest.headers?.['Content-Type']).toBe('application/json');
      expect(signedRequest.headers?.['X-Custom-Header']).toBe('custom-value');
      expect(signedRequest.headers).toHaveProperty('Authorization');
    });

    it('should work with requests without existing headers', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const signedRequest = await oauthService.signRequest(requestOptions);

      expect(signedRequest.headers).toHaveProperty('Authorization');
      expect(signedRequest.headers?.Authorization).toMatch(/^OAuth /);
    });
  });

  describe('getAuthorizationHeader', () => {
    it('should generate OAuth authorization header with all required parameters', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);

      expect(authHeader).toMatch(/^OAuth /);
      expect(authHeader).toContain('oauth_consumer_key="test-consumer-key"');
      expect(authHeader).toContain('oauth_signature_method="HMAC-SHA1"');
      expect(authHeader).toContain('oauth_token="test-access-token"');
      expect(authHeader).toContain('oauth_version="1.0"');
      expect(authHeader).toContain('oauth_timestamp=');
      expect(authHeader).toContain('oauth_nonce=');
      expect(authHeader).toContain('oauth_signature=');
    });

    it('should include query parameters in signature generation', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        params: {
          count: '10',
          type: 'recent',
        },
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);

      expect(authHeader).toMatch(/^OAuth /);
      expect(authHeader).toContain('oauth_signature=');
    });

    it('should handle requests with null and undefined parameters', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        params: {
          validParam: 'value',
          nullParam: null,
          undefinedParam: undefined,
        },
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);

      expect(authHeader).toMatch(/^OAuth /);
      expect(authHeader).toContain('oauth_signature=');
    });

    it('should generate different nonces for consecutive calls', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const authHeader1 = await oauthService.getAuthorizationHeader(requestOptions);
      const authHeader2 = await oauthService.getAuthorizationHeader(requestOptions);

      const nonce1 = authHeader1.match(/oauth_nonce="([^"]+)"/)?.[1];
      const nonce2 = authHeader2.match(/oauth_nonce="([^"]+)"/)?.[1];

      expect(nonce1).toBeDefined();
      expect(nonce2).toBeDefined();
      expect(nonce1).not.toBe(nonce2);
    });

    it('should handle URLs with existing query parameters', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test?existing=param',
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);

      expect(authHeader).toMatch(/^OAuth /);
      expect(authHeader).toContain('oauth_signature=');
    });
  });

  describe('special character encoding', () => {
    it('should properly encode special characters in parameters', async () => {
      const requestOptions: RequestOptions = {
        method: 'POST',
        url: 'https://api.example.com/test',
        params: {
          message: 'Hello & welcome! (test)',
          special: "It's working",
        },
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);

      expect(authHeader).toMatch(/^OAuth /);
      expect(authHeader).toContain('oauth_signature=');
    });

    it('should handle credentials with special characters', async () => {
      const specialCredentials: OAuthCredentials = {
        consumerKey: 'key-with_special123',
        consumerSecret: 'secret&with%special!chars',
        accessToken: 'token123-test_valid',
        accessTokenSecret: 'secret&with%special!chars',
      };

      const service = new OAuthService(specialCredentials);
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const authHeader = await service.getAuthorizationHeader(requestOptions);

      expect(authHeader).toMatch(/^OAuth /);
      expect(authHeader).toContain('oauth_consumer_key="key-with_special123"');
    });
  });

  describe('error handling', () => {
    it('should handle crypto API errors gracefully', async () => {
      // Mock crypto.subtle.importKey to throw an error
      const originalImportKey = crypto.subtle.importKey;
      const mockImportKey = vi.fn().mockRejectedValue(new Error('Crypto error'));

      // Use defineProperty to override the read-only property
      Object.defineProperty(crypto.subtle, 'importKey', {
        value: mockImportKey,
        writable: true,
        configurable: true,
      });

      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      await expect(oauthService.getAuthorizationHeader(requestOptions)).rejects.toThrow(
        'Crypto error'
      );

      // Restore original method
      Object.defineProperty(crypto.subtle, 'importKey', {
        value: originalImportKey,
        writable: true,
        configurable: true,
      });
    });

    it('should handle malformed URLs', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'not-a-valid-url',
      };

      // Should not throw, just process the string as-is
      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);
      expect(authHeader).toMatch(/^OAuth /);
    });
  });

  describe('timestamp and nonce generation', () => {
    it('should generate timestamps within reasonable range', async () => {
      const beforeTime = Math.floor(Date.now() / 1000);

      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);
      const timestampMatch = authHeader.match(/oauth_timestamp="(\d+)"/);

      expect(timestampMatch).toBeTruthy();
      const timestamp = parseInt(timestampMatch?.[1] || '0', 10);
      const afterTime = Math.floor(Date.now() / 1000);

      expect(timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(timestamp).toBeLessThanOrEqual(afterTime + 1); // Allow 1 second tolerance
    });

    it('should generate 64-character hex nonces', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);
      const nonceMatch = authHeader.match(/oauth_nonce="([^"]+)"/);

      expect(nonceMatch).toBeTruthy();
      const nonce = nonceMatch?.[1] || '';

      expect(nonce).toHaveLength(64);
      expect(nonce).toMatch(/^[0-9a-f]+$/);
    });
  });

  describe('integration edge cases', () => {
    it('should work with different HTTP methods', async () => {
      const methods = ['GET', 'POST', 'PUT', 'DELETE'] as const;

      for (const method of methods) {
        const requestOptions: RequestOptions = {
          method,
          url: 'https://api.example.com/test',
        };

        const authHeader = await oauthService.getAuthorizationHeader(requestOptions);
        expect(authHeader).toMatch(/^OAuth /);
      }
    });

    it('should handle empty parameter values', async () => {
      const requestOptions: RequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        params: {
          emptyString: '',
          zeroNumber: 0,
          falseBool: false,
        },
      };

      const authHeader = await oauthService.getAuthorizationHeader(requestOptions);
      expect(authHeader).toMatch(/^OAuth /);
    });
  });
});
