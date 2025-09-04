import { BaseClient } from '../client/base-client';
import type {
  TailoredAudience,
  TailoredAudienceListResponse,
  TailoredAudienceResponse,
  TargetingCriteria,
  TargetingCriteriaCreateData,
  TargetingCriteriaListOptions,
  TargetingCriteriaListResponse,
  TargetingCriteriaOptionsResponse,
  TargetingCriteriaResponse,
} from '../types';
import { sanitizeParams, validateRequired, validateStringLength } from '../utils/validation';

export class TargetingClient extends BaseClient {
  public async create(
    accountId: string,
    lineItemId: string,
    data: TargetingCriteriaCreateData
  ): Promise<TargetingCriteriaResponse> {
    validateRequired({ accountId, lineItemId }, ['accountId', 'lineItemId']);
    validateRequired(data, ['line_item_id', 'targeting_type', 'targeting_value']);

    if (data.name) {
      validateStringLength(data.name, 'Targeting criteria name');
    }

    const sanitizedData = sanitizeParams({ ...data, line_item_id: lineItemId });
    return this.post<TargetingCriteria>(`/accounts/${accountId}/targeting_criteria`, sanitizedData);
  }

  public async list(
    accountId: string,
    options?: TargetingCriteriaListOptions
  ): Promise<TargetingCriteriaListResponse> {
    validateRequired({ accountId }, ['accountId']);
    const params = options ? sanitizeParams(options) : {};
    return this.getList<TargetingCriteria>(`/accounts/${accountId}/targeting_criteria`, params);
  }

  public async delete(
    accountId: string,
    targetingCriteriaId: string
  ): Promise<TargetingCriteriaResponse> {
    validateRequired({ accountId, targetingCriteriaId }, ['accountId', 'targetingCriteriaId']);
    return this.deleteRequest<TargetingCriteria>(
      `/accounts/${accountId}/targeting_criteria/${targetingCriteriaId}`
    );
  }

  public async getCriteria(_accountId: string): Promise<TargetingCriteriaOptionsResponse> {
    return this.get<import('../types').BaseResponse<TargetingCriteriaOptionsResponse>>(
      `/targeting_criteria/locations`
    ) as Promise<TargetingCriteriaOptionsResponse>;
  }

  public async getTailoredAudiences(accountId: string): Promise<TailoredAudienceListResponse> {
    validateRequired({ accountId }, ['accountId']);
    return this.getList<TailoredAudience>(`/accounts/${accountId}/tailored_audiences`);
  }

  public async getTailoredAudience(
    accountId: string,
    audienceId: string
  ): Promise<TailoredAudienceResponse> {
    validateRequired({ accountId, audienceId }, ['accountId', 'audienceId']);
    return this.get<TailoredAudience>(`/accounts/${accountId}/tailored_audiences/${audienceId}`);
  }
}
