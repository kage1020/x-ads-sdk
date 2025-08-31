import { beforeEach, describe, expect, it, vi } from 'vitest';
import { XAdsClient } from '../client';
import { Environment } from '../types/common';

// Mock the HTTP client module
vi.mock('../client/base.js', () => ({
  HttpClient: vi.fn().mockImplementation(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  })),
}));

describe('XAdsClient', () => {
  const testConfig = {
    auth: {
      consumerKey: 'test_consumer_key',
      consumerSecret: 'test_consumer_secret',
      accessToken: 'test_access_token',
      accessTokenSecret: 'test_access_token_secret',
    },
  };

  let client: XAdsClient;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create XAdsClient with all modules', () => {
      client = new XAdsClient(testConfig);

      expect(client).toBeInstanceOf(XAdsClient);
      expect(client.accounts).toBeDefined();
      expect(client.campaigns).toBeDefined();
      expect(client.adGroups).toBeDefined();
      expect(client.analytics).toBeDefined();
    });

    it('should use default environment when not specified', () => {
      client = new XAdsClient(testConfig);
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should use production environment when specified', () => {
      client = new XAdsClient({
        ...testConfig,
        environment: Environment.PRODUCTION,
      });
      expect(client).toBeInstanceOf(XAdsClient);
    });

    it('should use custom configuration options', () => {
      client = new XAdsClient({
        ...testConfig,
        timeout: 60000,
        maxRetries: 5,
        rateLimitStrategy: 'throw',
      });
      expect(client).toBeInstanceOf(XAdsClient);
    });
  });

  describe('modules', () => {
    beforeEach(() => {
      client = new XAdsClient(testConfig);
    });

    it('should have accounts module with correct methods', () => {
      expect(client.accounts).toBeDefined();
      expect(typeof client.accounts.list).toBe('function');
      expect(typeof client.accounts.get).toBe('function');
      expect(typeof client.accounts.update).toBe('function');
    });

    it('should have campaigns module with correct methods', () => {
      expect(client.campaigns).toBeDefined();
      expect(typeof client.campaigns.list).toBe('function');
      expect(typeof client.campaigns.get).toBe('function');
      expect(typeof client.campaigns.create).toBe('function');
      expect(typeof client.campaigns.update).toBe('function');
      expect(typeof client.campaigns.delete).toBe('function');
    });

    it('should have adGroups module with correct methods', () => {
      expect(client.adGroups).toBeDefined();
      expect(typeof client.adGroups.list).toBe('function');
      expect(typeof client.adGroups.get).toBe('function');
      expect(typeof client.adGroups.create).toBe('function');
      expect(typeof client.adGroups.update).toBe('function');
      expect(typeof client.adGroups.delete).toBe('function');
    });

    it('should have analytics module with correct methods', () => {
      expect(client.analytics).toBeDefined();
      expect(typeof client.analytics.getAnalytics).toBe('function');
      expect(typeof client.analytics.getCampaignAnalytics).toBe('function');
      expect(typeof client.analytics.getAdGroupAnalytics).toBe('function');
      expect(typeof client.analytics.getAccountAnalytics).toBe('function');
    });
  });

  describe('getHttpClient', () => {
    it('should return the underlying HTTP client', () => {
      client = new XAdsClient(testConfig);
      const httpClient = client.getHttpClient();

      expect(httpClient).toBeDefined();
    });
  });
});
