export interface AnalyticsRequest {
  entity: 'ACCOUNT' | 'CAMPAIGN' | 'LINE_ITEM' | 'PROMOTED_TWEET' | 'PROMOTED_ACCOUNT';
  entity_ids: string[];
  start_time: string;
  end_time: string;
  granularity: 'HOUR' | 'DAY' | 'TOTAL';
  placement: 'ALL_ON_TWITTER' | 'PUBLISHER_NETWORK';
  metrics: string[];
  segmentation_type?: 'AGE' | 'GENDER' | 'LOCATION' | 'PLATFORM' | 'DEVICES';
  [key: string]: unknown;
}

// Specific metric value types
export type MetricValue = number | number[];

// Common metrics available in X Ads API
export interface AnalyticsMetrics {
  impressions?: MetricValue;
  clicks?: MetricValue;
  spend_micro?: MetricValue;
  engagements?: MetricValue;
  engagement_rate?: MetricValue;
  follows?: MetricValue;
  video_views?: MetricValue;
  video_completions?: MetricValue;
  conversions?: MetricValue;
  [key: string]: MetricValue | undefined;
}

export interface AnalyticsResponse {
  data: AnalyticsMetric[];
  next_cursor?: string;
  request: AnalyticsRequest;
  time_series_length: number;
}

export interface AnalyticsMetric {
  id: string;
  id_data: Array<{
    metrics: AnalyticsMetrics;
    segment?: Record<string, string>;
  }>;
}

export interface AsyncAnalyticsJob {
  job_id: string;
  status: 'QUEUED' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
  created_at: string;
  updated_at: string;
  url?: string;
  expires_at?: string;
}

export interface AsyncAnalyticsJobResponse {
  data: AsyncAnalyticsJob;
}

export interface AsyncAnalyticsJobListResponse {
  data: AsyncAnalyticsJob[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}

export interface AnalyticsJobListOptions {
  count?: number;
  cursor?: string;
  job_ids?: string[];
  [key: string]: unknown;
}
