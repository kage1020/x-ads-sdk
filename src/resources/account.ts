/**
 * Account resource management
 */

import type { RequestConfig } from '../client/base.js';
import type { RequestOptions } from '../types/auth.js';
import type {
  AccountCreateRequest,
  AccountResponse,
  AccountUpdateRequest,
} from '../types/resources/account.js';
import { BaseResource } from './base.js';

export class AccountResource extends BaseResource {
  /**
   * Get accounts accessible to the current user
   * @param options Request options
   * @returns Account response
   */
  async list(options?: RequestOptions): Promise<AccountResponse> {
    const requestConfig: RequestConfig = {
      method: 'GET' as const,
      endpoint: '/12/accounts',
      ...(options || {}),
    };
    const response = await this.httpClient.request<AccountResponse>(requestConfig);
    return response;
  }

  /**
   * Get a specific account by ID
   * @param accountId Account ID
   * @param options Request options
   * @returns Account response
   */
  async get(accountId: string, options?: RequestOptions): Promise<AccountResponse> {
    const requestConfig: RequestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<AccountResponse>(requestConfig);
    return response;
  }

  /**
   * Create a new account (Sandbox only)
   * @param data Account creation data
   * @param options Request options
   * @returns Account response
   */
  async create(data: AccountCreateRequest, options?: RequestOptions): Promise<AccountResponse> {
    const requestConfig: RequestConfig = {
      method: 'POST' as const,
      endpoint: '/12/accounts',
      body: data,
      ...(options || {}),
    };
    const response = await this.httpClient.request<AccountResponse>(requestConfig);
    return response;
  }

  /**
   * Update an account
   * @param accountId Account ID
   * @param data Account update data
   * @param options Request options
   * @returns Account response
   */
  async update(
    accountId: string,
    data: AccountUpdateRequest,
    options?: RequestOptions
  ): Promise<AccountResponse> {
    const requestConfig: RequestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}`,
      body: data,
      ...(options || {}),
    };
    const response = await this.httpClient.request<AccountResponse>(requestConfig);
    return response;
  }
}
