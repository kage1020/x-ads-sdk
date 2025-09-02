/**
 * Campaign resource management
 */

import type { RequestConfig } from '../client/base.js';
import type { RequestOptions } from '../types/auth.js';
import type {
  CampaignCreateRequest,
  CampaignResponse,
  CampaignUpdateRequest,
} from '../types/resources/campaign.js';
import { BaseResource } from './base.js';

export class CampaignResource extends BaseResource {
  private accountId: string;

  constructor(httpClient: import('../client/base.js').HttpClient, accountId: string) {
    super(httpClient);
    this.accountId = accountId;
  }

  /**
   * Get campaigns for the account
   * @param options Request options
   * @returns Campaign response
   */
  async list(options?: RequestOptions): Promise<CampaignResponse> {
    const requestConfig: RequestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${this.accountId}/campaigns`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<CampaignResponse>(requestConfig);
    return response;
  }

  /**
   * Get a specific campaign by ID
   * @param campaignId Campaign ID
   * @param options Request options
   * @returns Campaign response
   */
  async get(campaignId: string, options?: RequestOptions): Promise<CampaignResponse> {
    const requestConfig: RequestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${this.accountId}/campaigns/${campaignId}`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<CampaignResponse>(requestConfig);
    return response;
  }

  /**
   * Create a new campaign
   * @param data Campaign creation data
   * @param options Request options
   * @returns Campaign response
   */
  async create(data: CampaignCreateRequest, options?: RequestOptions): Promise<CampaignResponse> {
    const requestConfig: RequestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${this.accountId}/campaigns`,
      body: data,
      ...(options || {}),
    };
    const response = await this.httpClient.request<CampaignResponse>(requestConfig);
    return response;
  }

  /**
   * Update a campaign
   * @param campaignId Campaign ID
   * @param data Campaign update data
   * @param options Request options
   * @returns Campaign response
   */
  async update(
    campaignId: string,
    data: CampaignUpdateRequest,
    options?: RequestOptions
  ): Promise<CampaignResponse> {
    const requestConfig: RequestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${this.accountId}/campaigns/${campaignId}`,
      body: data,
      ...(options || {}),
    };
    const response = await this.httpClient.request<CampaignResponse>(requestConfig);
    return response;
  }

  /**
   * Delete a campaign
   * @param campaignId Campaign ID
   * @param options Request options
   * @returns Campaign response
   */
  async delete(campaignId: string, options?: RequestOptions): Promise<CampaignResponse> {
    const requestConfig: RequestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${this.accountId}/campaigns/${campaignId}`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<CampaignResponse>(requestConfig);
    return response;
  }
}
