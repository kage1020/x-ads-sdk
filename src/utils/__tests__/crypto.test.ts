import { describe, expect, it } from 'vitest';
import {
  bytesToBase64,
  bytesToHex,
  hmac,
  randomBytes,
  randomHex,
  stringToBytes,
} from '../crypto.js';

describe('crypto utilities (Web standards)', () => {
  describe('randomBytes', () => {
    it('should generate bytes of the specified length', async () => {
      const bytes = await randomBytes(16);
      expect(bytes).toHaveLength(16);
      expect(bytes).toBeInstanceOf(Uint8Array);
    });

    it('should generate different bytes on each call', async () => {
      const bytes1 = await randomBytes(16);
      const bytes2 = await randomBytes(16);

      expect(bytes1).not.toEqual(bytes2);
    });
  });

  describe('randomHex', () => {
    it('should generate hex string of the specified length', async () => {
      const hex = await randomHex(32);
      expect(hex).toHaveLength(32);
      expect(hex).toMatch(/^[a-f0-9]+$/);
    });

    it('should generate different hex strings on each call', async () => {
      const hex1 = await randomHex(32);
      const hex2 = await randomHex(32);

      expect(hex1).not.toBe(hex2);
    });
  });

  describe('bytesToHex', () => {
    it('should convert bytes to hex string', () => {
      const bytes = new Uint8Array([255, 0, 128, 15]);
      const hex = bytesToHex(bytes);
      expect(hex).toBe('ff00800f');
    });

    it('should handle empty array', () => {
      const bytes = new Uint8Array([]);
      const hex = bytesToHex(bytes);
      expect(hex).toBe('');
    });
  });

  describe('stringToBytes', () => {
    it('should convert string to UTF-8 bytes', () => {
      const str = 'Hello';
      const bytes = stringToBytes(str);
      expect(bytes).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
    });

    it('should handle UTF-8 characters', () => {
      const str = 'こんにちは';
      const bytes = stringToBytes(str);
      expect(bytes.length).toBeGreaterThan(5); // UTF-8 encoding is multi-byte
    });
  });

  describe('bytesToBase64', () => {
    it('should convert bytes to base64 string', () => {
      const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
      const base64 = bytesToBase64(bytes);
      expect(base64).toBe('SGVsbG8=');
    });

    it('should handle empty array', () => {
      const bytes = new Uint8Array([]);
      const base64 = bytesToBase64(bytes);
      expect(base64).toBe('');
    });

    it('should handle large arrays without stack overflow', () => {
      // Test with 100KB of data to ensure chunked approach works
      const largeArray = new Uint8Array(100000);
      // Fill with some pattern to make it deterministic
      for (let i = 0; i < largeArray.length; i++) {
        largeArray[i] = i % 256;
      }

      expect(() => bytesToBase64(largeArray)).not.toThrow();
      const result = bytesToBase64(largeArray);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);

      // Verify round-trip works
      const decoded = Uint8Array.from(atob(result), (c) => c.charCodeAt(0));
      expect(decoded).toEqual(largeArray);
    });

    it('should handle very large arrays (1MB) without stack overflow', () => {
      // Test with 1MB of data
      const veryLargeArray = new Uint8Array(1000000);
      // Fill with random-ish pattern
      for (let i = 0; i < veryLargeArray.length; i++) {
        veryLargeArray[i] = (i * 7) % 256;
      }

      expect(() => bytesToBase64(veryLargeArray)).not.toThrow();
      const result = bytesToBase64(veryLargeArray);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('hmac', () => {
    it('should generate HMAC-SHA1 signature', async () => {
      const key = 'secret';
      const data = 'Hello World';
      const signature = await hmac('SHA-1', key, data);

      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
      expect(signature).toMatch(/^[A-Za-z0-9+/]+=*$/); // Base64 pattern
    });

    it('should generate HMAC-SHA256 signature', async () => {
      const key = 'secret';
      const data = 'Hello World';
      const signature = await hmac('SHA-256', key, data);

      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
      expect(signature).toMatch(/^[A-Za-z0-9+/]+=*$/); // Base64 pattern
    });

    it('should generate consistent signatures for same input', async () => {
      const key = 'secret';
      const data = 'Hello World';
      const signature1 = await hmac('SHA-1', key, data);
      const signature2 = await hmac('SHA-1', key, data);

      expect(signature1).toBe(signature2);
    });

    it('should generate different signatures for different algorithms', async () => {
      const key = 'secret';
      const data = 'Hello World';
      const sha1Signature = await hmac('SHA-1', key, data);
      const sha256Signature = await hmac('SHA-256', key, data);

      expect(sha1Signature).not.toBe(sha256Signature);
    });

    it('should generate different signatures for different keys', async () => {
      const data = 'Hello World';
      const signature1 = await hmac('SHA-1', 'secret1', data);
      const signature2 = await hmac('SHA-1', 'secret2', data);

      expect(signature1).not.toBe(signature2);
    });

    it('should generate different signatures for different data', async () => {
      const key = 'secret';
      const signature1 = await hmac('SHA-1', key, 'Hello World');
      const signature2 = await hmac('SHA-1', key, 'Goodbye World');

      expect(signature1).not.toBe(signature2);
    });
  });

  describe('Web standards compatibility', () => {
    it('should work with OAuth-style signature generation', async () => {
      // Test with OAuth-like parameters
      const signingKey = 'consumer_secret&token_secret';
      const baseString = 'GET&https%3A//api.example.com&oauth_consumer_key%3Dkey';

      const signature = await hmac('SHA-1', signingKey, baseString);

      expect(signature).toBeDefined();
      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
    });

    it('should use Web Crypto API when available', async () => {
      // Verify that Web Crypto API is available in test environment
      expect(globalThis.crypto).toBeDefined();
      expect(globalThis.crypto.getRandomValues).toBeDefined();
      expect(globalThis.crypto.subtle).toBeDefined();

      // Test that functions work with Web Crypto API
      const bytes = await randomBytes(16);
      expect(bytes).toBeInstanceOf(Uint8Array);
      expect(bytes.length).toBe(16);

      const signature = await hmac('SHA-1', 'key', 'data');
      expect(signature).toBeDefined();
      expect(typeof signature).toBe('string');
    });

    it('should throw error if btoa is not available', () => {
      // Mock btoa to be undefined
      const originalBtoa = globalThis.btoa;

      try {
        Object.defineProperty(globalThis, 'btoa', { value: undefined, configurable: true });

        const bytes = new Uint8Array([72, 101, 108, 108, 111]);
        expect(() => bytesToBase64(bytes)).toThrow(
          'btoa is not available in this environment. btoa is provided by browsers, but not by Node.js, Deno, or Bun by default. Consider using Buffer or a polyfill for base64 encoding in non-browser environments.'
        );
      } finally {
        // Always restore original btoa, even if test fails
        globalThis.btoa = originalBtoa;
      }
    });
  });
});
