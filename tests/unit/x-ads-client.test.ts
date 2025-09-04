import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/client/x-ads-client';
import type { SDKConfig } from '@/types';

describe('XAdsClient Unit Tests', () => {
  let client: XAdsClient;
  let validConfig: SDKConfig;

  beforeEach(() => {
    validConfig = {
      credentials: {
        consumerKey: 'test-consumer-key',
        consumerSecret: 'test-consumer-secret',
        accessToken: 'test-access-token',
        accessTokenSecret: 'test-access-token-secret',
      },
      environment: 'sandbox',
    };

    client = new XAdsClient(validConfig);
  });

  describe('rate limit management', () => {
    it('should return rate limit status - line 100-101', () => {
      const status = client.getRateLimitStatus();

      // RateLimiter should return a status object with remaining requests and reset time
      expect(status).toBeDefined();
      expect(typeof status).toBe('object');
    });

    it('should reset rate limit - line 104-105', () => {
      // First make a call to potentially change rate limit status
      client.getRateLimitStatus();

      // Reset the rate limiter
      client.resetRateLimit();

      // The reset method should execute without throwing
      expect(() => client.resetRateLimit()).not.toThrow();
    });
  });

  describe('configuration methods coverage', () => {
    it('should update environment', () => {
      client.setEnvironment('production');
      // Should not throw
      expect(() => client.setEnvironment('production')).not.toThrow();
    });

    it('should update debug mode', () => {
      client.setDebug(true);
      expect(() => client.setDebug(false)).not.toThrow();
    });

    it('should update timeout', () => {
      client.setTimeout(30000);
      expect(() => client.setTimeout(60000)).not.toThrow();
    });
  });

  describe('client initialization', () => {
    it('should initialize all resource clients', () => {
      expect(client.campaigns).toBeDefined();
      expect(client.lineItems).toBeDefined();
      expect(client.analytics).toBeDefined();
      expect(client.accounts).toBeDefined();
      expect(client.fundingInstruments).toBeDefined();
      expect(client.media).toBeDefined();
      expect(client.targeting).toBeDefined();
    });

    it('should validate credentials during initialization', () => {
      const invalidConfig = {
        credentials: {
          consumerKey: '',
          consumerSecret: 'test-consumer-secret',
          accessToken: 'test-access-token',
          accessTokenSecret: 'test-access-token-secret',
        },
        environment: 'sandbox' as const,
      };

      expect(() => new XAdsClient(invalidConfig)).toThrow('Consumer key is required');
    });
  });

  describe('rate limit integration', () => {
    it('should manage rate limit state through multiple operations', () => {
      // Get initial status
      const status1 = client.getRateLimitStatus();
      expect(status1).toBeDefined();

      // Reset rate limit
      client.resetRateLimit();

      // Get status again
      const status2 = client.getRateLimitStatus();
      expect(status2).toBeDefined();

      // Both operations should work without throwing
      expect(typeof status1).toBe('object');
      expect(typeof status2).toBe('object');
    });

    it('should handle multiple reset calls', () => {
      // Multiple resets should not cause issues
      client.resetRateLimit();
      client.resetRateLimit();
      client.resetRateLimit();

      // Should still be able to get status
      const status = client.getRateLimitStatus();
      expect(status).toBeDefined();
    });
  });
});
