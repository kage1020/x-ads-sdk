/**
 * X Ads Funding Instrument related types
 */
export enum FundingInstrumentType {
  CREDIT_CARD = 'CREDIT_CARD',
  INSERTION_ORDER = 'INSERTION_ORDER',
}

export enum FundingInstrumentEntityStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
}

export interface FundingInstrument {
  /** Funding instrument ID */
  id: string;
  /** Funding instrument type */
  type: FundingInstrumentType;
  /** Funding instrument entity status */
  entity_status: FundingInstrumentEntityStatus;
  /** Currency code */
  currency: string;
  /** Funding instrument description */
  description?: string;
  /** Whether this is the account's default funding instrument */
  is_default?: boolean;
  /** Credit remaining in micros */
  credit_remaining_local_micro?: number;
  /** Credit limit in micros */
  credit_limit_local_micro?: number;
  /** Funding instrument creation time */
  created_at: string;
  /** Funding instrument last update time */
  updated_at: string;
  /** Whether funding instrument is deleted */
  deleted?: boolean;
}

export interface FundingInstrumentResponse {
  data: FundingInstrument[];
  request: {
    params: Record<string, unknown>;
  };
  next_cursor?: string;
  total_count?: number;
}

/**
 * Single funding instrument response
 */
export interface SingleFundingInstrumentResponse {
  data: FundingInstrument;
  request: {
    params: Record<string, unknown>;
  };
}
