import { beforeEach, describe, expect, it, vi } from 'vitest';
import { XAdsClient } from '../client/index.js';
import { Environment } from '../types/common.js';

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
    it('should create XAdsClient with accounts resource', () => {
      client = new XAdsClient(testConfig);

      expect(client).toBeInstanceOf(XAdsClient);
      expect(client.accounts).toBeDefined();
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

  describe('resources', () => {
    beforeEach(() => {
      client = new XAdsClient(testConfig);
    });

    it('should have accounts resource with correct methods', () => {
      expect(client.accounts).toBeDefined();
      expect(typeof client.accounts.list).toBe('function');
      expect(typeof client.accounts.get).toBe('function');
      expect(typeof client.accounts.create).toBe('function');
      expect(typeof client.accounts.update).toBe('function');
    });

    it('should provide resource factory methods', () => {
      expect(typeof client.getCampaignResource).toBe('function');
      expect(typeof client.getLineItemResource).toBe('function');
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
