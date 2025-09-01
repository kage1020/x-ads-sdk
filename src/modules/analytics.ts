import type { HttpClient } from '../client/base.js';
import {
  type AnalyticsOptions,
  type AnalyticsQuery,
  type AnalyticsResponse,
  type DateRange,
  EntityType,
  Granularity,
  METRIC_GROUPS,
} from '../types/analytics.js';
import { BaseModule } from './base.js';

export class AnalyticsModule extends BaseModule {
  constructor(client: HttpClient) {
    super(client, 'stats/accounts');
  }

  /**
   * Get analytics data for entities
   */
  async getAnalytics(accountId: string, options: AnalyticsOptions): Promise<AnalyticsResponse> {
    const endpoint = this.buildEndpoint(accountId);

    const query: AnalyticsQuery = {
      entity: options.entity_type,
      entity_ids: options.entity_ids,
      start_time: options.date_range.start_date,
      end_time: options.date_range.end_date,
      granularity: options.granularity || Granularity.TOTAL,
      metric_groups: options.metric_groups || ['ENGAGEMENT', 'BILLING'],
      placement: options.placement,
      segmentation_type: options.segmentation_type,
      country: options.country,
      platform: options.platform,
    };

    return this.client.get<AnalyticsResponse>(endpoint, query);
  }

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(
    accountId: string,
    campaignIds: string[],
    dateRange: DateRange,
    options: Partial<AnalyticsOptions> = {}
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      ...options,
      entity_type: EntityType.CAMPAIGN,
      entity_ids: campaignIds,
      date_range: dateRange,
    });
  }

  /**
   * Get ad group (line item) analytics
   */
  async getAdGroupAnalytics(
    accountId: string,
    adGroupIds: string[],
    dateRange: DateRange,
    options: Partial<AnalyticsOptions> = {}
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      ...options,
      entity_type: EntityType.LINE_ITEM,
      entity_ids: adGroupIds,
      date_range: dateRange,
    });
  }

  /**
   * Get account-level analytics
   */
  async getAccountAnalytics(
    accountId: string,
    dateRange: DateRange,
    options: Partial<AnalyticsOptions> = {}
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      ...options,
      entity_type: EntityType.ACCOUNT,
      entity_ids: [accountId],
      date_range: dateRange,
    });
  }

  /**
   * Get analytics with engagement metrics
   */
  async getEngagementAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    dateRange: DateRange,
    granularity: Granularity = Granularity.TOTAL
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      granularity,
      metric_groups: ['ENGAGEMENT'],
    });
  }

  /**
   * Get analytics with billing metrics
   */
  async getBillingAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    dateRange: DateRange,
    granularity: Granularity = Granularity.TOTAL
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      granularity,
      metric_groups: ['BILLING'],
    });
  }

  /**
   * Get analytics with video metrics
   */
  async getVideoAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    dateRange: DateRange,
    granularity: Granularity = Granularity.TOTAL
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      granularity,
      metric_groups: ['VIDEO'],
    });
  }

  /**
   * Get comprehensive analytics with all metric groups
   */
  async getComprehensiveAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    dateRange: DateRange,
    granularity: Granularity = Granularity.TOTAL
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      granularity,
      metric_groups: Object.keys(METRIC_GROUPS),
    });
  }

  /**
   * Get analytics for a specific date range with daily granularity
   */
  async getDailyAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    dateRange: DateRange,
    metricGroups: string[] = ['ENGAGEMENT', 'BILLING']
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      granularity: Granularity.DAY,
      metric_groups: metricGroups,
    });
  }

  /**
   * Get analytics for a specific date range with hourly granularity
   */
  async getHourlyAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    dateRange: DateRange,
    metricGroups: string[] = ['ENGAGEMENT', 'BILLING']
  ): Promise<AnalyticsResponse> {
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      granularity: Granularity.HOUR,
      metric_groups: metricGroups,
    });
  }

  /**
   * Create date range for common periods
   */
  static createDateRange(days: number): DateRange {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    return {
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    };
  }

  /**
   * Get analytics for the last 7 days
   */
  async getLastWeekAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    metricGroups: string[] = ['ENGAGEMENT', 'BILLING']
  ): Promise<AnalyticsResponse> {
    const dateRange = AnalyticsModule.createDateRange(7);
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      metric_groups: metricGroups,
    });
  }

  /**
   * Get analytics for the last 30 days
   */
  async getLastMonthAnalytics(
    accountId: string,
    entityType: EntityType,
    entityIds: string[],
    metricGroups: string[] = ['ENGAGEMENT', 'BILLING']
  ): Promise<AnalyticsResponse> {
    const dateRange = AnalyticsModule.createDateRange(30);
    return this.getAnalytics(accountId, {
      entity_type: entityType,
      entity_ids: entityIds,
      date_range: dateRange,
      metric_groups: metricGroups,
    });
  }
}
