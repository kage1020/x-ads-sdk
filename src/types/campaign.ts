export interface Campaign {
  id: string;
  name: string;
  account_id: string;
  funding_instrument_id: string;
  entity_status: 'ACTIVE' | 'PAUSED' | 'DELETED';
  campaign_optimization: 'DEFAULT' | 'OPTIMIZED';
  objective:
    | 'AWARENESS'
    | 'ENGAGEMENT'
    | 'FOLLOWERS'
    | 'VIDEO_VIEWS'
    | 'WEBSITE_CLICKS'
    | 'APP_INSTALLS'
    | 'APP_CLICKS'
    | 'PRE_ROLL_VIEWS';
  start_time: string;
  end_time?: string;
  budget_optimization: boolean;
  currency: string;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
  standard_delivery: boolean;
  paused: boolean;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface LineItem {
  id: string;
  name: string;
  campaign_id: string;
  objective:
    | 'APP_CLICKS'
    | 'APP_INSTALLS'
    | 'AWARENESS'
    | 'ENGAGEMENT'
    | 'FOLLOWERS'
    | 'PRE_ROLL_VIEWS'
    | 'VIDEO_VIEWS'
    | 'WEBSITE_CLICKS';
  product_type: 'PROMOTED_TWEETS' | 'PROMOTED_ACCOUNT' | 'VIDEO';
  bid_amount_local_micro?: number;
  bid_type: 'AUTO' | 'MAX' | 'TARGET';
  bid_unit: 'APP_CLICK' | 'APP_INSTALL' | 'CLICK' | 'ENGAGEMENT' | 'FOLLOW' | 'IMPRESSION' | 'VIEW';
  automatically_select_bid: boolean;
  start_time: string;
  end_time?: string;
  paused: boolean;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface Creative {
  id: string;
  name: string;
  line_item_id: string;
  creative_type: 'PROMOTED_ACCOUNT' | 'PROMOTED_TWEET' | 'PROMOTED_VIDEO';
  entity_id: string;
  entity_status: 'ACTIVE' | 'PAUSED' | 'DELETED';
  approval_status: 'APPROVED' | 'PENDING' | 'REJECTED';
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface CampaignCreateData {
  name: string;
  funding_instrument_id: string;
  entity_status?: Campaign['entity_status'];
  campaign_optimization?: Campaign['campaign_optimization'];
  objective?: Campaign['objective'];
  start_time: string;
  end_time?: string;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
  standard_delivery?: boolean;
  paused?: boolean;
  [key: string]: unknown;
}

export interface LineItemCreateData {
  name: string;
  campaign_id: string;
  objective: LineItem['objective'];
  product_type: LineItem['product_type'];
  bid_unit: LineItem['bid_unit'];
  bid_type?: LineItem['bid_type'];
  bid_amount_local_micro?: number;
  automatically_select_bid?: boolean;
  start_time: string;
  end_time?: string;
  paused?: boolean;
  [key: string]: unknown;
}

export interface CampaignUpdateData {
  name?: string;
  entity_status?: Campaign['entity_status'];
  campaign_optimization?: Campaign['campaign_optimization'];
  start_time?: string;
  end_time?: string;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
  paused?: boolean;
  [key: string]: unknown;
}

export interface LineItemUpdateData {
  name?: string;
  bid_amount_local_micro?: number;
  bid_type?: LineItem['bid_type'];
  start_time?: string;
  end_time?: string;
  paused?: boolean;
  [key: string]: unknown;
}

export interface CampaignListOptions {
  count?: number;
  cursor?: string;
  sort_by?: Array<{ field: string; direction: 'ASC' | 'DESC' }>;
  campaign_ids?: string[];
  funding_instrument_ids?: string[];
  entity_statuses?: Campaign['entity_status'][];
  with_deleted?: boolean;
  [key: string]: unknown;
}

export interface LineItemListOptions {
  count?: number;
  cursor?: string;
  sort_by?: Array<{ field: string; direction: 'ASC' | 'DESC' }>;
  line_item_ids?: string[];
  campaign_ids?: string[];
  [key: string]: unknown;
}

export interface CampaignResponse {
  data: Campaign;
}

export interface CampaignListResponse {
  data: Campaign[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}

export interface LineItemResponse {
  data: LineItem;
}

export interface LineItemListResponse {
  data: LineItem[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}
