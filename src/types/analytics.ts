/**
 * X Ads Analytics API types
 * @see https://docs.x.com/x-ads-api/analytics
 */

/**
 * Entity types for analytics queries
 */
export type AnalyticsEntityType =
  | 'ACCOUNT'
  | 'CAMPAIGN'
  | 'FUNDING_INSTRUMENT'
  | 'LINE_ITEM'
  | 'PROMOTED_TWEET'
  | 'PROMOTED_ACCOUNT'
  | 'MEDIA_CREATIVE'
  | 'ORGANIC_TWEET';

/**
 * Granularity for analytics data
 */
export type AnalyticsGranularity = 'HOUR' | 'DAY' | 'TOTAL';

/**
 * Placement types
 */
export type AnalyticsPlacement = 'ALL_ON_TWITTER' | 'PUBLISHER_NETWORK' | 'SPOTLIGHT' | 'TREND';

/**
 * Metric groups available for analytics
 */
export type AnalyticsMetricGroup =
  | 'ENGAGEMENT'
  | 'BILLING'
  | 'VIDEO'
  | 'MEDIA'
  | 'WEB_CONVERSION'
  | 'MOBILE_CONVERSION'
  | 'LIFE_TIME_VALUE_MOBILE_CONVERSION';

/**
 * Segmentation types for analytics
 */
export type AnalyticsSegmentationType =
  | 'AGE'
  | 'APP_STORE_CATEGORY'
  | 'AUDIENCES'
  | 'CITIES'
  | 'CONVERSATIONS'
  | 'CONVERSION_TAGS'
  | 'DEVICES'
  | 'EVENTS'
  | 'GENDER'
  | 'INTERESTS'
  | 'KEYWORDS'
  | 'LANGUAGES'
  | 'LOCATIONS'
  | 'METROS'
  | 'PLATFORMS'
  | 'PLATFORM_VERSIONS'
  | 'POSTAL_CODES'
  | 'REGIONS'
  | 'SLIDES'
  | 'SIMILAR_TO_FOLLOWERS_OF_USER'
  | 'TV_SHOWS';

/**
 * Analytics job status
 */
export type AnalyticsJobStatus = 'QUEUED' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

/**
 * Metrics data structure
 */
export interface AnalyticsMetrics {
  // Engagement metrics
  impressions?: number[];
  engagements?: number[];
  clicks?: number[];
  retweets?: number[];
  likes?: number[];
  replies?: number[];
  follows?: number[];
  card_engagements?: number[];
  app_clicks?: number[];
  url_clicks?: number[];
  qualified_impressions?: number[];
  carousel_swipes?: number[];

  // Billing metrics
  billed_engagements?: number[];
  billed_charge_local_micro?: number[];

  // Video metrics
  video_total_views?: number[];
  video_views_25?: number[];
  video_views_50?: number[];
  video_views_75?: number[];
  video_views_100?: number[];
  video_cta_clicks?: number[];
  video_content_starts?: number[];
  video_3s100pct_views?: number[];
  video_6s_views?: number[];
  video_15s_views?: number[];

  // Media metrics
  media_views?: number[];
  media_engagements?: number[];

  // Conversion metrics (JSON objects)
  conversion_purchases?: Record<string, unknown>[];
  conversion_sign_ups?: Record<string, unknown>[];
  conversion_site_visits?: Record<string, unknown>[];
  conversion_downloads?: Record<string, unknown>[];
  conversion_custom?: Record<string, unknown>[];

  // Mobile conversion metrics (JSON objects)
  mobile_conversion_installs?: Record<string, unknown>[];
  mobile_conversion_purchases?: Record<string, unknown>[];
  mobile_conversion_sign_ups?: Record<string, unknown>[];
  mobile_conversion_content_views?: Record<string, unknown>[];

  // Additional metrics
  [key: string]: number[] | Record<string, unknown>[] | undefined;
}

/**
 * Analytics segment data
 */
export interface AnalyticsSegmentData {
  segment: string | null;
  metrics: AnalyticsMetrics;
}

/**
 * Analytics entity data
 */
export interface AnalyticsEntityData {
  id: string;
  id_data: AnalyticsSegmentData[];
}

/**
 * Synchronous analytics response
 */
export interface AnalyticsResponse {
  data_type: 'stats';
  time_series_length: number;
  data: AnalyticsEntityData[];
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Asynchronous analytics job data
 */
export interface AnalyticsJob {
  id: string;
  id_str: string;
  account_id: string;
  entity: AnalyticsEntityType;
  entity_ids: string[];
  start_time: string;
  end_time: string;
  granularity: AnalyticsGranularity;
  placement: AnalyticsPlacement;
  metric_groups: AnalyticsMetricGroup[];
  segmentation_type: AnalyticsSegmentationType | null;
  country: string | null;
  platform: string | null;
  status: AnalyticsJobStatus;
  url: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Asynchronous analytics job response
 */
export interface AnalyticsJobResponse {
  data: AnalyticsJob;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Asynchronous analytics jobs list response
 */
export interface AnalyticsJobsResponse {
  data: AnalyticsJob[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Active entity data
 */
export interface ActiveEntity {
  entity_id: string;
  activity_start_time: string;
  activity_end_time: string;
  placements: AnalyticsPlacement[];
}

/**
 * Active entities response
 */
export interface ActiveEntitiesResponse {
  data: ActiveEntity[];
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Synchronous analytics request options
 */
export interface AnalyticsRequestOptions {
  entity: AnalyticsEntityType;
  entity_ids: string[];
  start_time: string;
  end_time: string;
  granularity: AnalyticsGranularity;
  placement: AnalyticsPlacement;
  metric_groups: AnalyticsMetricGroup[];
}

/**
 * Asynchronous analytics request options
 */
export interface AsyncAnalyticsRequestOptions extends AnalyticsRequestOptions {
  segmentation_type?: AnalyticsSegmentationType;
  country?: string;
  platform?: string;
}

/**
 * Active entities request options
 */
export interface ActiveEntitiesRequestOptions {
  entity: AnalyticsEntityType;
  start_time: string;
  end_time: string;
  campaign_ids?: string[];
  funding_instrument_ids?: string[];
  line_item_ids?: string[];
}
