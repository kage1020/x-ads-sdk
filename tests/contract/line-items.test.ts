import { describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { LineItem } from '@/types/campaign';

describe('Line Items API Contract', () => {
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
  const campaignId = 'campaign123';

  describe('POST /accounts/:accountId/line_items', () => {
    it('should create a line item with valid data', async () => {
      const lineItemData = {
        name: 'Test Line Item',
        campaign_id: campaignId,
        objective: 'ENGAGEMENT' as const,
        product_type: 'PROMOTED_TWEETS' as const,
        bid_unit: 'ENGAGEMENT' as const,
        bid_type: 'AUTO' as const,
        automatically_select_bid: true,
        start_time: new Date().toISOString(),
        paused: true,
      };

      const response = await client.lineItems.create(accountId, lineItemData);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toMatch(/^[a-z0-9]+$/);
      expect(response.data.name).toBe(lineItemData.name);
      expect(response.data.campaign_id).toBe(campaignId);
      expect(response.data.objective).toBe(lineItemData.objective);
      expect(response.data.product_type).toBe(lineItemData.product_type);
      expect(response.data.paused).toBe(true);
      expect(response.data.deleted).toBe(false);
    });

    it('should reject line item creation with invalid objective', async () => {
      const invalidData = {
        name: 'Test Line Item',
        campaign_id: campaignId,
        objective: 'INVALID_OBJECTIVE' as 'ENGAGEMENT',
        product_type: 'PROMOTED_TWEETS' as const,
        bid_unit: 'ENGAGEMENT' as const,
        bid_type: 'AUTO' as const,
        automatically_select_bid: true,
        start_time: new Date().toISOString(),
        paused: true,
      };

      await expect(client.lineItems.create(accountId, invalidData)).rejects.toThrow();
    });
  });

  describe('GET /accounts/:accountId/line_items', () => {
    it('should list line items for account', async () => {
      const response = await client.lineItems.list(accountId);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThanOrEqual(0);

      if (response.data.length > 0) {
        const lineItem = response.data[0] as LineItem;
        expect(lineItem.id).toBeDefined();
        expect(lineItem.name).toBeDefined();
        expect(lineItem.campaign_id).toBeDefined();
        expect(typeof lineItem.paused).toBe('boolean');
        expect(typeof lineItem.deleted).toBe('boolean');
      }
    });
  });

  describe('GET /accounts/:accountId/line_items/:lineItemId', () => {
    it('should get single line item by ID', async () => {
      const lineItemId = 'lineitem123';
      const response = await client.lineItems.getLineItem(accountId, lineItemId);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(lineItemId);
      expect(response.data.campaign_id).toBeDefined();
      expect(response.data.name).toBeDefined();
      expect(typeof response.data.paused).toBe('boolean');
    });
  });

  describe('PUT /accounts/:accountId/line_items/:lineItemId', () => {
    it('should update line item with valid data', async () => {
      const lineItemId = 'lineitem123';
      const updateData = {
        name: 'Updated Line Item Name',
        paused: false,
        bid_amount_local_micro: 50000000,
      };

      const response = await client.lineItems.update(accountId, lineItemId, updateData);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(lineItemId);
      expect(response.data.name).toBe(updateData.name);
      expect(response.data.paused).toBe(false);
    });
  });

  describe('DELETE /accounts/:accountId/line_items/:lineItemId', () => {
    it('should delete line item and mark as deleted', async () => {
      const lineItemId = 'lineitem123';

      const response = await client.lineItems.delete(accountId, lineItemId);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(lineItemId);
      expect(response.data.deleted).toBe(true);
    });
  });
});
