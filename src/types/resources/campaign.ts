/**
 * X Ads Campaign related types
 */
export enum CampaignEntityStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DRAFT = 'DRAFT',
}

export interface Campaign {
  /** Campaign ID */
  id: string;
  /** Campaign name */
  name: string;
  /** Associated funding instrument ID */
  funding_instrument_id: string;
  /** Campaign entity status */
  entity_status: CampaignEntityStatus;
  /** Campaign start time */
  start_time: string;
  /** Campaign end time */
  end_time?: string;
  /** Campaign currency */
  currency: string;
  /** Daily budget amount in micros */
  daily_budget_amount_local_micro?: number;
  /** Total budget amount in micros */
  total_budget_amount_local_micro?: number;
  /** Whether this is a standard delivery */
  standard_delivery?: boolean;
  /** Campaign creation time */
  created_at: string;
  /** Campaign last update time */
  updated_at: string;
  /** Whether campaign is deleted */
  deleted?: boolean;
}

export interface CampaignCreateRequest {
  /** Campaign name */
  name: string;
  /** Associated funding instrument ID */
  funding_instrument_id: string;
  /** Campaign start time */
  start_time: string;
  /** Campaign end time */
  end_time?: string;
  /** Campaign currency */
  currency: string;
  /** Daily budget amount in micros */
  daily_budget_amount_local_micro?: number;
  /** Total budget amount in micros */
  total_budget_amount_local_micro?: number;
  /** Campaign entity status */
  entity_status?: CampaignEntityStatus;
  /** Whether this is a standard delivery */
  standard_delivery?: boolean;
}

export interface CampaignUpdateRequest {
  /** Campaign name */
  name?: string;
  /** Campaign entity status */
  entity_status?: CampaignEntityStatus;
  /** Campaign end time */
  end_time?: string;
  /** Daily budget amount in micros */
  daily_budget_amount_local_micro?: number;
  /** Total budget amount in micros */
  total_budget_amount_local_micro?: number;
  /** Whether this is a standard delivery */
  standard_delivery?: boolean;
}

export interface CampaignResponse {
  data: Campaign[];
  request: {
    params: Record<string, unknown>;
  };
  next_cursor?: string;
  total_count?: number;
}
