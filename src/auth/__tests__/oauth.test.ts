import { describe, expect, it } from 'vitest';
import { AuthenticationError } from '../../errors';
import type { AuthConfig } from '../../types/auth';
import { OAuth } from '../oauth';

describe('OAuth', () => {
  const validConfig = {
    consumer_key: 'test_consumer_key',
    consumer_secret: 'test_consumer_secret',
    access_token: 'test_access_token',
    access_token_secret: 'test_access_token_secret',
  };

  describe('constructor', () => {
    it('should create OAuth instance with valid config', () => {
      expect(() => new OAuth(validConfig)).not.toThrow();
    });

    it('should throw AuthenticationError when missing consumer_key', () => {
      const { consumer_key, ...config } = validConfig;
      void consumer_key;

      expect(() => new OAuth(config as AuthConfig)).toThrow(AuthenticationError);
      expect(() => new OAuth(config as AuthConfig)).toThrow(
        'Missing required OAuth parameters: consumer_key'
      );
    });

    it('should throw AuthenticationError when missing multiple parameters', () => {
      const config = {
        consumer_key: 'test',
        consumer_secret: '',
      };

      expect(() => new OAuth(config as AuthConfig)).toThrow(AuthenticationError);
      expect(() => new OAuth(config as AuthConfig)).toThrow('Missing required OAuth parameters');
    });
  });

  describe('generateNonce', () => {
    it('should generate a 32-character hex string', async () => {
      const oauth = new OAuth(validConfig);
      const nonce = await oauth.generateNonce();

      expect(nonce).toMatch(/^[a-f0-9]{32}$/);
    });

    it('should generate different nonces on each call', async () => {
      const oauth = new OAuth(validConfig);
      const nonce1 = await oauth.generateNonce();
      const nonce2 = await oauth.generateNonce();

      expect(nonce1).not.toBe(nonce2);
    });
  });

  describe('generateTimestamp', () => {
    it('should generate a numeric timestamp string', () => {
      const oauth = new OAuth(validConfig);
      const timestamp = oauth.generateTimestamp();

      expect(timestamp).toMatch(/^\d+$/);
    });

    it('should generate current timestamp within reasonable range', () => {
      const oauth = new OAuth(validConfig);
      const timestamp = parseInt(oauth.generateTimestamp(), 10);
      const now = Math.floor(Date.now() / 1000);

      expect(timestamp).toBeGreaterThanOrEqual(now - 1);
      expect(timestamp).toBeLessThanOrEqual(now + 1);
    });
  });

  describe('percentEncode', () => {
    it('should encode reserved characters correctly', () => {
      const oauth = new OAuth(validConfig);

      expect(oauth.percentEncode('hello world')).toBe('hello%20world');
      expect(oauth.percentEncode('test!value')).toBe('test%21value');
      expect(oauth.percentEncode('data(test)')).toBe('data%28test%29');
    });

    it('should not encode unreserved characters', () => {
      const oauth = new OAuth(validConfig);
      const unreserved = 'abcDEF123-._~';

      expect(oauth.percentEncode(unreserved)).toBe(unreserved);
    });
  });

  describe('generateSignature', () => {
    it('should generate consistent signature for same parameters', async () => {
      const oauth = new OAuth(validConfig);
      const params = {
        oauth_consumer_key: 'test',
        oauth_timestamp: '1234567890',
        oauth_nonce: 'testnonce',
      };

      const signature1 = await oauth.generateSignature(
        'GET',
        'https://api.example.com/test',
        params
      );
      const signature2 = await oauth.generateSignature(
        'GET',
        'https://api.example.com/test',
        params
      );

      expect(signature1).toBe(signature2);
    });

    it('should generate different signatures for different methods', async () => {
      const oauth = new OAuth(validConfig);
      const params = {
        oauth_consumer_key: 'test',
        oauth_timestamp: '1234567890',
        oauth_nonce: 'testnonce',
      };

      const getSignature = await oauth.generateSignature(
        'GET',
        'https://api.example.com/test',
        params
      );
      const postSignature = await oauth.generateSignature(
        'POST',
        'https://api.example.com/test',
        params
      );

      expect(getSignature).not.toBe(postSignature);
    });
  });

  describe('signRequest', () => {
    it('should add Authorization header to request', async () => {
      const oauth = new OAuth(validConfig);
      const requestOptions = {
        method: 'GET' as const,
        url: 'https://api.example.com/test',
        headers: {},
      };

      const signedRequest = await oauth.signRequest(requestOptions);

      expect(signedRequest.headers).toHaveProperty('Authorization');
      expect(signedRequest.headers?.Authorization).toMatch(/^OAuth /);
    });

    it('should preserve existing headers', async () => {
      const oauth = new OAuth(validConfig);
      const requestOptions = {
        method: 'GET' as const,
        url: 'https://api.example.com/test',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'test-agent',
        },
      };

      const signedRequest = await oauth.signRequest(requestOptions);

      expect(signedRequest.headers?.['Content-Type']).toBe('application/json');
      expect(signedRequest.headers?.['User-Agent']).toBe('test-agent');
      expect(signedRequest.headers).toHaveProperty('Authorization');
    });

    it('should include all required OAuth parameters in Authorization header', async () => {
      const oauth = new OAuth(validConfig);
      const requestOptions = {
        method: 'GET' as const,
        url: 'https://api.example.com/test',
        headers: {},
      };

      const signedRequest = await oauth.signRequest(requestOptions);
      const authHeader = signedRequest.headers?.Authorization;

      expect(authHeader).toMatch(/oauth_consumer_key="[^"]+"/);
      expect(authHeader).toMatch(/oauth_nonce="[^"]+"/);
      expect(authHeader).toMatch(/oauth_signature="[^"]+"/);
      expect(authHeader).toMatch(/oauth_signature_method="HMAC-SHA1"/);
      expect(authHeader).toMatch(/oauth_timestamp="[^"]+"/);
      expect(authHeader).toMatch(/oauth_token="[^"]+"/);
      expect(authHeader).toMatch(/oauth_version="1.0"/);
    });
  });
});
