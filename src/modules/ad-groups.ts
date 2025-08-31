import type { HttpClient } from '../client/base';
import {
  type AdGroup,
  type AdGroupListParams,
  AdGroupStatus,
  type CreateAdGroupData,
  type UpdateAdGroupData,
} from '../types/ad-group';
import type { PaginatedResponse } from '../types/common';
import { BaseModule } from './base';

export class AdGroupsModule extends BaseModule {
  constructor(client: HttpClient) {
    super(client, 'accounts');
  }

  /**
   * List ad groups for an account
   */
  async list(
    accountId: string,
    params: AdGroupListParams = {}
  ): Promise<PaginatedResponse<AdGroup>> {
    const endpoint = this.buildEndpoint(accountId, 'line_items');
    return this.makeListRequest<AdGroup>(endpoint, params);
  }

  /**
   * Get a specific ad group by ID
   */
  async get(accountId: string, adGroupId: string): Promise<AdGroup> {
    const endpoint = this.buildEndpoint(accountId, 'line_items', adGroupId);
    return this.makeGetRequest<AdGroup>(endpoint);
  }

  /**
   * Create a new ad group
   */
  async create(accountId: string, data: CreateAdGroupData): Promise<AdGroup> {
    const endpoint = this.buildEndpoint(accountId, 'line_items');

    // Convert data to API format
    const requestBody = {
      campaign_id: data.campaign_id,
      name: data.name,
      placement: data.placement || 'ALL_ON_TWITTER',
      start_time: data.start_time,
      end_time: data.end_time,
      bid_amount_local_micro: data.bid_amount_local_micro,
      bid_type: data.bid_type,
      target_cpa_local_micro: data.target_cpa_local_micro,
      daily_budget_amount_local_micro: data.daily_budget_amount_local_micro,
      total_budget_amount_local_micro: data.total_budget_amount_local_micro,
    };

    return this.makePostRequest<AdGroup>(endpoint, requestBody);
  }

  /**
   * Update an existing ad group
   */
  async update(accountId: string, adGroupId: string, data: UpdateAdGroupData): Promise<AdGroup> {
    const endpoint = this.buildEndpoint(accountId, 'line_items', adGroupId);
    return this.makePutRequest<AdGroup>(endpoint, data);
  }

  /**
   * Delete an ad group (soft delete)
   */
  async delete(accountId: string, adGroupId: string): Promise<void> {
    const endpoint = this.buildEndpoint(accountId, 'line_items', adGroupId);
    await this.makeDeleteRequest(endpoint);
  }

  /**
   * Pause an ad group
   */
  async pause(accountId: string, adGroupId: string): Promise<AdGroup> {
    return this.update(accountId, adGroupId, {
      status: AdGroupStatus.PAUSED,
    });
  }

  /**
   * Activate an ad group
   */
  async activate(accountId: string, adGroupId: string): Promise<AdGroup> {
    return this.update(accountId, adGroupId, {
      status: AdGroupStatus.ACTIVE,
    });
  }

  /**
   * List ad groups for a specific campaign
   */
  async listByCampaign(
    accountId: string,
    campaignId: string,
    params: Omit<AdGroupListParams, 'campaign_ids'> = {}
  ): Promise<PaginatedResponse<AdGroup>> {
    return this.list(accountId, {
      ...params,
      campaign_ids: [campaignId],
    });
  }

  /**
   * Get ad groups by status
   */
  async getByStatus(
    accountId: string,
    status: AdGroupStatus,
    params: Omit<AdGroupListParams, 'with_deleted'> = {}
  ): Promise<PaginatedResponse<AdGroup>> {
    const adGroups = await this.list(accountId, {
      ...params,
      with_deleted: status === AdGroupStatus.DELETED,
    });

    // Filter ad groups by status
    const filteredData = adGroups.data.filter((adGroup) => adGroup.status === status);

    return {
      ...adGroups,
      data: filteredData,
    };
  }

  /**
   * Get active ad groups
   */
  async getActive(
    accountId: string,
    params?: Omit<AdGroupListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<AdGroup>> {
    return this.getByStatus(accountId, AdGroupStatus.ACTIVE, params);
  }

  /**
   * Get paused ad groups
   */
  async getPaused(
    accountId: string,
    params?: Omit<AdGroupListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<AdGroup>> {
    return this.getByStatus(accountId, AdGroupStatus.PAUSED, params);
  }

  /**
   * Get deleted ad groups
   */
  async getDeleted(
    accountId: string,
    params?: Omit<AdGroupListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<AdGroup>> {
    return this.getByStatus(accountId, AdGroupStatus.DELETED, params);
  }

  /**
   * Get active ad groups for a specific campaign
   */
  async getActiveByCampaign(
    accountId: string,
    campaignId: string,
    params?: Omit<AdGroupListParams, 'campaign_ids' | 'with_deleted'>
  ): Promise<PaginatedResponse<AdGroup>> {
    const adGroups = await this.listByCampaign(accountId, campaignId, params);
    const filteredData = adGroups.data.filter((adGroup) => adGroup.status === AdGroupStatus.ACTIVE);

    return {
      ...adGroups,
      data: filteredData,
    };
  }
}
