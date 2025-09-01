import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RateLimiter } from '../rate-limit.js';

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const limiter = new RateLimiter();
      expect(limiter).toBeInstanceOf(RateLimiter);
    });

    it('should accept custom options', () => {
      const options = {
        strategy: 'throw' as const,
        defaultLimit: 100,
        defaultWindow: 300,
      };
      const limiter = new RateLimiter(options);
      expect(limiter).toBeInstanceOf(RateLimiter);
    });

    it('should merge custom options with defaults', () => {
      const limiter = new RateLimiter({ strategy: 'throw' });
      expect(limiter).toBeInstanceOf(RateLimiter);
    });
  });

  describe('updateLimits', () => {
    it('should update rate limit info from headers', () => {
      const limiter = new RateLimiter();
      const resetTimestamp = '1640995200'; // 2022-01-01T00:00:00.000Z
      const expectedResetTime = new Date('2022-01-01T00:00:00.000Z');

      // Set current time before reset time to ensure it's valid
      vi.setSystemTime(new Date('2021-12-31T23:00:00.000Z'));

      const headers = {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '299',
        'x-rate-limit-reset': resetTimestamp,
      };

      limiter.updateLimits('/api/endpoint', headers);

      const remaining = limiter.getRemainingRequests('/api/endpoint');
      expect(remaining).toBe(299);

      const resetTime = limiter.getResetTime('/api/endpoint');
      expect(resetTime).toEqual(expectedResetTime);
    });

    it('should not update if headers are incomplete', () => {
      const limiter = new RateLimiter();
      const incompleteHeaders = {
        'x-rate-limit-limit': '300',
        // Missing remaining and reset
      };

      limiter.updateLimits('/api/endpoint', incompleteHeaders);

      const remaining = limiter.getRemainingRequests('/api/endpoint');
      expect(remaining).toBeNull();
    });

    it('should handle missing rate limit headers', () => {
      const limiter = new RateLimiter();
      const emptyHeaders = {};

      limiter.updateLimits('/api/endpoint', emptyHeaders);

      const remaining = limiter.getRemainingRequests('/api/endpoint');
      expect(remaining).toBeNull();
    });

    it('should update different endpoints independently', () => {
      const limiter = new RateLimiter();

      // Set current time before all reset times
      vi.setSystemTime(new Date('2021-12-31T23:00:00.000Z'));

      const headers1 = {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '299',
        'x-rate-limit-reset': '1640995200',
      };
      const headers2 = {
        'x-rate-limit-limit': '100',
        'x-rate-limit-remaining': '50',
        'x-rate-limit-reset': '1640995260',
      };

      limiter.updateLimits('/api/endpoint1', headers1);
      limiter.updateLimits('/api/endpoint2', headers2);

      expect(limiter.getRemainingRequests('/api/endpoint1')).toBe(299);
      expect(limiter.getRemainingRequests('/api/endpoint2')).toBe(50);
    });
  });

  describe('checkRateLimit', () => {
    it('should proceed when no rate limit info is available', async () => {
      const limiter = new RateLimiter();
      await expect(limiter.checkRateLimit('/api/endpoint')).resolves.toBeUndefined();
    });

    it('should proceed when reset time has passed', async () => {
      const limiter = new RateLimiter();
      const pastResetTime = new Date('2022-01-01T00:00:00.000Z');
      const currentTime = new Date('2022-01-01T01:00:00.000Z');

      vi.setSystemTime(pastResetTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '0',
        'x-rate-limit-reset': Math.floor(pastResetTime.getTime() / 1000).toString(),
      });

      vi.setSystemTime(currentTime);
      await expect(limiter.checkRateLimit('/api/endpoint')).resolves.toBeUndefined();

      // Should clear the expired limit info
      expect(limiter.getRemainingRequests('/api/endpoint')).toBeNull();
    });

    it('should proceed when remaining requests > 0', async () => {
      const limiter = new RateLimiter();
      const resetTime = new Date('2022-01-01T01:00:00.000Z');
      const currentTime = new Date('2022-01-01T00:30:00.000Z');

      vi.setSystemTime(currentTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '100',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      await expect(limiter.checkRateLimit('/api/endpoint')).resolves.toBeUndefined();
    });

    it('should wait when rate limit is exceeded and strategy is "wait"', async () => {
      const limiter = new RateLimiter({ strategy: 'wait' });
      const resetTime = new Date('2022-01-01T01:00:00.000Z');
      const currentTime = new Date('2022-01-01T00:30:00.000Z');

      vi.setSystemTime(currentTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '0',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      // Mock console.warn to verify it's called
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const checkPromise = limiter.checkRateLimit('/api/endpoint');

      // Advance time to simulate waiting
      vi.advanceTimersByTime(30 * 60 * 1000); // 30 minutes

      await checkPromise;

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit exceeded for /api/endpoint')
      );
    });

    it('should throw when rate limit is exceeded and strategy is "throw"', async () => {
      const limiter = new RateLimiter({ strategy: 'throw' });
      const resetTime = new Date('2022-01-01T01:00:00.000Z');
      const currentTime = new Date('2022-01-01T00:30:00.000Z');

      vi.setSystemTime(currentTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '0',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      await expect(limiter.checkRateLimit('/api/endpoint')).rejects.toThrow(
        'Rate limit exceeded for /api/endpoint'
      );
    });

    it('should handle boundary case when remaining is exactly 0', async () => {
      const limiter = new RateLimiter({ strategy: 'throw' });
      const resetTime = new Date('2022-01-01T01:00:00.000Z');
      const currentTime = new Date('2022-01-01T00:30:00.000Z');

      vi.setSystemTime(currentTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '0',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      await expect(limiter.checkRateLimit('/api/endpoint')).rejects.toThrow();
    });
  });

  describe('getRemainingRequests', () => {
    it('should return null when no rate limit info is available', () => {
      const limiter = new RateLimiter();
      expect(limiter.getRemainingRequests('/api/endpoint')).toBeNull();
    });

    it('should return remaining requests when info is available', () => {
      const limiter = new RateLimiter();
      const resetTime = new Date('2022-01-01T01:00:00.000Z');
      const currentTime = new Date('2022-01-01T00:30:00.000Z');

      vi.setSystemTime(currentTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '150',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      expect(limiter.getRemainingRequests('/api/endpoint')).toBe(150);
    });

    it('should return null when reset time has passed', () => {
      const limiter = new RateLimiter();
      const pastResetTime = new Date('2022-01-01T00:00:00.000Z');
      const currentTime = new Date('2022-01-01T01:00:00.000Z');

      vi.setSystemTime(pastResetTime);
      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '150',
        'x-rate-limit-reset': Math.floor(pastResetTime.getTime() / 1000).toString(),
      });

      vi.setSystemTime(currentTime);
      expect(limiter.getRemainingRequests('/api/endpoint')).toBeNull();
    });
  });

  describe('getResetTime', () => {
    it('should return null when no rate limit info is available', () => {
      const limiter = new RateLimiter();
      expect(limiter.getResetTime('/api/endpoint')).toBeNull();
    });

    it('should return reset time when info is available', () => {
      const limiter = new RateLimiter();
      const resetTime = new Date('2022-01-01T01:00:00.000Z');

      limiter.updateLimits('/api/endpoint', {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '150',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      expect(limiter.getResetTime('/api/endpoint')).toEqual(resetTime);
    });
  });

  describe('integration tests', () => {
    it('should handle complete rate limiting workflow', async () => {
      const limiter = new RateLimiter({ strategy: 'wait' });
      const endpoint = '/api/campaigns';

      // Start with no limits
      expect(limiter.getRemainingRequests(endpoint)).toBeNull();
      await limiter.checkRateLimit(endpoint); // Should pass

      // Update with rate limit info
      const resetTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
      limiter.updateLimits(endpoint, {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '5',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      // Should still pass with remaining requests
      expect(limiter.getRemainingRequests(endpoint)).toBe(5);
      await limiter.checkRateLimit(endpoint);

      // Update to rate limit exceeded
      limiter.updateLimits(endpoint, {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '0',
        'x-rate-limit-reset': Math.floor(resetTime.getTime() / 1000).toString(),
      });

      expect(limiter.getRemainingRequests(endpoint)).toBe(0);
    });

    it('should handle different endpoints with different limits', async () => {
      const limiter = new RateLimiter();
      const endpoint1 = '/api/campaigns';
      const endpoint2 = '/api/analytics';

      const baseTime = new Date('2022-01-01T12:00:00.000Z');
      vi.setSystemTime(baseTime);

      const resetTime1 = new Date(baseTime.getTime() + 15 * 60 * 1000); // 15 minutes later
      const resetTime2 = new Date(baseTime.getTime() + 30 * 60 * 1000); // 30 minutes later

      limiter.updateLimits(endpoint1, {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '100',
        'x-rate-limit-reset': Math.floor(resetTime1.getTime() / 1000).toString(),
      });

      limiter.updateLimits(endpoint2, {
        'x-rate-limit-limit': '1000',
        'x-rate-limit-remaining': '500',
        'x-rate-limit-reset': Math.floor(resetTime2.getTime() / 1000).toString(),
      });

      expect(limiter.getRemainingRequests(endpoint1)).toBe(100);
      expect(limiter.getRemainingRequests(endpoint2)).toBe(500);
      expect(limiter.getResetTime(endpoint1)).toEqual(resetTime1);
      expect(limiter.getResetTime(endpoint2)).toEqual(resetTime2);
    });
  });
});
