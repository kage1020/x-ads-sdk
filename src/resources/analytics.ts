/**
 * Analytics resource for X Ads API
 */

import type {
  ActiveEntitiesRequestOptions,
  ActiveEntitiesResponse,
  AnalyticsEntityType,
  AnalyticsGranularity,
  AnalyticsJobResponse,
  AnalyticsJobsResponse,
  AnalyticsMetricGroup,
  AnalyticsPlacement,
  AnalyticsRequestOptions,
  AnalyticsResponse,
  AsyncAnalyticsRequestOptions,
} from '../types/analytics.js';
import type { RequestOptions } from '../types/auth.js';
import { BaseResource } from './base.js';

/**
 * Analytics resource class
 */
export class Analytics extends BaseResource {
  /**
   * Get synchronous analytics data
   * Maximum time range of 7 days allowed
   */
  async getSyncAnalytics(
    accountId: string,
    options: AnalyticsRequestOptions,
    requestOptions?: RequestOptions
  ): Promise<AnalyticsResponse> {
    const params = {
      entity: options.entity,
      entity_ids: options.entity_ids.join(','),
      start_time: options.start_time,
      end_time: options.end_time,
      granularity: options.granularity,
      placement: options.placement,
      metric_groups: options.metric_groups.join(','),
    };

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/stats/accounts/${accountId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };
    return this.httpClient.request<AnalyticsResponse>(requestConfig);
  }

  /**
   * Create an asynchronous analytics job
   * Supports up to 90 days of data and segmentation
   */
  async createAsyncJob(
    accountId: string,
    options: AsyncAnalyticsRequestOptions,
    requestOptions?: RequestOptions
  ): Promise<AnalyticsJobResponse> {
    const params = {
      entity: options.entity,
      entity_ids: options.entity_ids.join(','),
      start_time: options.start_time,
      end_time: options.end_time,
      granularity: options.granularity,
      placement: options.placement,
      metric_groups: options.metric_groups.join(','),
      ...(options.segmentation_type && { segmentation_type: options.segmentation_type }),
      ...(options.country && { country: options.country }),
      ...(options.platform && { platform: options.platform }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/stats/jobs/accounts/${accountId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };
    return this.httpClient.request<AnalyticsJobResponse>(requestConfig);
  }

  /**
   * Get status of asynchronous analytics jobs
   */
  async getAsyncJobs(
    accountId: string,
    jobIds?: string[],
    requestOptions?: RequestOptions
  ): Promise<AnalyticsJobsResponse> {
    const params = jobIds ? { job_ids: jobIds.join(',') } : {};

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/stats/jobs/accounts/${accountId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };
    return this.httpClient.request<AnalyticsJobsResponse>(requestConfig);
  }

  /**
   * Get active entities that have analytics changes
   * Maximum time range of 90 days allowed
   */
  async getActiveEntities(
    accountId: string,
    options: ActiveEntitiesRequestOptions,
    requestOptions?: RequestOptions
  ): Promise<ActiveEntitiesResponse> {
    const params = {
      entity: options.entity,
      start_time: options.start_time,
      end_time: options.end_time,
      ...(options.campaign_ids && { campaign_ids: options.campaign_ids.join(',') }),
      ...(options.funding_instrument_ids && {
        funding_instrument_ids: options.funding_instrument_ids.join(','),
      }),
      ...(options.line_item_ids && { line_item_ids: options.line_item_ids.join(',') }),
    };

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/stats/accounts/${accountId}/active_entities`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };
    return this.httpClient.request<ActiveEntitiesResponse>(requestConfig);
  }

  /**
   * Download completed async analytics data
   */
  async downloadAsyncData(downloadUrl: string): Promise<AnalyticsResponse> {
    // Use fetch to download the data from the provided URL
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download analytics data: ${response.status}`);
    }

    // Handle gzipped content
    const contentEncoding = response.headers.get('content-encoding');
    let data: AnalyticsResponse;

    if (contentEncoding === 'gzip') {
      // For gzipped content, we'll need to decompress
      const buffer = await response.arrayBuffer();
      const decompressed = await this.decompressGzip(buffer);
      data = JSON.parse(decompressed);
    } else {
      data = await response.json();
    }

    return data;
  }

