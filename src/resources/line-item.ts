/**
 * Line Item resource management
 */

import type { RequestConfig } from '../client/base.js';
import type { RequestOptions } from '../types/auth.js';
import type {
  LineItemCreateRequest,
  LineItemResponse,
  LineItemUpdateRequest,
} from '../types/resources/line-item.js';
import { BaseResource } from './base.js';

export class LineItemResource extends BaseResource {
  private accountId: string;

  constructor(httpClient: import('../client/base.js').HttpClient, accountId: string) {
    super(httpClient);
    this.accountId = accountId;
  }

  /**
   * Get line items for the account
   * @param options Request options
   * @returns Line item response
   */
  async list(options?: RequestOptions): Promise<LineItemResponse> {
    const requestConfig: RequestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${this.accountId}/line_items`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<LineItemResponse>(requestConfig);
    return response;
  }

  /**
   * Get a specific line item by ID
   * @param lineItemId Line item ID
   * @param options Request options
   * @returns Line item response
   */
  async get(lineItemId: string, options?: RequestOptions): Promise<LineItemResponse> {
    const requestConfig: RequestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${this.accountId}/line_items/${lineItemId}`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<LineItemResponse>(requestConfig);
    return response;
  }

  /**
   * Create a new line item
   * @param data Line item creation data
   * @param options Request options
   * @returns Line item response
   */
  async create(data: LineItemCreateRequest, options?: RequestOptions): Promise<LineItemResponse> {
    const requestConfig: RequestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${this.accountId}/line_items`,
      body: data,
      ...(options || {}),
    };
    const response = await this.httpClient.request<LineItemResponse>(requestConfig);
    return response;
  }

  /**
   * Update a line item
   * @param lineItemId Line item ID
   * @param data Line item update data
   * @param options Request options
   * @returns Line item response
   */
  async update(
    lineItemId: string,
    data: LineItemUpdateRequest,
    options?: RequestOptions
  ): Promise<LineItemResponse> {
    const requestConfig: RequestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${this.accountId}/line_items/${lineItemId}`,
      body: data,
      ...(options || {}),
    };
    const response = await this.httpClient.request<LineItemResponse>(requestConfig);
    return response;
  }

  /**
   * Delete a line item
   * @param lineItemId Line item ID
   * @param options Request options
   * @returns Line item response
   */
  async delete(lineItemId: string, options?: RequestOptions): Promise<LineItemResponse> {
    const requestConfig: RequestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${this.accountId}/line_items/${lineItemId}`,
      ...(options || {}),
    };
    const response = await this.httpClient.request<LineItemResponse>(requestConfig);
    return response;
  }
}
