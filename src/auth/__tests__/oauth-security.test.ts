import { describe, expect, it } from 'vitest';
import { hmac } from '../../utils/crypto';
import { OAuth } from '../oauth';

describe('OAuth Security Analysis', () => {
  const validConfig = {
    consumerKey: 'test_consumer_key',
    consumerSecret: 'test_consumer_secret',
    accessToken: 'test_access_token',
    accessTokenSecret: 'test_access_token_secret',
  };

  describe('signature method security', () => {
    it('should use HMAC-SHA1 for OAuth signature generation (not password hashing)', async () => {
      const oauth = new OAuth(validConfig);
      const params = {
        oauth_consumer_key: 'test',
        oauth_timestamp: '1234567890',
        oauth_nonce: 'testnonce',
      };

      const signature = await oauth.generateSignature(
        'GET',
        'https://api.example.com/test',
        params
      );

      // Verify this is OAuth signature generation, not password hashing
      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);

      // Verify it's base64 encoded (typical of HMAC output)
      expect(signature).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });

    it('should support HMAC-SHA256 for enhanced security', async () => {
      const oauthSha256 = new OAuth({
        ...validConfig,
        signatureMethod: 'HMAC-SHA256',
      });

      const signature = await oauthSha256.generateOAuthSignature({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {},
      });

      expect(signature.oauth_signature_method).toBe('HMAC-SHA256');
      expect(signature.oauth_signature).toBeDefined();
      expect(signature.oauth_signature.length).toBeGreaterThan(0);
    });

    it('should default to HMAC-SHA1 for OAuth 1.0a compatibility', async () => {
      const oauth = new OAuth(validConfig);
      const signature = await oauth.generateOAuthSignature({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {},
      });

      expect(signature.oauth_signature_method).toBe('HMAC-SHA1');
    });

    it('should demonstrate this is HMAC-based signature, not password storage', async () => {
      // This test demonstrates the difference between OAuth signature generation
      // and password hashing for storage

      const signingKey = 'test_consumer_secret&test_access_token_secret';
      const baseString = 'GET&https%3A//api.example.com/test&oauth_consumer_key%3Dtest';

      // This is HMAC for OAuth signatures using Web Crypto API (what the code does)
      const oauthSignature = await hmac('SHA-1', signingKey, baseString);

      // This would be password hashing (what CodeQL thinks we're doing)
      // which would use bcrypt, scrypt, PBKDF2, or Argon2

      expect(oauthSignature).toBeDefined();
      expect(typeof oauthSignature).toBe('string');

      // OAuth signatures are deterministic for the same input
      const repeatSignature = await hmac('SHA-1', signingKey, baseString);
      expect(oauthSignature).toBe(repeatSignature);
    });

    it('should verify OAuth 1.0a compliance with configurable signature method', async () => {
      const oauth = new OAuth(validConfig);
      const signature = await oauth.generateOAuthSignature({
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {},
      });

      // OAuth 1.0a specification requires these fields
      expect(signature.oauth_signature_method).toBe('HMAC-SHA1');
      expect(signature.oauth_version).toBe('1.0');
      expect(signature.oauth_consumer_key).toBe(validConfig.consumerKey);
      expect(signature.oauth_token).toBe(validConfig.accessToken);

      // Signature should be present and valid
      expect(signature.oauth_signature).toBeDefined();
      expect(signature.oauth_signature.length).toBeGreaterThan(0);
    });

    it('should generate different signatures for SHA1 vs SHA256', async () => {
      const oauthSha1 = new OAuth({ ...validConfig, signatureMethod: 'HMAC-SHA1' });
      const oauthSha256 = new OAuth({ ...validConfig, signatureMethod: 'HMAC-SHA256' });

      const requestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        headers: {},
      };

      const signatureSha1 = await oauthSha1.generateOAuthSignature(requestOptions);
      const signatureSha256 = await oauthSha256.generateOAuthSignature(requestOptions);

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
