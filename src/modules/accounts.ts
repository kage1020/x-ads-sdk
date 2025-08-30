import { BaseModule } from './base.js';
import { HttpClient } from '../client/base.js';
import { PaginatedResponse } from '../types/common.js';
import {
  Account,
  UpdateAccountData,
  AccountListParams,
  AccountStatus
} from '../types/account.js';

export class AccountsModule extends BaseModule {
  constructor(client: HttpClient) {
    super(client, 'accounts');
  }

  /**
   * List all accessible accounts
   */
  async list(params: AccountListParams = {}): Promise<PaginatedResponse<Account>> {
    const endpoint = '/accounts';
    return this.makeListRequest<Account>(endpoint, params);
  }

  /**
   * Get a specific account by ID
   */
  async get(accountId: string): Promise<Account> {
    const endpoint = this.buildEndpoint(accountId);
    return this.makeGetRequest<Account>(endpoint);
  }

  /**
   * Update an existing account
   */
  async update(accountId: string, data: UpdateAccountData): Promise<Account> {
    const endpoint = this.buildEndpoint(accountId);
    return this.makePutRequest<Account>(endpoint, data);
  }

  /**
   * Get accounts by status
   */
  async getByStatus(
    status: AccountStatus,
    params: Omit<AccountListParams, 'with_deleted'> = {}
  ): Promise<PaginatedResponse<Account>> {
    const accounts = await this.list({
      ...params,
      with_deleted: status === AccountStatus.DELETED
    });

    // Filter accounts by status
    const filteredData = accounts.data.filter(account => account.status === status);
    
    return {
      ...accounts,
      data: filteredData
    };
  }

  /**
   * Get active accounts
   */
  async getActive(
    params?: Omit<AccountListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<Account>> {
    return this.getByStatus(AccountStatus.ACTIVE, params);
  }

  /**
   * Get suspended accounts
   */
  async getSuspended(
    params?: Omit<AccountListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<Account>> {
    return this.getByStatus(AccountStatus.SUSPENDED, params);
  }

  /**
   * Get deleted accounts
   */
  async getDeleted(
    params?: Omit<AccountListParams, 'with_deleted'>
  ): Promise<PaginatedResponse<Account>> {
    return this.getByStatus(AccountStatus.DELETED, params);
  }

  /**
   * Get the first active account (convenience method)
   */
  async getFirstActive(): Promise<Account | null> {
    const accounts = await this.getActive({ count: 1 });
    return accounts.data.length > 0 ? accounts.data[0] : null;
  }
}