/**
 * X Ads Conversion Tracking related types
 */

export enum ConversionTrackingTagType {
  WEB = 'WEB',
  MOBILE_APP = 'MOBILE_APP',
}

export enum ConversionTrackingTagState {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

export enum ConversionAttribution {
  LAST_TOUCH = 'LAST_TOUCH',
  FIRST_TOUCH = 'FIRST_TOUCH',
  LINEAR = 'LINEAR',
}

export enum AttributionWindow {
  ONE_DAY = 'ONE_DAY',
  SEVEN_DAYS = 'SEVEN_DAYS',
  FOURTEEN_DAYS = 'FOURTEEN_DAYS',
  THIRTY_DAYS = 'THIRTY_DAYS',
}

export interface ConversionTag {
  /** Conversion tag ID */
  id: string;
  /** Conversion tag name */
  name: string;
  /** Tag type (Web or Mobile App) */
  tag_type: ConversionTrackingTagType;
  /** Current state of the tag */
  state: ConversionTrackingTagState;
  /** Click attribution window */
  click_attribution_window: AttributionWindow;
  /** View attribution window */
  view_attribution_window: AttributionWindow;
  /** Conversion attribution model */
  attribution_model: ConversionAttribution;
  /** Tag creation time */
  created_at: string;
  /** Tag last update time */
  updated_at: string;
  /** Whether tag is deleted */
  deleted?: boolean;
  /** Tag pixel code (for web tags) */
  pixel_code?: string;
  /** App event provider (for mobile tags) */
  app_event_provider?: string;
  /** App event name (for mobile tags) */
  app_event_name?: string;
}

export interface CreateConversionTagRequest {
  /** Tag name */
  name: string;
  /** Tag type */
  tag_type: ConversionTrackingTagType;
  /** Click attribution window (optional, defaults to THIRTY_DAYS) */
  click_attribution_window?: AttributionWindow;
  /** View attribution window (optional, defaults to ONE_DAY) */
  view_attribution_window?: AttributionWindow;
  /** Attribution model (optional, defaults to LAST_TOUCH) */
  attribution_model?: ConversionAttribution;
  /** App event provider (required for mobile tags) */
  app_event_provider?: string;
  /** App event name (required for mobile tags) */
  app_event_name?: string;
}

export interface UpdateConversionTagRequest {
  /** Tag name */
  name?: string;
  /** Tag state */
  state?: ConversionTrackingTagState;
  /** Click attribution window */
  click_attribution_window?: AttributionWindow;
  /** View attribution window */
  view_attribution_window?: AttributionWindow;
  /** Attribution model */
  attribution_model?: ConversionAttribution;
}

export interface ConversionTagResponse {
  data: ConversionTag[];
  request: {
    params: Record<string, unknown>;
  };
  next_cursor?: string;
  total_count?: number;
}

export interface SingleConversionTagResponse {
  data: ConversionTag;
  request: {
    params: Record<string, unknown>;
  };
}

export interface ConversionEvent {
  /** Event ID */
  id: string;
  /** Conversion tag ID */
  conversion_tag_id: string;
  /** Event timestamp */
  event_time: string;
  /** Conversion value in micros */
  conversion_value_local_micro?: number;
  /** Currency code */
  currency?: string;
  /** Event identifier */
  event_identifier?: string;
  /** User identifier hashes */
  user_identifiers?: {
    hashed_email?: string;
    hashed_phone_number?: string;
  };
}

export interface ConversionEventRequest {
  /** Conversion tag ID */
  conversion_tag_id: string;
  /** Event timestamp (ISO 8601) */
  event_time: string;
  /** Conversion value in micros */
  conversion_value_local_micro?: number;
  /** Currency code */
  currency?: string;
  /** Event identifier */
  event_identifier?: string;
  /** User identifier hashes */
  user_identifiers?: {
    hashed_email?: string;
    hashed_phone_number?: string;
  };
}

export interface ConversionEventResponse {
  data: ConversionEvent[];
  request: {
    params: Record<string, unknown>;
  };
  next_cursor?: string;
}

/**
 * Conversion tracking analytics data
 */
export interface ConversionAnalytics {
  /** Tag ID */
  conversion_tag_id: string;
  /** Tag name */
  conversion_tag_name: string;
  /** Date range start */
  start_date: string;
  /** Date range end */
  end_date: string;
  /** Total conversions */
  total_conversions: number;
  /** Conversion value */
  conversion_value_local_micro: number;
  /** Cost per conversion */
  cost_per_conversion_local_micro?: number;
  /** Conversion rate */
  conversion_rate?: number;
}
