export interface AdsAccount {
  id: string;
  name: string;
  timezone: string;
  timezone_switch_at: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface FundingInstrument {
  id: string;
  name: string;
  type: 'CREDIT_LINE' | 'INSERTION_ORDER';
  currency: string;
  credit_limit_local_micro?: number;
  funded_amount_local_micro?: number;
  created_at: string;
  updated_at: string;
}

export interface PromotableUser {
  id: string;
  user_id: string;
  promotable_user_type: 'FULL' | 'RETWEETS_ONLY';
  created_at: string;
  updated_at: string;
}

export interface AccountListResponse {
  data: AdsAccount[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}

export interface FundingInstrumentListResponse {
  data: FundingInstrument[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}
