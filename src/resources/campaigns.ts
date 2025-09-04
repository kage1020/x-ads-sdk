import { BaseClient } from '../client/base-client';
import type {
  Campaign,
  CampaignCreateData,
  CampaignListOptions,
  CampaignListResponse,
  CampaignResponse,
  CampaignUpdateData,
} from '../types';
import {
  sanitizeParams,
  validateBudget,
  validateDateRange,
  validateRequired,
  validateStringLength,
} from '../utils/validation';

export class CampaignsClient extends BaseClient {
  public async create(accountId: string, data: CampaignCreateData): Promise<CampaignResponse> {
    validateRequired(data, ['name', 'funding_instrument_id', 'start_time']);
    validateStringLength(data.name, 'Campaign name');

    if (data.daily_budget_amount_local_micro) {
      validateBudget(data.daily_budget_amount_local_micro);
    }

    if (data.total_budget_amount_local_micro) {
      validateBudget(data.total_budget_amount_local_micro);
    }

    if (data.end_time) {
      validateDateRange(data.start_time, data.end_time);
    }

    const sanitizedData = sanitizeParams(data);
    return this.post<Campaign>(`/accounts/${accountId}/campaigns`, sanitizedData);
  }

  public async list(
    accountId: string,
    options?: CampaignListOptions
  ): Promise<CampaignListResponse> {
    const params = options ? sanitizeParams(options) : {};
    return this.getList<Campaign>(`/accounts/${accountId}/campaigns`, params);
  }

  public async getCampaign(accountId: string, campaignId: string): Promise<CampaignResponse> {
    return this.get<Campaign>(`/accounts/${accountId}/campaigns/${campaignId}`);
  }

  public async update(
    accountId: string,
    campaignId: string,
    data: CampaignUpdateData
  ): Promise<CampaignResponse> {
    if (data.name) {
      validateStringLength(data.name, 'Campaign name');
    }

    if (data.daily_budget_amount_local_micro !== undefined) {
      validateBudget(data.daily_budget_amount_local_micro);
    }

    if (data.total_budget_amount_local_micro !== undefined) {
      validateBudget(data.total_budget_amount_local_micro);
    }

    if (data.start_time && data.end_time) {
      validateDateRange(data.start_time, data.end_time);
    }

    const sanitizedData = sanitizeParams(data);
    return this.put<Campaign>(`/accounts/${accountId}/campaigns/${campaignId}`, sanitizedData);
  }

  public async delete(accountId: string, campaignId: string): Promise<CampaignResponse> {
    return this.deleteRequest<Campaign>(`/accounts/${accountId}/campaigns/${campaignId}`);
  }
}
