import type { HttpClient } from '../client/base';
import type { CursorPaginator, PaginatorOptions } from '../paginators';
import {
  type Campaign,
  type CampaignListParams,
  CampaignStatus,
  type CreateCampaignData,
  type UpdateCampaignData,
} from '../types/campaign';
import type { PaginatedResponse } from '../types/common';
import { BaseModule } from './base';

export class CampaignsModule extends BaseModule {
  constructor(client: HttpClient) {
    super(client, 'accounts');
  }

  /**
   * List campaigns for an account
   */
  async list(
    accountId: string,
    params: CampaignListParams = {}
  ): Promise<PaginatedResponse<Campaign>> {
    const endpoint = this.buildEndpoint(accountId, 'campaigns');
    return this.makeListRequest<Campaign>(endpoint, params);
  }

  /**
   * Get a specific campaign by ID
   */
  async get(accountId: string, campaignId: string): Promise<Campaign> {
    const endpoint = this.buildEndpoint(accountId, 'campaigns', campaignId);
    return this.makeGetRequest<Campaign>(endpoint);
  }

  /**
   * Create a new campaign
   */
  async create(accountId: string, data: CreateCampaignData): Promise<Campaign> {
    const endpoint = this.buildEndpoint(accountId, 'campaigns');

    // Convert data to API format
    const requestBody = {
      name: data.name,
      objective: data.objective,
      placement: data.placement || 'ALL_ON_TWITTER',
      currency: data.currency || 'USD',
      start_time: data.start_time,
      end_time: data.end_time,
      daily_budget_amount_local_micro: data.daily_budget_amount_local_micro,
      total_budget_amount_local_micro: data.total_budget_amount_local_micro,
    };

    return this.makePostRequest<Campaign>(endpoint, requestBody);
  }

  /**
   * Update an existing campaign
   */
  async update(accountId: string, campaignId: string, data: UpdateCampaignData): Promise<Campaign> {
    const endpoint = this.buildEndpoint(accountId, 'campaigns', campaignId);
    return this.makePutRequest<Campaign>(endpoint, data);
  }

  /**
   * Delete a campaign (soft delete)
   */
  async delete(accountId: string, campaignId: string): Promise<void> {
    const endpoint = this.buildEndpoint(accountId, 'campaigns', campaignId);
    await this.makeDeleteRequest(endpoint);
  }

  /**
   * Pause a campaign
   */
  async pause(accountId: string, campaignId: string): Promise<Campaign> {
    return this.update(accountId, campaignId, {
      status: CampaignStatus.PAUSED,
    });
  }

  /**
   * Activate a campaign
   */
  async activate(accountId: string, campaignId: string): Promise<Campaign> {
    return this.update(accountId, campaignId, {
      status: CampaignStatus.ACTIVE,
    });
  }

  /**
   * Get campaigns by status
   */
  async getByStatus(
    accountId: string,
    status: CampaignStatus,
    params: Omit<CampaignListParams, 'with_deleted'> = {}
  ): Promise<PaginatedResponse<Campaign>> {
    const campaigns = await this.list(accountId, {
      ...params,
      with_deleted: status === CampaignStatus.DELETED,
    });

    // Filter campaigns by status
    const filteredData = campaigns.data.filter((campaign) => campaign.status === status);

    return {
      ...campaigns,
      data: filteredData,
    };
  }

  /**
   * Get active campaigns
   */
  async getActive(
    accountId: string,
    params?: Omit<CampaignListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<Campaign>> {
    return this.getByStatus(accountId, CampaignStatus.ACTIVE, params);
  }

  /**
   * Get paused campaigns
   */
  async getPaused(
    accountId: string,
    params?: Omit<CampaignListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<Campaign>> {
    return this.getByStatus(accountId, CampaignStatus.PAUSED, params);
  }

  /**
   * Get deleted campaigns
   */
  async getDeleted(
    accountId: string,
    params?: Omit<CampaignListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<Campaign>> {
    return this.getByStatus(accountId, CampaignStatus.DELETED, params);
  }

  /**
   * Create a paginator for campaigns
   */
  paginate(
    accountId: string,
    params: CampaignListParams = {},
    options: PaginatorOptions = {}
  ): CursorPaginator<Campaign> {
    const endpoint = this.buildEndpoint(accountId, 'campaigns');
    return this.createPaginator<Campaign>(endpoint, params, options);
  }

  /**
   * Iterate through all campaigns using async iterator
   */
  async *iterateAll(
    accountId: string,
    params: CampaignListParams = {}
  ): AsyncIterableIterator<Campaign> {
    const paginator = this.paginate(accountId, params);
    for await (const campaign of paginator.items()) {
      yield campaign;
    }
  }
}
