/**
 * X Ads Line Item (Ad Group) related types
 */
export enum LineItemEntityStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DRAFT = 'DRAFT',
}

export enum LineItemObjective {
  AWARENESS = 'AWARENESS',
  VIDEO_VIEWS = 'VIDEO_VIEWS',
  WEBSITE_CLICKS = 'WEBSITE_CLICKS',
  ENGAGEMENT = 'ENGAGEMENT',
  APP_INSTALLS = 'APP_INSTALLS',
  FOLLOWERS = 'FOLLOWERS',
  PREROLL_VIEWS = 'PREROLL_VIEWS',
  MOBILE_CONVERSIONS = 'MOBILE_CONVERSIONS',
}

export enum LineItemProductType {
  PROMOTED_TWEETS = 'PROMOTED_TWEETS',
  PROMOTED_ACCOUNTS = 'PROMOTED_ACCOUNTS',
  PROMOTED_VIDEOS = 'PROMOTED_VIDEOS',
  MEDIA = 'MEDIA',
}

export enum LineItemPlacement {
  ALL_ON_TWITTER = 'ALL_ON_TWITTER',
  PUBLISHER_NETWORK = 'PUBLISHER_NETWORK',
}

export enum LineItemBidType {
  AUTO = 'AUTO',
  MAX = 'MAX',
}

export interface LineItem {
  /** Line item ID */
  id: string;
  /** Line item name */
  name?: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** Line item entity status */
  entity_status: LineItemEntityStatus;
  /** Line item objective */
  objective: LineItemObjective;
  /** Product type */
  product_type: LineItemProductType;
  /** Placements */
  placements: LineItemPlacement[];
  /** Bid type */
  bid_type?: LineItemBidType;
  /** Bid amount in micros */
  bid_amount_local_micro?: number;
  /** Target CPA amount in micros */
  target_cpa_local_micro?: number;
  /** Daily budget amount in micros */
  daily_budget_amount_local_micro?: number;
  /** Total budget amount in micros */
  total_budget_amount_local_micro?: number;
  /** Whether this is automatically select bid */
  automatically_select_bid?: boolean;
  /** Line item creation time */
  created_at: string;
  /** Line item last update time */
  updated_at: string;
  /** Whether line item is deleted */
  deleted?: boolean;
}

export interface LineItemCreateRequest {
  /** Line item name */
  name?: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** Line item objective */
  objective: LineItemObjective;
  /** Product type */
  product_type: LineItemProductType;
  /** Placements */
  placements: LineItemPlacement[];
  /** Line item entity status */
  entity_status?: LineItemEntityStatus;
  /** Bid type */
  bid_type?: LineItemBidType;
  /** Bid amount in micros */
  bid_amount_local_micro?: number;
  /** Target CPA amount in micros */
  target_cpa_local_micro?: number;
  /** Daily budget amount in micros */
  daily_budget_amount_local_micro?: number;
  /** Total budget amount in micros */
  total_budget_amount_local_micro?: number;
  /** Whether this is automatically select bid */
  automatically_select_bid?: boolean;
}

export interface LineItemUpdateRequest {
  /** Line item name */
  name?: string;
  /** Line item entity status */
  entity_status?: LineItemEntityStatus;
  /** Bid amount in micros */
  bid_amount_local_micro?: number;
  /** Target CPA amount in micros */
  target_cpa_local_micro?: number;
  /** Daily budget amount in micros */
  daily_budget_amount_local_micro?: number;
  /** Total budget amount in micros */
  total_budget_amount_local_micro?: number;
  /** Whether this is automatically select bid */
  automatically_select_bid?: boolean;
}

export interface LineItemResponse {
  data: LineItem[];
  request: {
    params: Record<string, unknown>;
  };
  next_cursor?: string;
  total_count?: number;
}
