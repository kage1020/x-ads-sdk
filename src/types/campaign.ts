export enum CampaignStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELETED = 'DELETED',
}

export enum CampaignObjective {
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

export enum CampaignPlacement {
  ALL_ON_TWITTER = 'ALL_ON_TWITTER',
  PUBLISHER_NETWORK = 'PUBLISHER_NETWORK',
}

export interface Campaign {
  id: string;
  account_id: string;
  name: string;
  status: CampaignStatus;
  objective: CampaignObjective;
  placement: CampaignPlacement;
  start_time?: string;
  end_time?: string;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
  currency: string;
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

export interface CreateCampaignData {
  name: string;
  objective: CampaignObjective;
  placement?: CampaignPlacement;
  start_time?: string;
  end_time?: string;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
  currency?: string;
}

export interface UpdateCampaignData {
  name?: string;
  status?: CampaignStatus;
  start_time?: string;
  end_time?: string;
  daily_budget_amount_local_micro?: number;
  total_budget_amount_local_micro?: number;
}

export interface CampaignListParams {
  campaign_ids?: string[];
  funding_instrument_ids?: string[];
  with_deleted?: boolean;
  count?: number;
  cursor?: string;
  sort_by?: string;
  [key: string]: unknown;
}
