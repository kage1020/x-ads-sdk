import { BaseClient } from '../client/base-client';
import type {
  LineItem,
  LineItemCreateData,
  LineItemListOptions,
  LineItemListResponse,
  LineItemResponse,
  LineItemUpdateData,
} from '../types';
import {
  sanitizeParams,
  validateBudget,
  validateDateRange,
  validateRequired,
  validateStringLength,
} from '../utils/validation';

export class LineItemsClient extends BaseClient {
  public async create(accountId: string, data: LineItemCreateData): Promise<LineItemResponse> {
    validateRequired(data, [
      'name',
      'campaign_id',
      'objective',
      'product_type',
      'bid_unit',
      'start_time',
    ]);
    validateStringLength(data.name, 'Line item name');

    if (!data.automatically_select_bid && !data.bid_amount_local_micro) {
      throw new Error('bid_amount_local_micro is required when automatically_select_bid is false');
    }

    if (data.bid_amount_local_micro) {
      validateBudget(data.bid_amount_local_micro, 1000000);
    }

    if (data.end_time) {
      validateDateRange(data.start_time, data.end_time);
    }

    this.validateObjectiveProductTypeCompatibility(data.objective, data.product_type);

    const sanitizedData = sanitizeParams(data);
    return this.post<LineItem>(`/accounts/${accountId}/line_items`, sanitizedData);
  }

  public async list(
    accountId: string,
    options?: LineItemListOptions
  ): Promise<LineItemListResponse> {
    const params = options ? sanitizeParams(options) : {};
    return this.getList<LineItem>(`/accounts/${accountId}/line_items`, params);
  }

  public async getLineItem(accountId: string, lineItemId: string): Promise<LineItemResponse> {
    return this.get<LineItem>(`/accounts/${accountId}/line_items/${lineItemId}`);
  }

  public async update(
    accountId: string,
    lineItemId: string,
    data: LineItemUpdateData
  ): Promise<LineItemResponse> {
    if (data.name) {
      validateStringLength(data.name, 'Line item name');
    }

    if (data.bid_amount_local_micro !== undefined) {
      validateBudget(data.bid_amount_local_micro, 1000000);
    }

    if (data.start_time && data.end_time) {
      validateDateRange(data.start_time, data.end_time);
    }

    const sanitizedData = sanitizeParams(data);
    return this.put<LineItem>(`/accounts/${accountId}/line_items/${lineItemId}`, sanitizedData);
  }

  public async delete(accountId: string, lineItemId: string): Promise<LineItemResponse> {
    return this.deleteRequest<LineItem>(`/accounts/${accountId}/line_items/${lineItemId}`);
  }

  private validateObjectiveProductTypeCompatibility(
    objective: LineItem['objective'],
    productType: LineItem['product_type']
  ): void {
    const incompatibleCombinations: Array<[LineItem['objective'], LineItem['product_type']]> = [
      ['APP_INSTALLS', 'PROMOTED_ACCOUNT'],
      ['APP_CLICKS', 'PROMOTED_ACCOUNT'],
      ['FOLLOWERS', 'PROMOTED_TWEETS'],
    ];

    const isIncompatible = incompatibleCombinations.some(
      ([obj, prod]) => obj === objective && prod === productType
    );

    if (isIncompatible) {
      throw new Error(
        `Objective '${objective}' is not compatible with product type '${productType}'`
      );
    }
  }
}