  /**
   * Helper method to decompress gzip data
   */
  private async decompressGzip(buffer: ArrayBuffer): Promise<string> {
    // Use DecompressionStream if available (modern browsers/Node.js 17+)
    if (typeof DecompressionStream !== 'undefined') {
      const ds = new DecompressionStream('gzip');
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(buffer));
          controller.close();
        },
      });

      const decompressedStream = stream.pipeThrough(ds);
      const reader = decompressedStream.getReader();
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;

      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }

      return new TextDecoder().decode(result);
    } else {
      // Fallback: assume data is not gzipped or handle with a library
      throw new Error('Gzip decompression not available. Please provide decompressed data URL.');
    }
  }

  // Convenience methods for common analytics queries

  /**
   * Get account-level analytics
   */
  async getAccountAnalytics(
    accountId: string,
    options: {
      start_time: string;
      end_time: string;
      granularity?: AnalyticsGranularity;
      placement?: AnalyticsPlacement;
      metric_groups?: AnalyticsMetricGroup[];
    },
    requestOptions?: RequestOptions
  ): Promise<AnalyticsResponse> {
    return this.getSyncAnalytics(
      accountId,
      {
        entity: 'ACCOUNT',
        entity_ids: [accountId],
        start_time: options.start_time,
        end_time: options.end_time,
        granularity: options.granularity ?? 'TOTAL',
        placement: options.placement ?? 'ALL_ON_TWITTER',
        metric_groups: options.metric_groups ?? ['ENGAGEMENT'],
      },
      requestOptions
    );
  }

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(
    accountId: string,
    campaignIds: string[],
    options: {
      start_time: string;
      end_time: string;
      granularity?: AnalyticsGranularity;
      placement?: AnalyticsPlacement;
      metric_groups?: AnalyticsMetricGroup[];
    },
    requestOptions?: RequestOptions
  ): Promise<AnalyticsResponse> {
    return this.getSyncAnalytics(
      accountId,
      {
        entity: 'CAMPAIGN',
        entity_ids: campaignIds,
        start_time: options.start_time,
        end_time: options.end_time,
        granularity: options.granularity ?? 'TOTAL',
        placement: options.placement ?? 'ALL_ON_TWITTER',
        metric_groups: options.metric_groups ?? ['ENGAGEMENT'],
      },
      requestOptions
    );
  }

  /**
   * Get line item analytics
   */
  async getLineItemAnalytics(
    accountId: string,
    lineItemIds: string[],
    options: {
      start_time: string;
      end_time: string;
      granularity?: AnalyticsGranularity;
      placement?: AnalyticsPlacement;
      metric_groups?: AnalyticsMetricGroup[];
    },
    requestOptions?: RequestOptions
  ): Promise<AnalyticsResponse> {
    return this.getSyncAnalytics(
      accountId,
      {
        entity: 'LINE_ITEM',
        entity_ids: lineItemIds,
        start_time: options.start_time,
        end_time: options.end_time,
        granularity: options.granularity ?? 'TOTAL',
        placement: options.placement ?? 'ALL_ON_TWITTER',
        metric_groups: options.metric_groups ?? ['ENGAGEMENT'],
      },
      requestOptions
    );
  }

  /**
   * Get comprehensive analytics with multiple metric groups
   */
  async getComprehensiveAnalytics(
    accountId: string,
    entityType: AnalyticsEntityType,
    entityIds: string[],
    options: {
      start_time: string;
      end_time: string;
      placement?: AnalyticsPlacement;
    },
    granularity: AnalyticsGranularity = 'TOTAL',
    requestOptions?: RequestOptions
  ): Promise<AnalyticsResponse> {
    const metricGroups: AnalyticsMetricGroup[] = ['ENGAGEMENT', 'BILLING'];

    // Add additional metric groups based on entity type
    if (['CAMPAIGN', 'LINE_ITEM', 'PROMOTED_TWEET', 'MEDIA_CREATIVE'].includes(entityType)) {
      metricGroups.push('VIDEO', 'MEDIA');
    }

    return this.getSyncAnalytics(
      accountId,
      {
        entity: entityType,
        entity_ids: entityIds,
        start_time: options.start_time,
        end_time: options.end_time,
        granularity,
        placement: options.placement ?? 'ALL_ON_TWITTER',
        metric_groups: metricGroups,
      },
      requestOptions
    );
  }

  /**
   * Get daily analytics for trending analysis
   */
  async getDailyAnalytics(
    accountId: string,
    entityType: AnalyticsEntityType,
    entityIds: string[],
    options: {
      start_time: string;
      end_time: string;
      placement?: AnalyticsPlacement;
      metric_groups?: AnalyticsMetricGroup[];
    },
    requestOptions?: RequestOptions
  ): Promise<AnalyticsResponse> {
    return this.getSyncAnalytics(
      accountId,
      {
        entity: entityType,
        entity_ids: entityIds,
        start_time: options.start_time,
        end_time: options.end_time,
        granularity: 'DAY',
        placement: options.placement ?? 'ALL_ON_TWITTER',
        metric_groups: options.metric_groups ?? ['ENGAGEMENT'],
      },
      requestOptions
    );
  }
}
