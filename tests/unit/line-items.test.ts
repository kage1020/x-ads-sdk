import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';
import type { LineItemCreateData, LineItemListOptions, LineItemUpdateData } from '@/types/campaign';

describe('LineItems Unit Tests', () => {
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
    const baseLineItemData = {
      name: 'Test Line Item',
      campaign_id: 'campaign123',
      objective: 'ENGAGEMENT' as const,
      product_type: 'PROMOTED_TWEETS' as const,
      bid_unit: 'ENGAGEMENT' as const,
      start_time: '2023-01-01T00:00:00Z',
      automatically_select_bid: true, // Add this to avoid bid validation by default
    };

    it('should validate required fields', async () => {
      const incompleteData = {
        name: 'Test Line Item',
      };

      await expect(
        client.lineItems.create(testAccountId, incompleteData as LineItemCreateData)
      ).rejects.toThrow('Missing required fields');
    });

    it('should validate name length', async () => {
      const longNameData = {
        ...baseLineItemData,
        name: 'x'.repeat(300), // Exceeds 280 character limit
      };

      await expect(client.lineItems.create(testAccountId, longNameData)).rejects.toThrow(
        'Line item name cannot exceed 280 characters'
      );
    });

    it('should require bid amount when automatically_select_bid is false', async () => {
      const manualBidData = {
        ...baseLineItemData,
        automatically_select_bid: false,
        // bid_amount_local_micro is missing
      };

      await expect(client.lineItems.create(testAccountId, manualBidData)).rejects.toThrow(
        'bid_amount_local_micro is required when automatically_select_bid is false'
      );
    });

    it('should allow manual bidding with proper bid amount', async () => {
      const manualBidData = {
        ...baseLineItemData,
        automatically_select_bid: false,
        bid_amount_local_micro: 10000000, // $10 in micro units
      };

      const response = await client.lineItems.create(testAccountId, manualBidData);
      expect(response.data).toHaveProperty('id');
      // The mock server returns what it wants, not necessarily what we send
      expect(response.data).toBeDefined();
    });

    it('should validate bid amount when provided', async () => {
      const invalidBidData = {
        ...baseLineItemData,
        bid_amount_local_micro: 500000, // Below minimum of 1000000
      };

      await expect(client.lineItems.create(testAccountId, invalidBidData)).rejects.toThrow(
        'Budget amount must be at least 1000000 micro currency units'
      );
    });

    it('should validate date range when end_time is provided', async () => {
      const invalidDateRangeData = {
        ...baseLineItemData,
        start_time: '2023-01-08T00:00:00Z',
        end_time: '2023-01-01T00:00:00Z', // end before start
        automatically_select_bid: true, // Ensure bid validation passes first
      };

      await expect(client.lineItems.create(testAccountId, invalidDateRangeData)).rejects.toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should allow valid date range', async () => {
      const validDateRangeData = {
        ...baseLineItemData,
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
        automatically_select_bid: true,
      };

      const response = await client.lineItems.create(testAccountId, validDateRangeData);
      expect(response.data).toHaveProperty('id');
    });

    it('should validate objective-product type compatibility: APP_INSTALLS with PROMOTED_ACCOUNT', async () => {
      const incompatibleData = {
        ...baseLineItemData,
        objective: 'APP_INSTALLS' as const,
        product_type: 'PROMOTED_ACCOUNT' as const,
        automatically_select_bid: true,
      };

      await expect(client.lineItems.create(testAccountId, incompatibleData)).rejects.toThrow(
        "Objective 'APP_INSTALLS' is not compatible with product type 'PROMOTED_ACCOUNT'"
      );
    });

    it('should validate objective-product type compatibility: APP_CLICKS with PROMOTED_ACCOUNT', async () => {
      const incompatibleData = {
        ...baseLineItemData,
        objective: 'APP_CLICKS' as const,
        product_type: 'PROMOTED_ACCOUNT' as const,
        automatically_select_bid: true,
      };

      await expect(client.lineItems.create(testAccountId, incompatibleData)).rejects.toThrow(
        "Objective 'APP_CLICKS' is not compatible with product type 'PROMOTED_ACCOUNT'"
      );
    });

    it('should validate objective-product type compatibility: FOLLOWERS with PROMOTED_TWEETS', async () => {
      const incompatibleData = {
        ...baseLineItemData,
        objective: 'FOLLOWERS' as const,
        product_type: 'PROMOTED_TWEETS' as const,
        automatically_select_bid: true,
      };

      await expect(client.lineItems.create(testAccountId, incompatibleData)).rejects.toThrow(
        "Objective 'FOLLOWERS' is not compatible with product type 'PROMOTED_TWEETS'"
      );
    });

    it('should allow compatible objective-product type combinations', async () => {
      const compatibleData = {
        ...baseLineItemData,
        objective: 'FOLLOWERS' as const,
        product_type: 'PROMOTED_ACCOUNT' as const,
        automatically_select_bid: true,
      };

      const response = await client.lineItems.create(testAccountId, compatibleData);
      expect(response.data).toHaveProperty('id');
    });

    it('should sanitize parameters by removing null/undefined values', async () => {
      const dataWithNulls = {
        ...baseLineItemData,
        optional_field: null,
        another_optional: undefined,
        valid_field: 'keep this',
        automatically_select_bid: true,
      };

      const response = await client.lineItems.create(
        testAccountId,
        dataWithNulls as LineItemCreateData
      );
      expect(response.data).toHaveProperty('id');
    });
  });

  describe('list method', () => {
    it('should list line items without options', async () => {
      const response = await client.lineItems.list(testAccountId);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should list line items with options', async () => {
      const options = {
        count: 10,
        cursor: 'test-cursor',
        with_deleted: true,
        campaign_ids: ['campaign123'],
      };

      const response = await client.lineItems.list(testAccountId, options);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.request.params).toBeDefined();
    });

    it('should sanitize list options', async () => {
      const optionsWithNulls = {
        count: 10,
        cursor: undefined,
        with_deleted: undefined,
        campaign_ids: ['campaign123'],
      };

      const response = await client.lineItems.list(
        testAccountId,
        optionsWithNulls as LineItemListOptions
      );
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('getLineItem method', () => {
    it('should get a specific line item', async () => {
      const lineItemId = 'lineitem123';
      const response = await client.lineItems.getLineItem(testAccountId, lineItemId);
      expect(response.data).toHaveProperty('id', lineItemId);
    });
  });

  describe('update method validation', () => {
    const lineItemId = 'lineitem123';

    it('should update line item without validation when no restricted fields are provided', async () => {
      const updateData = {
        paused: true,
        deleted: false,
      };

      const response = await client.lineItems.update(testAccountId, lineItemId, updateData);
      expect(response.data).toHaveProperty('id', lineItemId);
    });

    it('should validate name length when name is provided', async () => {
      const updateData = {
        name: 'x'.repeat(300), // Exceeds 280 character limit
      };

      await expect(client.lineItems.update(testAccountId, lineItemId, updateData)).rejects.toThrow(
        'Line item name cannot exceed 280 characters'
      );
    });

    it('should allow valid name updates', async () => {
      const updateData = {
        name: 'Updated Line Item Name',
      };

      const response = await client.lineItems.update(testAccountId, lineItemId, updateData);
      expect(response.data.name).toBe('Updated Line Item Name');
    });

    it('should validate bid amount when provided (including zero)', async () => {
      const updateData = {
        bid_amount_local_micro: 0, // Invalid: below minimum
      };

      await expect(client.lineItems.update(testAccountId, lineItemId, updateData)).rejects.toThrow(
        'Budget amount must be at least 1000000 micro currency units'
      );
    });

    it('should allow valid bid amount updates', async () => {
      const updateData = {
        bid_amount_local_micro: 5000000, // $5 in micro units
      };

      const response = await client.lineItems.update(testAccountId, lineItemId, updateData);
      expect(response.data).toHaveProperty('id', lineItemId);
      expect(response.data.bid_amount_local_micro).toBeDefined();
    });

    it('should validate date range when both start and end times are provided', async () => {
      const updateData = {
        start_time: '2023-01-08T00:00:00Z',
        end_time: '2023-01-01T00:00:00Z', // end before start
      };

      await expect(client.lineItems.update(testAccountId, lineItemId, updateData)).rejects.toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should allow valid date range updates', async () => {
      const updateData = {
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-08T00:00:00Z',
      };

      const response = await client.lineItems.update(testAccountId, lineItemId, updateData);
      expect(response.data).toHaveProperty('id', lineItemId);
    });

    it('should skip date validation when only one time field is provided', async () => {
      const updateDataStartOnly = {
        start_time: '2023-01-01T00:00:00Z',
        // no end_time - should not validate range
      };

      const response1 = await client.lineItems.update(
        testAccountId,
        lineItemId,
        updateDataStartOnly
      );
      expect(response1.data).toHaveProperty('id', lineItemId);

      const updateDataEndOnly = {
        end_time: '2023-01-08T00:00:00Z',
        // no start_time - should not validate range
      };

      const response2 = await client.lineItems.update(testAccountId, lineItemId, updateDataEndOnly);
      expect(response2.data).toHaveProperty('id', lineItemId);
    });

    it('should sanitize update parameters', async () => {
      const updateData = {
        name: 'Updated Name',
        null_field: null,
        undefined_field: undefined,
        paused: false,
      };

      const response = await client.lineItems.update(
        testAccountId,
        lineItemId,
        updateData as LineItemUpdateData
      );
      expect(response.data).toHaveProperty('id', lineItemId);
      expect(response.data.name).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete a line item', async () => {
      const lineItemId = 'lineitem123';
      const response = await client.lineItems.delete(testAccountId, lineItemId);
      expect(response.data).toHaveProperty('id', lineItemId);
      expect(response.data.deleted).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings in validation', async () => {
      const baseData = {
        name: 'Test Line Item',
        campaign_id: 'campaign123',
        objective: 'ENGAGEMENT' as const,
        product_type: 'PROMOTED_TWEETS' as const,
        bid_unit: 'ENGAGEMENT' as const,
        start_time: '2023-01-01T00:00:00Z',
      };

      // Test empty name
      await expect(
        client.lineItems.create(testAccountId, { ...baseData, name: '' })
      ).rejects.toThrow('Missing required fields: name');

      // Test empty campaign_id
      await expect(
        client.lineItems.create(testAccountId, { ...baseData, campaign_id: '' })
      ).rejects.toThrow('Missing required fields: campaign_id');
    });

    it('should handle bid amount edge cases', async () => {
      const baseData = {
        name: 'Test Line Item',
        campaign_id: 'campaign123',
        objective: 'ENGAGEMENT' as const,
        product_type: 'PROMOTED_TWEETS' as const,
        bid_unit: 'ENGAGEMENT' as const,
        start_time: '2023-01-01T00:00:00Z',
      };

      // Test minimum valid bid amount
      const minBidData = {
        ...baseData,
        bid_amount_local_micro: 1000000, // Exactly minimum
      };

      const response = await client.lineItems.create(testAccountId, minBidData);
      expect(response.data).toHaveProperty('id');
    });
  });
});
