export enum AdGroupStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELETED = 'DELETED',
}

export enum AdGroupPlacement {
  ALL_ON_TWITTER = 'ALL_ON_TWITTER',
  PUBLISHER_NETWORK = 'PUBLISHER_NETWORK',
}

export enum AdGroupObjective {
  APP_INSTALLS = 'APP_INSTALLS',
  APP_RE_ENGAGEMENTS = 'APP_RE_ENGAGEMENTS',
  AWARENESS = 'AWARENESS',
  ENGAGEMENTS = 'ENGAGEMENTS',
  FOLLOWERS = 'FOLLOWERS',
  REACH = 'REACH',
  VIDEO_VIEWS = 'VIDEO_VIEWS',
  WEBSITE_CLICKS = 'WEBSITE_CLICKS',
  WEBSITE_CONVERSIONS = 'WEBSITE_CONVERSIONS',
}

export enum BidType {
  AUTO = 'AUTO',
  MAX = 'MAX',
  TARGET = 'TARGET',
}

export interface AdGroup {
  id: string;
  account_id: string;
  campaign_id: string;
  name: string;
  status: AdGroupStatus;
  placement: AdGroupPlacement;
  objective: AdGroupObjective;
  start_time?: string;
  end_time?: string;
  bid_amount_local_micro?: number;
  bid_type?: BidType;
  target_cpa_local_micro?: number;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

export interface CreateAdGroupData {
  campaign_id: string;
  name: string;
  placement?: AdGroupPlacement;
  start_time?: string;
  end_time?: string;
  bid_amount_local_micro?: number;
  bid_type?: BidType;
  target_cpa_local_micro?: number;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
}

export interface UpdateAdGroupData {
  name?: string;
  status?: AdGroupStatus;
  start_time?: string;
  end_time?: string;
  bid_amount_local_micro?: number;
  bid_type?: BidType;
  target_cpa_local_micro?: number;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
}

export interface AdGroupListParams {
  line_item_ids?: string[];
  campaign_ids?: string[];
  funding_instrument_ids?: string[];
  with_deleted?: boolean;
  count?: number;
  cursor?: string;
  sort_by?: string;
  [key: string]: unknown;
}
