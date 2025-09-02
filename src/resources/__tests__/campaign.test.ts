import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import { CampaignEntityStatus } from '../../types/resources/campaign.js';
import { CampaignResource } from '../campaign.js';

describe('CampaignResource', () => {
  const mockHttpClient = {
    request: vi.fn(),
  } as unknown as HttpClient;

  const accountId = 'test-account-id';
  const campaignResource = new CampaignResource(mockHttpClient, accountId);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('should make correct API request to list campaigns', async () => {
      const mockResponse = {
        data: [{ id: 'campaign1', name: 'Test Campaign' }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await campaignResource.list();

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: `/12/accounts/${accountId}/campaigns`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('create', () => {
    it('should make correct API request to create campaign', async () => {
      const createData = {
        name: 'New Campaign',
        funding_instrument_id: 'fi_123',
        entity_status: CampaignEntityStatus.DRAFT,
        start_time: '2024-01-01T00:00:00Z',
        currency: 'USD',
      };
      const mockResponse = {
        data: [{ id: 'new-campaign-id', ...createData }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await campaignResource.create(createData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: `/12/accounts/${accountId}/campaigns`,
        body: createData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should make correct API request to update campaign', async () => {
      const campaignId = 'test-campaign-id';
      const updateData = {
        entity_status: CampaignEntityStatus.ACTIVE,
        name: 'Updated Campaign',
      };
      const mockResponse = {
        data: [{ id: campaignId, ...updateData }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await campaignResource.update(campaignId, updateData);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
        body: updateData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make correct API request to delete campaign', async () => {
      const campaignId = 'test-campaign-id';
      const mockResponse = {
        data: [{ id: campaignId, entity_status: 'DELETED' }],
        request: { params: {} },
      };
      mockHttpClient.request = vi.fn().mockResolvedValue(mockResponse);

      const result = await campaignResource.delete(campaignId);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: `/12/accounts/${accountId}/campaigns/${campaignId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
