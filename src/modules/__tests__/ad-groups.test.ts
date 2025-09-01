import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  AdGroup,
  AdGroupListParams,
  CreateAdGroupData,
  UpdateAdGroupData,
} from '../../types/ad-group.js';
import {
  AdGroupObjective,
  AdGroupPlacement,
  AdGroupStatus,
  BidType,
} from '../../types/ad-group.js';
import type { PaginatedResponse } from '../../types/common.js';
import { AdGroupsModule } from '../ad-groups.js';

describe('AdGroupsModule', () => {
  let mockClient: HttpClient;
  let adGroupsModule: AdGroupsModule;

  const mockAdGroup: AdGroup = {
    id: 'adgroup123',
    account_id: 'account123',
    campaign_id: 'campaign123',
    name: 'Test Ad Group',
    status: AdGroupStatus.ACTIVE,
    placement: AdGroupPlacement.ALL_ON_TWITTER,
    objective: AdGroupObjective.WEBSITE_CLICKS,
    start_time: '2023-01-01T00:00:00Z',
    end_time: '2023-12-31T23:59:59Z',
    bid_amount_local_micro: 1000000,
    bid_type: BidType.MAX,
    target_cpa_local_micro: 5000000,
    daily_budget_amount_local_micro: 10000000,
    total_budget_amount_local_micro: 100000000,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    deleted: false,
  };

  const mockPaginatedResponse: PaginatedResponse<AdGroup> = {
    data: [mockAdGroup],
    request: {
      params: {
        account_id: 'account123',
      },
    },
    next_cursor: 'next_cursor_value',
    previous_cursor: 'prev_cursor_value',
  };

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn().mockResolvedValue({ data: mockAdGroup }),
      put: vi.fn().mockResolvedValue({ data: mockAdGroup }),
      delete: vi.fn().mockResolvedValue(undefined),
    } as unknown as HttpClient;

    // Default GET mock returns paginated response
    vi.mocked(mockClient.get).mockResolvedValue({ data: mockPaginatedResponse });

    adGroupsModule = new AdGroupsModule(mockClient);
  });

  describe('constructor', () => {
    it('should initialize with correct base endpoint', () => {
      expect(adGroupsModule).toBeInstanceOf(AdGroupsModule);
    });
  });

  describe('list', () => {
    it('should call client.get with correct endpoint and default params', async () => {
      await adGroupsModule.list('account123');

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123/line_items', {});
    });

    it('should call client.get with custom params', async () => {
      const params: AdGroupListParams = {
        campaign_ids: ['campaign1', 'campaign2'],
        with_deleted: true,
        count: 50,
        cursor: 'test_cursor',
        sort_by: 'created_at',
      };

      await adGroupsModule.list('account123', params);

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123/line_items', params);
    });

    it('should return paginated response', async () => {
      const result = await adGroupsModule.list('account123');

      expect(result).toEqual(mockPaginatedResponse);
    });
  });

  describe('get', () => {
    it('should call client.get with correct endpoint', async () => {
      // Mock GET to return single ad group for this test
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockAdGroup });

      await adGroupsModule.get('account123', 'adgroup123');

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123/line_items/adgroup123');
    });

    it('should return ad group data', async () => {
      // Mock GET to return single ad group for this test
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockAdGroup });

      const result = await adGroupsModule.get('account123', 'adgroup123');

      expect(result).toEqual(mockAdGroup);
    });
  });

  describe('create', () => {
    const createData: CreateAdGroupData = {
      campaign_id: 'campaign123',
      name: 'New Ad Group',
      placement: AdGroupPlacement.PUBLISHER_NETWORK,
      start_time: '2023-01-01T00:00:00Z',
      end_time: '2023-12-31T23:59:59Z',
      bid_amount_local_micro: 2000000,
      bid_type: BidType.AUTO,
      target_cpa_local_micro: 6000000,
      daily_budget_amount_local_micro: 15000000,
      total_budget_amount_local_micro: 200000000,
    };

    it('should call client.post with correct endpoint and formatted data', async () => {
      await adGroupsModule.create('account123', createData);

      expect(mockClient.post).toHaveBeenCalledWith('/accounts/account123/line_items', {
        campaign_id: 'campaign123',
        name: 'New Ad Group',
        placement: AdGroupPlacement.PUBLISHER_NETWORK,
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-12-31T23:59:59Z',
        bid_amount_local_micro: 2000000,
        bid_type: BidType.AUTO,
        target_cpa_local_micro: 6000000,
        daily_budget_amount_local_micro: 15000000,
        total_budget_amount_local_micro: 200000000,
      });
    });

    it('should use default placement when not specified', async () => {
      const dataWithoutPlacement = {
        campaign_id: 'campaign123',
        name: 'New Ad Group',
      };

      await adGroupsModule.create('account123', dataWithoutPlacement);

      expect(mockClient.post).toHaveBeenCalledWith('/accounts/account123/line_items', {
        campaign_id: 'campaign123',
        name: 'New Ad Group',
        placement: 'ALL_ON_TWITTER',
        start_time: undefined,
        end_time: undefined,
        bid_amount_local_micro: undefined,
        bid_type: undefined,
        target_cpa_local_micro: undefined,
        daily_budget_amount_local_micro: undefined,
        total_budget_amount_local_micro: undefined,
      });
    });

    it('should return created ad group', async () => {
      const result = await adGroupsModule.create('account123', createData);

      expect(result).toEqual(mockAdGroup);
    });
  });

  describe('update', () => {
    const updateData: UpdateAdGroupData = {
      name: 'Updated Ad Group',
      status: AdGroupStatus.PAUSED,
      bid_amount_local_micro: 3000000,
    };

    it('should call client.put with correct endpoint and data', async () => {
      await adGroupsModule.update('account123', 'adgroup123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/accounts/account123/line_items/adgroup123',
        updateData
      );
    });

    it('should return updated ad group', async () => {
      const result = await adGroupsModule.update('account123', 'adgroup123', updateData);

      expect(result).toEqual(mockAdGroup);
    });
  });

  describe('delete', () => {
    it('should call client.delete with correct endpoint', async () => {
      await adGroupsModule.delete('account123', 'adgroup123');

      expect(mockClient.delete).toHaveBeenCalledWith('/accounts/account123/line_items/adgroup123');
    });

    it('should not return anything', async () => {
      const result = await adGroupsModule.delete('account123', 'adgroup123');

      expect(result).toBeUndefined();
    });
  });

  describe('pause', () => {
    it('should call update with PAUSED status', async () => {
      const spy = vi.spyOn(adGroupsModule, 'update');

      await adGroupsModule.pause('account123', 'adgroup123');

      expect(spy).toHaveBeenCalledWith('account123', 'adgroup123', {
        status: AdGroupStatus.PAUSED,
      });
    });

    it('should return updated ad group', async () => {
      const result = await adGroupsModule.pause('account123', 'adgroup123');

      expect(result).toEqual(mockAdGroup);
    });
  });

  describe('activate', () => {
    it('should call update with ACTIVE status', async () => {
      const spy = vi.spyOn(adGroupsModule, 'update');

      await adGroupsModule.activate('account123', 'adgroup123');

      expect(spy).toHaveBeenCalledWith('account123', 'adgroup123', {
        status: AdGroupStatus.ACTIVE,
      });
    });

    it('should return updated ad group', async () => {
      const result = await adGroupsModule.activate('account123', 'adgroup123');

      expect(result).toEqual(mockAdGroup);
    });
  });

  describe('listByCampaign', () => {
    it('should call list with campaign_ids parameter', async () => {
      const spy = vi.spyOn(adGroupsModule, 'list');
      const params = { count: 25, sort_by: 'name' };

      await adGroupsModule.listByCampaign('account123', 'campaign123', params);

      expect(spy).toHaveBeenCalledWith('account123', {
        ...params,
        campaign_ids: ['campaign123'],
      });
    });

    it('should call list with default empty params', async () => {
      const spy = vi.spyOn(adGroupsModule, 'list');

      await adGroupsModule.listByCampaign('account123', 'campaign123');

      expect(spy).toHaveBeenCalledWith('account123', {
        campaign_ids: ['campaign123'],
      });
    });

    it('should return paginated response', async () => {
      const result = await adGroupsModule.listByCampaign('account123', 'campaign123');

      expect(result).toEqual(mockPaginatedResponse);
    });
  });

  describe('getByStatus', () => {
    const mockActiveAdGroup = { ...mockAdGroup, status: AdGroupStatus.ACTIVE };
    const mockPausedAdGroup = { ...mockAdGroup, id: 'adgroup456', status: AdGroupStatus.PAUSED };
    const mockDeletedAdGroup = { ...mockAdGroup, id: 'adgroup789', status: AdGroupStatus.DELETED };

    const mockMixedResponse: PaginatedResponse<AdGroup> = {
      data: [mockActiveAdGroup, mockPausedAdGroup, mockDeletedAdGroup],
      request: { params: { account_id: 'account123' } },
      next_cursor: 'next',
      previous_cursor: 'prev',
    };

    beforeEach(() => {
      vi.spyOn(adGroupsModule, 'list').mockResolvedValue(mockMixedResponse);
    });

    it('should filter active ad groups', async () => {
      const result = await adGroupsModule.getByStatus('account123', AdGroupStatus.ACTIVE);

      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockActiveAdGroup],
      });
    });

    it('should filter paused ad groups', async () => {
      const result = await adGroupsModule.getByStatus('account123', AdGroupStatus.PAUSED);

      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockPausedAdGroup],
      });
    });

    it('should filter deleted ad groups and set with_deleted to true', async () => {
      const spy = vi.spyOn(adGroupsModule, 'list');

      const result = await adGroupsModule.getByStatus('account123', AdGroupStatus.DELETED);

      expect(spy).toHaveBeenCalledWith('account123', { with_deleted: true });
      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockDeletedAdGroup],
      });
    });

    it('should merge additional params except with_deleted', async () => {
      const spy = vi.spyOn(adGroupsModule, 'list');
      const params = { count: 50, sort_by: 'created_at', cursor: 'test' };

      await adGroupsModule.getByStatus('account123', AdGroupStatus.ACTIVE, params);

      expect(spy).toHaveBeenCalledWith('account123', {
        ...params,
        with_deleted: false,
      });
    });

    it('should override with_deleted for deleted status even if params include it', async () => {
      const spy = vi.spyOn(adGroupsModule, 'list');

      await adGroupsModule.getByStatus('account123', AdGroupStatus.DELETED, { count: 25 });

      expect(spy).toHaveBeenCalledWith('account123', {
        count: 25,
        with_deleted: true,
      });
    });
  });

  describe('getActive', () => {
    it('should call getByStatus with ACTIVE status', async () => {
      const spy = vi.spyOn(adGroupsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await adGroupsModule.getActive('account123', params);

      expect(spy).toHaveBeenCalledWith('account123', AdGroupStatus.ACTIVE, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(adGroupsModule, 'getByStatus');

      await adGroupsModule.getActive('account123');

      expect(spy).toHaveBeenCalledWith('account123', AdGroupStatus.ACTIVE, undefined);
    });

    it('should return filtered active ad groups', async () => {
      const mockFilteredResponse = { ...mockPaginatedResponse };
      vi.spyOn(adGroupsModule, 'getByStatus').mockResolvedValue(mockFilteredResponse);

      const result = await adGroupsModule.getActive('account123');

      expect(result).toEqual(mockFilteredResponse);
    });
  });

  describe('getPaused', () => {
    it('should call getByStatus with PAUSED status', async () => {
      const spy = vi.spyOn(adGroupsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await adGroupsModule.getPaused('account123', params);

      expect(spy).toHaveBeenCalledWith('account123', AdGroupStatus.PAUSED, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(adGroupsModule, 'getByStatus');

      await adGroupsModule.getPaused('account123');

      expect(spy).toHaveBeenCalledWith('account123', AdGroupStatus.PAUSED, undefined);
    });
  });

  describe('getDeleted', () => {
    it('should call getByStatus with DELETED status', async () => {
      const spy = vi.spyOn(adGroupsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await adGroupsModule.getDeleted('account123', params);

      expect(spy).toHaveBeenCalledWith('account123', AdGroupStatus.DELETED, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(adGroupsModule, 'getByStatus');

      await adGroupsModule.getDeleted('account123');

      expect(spy).toHaveBeenCalledWith('account123', AdGroupStatus.DELETED, undefined);
    });
  });

  describe('getActiveByCampaign', () => {
    const mockActiveAdGroup = { ...mockAdGroup, status: AdGroupStatus.ACTIVE };
    const mockPausedAdGroup = { ...mockAdGroup, id: 'adgroup456', status: AdGroupStatus.PAUSED };

    const mockCampaignResponse: PaginatedResponse<AdGroup> = {
      data: [mockActiveAdGroup, mockPausedAdGroup],
      request: { params: { account_id: 'account123' } },
      next_cursor: 'next',
      previous_cursor: 'prev',
    };

    beforeEach(() => {
      vi.spyOn(adGroupsModule, 'listByCampaign').mockResolvedValue(mockCampaignResponse);
    });

    it('should call listByCampaign and filter active ad groups', async () => {
      const spy = vi.spyOn(adGroupsModule, 'listByCampaign');
      const params = { count: 25, sort_by: 'name' };

      const result = await adGroupsModule.getActiveByCampaign('account123', 'campaign123', params);

      expect(spy).toHaveBeenCalledWith('account123', 'campaign123', params);
      expect(result).toEqual({
        ...mockCampaignResponse,
        data: [mockActiveAdGroup],
      });
    });

    it('should work with undefined params', async () => {
      const spy = vi.spyOn(adGroupsModule, 'listByCampaign');

      const result = await adGroupsModule.getActiveByCampaign('account123', 'campaign123');

      expect(spy).toHaveBeenCalledWith('account123', 'campaign123', undefined);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].status).toBe(AdGroupStatus.ACTIVE);
    });

    it('should return empty data array when no active ad groups found', async () => {
      const mockEmptyActiveResponse = {
        ...mockCampaignResponse,
        data: [mockPausedAdGroup],
      };
      vi.spyOn(adGroupsModule, 'listByCampaign').mockResolvedValue(mockEmptyActiveResponse);

      const result = await adGroupsModule.getActiveByCampaign('account123', 'campaign123');

      expect(result.data).toHaveLength(0);
    });
  });

  describe('error handling', () => {
    it('should propagate client errors from list', async () => {
      const error = new Error('Network error');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(adGroupsModule.list('account123')).rejects.toThrow('Network error');
    });

    it('should propagate client errors from get', async () => {
      const error = new Error('Not found');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(adGroupsModule.get('account123', 'adgroup123')).rejects.toThrow('Not found');
    });

    it('should propagate client errors from create', async () => {
      const error = new Error('Validation error');
      vi.mocked(mockClient.post).mockRejectedValue(error);

      const createData = { campaign_id: 'campaign123', name: 'Test' };
      await expect(adGroupsModule.create('account123', createData)).rejects.toThrow(
        'Validation error'
      );
    });

    it('should propagate client errors from update', async () => {
      const error = new Error('Update failed');
      vi.mocked(mockClient.put).mockRejectedValue(error);

      const updateData = { name: 'Updated' };
      await expect(adGroupsModule.update('account123', 'adgroup123', updateData)).rejects.toThrow(
        'Update failed'
      );
    });

    it('should propagate client errors from delete', async () => {
      const error = new Error('Delete failed');
      vi.mocked(mockClient.delete).mockRejectedValue(error);

      await expect(adGroupsModule.delete('account123', 'adgroup123')).rejects.toThrow(
        'Delete failed'
      );
    });
  });

  describe('integration with all enum values', () => {
    it('should work with all AdGroupStatus values', async () => {
      const statuses = [AdGroupStatus.ACTIVE, AdGroupStatus.PAUSED, AdGroupStatus.DELETED];

      for (const status of statuses) {
        await adGroupsModule.getByStatus('account123', status);
        expect(mockClient.get).toHaveBeenCalled();
      }
    });

    it('should work with all AdGroupPlacement values in create', async () => {
      const placements = [AdGroupPlacement.ALL_ON_TWITTER, AdGroupPlacement.PUBLISHER_NETWORK];

      for (const placement of placements) {
        const createData = { campaign_id: 'campaign123', name: 'Test', placement };

        await adGroupsModule.create('account123', createData);

        expect(mockClient.post).toHaveBeenCalledWith(
          '/accounts/account123/line_items',
          expect.objectContaining({
            placement,
          })
        );
      }
    });

    it('should work with all BidType values in create', async () => {
      const bidTypes = [BidType.AUTO, BidType.MAX, BidType.TARGET];

      for (const bidType of bidTypes) {
        const createData = { campaign_id: 'campaign123', name: 'Test', bid_type: bidType };

        await adGroupsModule.create('account123', createData);

        expect(mockClient.post).toHaveBeenCalledWith(
          '/accounts/account123/line_items',
          expect.objectContaining({
            bid_type: bidType,
          })
        );
      }
    });
  });
});
