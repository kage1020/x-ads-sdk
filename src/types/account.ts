export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
}

export enum AccountType {
  PROMOTED_ACCOUNT = 'PROMOTED_ACCOUNT'
}

export interface Account {
  id: string;
  name: string;
  status: AccountStatus;
  type: AccountType;
  currency: string;
  timezone: string;
  timezone_switch_at?: string;
  created_at: string;
  updated_at: string;
  deleted?: boolean;
}

export interface UpdateAccountData {
  name?: string;
  timezone?: string;
}

export interface AccountListParams {
  with_deleted?: boolean;
  count?: number;
  cursor?: string;
  sort_by?: string;
}