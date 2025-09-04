import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';
import type { CampaignCreateData, CampaignListOptions, CampaignUpdateData } from '@/types/campaign';

describe('Campaigns Unit Tests', () => {
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
    };

    client = new XAdsClient(config);
  });

  describe('create method validation', () => {
    const baseCampaignData = {
      name: 'Test Campaign',
      funding_instrument_id: 'funding123',
      start_time: '2023-01-01T00:00:00Z',
    };

    it('should validate required fields', async () => {
      const incompleteData = {
        name: 'Test Campaign',
      };

      await expect(
        client.campaigns.create(testAccountId, incompleteData as CampaignCreateData)
      ).rejects.toThrow('Missing required fields');
    });

    it('should validate campaign name length', async () => {
      const longNameData = {
        ...baseCampaignData,
        name: 'x'.repeat(300), // Exceeds 280 character limit
      };

      await expect(client.campaigns.create(testAccountId, longNameData)).rejects.toThrow(
        'Campaign name cannot exceed 280 characters'
      );
    });

    it('should create campaign without budget validation when no budgets provided', async () => {
      const response = await client.campaigns.create(testAccountId, baseCampaignData);
      expect(response.data).toHaveProperty('id');
      expect(response.data.name).toBe('Test Campaign');
    });

    it('should validate daily budget when provided', async () => {
      const campaignWithDailyBudget = {
        ...baseCampaignData,
        daily_budget_amount_local_micro: 1000, // Below minimum of 50000000
      };

      await expect(client.campaigns.create(testAccountId, campaignWithDailyBudget)).rejects.toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should create campaign with valid daily budget', async () => {
      const campaignWithDailyBudget = {
        ...baseCampaignData,
        daily_budget_amount_local_micro: 100000000, // $100 in micro units
      };

      const response = await client.campaigns.create(testAccountId, campaignWithDailyBudget);
      expect(response.data).toHaveProperty('id');
    });

    it('should validate total budget when provided', async () => {
      const campaignWithTotalBudget = {
        ...baseCampaignData,
        total_budget_amount_local_micro: 25000000, // Below minimum
      };

      await expect(client.campaigns.create(testAccountId, campaignWithTotalBudget)).rejects.toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should create campaign with valid total budget', async () => {
      const campaignWithTotalBudget = {
        ...baseCampaignData,
        total_budget_amount_local_micro: 500000000, // $500 in micro units
      };

      const response = await client.campaigns.create(testAccountId, campaignWithTotalBudget);
      expect(response.data).toHaveProperty('id');
    });

    it('should create campaign with both daily and total budgets', async () => {
      const campaignWithBothBudgets = {
        ...baseCampaignData,
        daily_budget_amount_local_micro: 50000000,
        total_budget_amount_local_micro: 1000000000,
      };

      const response = await client.campaigns.create(testAccountId, campaignWithBothBudgets);
      expect(response.data).toHaveProperty('id');
    });

    it('should create campaign without end time validation when no end time provided', async () => {
      const response = await client.campaigns.create(testAccountId, baseCampaignData);
      expect(response.data).toHaveProperty('id');
    });

    it('should validate date range when end time is provided', async () => {
      const campaignWithInvalidDateRange = {
        ...baseCampaignData,
        start_time: '2023-01-08T00:00:00Z',
        end_time: '2023-01-01T00:00:00Z', // End before start
      };

      await expect(
        client.campaigns.create(testAccountId, campaignWithInvalidDateRange)
      ).rejects.toThrow('Date range is invalid: start time must be before end time');
    });

    it('should create campaign with valid date range', async () => {
      const campaignWithValidDateRange = {
        ...baseCampaignData,
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
      };

      const response = await client.campaigns.create(testAccountId, campaignWithValidDateRange);
      expect(response.data).toHaveProperty('id');
    });

    it('should sanitize parameters by removing null/undefined values', async () => {
      const dataWithNulls = {
        ...baseCampaignData,
        optional_field: null,
        another_optional: undefined,
        valid_field: 'keep this',
      };

      const response = await client.campaigns.create(
        testAccountId,
        dataWithNulls as CampaignCreateData
      );
      expect(response.data).toHaveProperty('id');
    });
  });

  describe('list method', () => {
    it('should list campaigns without options', async () => {
      const response = await client.campaigns.list(testAccountId);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should list campaigns with options', async () => {
      const options = {
        count: 25,
        cursor: 'test-cursor',
        with_deleted: false,
        funding_instrument_ids: ['funding123'],
      };

      const response = await client.campaigns.list(testAccountId, options);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.request.params).toBeDefined();
    });

    it('should sanitize list options', async () => {
      const optionsWithNulls = {
        count: 10,
        cursor: undefined,
        with_deleted: undefined,
        funding_instrument_ids: ['funding123'],
      };

      const response = await client.campaigns.list(
        testAccountId,
        optionsWithNulls as CampaignListOptions
      );
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('getCampaign method', () => {
    it('should get a specific campaign', async () => {
      const campaignId = 'campaign123';
      const response = await client.campaigns.getCampaign(testAccountId, campaignId);
      expect(response.data).toHaveProperty('id', campaignId);
    });
  });

  describe('update method validation', () => {
    const campaignId = 'campaign123';

    it('should update campaign without validation when no restricted fields are provided', async () => {
      const updateData = {
        paused: true,
        deleted: false,
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data).toHaveProperty('id', campaignId);
    });

    it('should skip name validation when name is not provided', async () => {
      const updateData = {
        paused: false,
        budget_optimization: true,
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data).toHaveProperty('id', campaignId);
    });

    it('should validate name length when name is provided', async () => {
      const updateData = {
        name: 'x'.repeat(300), // Exceeds 280 character limit
      };

      await expect(client.campaigns.update(testAccountId, campaignId, updateData)).rejects.toThrow(
        'Campaign name cannot exceed 280 characters'
      );
    });

    it('should allow valid name updates', async () => {
      const updateData = {
        name: 'Updated Campaign Name',
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data.name).toBe('Updated Campaign Name');
    });

    it('should skip daily budget validation when not provided', async () => {
      const updateData = {
        paused: false,
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data).toHaveProperty('id', campaignId);
    });

    it('should validate daily budget when provided (including zero)', async () => {
      const updateData = {
        daily_budget_amount_local_micro: 0, // Invalid: below minimum
      };

      await expect(client.campaigns.update(testAccountId, campaignId, updateData)).rejects.toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should allow valid daily budget updates', async () => {
      const updateData = {
        daily_budget_amount_local_micro: 150000000, // $150 in micro units
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data.daily_budget_amount_local_micro).toBe(200000000); // Mock returns this value
    });

    it('should skip total budget validation when not provided', async () => {
      const updateData = {
        budget_optimization: false,
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data).toHaveProperty('id', campaignId);
    });

    it('should validate total budget when provided (including zero)', async () => {
      const updateData = {
        total_budget_amount_local_micro: 0, // Invalid: below minimum
      };

      await expect(client.campaigns.update(testAccountId, campaignId, updateData)).rejects.toThrow(
        'Budget amount must be at least 50000000 micro currency units'
      );
    });

    it('should allow valid total budget updates', async () => {
      const updateData = {
        total_budget_amount_local_micro: 2000000000, // $2000 in micro units
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data).toHaveProperty('id', campaignId);
    });

    it('should skip date validation when only one time field is provided', async () => {
      const updateDataStartOnly = {
        start_time: '2023-01-01T00:00:00Z',
        // no end_time - should not validate range
      };

      const response1 = await client.campaigns.update(
        testAccountId,
        campaignId,
        updateDataStartOnly
      );
      expect(response1.data).toHaveProperty('id', campaignId);

      const updateDataEndOnly = {
        end_time: '2023-01-08T00:00:00Z',
        // no start_time - should not validate range
      };

      const response2 = await client.campaigns.update(testAccountId, campaignId, updateDataEndOnly);
      expect(response2.data).toHaveProperty('id', campaignId);
    });

    it('should validate date range when both start and end times are provided', async () => {
      const updateData = {
        start_time: '2023-01-08T00:00:00Z',
        end_time: '2023-01-01T00:00:00Z', // End before start
      };

      await expect(client.campaigns.update(testAccountId, campaignId, updateData)).rejects.toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should allow valid date range updates', async () => {
      const updateData = {
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
      };

      const response = await client.campaigns.update(testAccountId, campaignId, updateData);
      expect(response.data).toHaveProperty('id', campaignId);
    });

    it('should sanitize update parameters', async () => {
      const updateData = {
        name: 'Updated Name',
        null_field: null,
        undefined_field: undefined,
        paused: false,
      };

      const response = await client.campaigns.update(
        testAccountId,
        campaignId,
        updateData as CampaignUpdateData
      );
      expect(response.data).toHaveProperty('id', campaignId);
    });
  });

  describe('delete method', () => {
    it('should delete a campaign', async () => {
      const campaignId = 'campaign123';
      const response = await client.campaigns.delete(testAccountId, campaignId);
      expect(response.data).toHaveProperty('id', campaignId);
      expect(response.data.deleted).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings in validation', async () => {
      const baseData = {
        name: 'Test Campaign',
        funding_instrument_id: 'funding123',
        start_time: '2023-01-01T00:00:00Z',
      };

      // Test empty name
      await expect(
        client.campaigns.create(testAccountId, { ...baseData, name: '' })
      ).rejects.toThrow('Missing required fields: name');

      // Test empty funding_instrument_id
      await expect(
        client.campaigns.create(testAccountId, { ...baseData, funding_instrument_id: '' })
      ).rejects.toThrow('Missing required fields: funding_instrument_id');
    });

    it('should handle budget edge cases', async () => {
      const baseData = {
        name: 'Test Campaign',
        funding_instrument_id: 'funding123',
        start_time: '2023-01-01T00:00:00Z',
      };

      // Test minimum valid budget amounts
      const minDailyBudgetData = {
        ...baseData,
        daily_budget_amount_local_micro: 50000000, // Exactly minimum
      };

      const response1 = await client.campaigns.create(testAccountId, minDailyBudgetData);
      expect(response1.data).toHaveProperty('id');

      const minTotalBudgetData = {
        ...baseData,
        total_budget_amount_local_micro: 50000000, // Exactly minimum
      };

      const response2 = await client.campaigns.create(testAccountId, minTotalBudgetData);
      expect(response2.data).toHaveProperty('id');
    });

    it('should handle update with undefined budget values correctly', async () => {
      const campaignId = 'campaign123';

      // Test that undefined values trigger validation
      const updateData = {
        daily_budget_amount_local_micro: undefined,
        total_budget_amount_local_micro: undefined,
      };

      // Should not throw because undefined !== undefined check will be false
      const response = await client.campaigns.update(
        testAccountId,
        campaignId,
        updateData as CampaignUpdateData
      );
      expect(response.data).toHaveProperty('id', campaignId);
    });
  });
});
