import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';
import type { CampaignCreateData, LineItemCreateData } from '@/types/campaign';

describe('HttpClient Integration Tests', () => {
  let client: XAdsClient;
  const testAccountId = '18ce54d4x5t';

  beforeEach(() => {
    const config: SDKConfig = {
      credentials: {
        consumerKey: 'test-consumer-key',
        consumerSecret: 'test-consumer-secret',
        accessToken: 'test-access-token',
        accessTokenSecret: 'test-access-token-secret',
      },
      environment: 'sandbox',
      debug: false,
      timeout: 30000,
      rateLimitBuffer: 0.1,
    };

    client = new XAdsClient(config);
  });

  describe('Request Handling', () => {
    it('should handle GET requests successfully', async () => {
      const response = await client.accounts.list();

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
    });

    it('should handle POST requests with JSON data', async () => {
      const campaignData = {
        name: 'Test Campaign',
        funding_instrument_id: 'funding123',
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
        daily_budget_amount_local_micro: 100000000,
      };

      const response = await client.campaigns.create(testAccountId, campaignData);

      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'Test Campaign');
    });

    it('should handle PUT requests for updates', async () => {
      const updateData = {
        name: 'Updated Campaign Name',
        paused: false,
        daily_budget_amount_local_micro: 200000000,
      };

      const response = await client.campaigns.update(testAccountId, 'campaign123', updateData);

      expect(response.data).toHaveProperty('id', 'campaign123');
      expect(response.data).toHaveProperty('name', 'Updated Campaign Name');
    });

    it('should handle DELETE requests', async () => {
      const response = await client.campaigns.delete(testAccountId, 'campaign123');

      expect(response.data).toHaveProperty('id', 'campaign123');
      expect(response.data).toHaveProperty('deleted', true);
    });

    it('should handle requests with query parameters', async () => {
      const options = {
        count: 50,
        cursor: 'test-cursor',
        with_deleted: true,
      };

      const response = await client.campaigns.list(testAccountId, options);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.request.params).toBeDefined();
    });

    it('should handle error responses gracefully', async () => {
      await expect(client.campaigns.getCampaign(testAccountId, 'non-existent')).rejects.toThrow();
    });
  });

  describe('Debug Mode', () => {
    beforeEach(() => {
      const debugConfig: SDKConfig = {
        credentials: {
          consumerKey: 'test-consumer-key',
          consumerSecret: 'test-consumer-secret',
          accessToken: 'test-access-token',
          accessTokenSecret: 'test-access-token-secret',
        },
        environment: 'sandbox',
        debug: true,
      };

      client = new XAdsClient(debugConfig);
    });

    it('should work with debug mode enabled', async () => {
      const response = await client.accounts.list();

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('Timeout Handling', () => {
    it('should respect custom timeout values', () => {
      const shortTimeoutConfig: SDKConfig = {
        credentials: {
          consumerKey: 'test-consumer-key',
          consumerSecret: 'test-consumer-secret',
          accessToken: 'test-access-token',
          accessTokenSecret: 'test-access-token-secret',
        },
        environment: 'sandbox',
        timeout: 1000, // Very short timeout
      };

      const shortClient = new XAdsClient(shortTimeoutConfig);
      expect(shortClient).toBeDefined();
    });
  });

  describe('Rate Limiting Integration', () => {
    it('should handle rate limiting buffer', () => {
      const rateLimitedConfig: SDKConfig = {
        credentials: {
          consumerKey: 'test-consumer-key',
          consumerSecret: 'test-consumer-secret',
          accessToken: 'test-access-token',
          accessTokenSecret: 'test-access-token-secret',
        },
        environment: 'sandbox',
        rateLimitBuffer: 0.5, // 50% buffer
      };

      const rateLimitedClient = new XAdsClient(rateLimitedConfig);
      expect(rateLimitedClient).toBeDefined();
    });

    it('should handle multiple concurrent requests', async () => {
      const promises = [
        client.accounts.list(),
        client.campaigns.list(testAccountId),
        client.lineItems.list(testAccountId),
        client.analytics.getStats(testAccountId, {
          entity: 'CAMPAIGN',
          entity_ids: ['campaign123'],
          start_time: '2023-01-01T00:00:00Z',
          end_time: '2023-01-07T00:00:00Z',
          granularity: 'DAY',
          placement: 'ALL_ON_TWITTER',
          metrics: ['impressions', 'clicks'],
        }),
      ];

      const results = await Promise.all(promises);

      expect(results).toHaveLength(4);
      results.forEach((result) => {
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
      });
    });
  });

  describe('OAuth Integration', () => {
    it('should sign requests with OAuth', async () => {
      // This tests that OAuth signing is working by making a successful authenticated request
      const response = await client.accounts.list();

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
    });

    it('should handle OAuth signature generation for different HTTP methods', async () => {
      // Test different HTTP methods to ensure OAuth signing works for all
      const getResponse = await client.accounts.list();
      expect(getResponse).toBeDefined();

      const postResponse = await client.campaigns.create(testAccountId, {
        name: 'OAuth Test Campaign',
        funding_instrument_id: 'funding123',
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
        daily_budget_amount_local_micro: 100000000,
      });
      expect(postResponse).toBeDefined();

      const putResponse = await client.campaigns.update(testAccountId, 'campaign123', {
        name: 'Updated OAuth Test Campaign',
      });
      expect(putResponse).toBeDefined();

      const deleteResponse = await client.campaigns.delete(testAccountId, 'campaign123');
      expect(deleteResponse).toBeDefined();
    });
  });

  describe('Error Response Handling', () => {
    it('should handle 404 Not Found errors', async () => {
      await expect(client.campaigns.getCampaign(testAccountId, 'non-existent')).rejects.toThrow();
    });

    it('should handle validation errors', async () => {
      const invalidCampaignData = {
        // Missing required fields to trigger validation error
        name: 'Test Campaign',
      };

      await expect(
        client.campaigns.create(testAccountId, invalidCampaignData as CampaignCreateData)
      ).rejects.toThrow();
    });

    it('should handle line item validation errors', async () => {
      const invalidLineItemData = {
        line_item_id: 'lineitem123',
        objective: 'INVALID_OBJECTIVE',
      };

      await expect(
        client.lineItems.create(testAccountId, invalidLineItemData as unknown as LineItemCreateData)
      ).rejects.toThrow();
    });
  });

  describe('Response Format Handling', () => {
    it('should handle JSON responses correctly', async () => {
      const response = await client.accounts.list();

      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('request');
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle single resource responses', async () => {
      const response = await client.campaigns.getCampaign(testAccountId, 'campaign123');

      expect(response).toHaveProperty('data');
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name');
    });

    it('should handle analytics responses with nested data', async () => {
      const response = await client.analytics.getStats(testAccountId, {
        entity: 'CAMPAIGN',
        entity_ids: ['campaign123'],
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-07T00:00:00Z',
        granularity: 'DAY',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions', 'clicks'],
      });

      expect(response).toHaveProperty('data');
      expect(response).toHaveProperty('time_series_length');
      expect(response).toHaveProperty('request');
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('Environment Configuration', () => {
    it('should handle sandbox environment', () => {
      const sandboxClient = new XAdsClient({
        credentials: {
          consumerKey: 'test-consumer-key',
          consumerSecret: 'test-consumer-secret',
          accessToken: 'test-access-token',
          accessTokenSecret: 'test-access-token-secret',
        },
        environment: 'sandbox',
      });

      expect(sandboxClient).toBeDefined();
    });

    it('should handle production environment', () => {
      const productionClient = new XAdsClient({
        credentials: {
          consumerKey: 'test-consumer-key',
          consumerSecret: 'test-consumer-secret',
          accessToken: 'test-access-token',
          accessTokenSecret: 'test-access-token-secret',
        },
        environment: 'production',
      });

      expect(productionClient).toBeDefined();
    });
  });
});
