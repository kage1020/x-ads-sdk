import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import { CursorPaginator } from '../../paginators/index.js';
import type {
  Campaign,
  CampaignListParams,
  CreateCampaignData,
  UpdateCampaignData,
} from '../../types/campaign.js';
import { CampaignObjective, CampaignPlacement, CampaignStatus } from '../../types/campaign.js';
import type { PaginatedResponse } from '../../types/common.js';
import { CampaignsModule } from '../campaigns.js';

describe('CampaignsModule', () => {
  let mockClient: HttpClient;
  let campaignsModule: CampaignsModule;

  const mockCampaign: Campaign = {
    id: 'campaign123',
    account_id: 'account123',
    name: 'Test Campaign',
    status: CampaignStatus.ACTIVE,
    objective: CampaignObjective.WEBSITE_CLICKS,
    placement: CampaignPlacement.ALL_ON_TWITTER,
    start_time: '2023-01-01T00:00:00Z',
    end_time: '2023-12-31T23:59:59Z',
    daily_budget_amount_local_micro: 50000000,
    total_budget_amount_local_micro: 1000000000,
    currency: 'USD',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    deleted: false,
  };

  const mockPaginatedResponse: PaginatedResponse<Campaign> = {
    data: [mockCampaign],
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
      post: vi.fn().mockResolvedValue({ data: mockCampaign }),
      put: vi.fn().mockResolvedValue({ data: mockCampaign }),
      delete: vi.fn().mockResolvedValue(undefined),
    } as unknown as HttpClient;

    // Default GET mock returns paginated response
    vi.mocked(mockClient.get).mockResolvedValue({ data: mockPaginatedResponse });

    campaignsModule = new CampaignsModule(mockClient);
  });

  describe('constructor', () => {
    it('should initialize with correct base endpoint', () => {
      expect(campaignsModule).toBeInstanceOf(CampaignsModule);
    });
  });

  describe('list', () => {
    it('should call client.get with correct endpoint and default params', async () => {
      await campaignsModule.list('account123');

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123/campaigns', {});
    });

    it('should call client.get with custom params', async () => {
      const params: CampaignListParams = {
        campaign_ids: ['campaign1', 'campaign2'],
        with_deleted: true,
        count: 50,
        cursor: 'test_cursor',
        sort_by: 'created_at',
        funding_instrument_ids: ['funding1'],
      };

      await campaignsModule.list('account123', params);

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123/campaigns', params);
    });

    it('should return paginated response', async () => {
      const result = await campaignsModule.list('account123');

      expect(result).toEqual(mockPaginatedResponse);
    });
  });

  describe('get', () => {
    it('should call client.get with correct endpoint', async () => {
      // Mock GET to return single campaign for this test
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockCampaign });

      await campaignsModule.get('account123', 'campaign123');

      expect(mockClient.get).toHaveBeenCalledWith('/accounts/account123/campaigns/campaign123');
    });

    it('should return campaign data', async () => {
      // Mock GET to return single campaign for this test
      vi.mocked(mockClient.get).mockResolvedValueOnce({ data: mockCampaign });

      const result = await campaignsModule.get('account123', 'campaign123');

      expect(result).toEqual(mockCampaign);
    });
  });

  describe('create', () => {
    const createData: CreateCampaignData = {
      name: 'New Campaign',
      objective: CampaignObjective.VIDEO_VIEWS,
      placement: CampaignPlacement.PUBLISHER_NETWORK,
      start_time: '2023-01-01T00:00:00Z',
      end_time: '2023-12-31T23:59:59Z',
      daily_budget_amount_local_micro: 25000000,
      total_budget_amount_local_micro: 500000000,
      currency: 'EUR',
    };

    it('should call client.post with correct endpoint and formatted data', async () => {
      await campaignsModule.create('account123', createData);

      expect(mockClient.post).toHaveBeenCalledWith('/accounts/account123/campaigns', {
        name: 'New Campaign',
        objective: CampaignObjective.VIDEO_VIEWS,
        placement: CampaignPlacement.PUBLISHER_NETWORK,
        currency: 'EUR',
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-12-31T23:59:59Z',
        daily_budget_amount_local_micro: 25000000,
        total_budget_amount_local_micro: 500000000,
      });
    });

    it('should use default placement and currency when not specified', async () => {
      const minimalData = {
        name: 'Minimal Campaign',
        objective: CampaignObjective.ENGAGEMENTS,
      };

      await campaignsModule.create('account123', minimalData);

      expect(mockClient.post).toHaveBeenCalledWith('/accounts/account123/campaigns', {
        name: 'Minimal Campaign',
        objective: CampaignObjective.ENGAGEMENTS,
        placement: 'ALL_ON_TWITTER',
        currency: 'USD',
        start_time: undefined,
        end_time: undefined,
        daily_budget_amount_local_micro: undefined,
        total_budget_amount_local_micro: undefined,
      });
    });

    it('should return created campaign', async () => {
      const result = await campaignsModule.create('account123', createData);

      expect(result).toEqual(mockCampaign);
    });
  });

  describe('update', () => {
    const updateData: UpdateCampaignData = {
      name: 'Updated Campaign',
      status: CampaignStatus.PAUSED,
      daily_budget_amount_local_micro: 75000000,
    };

    it('should call client.put with correct endpoint and data', async () => {
      await campaignsModule.update('account123', 'campaign123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/accounts/account123/campaigns/campaign123',
        updateData
      );
    });

    it('should return updated campaign', async () => {
      const result = await campaignsModule.update('account123', 'campaign123', updateData);

      expect(result).toEqual(mockCampaign);
    });
  });

  describe('delete', () => {
    it('should call client.delete with correct endpoint', async () => {
      await campaignsModule.delete('account123', 'campaign123');

      expect(mockClient.delete).toHaveBeenCalledWith('/accounts/account123/campaigns/campaign123');
    });

    it('should not return anything', async () => {
      const result = await campaignsModule.delete('account123', 'campaign123');

      expect(result).toBeUndefined();
    });
  });

  describe('pause', () => {
    it('should call update with PAUSED status', async () => {
      const spy = vi.spyOn(campaignsModule, 'update');

      await campaignsModule.pause('account123', 'campaign123');

      expect(spy).toHaveBeenCalledWith('account123', 'campaign123', {
        status: CampaignStatus.PAUSED,
      });
    });

    it('should return updated campaign', async () => {
      const result = await campaignsModule.pause('account123', 'campaign123');

      expect(result).toEqual(mockCampaign);
    });
  });

  describe('activate', () => {
    it('should call update with ACTIVE status', async () => {
      const spy = vi.spyOn(campaignsModule, 'update');

      await campaignsModule.activate('account123', 'campaign123');

      expect(spy).toHaveBeenCalledWith('account123', 'campaign123', {
        status: CampaignStatus.ACTIVE,
      });
    });

    it('should return updated campaign', async () => {
      const result = await campaignsModule.activate('account123', 'campaign123');

      expect(result).toEqual(mockCampaign);
    });
  });

  describe('getByStatus', () => {
    const mockActiveCampaign = { ...mockCampaign, status: CampaignStatus.ACTIVE };
    const mockPausedCampaign = {
      ...mockCampaign,
      id: 'campaign456',
      status: CampaignStatus.PAUSED,
    };
    const mockDeletedCampaign = {
      ...mockCampaign,
      id: 'campaign789',
      status: CampaignStatus.DELETED,
    };

    const mockMixedResponse: PaginatedResponse<Campaign> = {
      data: [mockActiveCampaign, mockPausedCampaign, mockDeletedCampaign],
      request: { params: { account_id: 'account123' } },
      next_cursor: 'next',
      previous_cursor: 'prev',
    };

    beforeEach(() => {
      vi.spyOn(campaignsModule, 'list').mockResolvedValue(mockMixedResponse);
    });

    it('should filter active campaigns', async () => {
      const result = await campaignsModule.getByStatus('account123', CampaignStatus.ACTIVE);

      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockActiveCampaign],
      });
    });

    it('should filter paused campaigns', async () => {
      const result = await campaignsModule.getByStatus('account123', CampaignStatus.PAUSED);

      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockPausedCampaign],
      });
    });

    it('should filter deleted campaigns and set with_deleted to true', async () => {
      const spy = vi.spyOn(campaignsModule, 'list');

      const result = await campaignsModule.getByStatus('account123', CampaignStatus.DELETED);

      expect(spy).toHaveBeenCalledWith('account123', { with_deleted: true });
      expect(result).toEqual({
        ...mockMixedResponse,
        data: [mockDeletedCampaign],
      });
    });

    it('should merge additional params except with_deleted', async () => {
      const spy = vi.spyOn(campaignsModule, 'list');
      const params = { count: 50, sort_by: 'created_at', cursor: 'test' };

      await campaignsModule.getByStatus('account123', CampaignStatus.ACTIVE, params);

      expect(spy).toHaveBeenCalledWith('account123', {
        ...params,
        with_deleted: false,
      });
    });

    it('should override with_deleted for deleted status even if params include it', async () => {
      const spy = vi.spyOn(campaignsModule, 'list');

      await campaignsModule.getByStatus('account123', CampaignStatus.DELETED, { count: 25 });

      expect(spy).toHaveBeenCalledWith('account123', {
        count: 25,
        with_deleted: true,
      });
    });
  });

  describe('getActive', () => {
    it('should call getByStatus with ACTIVE status', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await campaignsModule.getActive('account123', params);

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.ACTIVE, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');

      await campaignsModule.getActive('account123');

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.ACTIVE, undefined);
    });

    it('should return filtered active campaigns', async () => {
      const mockFilteredResponse = { ...mockPaginatedResponse };
      vi.spyOn(campaignsModule, 'getByStatus').mockResolvedValue(mockFilteredResponse);

      const result = await campaignsModule.getActive('account123');

      expect(result).toEqual(mockFilteredResponse);
    });
  });

  describe('getPaused', () => {
    it('should call getByStatus with PAUSED status', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await campaignsModule.getPaused('account123', params);

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.PAUSED, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');

      await campaignsModule.getPaused('account123');

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.PAUSED, undefined);
    });
  });

  describe('getDeleted', () => {
    it('should call getByStatus with DELETED status', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');
      const params = { count: 25, sort_by: 'name' };

      await campaignsModule.getDeleted('account123', params);

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.DELETED, params);
    });

    it('should call getByStatus with undefined params', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');

      await campaignsModule.getDeleted('account123');

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.DELETED, undefined);
    });
  });

  describe('paginate', () => {
    it('should return a CursorPaginator instance', () => {
      const result = campaignsModule.paginate('account123');

      expect(result).toBeInstanceOf(CursorPaginator);
    });

    it('should pass params to paginator', () => {
      const params = { count: 50, sort_by: 'created_at' };

      const result = campaignsModule.paginate('account123', params);

      expect(result).toBeInstanceOf(CursorPaginator);
    });
  });

  describe('iterateAll', () => {
    it('should create paginator and iterate through items', async () => {
      const mockCampaigns = [
        { ...mockCampaign, id: 'campaign1' },
        { ...mockCampaign, id: 'campaign2' },
        { ...mockCampaign, id: 'campaign3' },
      ];

      const mockPaginator = new CursorPaginator<Campaign>(async () => ({ data: mockCampaigns }));
      mockPaginator.items = async function* () {
        for (const campaign of mockCampaigns) {
          yield campaign;
        }
      };

      vi.spyOn(campaignsModule, 'paginate').mockReturnValue(mockPaginator);

      const results: Campaign[] = [];
      for await (const campaign of campaignsModule.iterateAll('account123')) {
        results.push(campaign);
      }

      expect(results).toEqual(mockCampaigns);
    });

    it('should pass params to paginate', async () => {
      const spy = vi.spyOn(campaignsModule, 'paginate');
      const mockPaginator = new CursorPaginator<Campaign>(async () => ({ data: [mockCampaign] }));
      mockPaginator.items = async function* () {
        yield mockCampaign;
      };
      spy.mockReturnValue(mockPaginator);

      const params = { count: 25, sort_by: 'name' };

      // Start the async iterator but don't consume it fully
      const iterator = campaignsModule.iterateAll('account123', params);
      await iterator.next(); // Consume first item to trigger paginate call

      expect(spy).toHaveBeenCalledWith('account123', params);
    });

    it('should handle empty results', async () => {
      const mockPaginator = new CursorPaginator<Campaign>(async () => ({ data: [] }));
      mockPaginator.items = async function* () {
        // Empty iterator
      };

      vi.spyOn(campaignsModule, 'paginate').mockReturnValue(mockPaginator);

      const results: Campaign[] = [];
      for await (const campaign of campaignsModule.iterateAll('account123')) {
        results.push(campaign);
      }

      expect(results).toHaveLength(0);
    });
  });

  describe('error handling', () => {
    it('should propagate client errors from list', async () => {
      const error = new Error('Network error');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(campaignsModule.list('account123')).rejects.toThrow('Network error');
    });

    it('should propagate client errors from get', async () => {
      const error = new Error('Not found');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(campaignsModule.get('account123', 'campaign123')).rejects.toThrow('Not found');
    });

    it('should propagate client errors from create', async () => {
      const error = new Error('Validation error');
      vi.mocked(mockClient.post).mockRejectedValue(error);

      const createData = { name: 'Test', objective: CampaignObjective.AWARENESS };
      await expect(campaignsModule.create('account123', createData)).rejects.toThrow(
        'Validation error'
      );
    });

    it('should propagate client errors from update', async () => {
      const error = new Error('Update failed');
      vi.mocked(mockClient.put).mockRejectedValue(error);

      const updateData = { name: 'Updated' };
      await expect(campaignsModule.update('account123', 'campaign123', updateData)).rejects.toThrow(
        'Update failed'
      );
    });

    it('should propagate client errors from delete', async () => {
      const error = new Error('Delete failed');
      vi.mocked(mockClient.delete).mockRejectedValue(error);

      await expect(campaignsModule.delete('account123', 'campaign123')).rejects.toThrow(
        'Delete failed'
      );
    });
  });

  describe('integration with all enum values', () => {
    it('should work with all CampaignStatus values', async () => {
      const statuses = [CampaignStatus.ACTIVE, CampaignStatus.PAUSED, CampaignStatus.DELETED];

      for (const status of statuses) {
        await campaignsModule.getByStatus('account123', status);
        expect(mockClient.get).toHaveBeenCalled();
      }
    });

    it('should work with all CampaignObjective values in create', async () => {
      const objectives = [
        CampaignObjective.APP_INSTALLS,
        CampaignObjective.APP_RE_ENGAGEMENTS,
        CampaignObjective.AWARENESS,
        CampaignObjective.ENGAGEMENTS,
        CampaignObjective.FOLLOWERS,
        CampaignObjective.REACH,
        CampaignObjective.VIDEO_VIEWS,
        CampaignObjective.WEBSITE_CLICKS,
        CampaignObjective.WEBSITE_CONVERSIONS,
      ];

      for (const objective of objectives) {
        const createData = { name: 'Test Campaign', objective };

        await campaignsModule.create('account123', createData);

        expect(mockClient.post).toHaveBeenCalledWith(
          '/accounts/account123/campaigns',
          expect.objectContaining({
            objective,
          })
        );
      }
    });

    it('should work with all CampaignPlacement values in create', async () => {
      const placements = [CampaignPlacement.ALL_ON_TWITTER, CampaignPlacement.PUBLISHER_NETWORK];

      for (const placement of placements) {
        const createData = {
          name: 'Test Campaign',
          objective: CampaignObjective.AWARENESS,
          placement,
        };

        await campaignsModule.create('account123', createData);

        expect(mockClient.post).toHaveBeenCalledWith(
          '/accounts/account123/campaigns',
          expect.objectContaining({
            placement,
          })
        );
      }
    });

    it('should work with different currency values in create', async () => {
      const currencies = ['USD', 'EUR', 'JPY', 'GBP'];

      for (const currency of currencies) {
        const createData = {
          name: 'Test Campaign',
          objective: CampaignObjective.AWARENESS,
          currency,
        };

        await campaignsModule.create('account123', createData);

        expect(mockClient.post).toHaveBeenCalledWith(
          '/accounts/account123/campaigns',
          expect.objectContaining({
            currency,
          })
        );
      }
    });
  });

  describe('complex workflow scenarios', () => {
    it('should handle campaign lifecycle: create, activate, pause, delete', async () => {
      const createData = { name: 'Lifecycle Test', objective: CampaignObjective.WEBSITE_CLICKS };

      // Create
      const createdCampaign = await campaignsModule.create('account123', createData);
      expect(createdCampaign).toEqual(mockCampaign);

      // Activate
      const activatedCampaign = await campaignsModule.activate('account123', 'campaign123');
      expect(activatedCampaign).toEqual(mockCampaign);

      // Pause
      const pausedCampaign = await campaignsModule.pause('account123', 'campaign123');
      expect(pausedCampaign).toEqual(mockCampaign);

      // Delete
      await campaignsModule.delete('account123', 'campaign123');

      // Verify all operations called the correct endpoints
      expect(mockClient.post).toHaveBeenCalledWith(
        '/accounts/account123/campaigns',
        expect.any(Object)
      );
      expect(mockClient.put).toHaveBeenCalledTimes(2); // activate and pause
      expect(mockClient.delete).toHaveBeenCalledWith('/accounts/account123/campaigns/campaign123');
    });

    it('should handle filtering campaigns by multiple statuses', async () => {
      const spy = vi.spyOn(campaignsModule, 'getByStatus');

      // Get campaigns by different statuses
      await campaignsModule.getActive('account123');
      await campaignsModule.getPaused('account123');
      await campaignsModule.getDeleted('account123');

      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.ACTIVE, undefined);
      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.PAUSED, undefined);
      expect(spy).toHaveBeenCalledWith('account123', CampaignStatus.DELETED, undefined);
    });
  });
});
