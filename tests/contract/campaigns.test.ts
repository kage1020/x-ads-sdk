import { describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { Campaign } from '@/types/campaign';

describe('Campaigns API Contract', () => {
  const client = new XAdsClient({
    credentials: {
      consumerKey: 'test-key',
      consumerSecret: 'test-secret',
      accessToken: 'test-token',
      accessTokenSecret: 'test-token-secret',
    },
    environment: 'sandbox',
  });

  const accountId = '18ce54d4x5t';

  describe('POST /accounts/:accountId/campaigns', () => {
    it('should create a campaign with valid data', async () => {
      const campaignData = {
        name: 'Test Campaign',
        funding_instrument_id: 'funding123',
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        daily_budget_amount_local_micro: 100000000,
        standard_delivery: true,
        paused: true,
      };

      const response = await client.campaigns.create(accountId, campaignData);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toMatch(/^[a-z0-9]+$/);
      expect(response.data.name).toBe(campaignData.name);
      expect(response.data.account_id).toBe(accountId);
      expect(response.data.funding_instrument_id).toBe(campaignData.funding_instrument_id);
      expect(response.data.paused).toBe(true);
      expect(response.data.deleted).toBe(false);
    });

    it('should reject campaign creation with invalid data', async () => {
      const invalidData = {
        name: '',
        funding_instrument_id: 'funding123',
        start_time: new Date().toISOString(),
        daily_budget_amount_local_micro: 1000,
      };

      await expect(client.campaigns.create(accountId, invalidData)).rejects.toThrow();
    });
  });

  describe('GET /accounts/:accountId/campaigns', () => {
    it('should list campaigns for account', async () => {
      const response = await client.campaigns.list(accountId);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThanOrEqual(0);

      if (response.data.length > 0) {
        const campaign = response.data[0] as Campaign;
        expect(campaign.id).toBeDefined();
        expect(campaign.name).toBeDefined();
        expect(campaign.account_id).toBe(accountId);
        expect(typeof campaign.paused).toBe('boolean');
        expect(typeof campaign.deleted).toBe('boolean');
      }
    });

    it('should support pagination parameters', async () => {
      const response = await client.campaigns.list(accountId, {
        count: 10,
        cursor: undefined,
        sort_by: [{ field: 'created_at', direction: 'DESC' }],
      });

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeLessThanOrEqual(10);
    });
  });

  describe('GET /accounts/:accountId/campaigns/:campaignId', () => {
    it('should get single campaign by ID', async () => {
      const campaignId = 'campaign123';
      const response = await client.campaigns.getCampaign(accountId, campaignId);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(campaignId);
      expect(response.data.account_id).toBe(accountId);
      expect(response.data.name).toBeDefined();
      expect(typeof response.data.paused).toBe('boolean');
    });

    it('should throw error for non-existent campaign', async () => {
      const nonExistentId = 'non-existent';

      await expect(client.campaigns.getCampaign(accountId, nonExistentId)).rejects.toThrow();
    });
  });

  describe('PUT /accounts/:accountId/campaigns/:campaignId', () => {
    it('should update campaign with valid data', async () => {
      const campaignId = 'campaign123';
      const updateData = {
        name: 'Updated Campaign Name',
        paused: false,
        daily_budget_amount_local_micro: 200000000,
      };

      const response = await client.campaigns.update(accountId, campaignId, updateData);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(campaignId);
      expect(response.data.name).toBe(updateData.name);
      expect(response.data.paused).toBe(false);
      expect(response.data.daily_budget_amount_local_micro).toBe(
        updateData.daily_budget_amount_local_micro
      );
    });

    it('should reject invalid update data', async () => {
      const campaignId = 'campaign123';
      const invalidData = {
        daily_budget_amount_local_micro: -1000,
      };

      await expect(client.campaigns.update(accountId, campaignId, invalidData)).rejects.toThrow();
    });
  });

  describe('DELETE /accounts/:accountId/campaigns/:campaignId', () => {
    it('should delete campaign and mark as deleted', async () => {
      const campaignId = 'campaign123';

      const response = await client.campaigns.delete(accountId, campaignId);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(campaignId);
      expect(response.data.deleted).toBe(true);
    });

    it('should throw error when deleting non-existent campaign', async () => {
      const nonExistentId = 'non-existent';

      await expect(client.campaigns.delete(accountId, nonExistentId)).rejects.toThrow();
    });
  });
});
