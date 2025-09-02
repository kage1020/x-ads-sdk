/**
 * X Ads Account related types
 */
export interface Account {
  /** Account ID in base36 format */
  id: string;
  /** Display name of the account */
  name?: string;
  /** Whether the account can be edited by the current user */
  read_only?: boolean;
  /** Account type */
  industry_type?: string;
  /** Account timezone */
  timezone?: string;
  /** Account timezone switch at */
  timezone_switch_at?: string;
  /** Account creation time */
  created_at: string;
  /** Account last update time */
  updated_at: string;
  /** Whether account is deleted */
  deleted?: boolean;
}

export interface AccountCreateRequest {
  /** Display name of the account */
  name: string;
  /** Account industry type */
  industry_type?: string;
}

export interface AccountUpdateRequest {
  /** Display name of the account */
  name?: string;
  /** Account industry type */
  industry_type?: string;
}

export interface AccountResponse {
  data: Account[];
  request: {
    params: Record<string, unknown>;
  };
  next_cursor?: string;
  total_count?: number;
}
