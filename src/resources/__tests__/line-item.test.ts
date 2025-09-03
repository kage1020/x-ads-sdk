import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  LineItemCreateRequest,
  LineItemResponse,
  LineItemUpdateRequest,
} from '../../types/resources/line-item.js';
import {
  LineItemEntityStatus,
  LineItemObjective,
  LineItemPlacement,
  LineItemProductType,
} from '../../types/resources/line-item.js';
import { LineItemResource } from '../line-item.js';

const mockHttpClient = {
  request: vi.fn(),
  getAPIVersion: vi.fn().mockReturnValue('12'),
} as unknown as HttpClient;

describe('LineItemResource', () => {
  let resource: LineItemResource;
  const accountId = 'test-account-id';

  beforeEach(() => {
    resource = new LineItemResource(mockHttpClient, accountId);
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with httpClient and accountId', () => {
      expect(resource).toBeInstanceOf(LineItemResource);
      expect((resource as unknown as { accountId: string }).accountId).toBe(accountId);
      expect((resource as unknown as { httpClient: HttpClient }).httpClient).toBe(mockHttpClient);
    });
  });

  describe('list', () => {
    it('should list line items for the account', async () => {
      const mockResponse: LineItemResponse = {
        data: [
          {
            id: 'line-item-1',
            name: 'Test Line Item',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.ACTIVE,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
        total_count: 1,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.list();

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/line_items`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should list line items with options', async () => {
      const options = { params: { count: 10 } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.list(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/line_items`,
        params: { count: 10 },
      });
    });

    it('should list line items with sort_by parameter', async () => {
      const options = { params: { sort_by: 'bid_amount_local_micro-desc' as const } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.list(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/line_items`,
        params: { sort_by: 'bid_amount_local_micro-desc' },
      });
    });

    it('should list line items with updated_at sort parameter', async () => {
      const options = { params: { sort_by: 'updated_at-asc' as const } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.list(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/line_items`,
        params: { sort_by: 'updated_at-asc' },
      });
    });
  });

  describe('get', () => {
    it('should get a specific line item by ID', async () => {
      const lineItemId = 'line-item-1';
      const mockResponse: LineItemResponse = {
        data: [
          {
            id: lineItemId,
            name: 'Test Line Item',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.ACTIVE,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.get(lineItemId);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/line_items/${lineItemId}`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get line item with options', async () => {
      const lineItemId = 'line-item-1';
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.get(lineItemId, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/line_items/${lineItemId}`,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('create', () => {
    it('should create a new line item', async () => {
      const createData: LineItemCreateRequest = {
        name: 'New Line Item',
        campaign_id: 'campaign-1',
        objective: LineItemObjective.AWARENESS,
        product_type: LineItemProductType.PROMOTED_TWEETS,
        placements: [LineItemPlacement.ALL_ON_TWITTER],
        entity_status: LineItemEntityStatus.ACTIVE,
      };

      const mockResponse: LineItemResponse = {
        data: [
          {
            id: 'new-line-item-id',
            name: 'New Line Item',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.ACTIVE,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.create(createData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: `/12/accounts/${accountId}/line_items`,
        body: createData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create line item with options', async () => {
      const createData: LineItemCreateRequest = {
        name: 'New Line Item',
        campaign_id: 'campaign-1',
        objective: LineItemObjective.AWARENESS,
        product_type: LineItemProductType.PROMOTED_TWEETS,
        placements: [LineItemPlacement.ALL_ON_TWITTER],
      };
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.create(createData, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: `/12/accounts/${accountId}/line_items`,
        body: createData,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('update', () => {
    it('should update a line item', async () => {
      const lineItemId = 'line-item-1';
      const updateData: LineItemUpdateRequest = {
        name: 'Updated Line Item',
        entity_status: LineItemEntityStatus.PAUSED,
        bid_amount_local_micro: 1000000,
      };

      const mockResponse: LineItemResponse = {
        data: [
          {
            id: lineItemId,
            name: 'Updated Line Item',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.PAUSED,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            bid_amount_local_micro: 1000000,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.update(lineItemId, updateData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: `/12/accounts/${accountId}/line_items/${lineItemId}`,
        body: updateData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should update line item with options', async () => {
      const lineItemId = 'line-item-1';
      const updateData: LineItemUpdateRequest = {
        name: 'Updated Line Item',
      };
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.update(lineItemId, updateData, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: `/12/accounts/${accountId}/line_items/${lineItemId}`,
        body: updateData,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('delete', () => {
    it('should delete a line item', async () => {
      const lineItemId = 'line-item-1';
      const mockResponse: LineItemResponse = {
        data: [
          {
            id: lineItemId,
            name: 'Deleted Line Item',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.ACTIVE,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: true,
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.delete(lineItemId);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: `/12/accounts/${accountId}/line_items/${lineItemId}`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should delete line item with options', async () => {
      const lineItemId = 'line-item-1';
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.delete(lineItemId, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: `/12/accounts/${accountId}/line_items/${lineItemId}`,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('error handling', () => {
    it('should propagate errors from httpClient', async () => {
      const error = new Error('Network error');
      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(resource.list()).rejects.toThrow('Network error');
    });

    it('should handle errors in create method', async () => {
      const error = new Error('Validation error');
      const createData: LineItemCreateRequest = {
        name: 'Invalid Line Item',
        campaign_id: 'invalid-campaign',
        objective: LineItemObjective.AWARENESS,
        product_type: LineItemProductType.PROMOTED_TWEETS,
        placements: [LineItemPlacement.ALL_ON_TWITTER],
      };

      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(resource.create(createData)).rejects.toThrow('Validation error');
    });

    it('should handle errors in update method', async () => {
      const error = new Error('Not found');
      const updateData: LineItemUpdateRequest = {
        name: 'Updated Name',
      };

      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(resource.update('invalid-id', updateData)).rejects.toThrow('Not found');
    });

    it('should handle errors in delete method', async () => {
      const error = new Error('Permission denied');
      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(resource.delete('protected-id')).rejects.toThrow('Permission denied');
    });
  });

  describe('edge cases', () => {
    it('should handle empty line item data', async () => {
      const mockResponse: LineItemResponse = {
        data: [],
        request: { params: {} },
        total_count: 0,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.list();
      expect(result.data).toEqual([]);
      expect(result.total_count).toBe(0);
    });

    it('should handle line item with minimal required fields', async () => {
      const createData: LineItemCreateRequest = {
        campaign_id: 'campaign-1',
        objective: LineItemObjective.AWARENESS,
        product_type: LineItemProductType.PROMOTED_TWEETS,
        placements: [LineItemPlacement.ALL_ON_TWITTER],
      };

      const mockResponse: LineItemResponse = {
        data: [
          {
            id: 'minimal-line-item',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.ACTIVE,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.create(createData);
      expect(result.data[0].id).toBe('minimal-line-item');
    });

    it('should handle line item with all optional fields', async () => {
      const updateData: LineItemUpdateRequest = {
        name: 'Full Update',
        entity_status: LineItemEntityStatus.PAUSED,
        bid_amount_local_micro: 1000000,
        target_cpa_local_micro: 2000000,
        daily_budget_amount_local_micro: 5000000,
        total_budget_amount_local_micro: 100000000,
        automatically_select_bid: true,
      };

      const mockResponse: LineItemResponse = {
        data: [
          {
            id: 'full-line-item',
            name: 'Full Update',
            campaign_id: 'campaign-1',
            entity_status: LineItemEntityStatus.PAUSED,
            objective: LineItemObjective.AWARENESS,
            product_type: LineItemProductType.PROMOTED_TWEETS,
            placements: [LineItemPlacement.ALL_ON_TWITTER],
            bid_amount_local_micro: 1000000,
            target_cpa_local_micro: 2000000,
            daily_budget_amount_local_micro: 5000000,
            total_budget_amount_local_micro: 100000000,
            automatically_select_bid: true,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.update('full-line-item', updateData);
      expect(result.data[0]).toMatchObject({
        id: 'full-line-item',
        name: 'Full Update',
        entity_status: LineItemEntityStatus.PAUSED,
        bid_amount_local_micro: 1000000,
        target_cpa_local_micro: 2000000,
        daily_budget_amount_local_micro: 5000000,
        total_budget_amount_local_micro: 100000000,
        automatically_select_bid: true,
      });
    });
  });
});
