import { BaseClient } from '../client/base-client';
import type {
  AnalyticsJobListOptions,
  AnalyticsRequest,
  AnalyticsResponse,
  AsyncAnalyticsJob,
  AsyncAnalyticsJobListResponse,
  AsyncAnalyticsJobResponse,
} from '../types';
import { sanitizeParams, validateDateRange, validateRequired } from '../utils/validation';

export class AnalyticsClient extends BaseClient {
  public async getStats(accountId: string, request: AnalyticsRequest): Promise<AnalyticsResponse> {
    validateRequired(request, [
      'entity',
      'entity_ids',
      'start_time',
      'end_time',
      'granularity',
      'placement',
      'metrics',
    ]);
    validateDateRange(request.start_time, request.end_time);

    if (request.entity_ids.length === 0) {
      throw new Error('At least one entity ID is required');
    }

    if (request.metrics.length === 0) {
      throw new Error('At least one metric is required');
    }

    this.validateEntityGranularityCompatibility(request.entity, request.granularity);

    const sanitizedParams = sanitizeParams(request) as import('../types').QueryParams;
    return this.get<AnalyticsResponse>(
      `/stats/accounts/${accountId}`,
      sanitizedParams
    ) as unknown as Promise<AnalyticsResponse>;
  }

  public async createJob(
    accountId: string,
    request: AnalyticsRequest
  ): Promise<AsyncAnalyticsJobResponse> {
    validateRequired(request, [
      'entity',
      'entity_ids',
      'start_time',
      'end_time',
      'granularity',
      'placement',
      'metrics',
    ]);
    validateDateRange(request.start_time, request.end_time);

    const startDate = new Date(request.start_time);
    const endDate = new Date(request.end_time);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff > 365) {
      throw new Error('Date range exceeds maximum allowed period for async jobs (365 days)');
    }

    const sanitizedData = sanitizeParams(request) as import('../types').RequestData;
    return this.post<AsyncAnalyticsJob>(`/stats/jobs/accounts/${accountId}`, sanitizedData);
  }

  public async getJob(accountId: string, jobId: string): Promise<AsyncAnalyticsJobResponse> {
    return this.get<AsyncAnalyticsJob>(`/stats/jobs/accounts/${accountId}/${jobId}`);
  }

  public async listJobs(
    accountId: string,
    options?: AnalyticsJobListOptions
  ): Promise<AsyncAnalyticsJobListResponse> {
    const params = options ? (sanitizeParams(options) as import('../types').QueryParams) : {};
    return this.getList<AsyncAnalyticsJob>(`/stats/jobs/accounts/${accountId}`, params);
  }

  private validateEntityGranularityCompatibility(entity: string, granularity: string): void {
    if (entity === 'ACCOUNT' && granularity === 'HOUR') {
      throw new Error('HOUR granularity is not supported for ACCOUNT entity');
    }
  }
}
