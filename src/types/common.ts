import type { APIVersion } from './api-version';

export interface ListParams {
  count?: number;
  cursor?: string;
  sort_by?: string;
  with_deleted?: boolean;
  [key: string]: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  next_cursor?: string;
  total_count?: number;
}

export interface APIResponse<T> {
  data: T;
  request: {
    params: Record<string, unknown>;
  };
}

export enum Environment {
  PRODUCTION = 'production',
  SANDBOX = 'sandbox',
}

export interface ClientConfig {
  auth: {
    consumer_key: string;
    consumer_secret: string;
    access_token: string;
    access_token_secret: string;
  };
  environment?: Environment;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  rateLimitStrategy?: 'wait' | 'throw';
  apiVersion?: APIVersion;
  autoUpgradeVersion?: boolean;
}
