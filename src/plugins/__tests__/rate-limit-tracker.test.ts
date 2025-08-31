import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PluginRequestConfig, PluginResponse } from '../base';
import { RateLimitTracker, type RateLimitTrackerOptions } from '../rate-limit-tracker';

// Mock console methods
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('RateLimitTracker', () => {
  let tracker: RateLimitTracker;
  let mockConfig: PluginRequestConfig;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    tracker = new RateLimitTracker();
    mockConfig = {
      url: 'https://ads-api.twitter.com/12/accounts/123/campaigns',
      method: 'GET',
      headers: {},
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const tracker = new RateLimitTracker();
      expect(tracker.name).toBe('rate-limit-tracker');
      expect(tracker.version).toBe('1.0.0');
    });

    it('should merge custom options with defaults', () => {
      const options: RateLimitTrackerOptions = {
        trackingEnabled: false,
        logEnabled: true,
        warningThreshold: 5,
      };
      const tracker = new RateLimitTracker(options);
      expect(tracker.name).toBe('rate-limit-tracker');
    });

    it('should handle empty options object', () => {
      const tracker = new RateLimitTracker({});
      expect(tracker.name).toBe('rate-limit-tracker');
    });
  });

  describe('afterResponse', () => {
    it('should track rate limits when headers are present', () => {
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '299',
          'x-rate-limit-reset': '1640995200', // 2022-01-01T00:00:00Z
        },
        data: {},
      };

      const result = tracker.afterResponse(mockResponse, mockConfig);

      expect(result).toBe(mockResponse);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeDefined();
      expect(info?.endpoint).toBe(endpoint);
      expect(info?.limit).toBe(300);
      expect(info?.remaining).toBe(299);
      expect(info?.resetTimeSeconds).toBe(1640995200);
      expect(info?.requestCount).toBe(1);
    });

    it('should handle object headers', () => {
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '100',
          'x-rate-limit-remaining': '50',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeDefined();
      expect(info?.limit).toBe(100);
      expect(info?.remaining).toBe(50);
    });

    it('should handle case-insensitive headers with mixed case keys', () => {
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '100',
          'X-Rate-Limit-Remaining': '50', // Mixed case should be handled correctly
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      // Should be defined because we now handle case-insensitive headers
      expect(info).toBeDefined();
      expect(info?.limit).toBe(100);
      expect(info?.remaining).toBe(50);
    });

    it('should handle mixed case headers when using Headers object', () => {
      const headers = {
        'X-Rate-Limit-Limit': '100',
        'X-Rate-Limit-Remaining': '50',
        'X-Rate-Limit-Reset': '1640995200',
      };

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers,
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeDefined();
      expect(info?.limit).toBe(100);
    });

    it('should increment request count for existing endpoint', () => {
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '299',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      // First request
      tracker.afterResponse(mockResponse, mockConfig);

      // Second request with updated remaining count
      mockResponse.headers = {
        'x-rate-limit-limit': '300',
        'x-rate-limit-remaining': '298',
        'x-rate-limit-reset': '1640995200',
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info?.requestCount).toBe(2);
      expect(info?.remaining).toBe(298);
    });

    it('should not track when trackingEnabled is false', () => {
      tracker = new RateLimitTracker({ trackingEnabled: false });

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '299',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeUndefined();
    });

    it('should not track when rate limit headers are missing', () => {
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeUndefined();
    });

    it('should log warning when remaining requests fall below threshold', () => {
      tracker = new RateLimitTracker({ logEnabled: true, warningThreshold: 10 });

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '5',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          'Rate limit warning for /12/accounts/123/campaigns: 5/300 requests remaining'
        )
      );
    });

    it('should not log warning when logging is disabled', () => {
      tracker = new RateLimitTracker({ logEnabled: false, warningThreshold: 10 });

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '5',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      expect(mockConsoleWarn).not.toHaveBeenCalled();
    });

    it('should handle URLs without proper format', () => {
      const invalidConfig: PluginRequestConfig = {
        url: 'invalid-url',
        method: 'GET',
        headers: {},
      };

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '299',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, invalidConfig);

      const info = tracker.getRateLimitInfo('invalid-url');
      expect(info).toBeDefined();
    });

    it('should handle missing headers gracefully', () => {
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: undefined as unknown as Record<string, string>,
        data: {},
      };

      expect(() => {
        tracker.afterResponse(mockResponse, mockConfig);
      }).not.toThrow();
    });
  });

  describe('onError', () => {
    it('should track 429 errors', () => {
      const error = new Error('Rate limit exceeded') as Error & { statusCode?: number };
      error.statusCode = 429;

      // First establish a baseline
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '10',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      // Now trigger the error
      tracker.onError(error, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info?.remaining).toBe(0);
    });

    it('should log 429 errors when logging is enabled', () => {
      tracker = new RateLimitTracker({ logEnabled: true });

      const error = new Error('Rate limit exceeded') as Error & { statusCode?: number };
      error.statusCode = 429;

      tracker.onError(error, mockConfig);

      expect(mockConsoleError).toHaveBeenCalledWith(
        'Rate limit exceeded for /12/accounts/123/campaigns'
      );
    });

    it('should not track when trackingEnabled is false', () => {
      tracker = new RateLimitTracker({ trackingEnabled: false });

      const error = new Error('Rate limit exceeded') as Error & { statusCode?: number };
      error.statusCode = 429;

      tracker.onError(error, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeUndefined();
    });

    it('should not track non-429 errors', () => {
      const error = new Error('Server error') as Error & { statusCode?: number };
      error.statusCode = 500;

      tracker.onError(error, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeUndefined();
    });

    it('should handle errors without statusCode', () => {
      const error = new Error('Generic error');

      expect(() => {
        tracker.onError(error, mockConfig);
      }).not.toThrow();
    });

    it('should return undefined', () => {
      const error = new Error('Rate limit exceeded') as Error & { statusCode?: number };
      error.statusCode = 429;

      const result = tracker.onError(error, mockConfig);
      expect(result).toBeUndefined();
    });
  });

  describe('getRateLimitInfo', () => {
    it('should return undefined for non-existent endpoint', () => {
      const info = tracker.getRateLimitInfo('/non-existent');
      expect(info).toBeUndefined();
    });

    it('should return rate limit info for existing endpoint', () => {
      // Setup rate limit info
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '299',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const info = tracker.getRateLimitInfo(endpoint);

      expect(info).toBeDefined();
      expect(info?.endpoint).toBe(endpoint);
      expect(info?.limit).toBe(300);
      expect(info?.remaining).toBe(299);
    });
  });

  describe('getAllRateLimits', () => {
    it('should return empty map when no limits are tracked', () => {
      const allLimits = tracker.getAllRateLimits();
      expect(allLimits.size).toBe(0);
    });

    it('should return all tracked rate limits', () => {
      // Setup multiple endpoints
      const endpoints = ['/12/accounts/123/campaigns', '/12/accounts/123/ad_groups'];

      for (let i = 0; i < endpoints.length; i++) {
        const config = { ...mockConfig, url: `https://ads-api.twitter.com${endpoints[i]}` };
        const response: PluginResponse = {
          status: 200,
          statusText: 'OK',
          headers: {
            'x-rate-limit-limit': '300',
            'x-rate-limit-remaining': String(299 - i),
            'x-rate-limit-reset': '1640995200',
          },
          data: {},
        };

        tracker.afterResponse(response, config);
      }

      const allLimits = tracker.getAllRateLimits();
      expect(allLimits.size).toBe(2);

      for (const endpoint of endpoints) {
        expect(allLimits.has(endpoint)).toBe(true);
      }
    });

    it('should return a new Map (not reference to internal map)', () => {
      const allLimits1 = tracker.getAllRateLimits();
      const allLimits2 = tracker.getAllRateLimits();

      expect(allLimits1).not.toBe(allLimits2);
    });
  });

  describe('getRemainingRequests', () => {
    it('should return null for non-existent endpoint', () => {
      const remaining = tracker.getRemainingRequests('/non-existent');
      expect(remaining).toBeNull();
    });

    it('should return remaining requests for existing endpoint', () => {
      // Setup rate limit info
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '250',
          'x-rate-limit-reset': String(Math.floor(Date.now() / 1000) + 3600), // 1 hour from now
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const remaining = tracker.getRemainingRequests(endpoint);

      expect(remaining).toBe(250);
    });

    it('should return null and delete expired entries', () => {
      // Setup rate limit info with past reset time
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '250',
          'x-rate-limit-reset': String(Math.floor(Date.now() / 1000) - 3600), // 1 hour ago
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const remaining = tracker.getRemainingRequests(endpoint);

      expect(remaining).toBeNull();

      // Verify it was deleted
      const info = tracker.getRateLimitInfo(endpoint);
      expect(info).toBeUndefined();
    });
  });

  describe('getTimeUntilReset', () => {
    it('should return null for non-existent endpoint', () => {
      const timeUntilReset = tracker.getTimeUntilReset('/non-existent');
      expect(timeUntilReset).toBeNull();
    });

    it('should return time until reset for existing endpoint', () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '250',
          'x-rate-limit-reset': String(futureTimestamp),
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const timeUntilReset = tracker.getTimeUntilReset(endpoint);

      expect(timeUntilReset).toBeGreaterThan(0);
      expect(timeUntilReset).toBeLessThanOrEqual(3600 * 1000); // Should be around 1 hour in ms
    });

    it('should return null and delete expired entries', () => {
      const pastTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '250',
          'x-rate-limit-reset': String(pastTimestamp),
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const endpoint = '/12/accounts/123/campaigns';
      const timeUntilReset = tracker.getTimeUntilReset(endpoint);

      expect(timeUntilReset).toBeNull();

      // Verify it was deleted
      const info = tracker.getRateLimitInfo(endpoint);
      expect(info).toBeUndefined();
    });
  });

  describe('clearTrackedLimits', () => {
    it('should clear all tracked limits', () => {
      // Setup some rate limits
      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '299',
          'x-rate-limit-reset': '1640995200',
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      expect(tracker.getAllRateLimits().size).toBe(1);

      tracker.clearTrackedLimits();

      expect(tracker.getAllRateLimits().size).toBe(0);
    });
  });

  describe('getSummary', () => {
    it('should return empty array when no limits are tracked', () => {
      const summary = tracker.getSummary();
      expect(summary).toEqual([]);
    });

    it('should return summary of all tracked endpoints', () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600;

      // Setup multiple endpoints with different utilization rates
      const endpointsData = [
        { path: '/12/accounts/123/campaigns', remaining: 100, limit: 300 }, // 66.67% utilization
        { path: '/12/accounts/123/ad_groups', remaining: 200, limit: 300 }, // 33.33% utilization
      ];

      for (const { path, remaining, limit } of endpointsData) {
        const config = { ...mockConfig, url: `https://ads-api.twitter.com${path}` };
        const response: PluginResponse = {
          status: 200,
          statusText: 'OK',
          headers: {
            'x-rate-limit-limit': String(limit),
            'x-rate-limit-remaining': String(remaining),
            'x-rate-limit-reset': String(futureTimestamp),
          },
          data: {},
        };

        tracker.afterResponse(response, config);
      }

      const summary = tracker.getSummary();

      expect(summary).toHaveLength(2);

      // Should be sorted by utilization rate (descending)
      expect(summary[0].endpoint).toBe('/12/accounts/123/campaigns');
      expect(summary[0].utilizationRate).toBeCloseTo(66.67, 1);
      expect(summary[1].endpoint).toBe('/12/accounts/123/ad_groups');
      expect(summary[1].utilizationRate).toBeCloseTo(33.33, 1);

      // Verify all fields are present
      for (const item of summary) {
        expect(item).toHaveProperty('endpoint');
        expect(item).toHaveProperty('remaining');
        expect(item).toHaveProperty('limit');
        expect(item).toHaveProperty('resetTime');
        expect(item).toHaveProperty('requestCount');
        expect(item).toHaveProperty('utilizationRate');
      }
    });

    it('should exclude expired entries from summary', () => {
      const pastTimestamp = Math.floor(Date.now() / 1000) - 3600;
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600;

      // Setup one expired and one valid endpoint
      const expiredConfig = {
        ...mockConfig,
        url: 'https://ads-api.twitter.com/12/accounts/123/expired',
      };
      const expiredResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '250',
          'x-rate-limit-reset': String(pastTimestamp),
        },
        data: {},
      };

      const validResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '300',
          'x-rate-limit-remaining': '250',
          'x-rate-limit-reset': String(futureTimestamp),
        },
        data: {},
      };

      tracker.afterResponse(expiredResponse, expiredConfig);
      tracker.afterResponse(validResponse, mockConfig);

      const summary = tracker.getSummary();

      expect(summary).toHaveLength(1);
      expect(summary[0].endpoint).toBe('/12/accounts/123/campaigns');
    });

    it('should calculate utilization rate correctly', () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600;

      const mockResponse: PluginResponse = {
        status: 200,
        statusText: 'OK',
        headers: {
          'x-rate-limit-limit': '1000',
          'x-rate-limit-remaining': '250', // 750 used out of 1000 = 75%
          'x-rate-limit-reset': String(futureTimestamp),
        },
        data: {},
      };

      tracker.afterResponse(mockResponse, mockConfig);

      const summary = tracker.getSummary();

      expect(summary[0].utilizationRate).toBe(75);
    });
  });
});
