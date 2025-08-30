export enum EntityType {
  ACCOUNT = 'ACCOUNT',
  CAMPAIGN = 'CAMPAIGN',
  LINE_ITEM = 'LINE_ITEM',
  PROMOTED_TWEET = 'PROMOTED_TWEET'
}

export enum Granularity {
  HOUR = 'HOUR',
  DAY = 'DAY',
  TOTAL = 'TOTAL'
}

export enum Placement {
  ALL_ON_TWITTER = 'ALL_ON_TWITTER',
  PUBLISHER_NETWORK = 'PUBLISHER_NETWORK'
}

export interface MetricGroup {
  ENGAGEMENT: string[];
  BILLING: string[];
  VIDEO: string[];
  MEDIA: string[];
  WEB_CONVERSION: string[];
  MOBILE_CONVERSION: string[];
}

export const METRIC_GROUPS: MetricGroup = {
  ENGAGEMENT: [
    'impressions',
    'clicks',
    'engagements',
    'retweets',
    'replies',
    'likes',
    'follows',
    'card_engagements',
    'carousel_swipes'
  ],
  BILLING: [
    'billed_charge_local_micro',
    'billed_engagements'
  ],
  VIDEO: [
    'video_total_views',
    'video_views_25',
    'video_views_50',
    'video_views_75',
    'video_views_100',
    'video_cta_clicks',
    'video_content_starts'
  ],
  MEDIA: [
    'media_views',
    'media_engagements'
  ],
  WEB_CONVERSION: [
    'conversion_purchases',
    'conversion_sign_ups',
    'conversion_site_visits',
    'conversion_downloads',
    'conversion_custom'
  ],
  MOBILE_CONVERSION: [
    'mobile_conversion_installs',
    'mobile_conversion_purchases',
    'mobile_conversion_sign_ups',
    'mobile_conversion_downloads',
    'mobile_conversion_custom'
  ]
};

export interface AnalyticsQuery {
  entity: EntityType;
  entity_ids: string[];
  start_time: string;
  end_time: string;
  granularity: Granularity;
  metric_groups?: string[];
  placement?: Placement;
  segmentation_type?: string;
  country?: string;
  platform?: string;
}

export interface AnalyticsMetrics {
  impressions?: number;
  clicks?: number;
  engagements?: number;
  retweets?: number;
  replies?: number;
  likes?: number;
  follows?: number;
  card_engagements?: number;
  carousel_swipes?: number;
  
  billed_charge_local_micro?: number;
  billed_engagements?: number;
  
  video_total_views?: number;
  video_views_25?: number;
  video_views_50?: number;
  video_views_75?: number;
  video_views_100?: number;
  video_cta_clicks?: number;
  video_content_starts?: number;
  
  media_views?: number;
  media_engagements?: number;
  
  conversion_purchases?: number;
  conversion_sign_ups?: number;
  conversion_site_visits?: number;
  conversion_downloads?: number;
  conversion_custom?: number;
  
  mobile_conversion_installs?: number;
  mobile_conversion_purchases?: number;
  mobile_conversion_sign_ups?: number;
  mobile_conversion_downloads?: number;
  mobile_conversion_custom?: number;
}

export interface AnalyticsData {
  id: string;
  id_data: Array<{
    segment: any;
    metrics: AnalyticsMetrics;
  }>;
}

export interface AnalyticsResponse {
  request: {
    params: AnalyticsQuery;
  };
  data: AnalyticsData[];
}

export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface AnalyticsOptions {
  entity_type: EntityType;
  entity_ids: string[];
  date_range: DateRange;
  granularity?: Granularity;
  metric_groups?: string[];
  placement?: Placement;
  segmentation_type?: string;
  country?: string;
  platform?: string;
}