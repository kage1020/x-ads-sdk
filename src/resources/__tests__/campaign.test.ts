import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  CampaignCreateRequest,
  CampaignResponse,
  CampaignUpdateRequest,
} from '../../types/resources/campaign.js';
import { CampaignEntityStatus } from '../../types/resources/campaign.js';
import { CampaignResource } from '../campaign.js';

const mockHttpClient = {
  request: vi.fn(),
  getAPIVersion: vi.fn().mockReturnValue('12'),
} as unknown as HttpClient;

describe('CampaignResource', () => {
  let resource: CampaignResource;
  const accountId = 'test-account-id';

  beforeEach(() => {
    resource = new CampaignResource(mockHttpClient, accountId);
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with httpClient and accountId', () => {
      expect(resource).toBeInstanceOf(CampaignResource);
      expect((resource as unknown as { accountId: string }).accountId).toBe(accountId);
      expect((resource as unknown as { httpClient: HttpClient }).httpClient).toBe(mockHttpClient);
    });
  });

  describe('list', () => {
    it('should make correct API request to list campaigns', async () => {
      const mockResponse: CampaignResponse = {
        data: [
          {
            id: 'campaign1',
            name: 'Test Campaign',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.ACTIVE,
            start_time: '2024-01-01T00:00:00Z',
            currency: 'USD',
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
        endpoint: `/12/accounts/${accountId}/campaigns`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should list campaigns with options', async () => {
      const options = { params: { count: 10 }, headers: { 'Custom-Header': 'value' } };
      const mockResponse: CampaignResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.list(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/campaigns`,
        params: { count: 10 },
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('get', () => {
    it('should get a specific campaign by ID', async () => {
      const campaignId = 'campaign-1';
      const mockResponse: CampaignResponse = {
        data: [
          {
            id: campaignId,
            name: 'Test Campaign',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.ACTIVE,
            start_time: '2024-01-01T00:00:00Z',
            currency: 'USD',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.get(campaignId);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get campaign with options', async () => {
      const campaignId = 'campaign-1';
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: CampaignResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.get(campaignId, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('create', () => {
    it('should make correct API request to create campaign', async () => {
      const createData: CampaignCreateRequest = {
        name: 'New Campaign',
        funding_instrument_id: 'fi_123',
        entity_status: CampaignEntityStatus.DRAFT,
        start_time: '2024-01-01T00:00:00Z',
        currency: 'USD',
      };
      const mockResponse: CampaignResponse = {
        data: [
          {
            id: 'new-campaign-id',
            name: 'New Campaign',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.DRAFT,
            start_time: '2024-01-01T00:00:00Z',
            currency: 'USD',
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
        endpoint: `/12/accounts/${accountId}/campaigns`,
        body: createData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create campaign with options', async () => {
      const createData: CampaignCreateRequest = {
        name: 'New Campaign',
        funding_instrument_id: 'fi_123',
        start_time: '2024-01-01T00:00:00Z',
        currency: 'USD',
      };
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: CampaignResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.create(createData, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: `/12/accounts/${accountId}/campaigns`,
        body: createData,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('update', () => {
    it('should make correct API request to update campaign', async () => {
      const campaignId = 'test-campaign-id';
      const updateData: CampaignUpdateRequest = {
        entity_status: CampaignEntityStatus.ACTIVE,
        name: 'Updated Campaign',
      };
      const mockResponse: CampaignResponse = {
        data: [
          {
            id: campaignId,
            name: 'Updated Campaign',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.ACTIVE,
            start_time: '2024-01-01T00:00:00Z',
            currency: 'USD',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.update(campaignId, updateData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
        body: updateData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should update campaign with options', async () => {
      const campaignId = 'test-campaign-id';
      const updateData: CampaignUpdateRequest = {
        name: 'Updated Campaign',
      };
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: CampaignResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.update(campaignId, updateData, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
        body: updateData,
        headers: { 'Custom-Header': 'value' },
      });
    });
  });

  describe('delete', () => {
    it('should make correct API request to delete campaign', async () => {
      const campaignId = 'test-campaign-id';
      const mockResponse: CampaignResponse = {
        data: [
          {
            id: campaignId,
            name: 'Deleted Campaign',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.ACTIVE,
            start_time: '2024-01-01T00:00:00Z',
            currency: 'USD',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: true,
          },
        ],
        request: { params: {} },
      };
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.delete(campaignId);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should delete campaign with options', async () => {
      const campaignId = 'test-campaign-id';
      const options = { headers: { 'Custom-Header': 'value' } };
      const mockResponse: CampaignResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      await resource.delete(campaignId, options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
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
      const createData: CampaignCreateRequest = {
        name: 'Invalid Campaign',
        funding_instrument_id: 'invalid-fi',
        start_time: '2024-01-01T00:00:00Z',
        currency: 'USD',
      };

      vi.mocked(mockHttpClient.request).mockRejectedValue(error);

      await expect(resource.create(createData)).rejects.toThrow('Validation error');
    });

    it('should handle errors in update method', async () => {
      const error = new Error('Not found');
      const updateData: CampaignUpdateRequest = {
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
    it('should handle empty campaign data', async () => {
      const mockResponse: CampaignResponse = {
        data: [],
        request: { params: {} },
        total_count: 0,
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.list();
      expect(result.data).toEqual([]);
      expect(result.total_count).toBe(0);
    });

    it('should handle campaign with minimal required fields', async () => {
      const createData: CampaignCreateRequest = {
        name: 'Minimal Campaign',
        funding_instrument_id: 'fi_123',
        start_time: '2024-01-01T00:00:00Z',
        currency: 'USD',
      };

      const mockResponse: CampaignResponse = {
        data: [
          {
            id: 'minimal-campaign',
            name: 'Minimal Campaign',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.DRAFT,
            start_time: '2024-01-01T00:00:00Z',
            currency: 'USD',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.create(createData);
      expect(result.data[0].id).toBe('minimal-campaign');
    });

    it('should handle campaign with all optional fields', async () => {
      const updateData: CampaignUpdateRequest = {
        name: 'Full Update',
        entity_status: CampaignEntityStatus.ACTIVE,
        end_time: '2024-12-31T23:59:59Z',
        daily_budget_amount_local_micro: 100000000,
        total_budget_amount_local_micro: 3000000000,
        standard_delivery: true,
      };

      const mockResponse: CampaignResponse = {
        data: [
          {
            id: 'full-campaign',
            name: 'Full Update',
            funding_instrument_id: 'fi_123',
            entity_status: CampaignEntityStatus.ACTIVE,
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-12-31T23:59:59Z',
            currency: 'USD',
            daily_budget_amount_local_micro: 100000000,
            total_budget_amount_local_micro: 3000000000,
            standard_delivery: true,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await resource.update('full-campaign', updateData);
      expect(result.data[0]).toMatchObject({
        id: 'full-campaign',
        name: 'Full Update',
        entity_status: CampaignEntityStatus.ACTIVE,
        end_time: '2024-12-31T23:59:59Z',
        daily_budget_amount_local_micro: 100000000,
        total_budget_amount_local_micro: 3000000000,
        standard_delivery: true,
      });
    });
  });
});
