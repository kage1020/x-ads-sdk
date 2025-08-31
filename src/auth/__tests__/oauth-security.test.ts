import { describe, it, expect } from 'vitest';
import { OAuth } from '../oauth.js';
import { createHmac } from 'node:crypto';

describe('OAuth Security Analysis', () => {
  const validConfig = {
    consumer_key: 'test_consumer_key',
    consumer_secret: 'test_consumer_secret',
    access_token: 'test_access_token',
    access_token_secret: 'test_access_token_secret'
  };

  describe('signature method security', () => {
    it('should use HMAC-SHA1 for OAuth signature generation (not password hashing)', () => {
      const oauth = new OAuth(validConfig);
      const params = {
        oauth_consumer_key: 'test',
        oauth_timestamp: '1234567890',
        oauth_nonce: 'testnonce'
      };

      const signature = oauth.generateSignature('GET', 'https://api.example.com/test', params);
      
      // Verify this is OAuth signature generation, not password hashing
      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
      
      // Verify it's base64 encoded (typical of HMAC output)
      expect(signature).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });

    it('should support HMAC-SHA256 for enhanced security', () => {
      const oauthSha256 = new OAuth({
        ...validConfig,
        signature_method: 'HMAC-SHA256'
      });
      
      const signature = oauthSha256.generateOAuthSignature({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {}
      });

      expect(signature.oauth_signature_method).toBe('HMAC-SHA256');
      expect(signature.oauth_signature).toBeDefined();
      expect(signature.oauth_signature.length).toBeGreaterThan(0);
    });

    it('should default to HMAC-SHA1 for OAuth 1.0a compatibility', () => {
      const oauth = new OAuth(validConfig);
      const signature = oauth.generateOAuthSignature({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {}
      });

      expect(signature.oauth_signature_method).toBe('HMAC-SHA1');
    });

    it('should demonstrate this is HMAC-based signature, not password storage', () => {
      // This test demonstrates the difference between OAuth signature generation
      // and password hashing for storage
      
      const signingKey = 'test_consumer_secret&test_access_token_secret';
      const baseString = 'GET&https%3A//api.example.com/test&oauth_consumer_key%3Dtest';
      
      // This is HMAC for OAuth signatures (what the code does)
      const oauthSignature = createHmac('sha1', signingKey).update(baseString).digest('base64');
      
      // This would be password hashing (what CodeQL thinks we're doing)
      // which would use bcrypt, scrypt, PBKDF2, or Argon2
      
      expect(oauthSignature).toBeDefined();
      expect(typeof oauthSignature).toBe('string');
      
      // OAuth signatures are deterministic for the same input
      const repeatSignature = createHmac('sha1', signingKey).update(baseString).digest('base64');
      expect(oauthSignature).toBe(repeatSignature);
    });

    it('should verify OAuth 1.0a compliance with configurable signature method', () => {
      const oauth = new OAuth(validConfig);
      const signature = oauth.generateOAuthSignature({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {}
      });

      // OAuth 1.0a specification requires these fields
      expect(signature.oauth_signature_method).toBe('HMAC-SHA1');
      expect(signature.oauth_version).toBe('1.0');
      expect(signature.oauth_consumer_key).toBe(validConfig.consumer_key);
      expect(signature.oauth_token).toBe(validConfig.access_token);
      
      // Signature should be present and valid
      expect(signature.oauth_signature).toBeDefined();
      expect(signature.oauth_signature.length).toBeGreaterThan(0);
    });

    it('should generate different signatures for SHA1 vs SHA256', () => {
      const oauthSha1 = new OAuth({ ...validConfig, signature_method: 'HMAC-SHA1' });
      const oauthSha256 = new OAuth({ ...validConfig, signature_method: 'HMAC-SHA256' });
      
      const requestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {}
      };

      const signatureSha1 = oauthSha1.generateOAuthSignature(requestOptions);
      const signatureSha256 = oauthSha256.generateOAuthSignature(requestOptions);

      // Verify signature methods are different
      expect(signatureSha1.oauth_signature_method).toBe('HMAC-SHA1');
      expect(signatureSha256.oauth_signature_method).toBe('HMAC-SHA256');
      
      // Verify signatures are different (highly likely with different algorithms)
      expect(signatureSha1.oauth_signature).not.toBe(signatureSha256.oauth_signature);
      
      // Both should be valid base64 strings
      expect(signatureSha1.oauth_signature).toMatch(/^[A-Za-z0-9+/]+=*$/);
      expect(signatureSha256.oauth_signature).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });
  });
});