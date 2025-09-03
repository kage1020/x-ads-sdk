/**
 * Funding Instrument resource for X Ads API
 */

import type { RequestOptions } from '../types/auth.js';
import type {
  FundingInstrumentResponse,
  SingleFundingInstrumentResponse,
} from '../types/resources/funding-instrument.js';
import {
  FundingInstrumentEntityStatus,
  FundingInstrumentType,
} from '../types/resources/funding-instrument.js';
import { BaseResource } from './base.js';

/**
 * Funding instrument sort field type
 */
export type FundingInstrumentSortField = 'created_at' | 'updated_at' | 'entity_status' | 'type';

/**
 * Funding Instrument resource class for managing payment methods
 */
export class FundingInstrumentResource extends BaseResource {
  /**
   * Get all funding instruments for an account
   */
  async getFundingInstruments(
    accountId: string,
    options?: {
      funding_instrument_ids?: string[];
      funding_instrument_types?: FundingInstrumentType[];
      entity_statuses?: FundingInstrumentEntityStatus[];
      count?: number;
      cursor?: string;
      sort_by?: FundingInstrumentSortField;
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<FundingInstrumentResponse> {
    const params: Record<string, string> = {};

    if (options?.funding_instrument_ids) {
      params.funding_instrument_ids = options.funding_instrument_ids.join(',');
    }
    if (options?.funding_instrument_types) {
      params.funding_instrument_types = options.funding_instrument_types.join(',');
    }
    if (options?.entity_statuses) {
      params.entity_statuses = options.entity_statuses.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/funding_instruments`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<FundingInstrumentResponse>(requestConfig);
  }

  /**
   * Get a specific funding instrument
   */
  async getFundingInstrument(
    accountId: string,
    fundingInstrumentId: string,
    requestOptions?: RequestOptions
  ): Promise<SingleFundingInstrumentResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/funding_instruments/${fundingInstrumentId}`,
      ...requestOptions,
    };

    return this.httpClient.request<SingleFundingInstrumentResponse>(requestConfig);
  }

  // Convenience Methods

  /**
   * Get all active funding instruments
   */
  async getActiveFundingInstruments(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<FundingInstrumentResponse> {
    return this.getFundingInstruments(
      accountId,
      {
        entity_statuses: [FundingInstrumentEntityStatus.ACTIVE],
      },
      requestOptions
    );
  }

  /**
   * Get all credit card funding instruments
   */
  async getCreditCardFundingInstruments(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<FundingInstrumentResponse> {
    return this.getFundingInstruments(
      accountId,
      {
        funding_instrument_types: [FundingInstrumentType.CREDIT_CARD],
        entity_statuses: [FundingInstrumentEntityStatus.ACTIVE],
      },
      requestOptions
    );
  }

  /**
   * Get all insertion order funding instruments
   */
  async getInsertionOrderFundingInstruments(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<FundingInstrumentResponse> {
    return this.getFundingInstruments(
      accountId,
      {
        funding_instrument_types: [FundingInstrumentType.INSERTION_ORDER],
        entity_statuses: [FundingInstrumentEntityStatus.ACTIVE],
      },
      requestOptions
    );
  }

  /**
   * Get the default funding instrument for an account
   */
  async getDefaultFundingInstrument(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<SingleFundingInstrumentResponse | null> {
    const response = await this.getActiveFundingInstruments(accountId, requestOptions);

    // Find the default funding instrument
    const defaultFI = response.data.find((fi) => fi.is_default === true);

    if (!defaultFI) {
      return null;
    }

    return {
      data: defaultFI,
      request: response.request,
    };
  }

  /**
   * Check if account has sufficient credit in any funding instrument
   */
  async hasAvailableCredit(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<{
    has_credit: boolean;
    total_available_credit: number;
    funding_instruments_with_credit: number;
  }> {
    const response = await this.getActiveFundingInstruments(accountId, requestOptions);

    let totalCredit = 0;
    let instrumentsWithCredit = 0;

    response.data.forEach((fi) => {
      if (fi.credit_remaining_local_micro && fi.credit_remaining_local_micro > 0) {
        totalCredit += fi.credit_remaining_local_micro;
        instrumentsWithCredit++;
      }
    });

    return {
      has_credit: totalCredit > 0,
      total_available_credit: totalCredit,
      funding_instruments_with_credit: instrumentsWithCredit,
    };
  }

  /**
   * Get funding instruments summary
   */
  async getFundingInstrumentsSummary(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<{
    total_count: number;
    active_count: number;
    paused_count: number;
    cancelled_count: number;
    credit_card_count: number;
    insertion_order_count: number;
    default_funding_instrument?: {
      id: string;
      type: FundingInstrumentType;
      currency: string;
      credit_remaining?: number;
    };
  }> {
    const response = await this.getFundingInstruments(accountId, {}, requestOptions);

    const summary = {
      total_count: response.data.length,
      active_count: 0,
      paused_count: 0,
      cancelled_count: 0,
      credit_card_count: 0,
      insertion_order_count: 0,
      default_funding_instrument: undefined as
        | {
            id: string;
            type: FundingInstrumentType;
            currency: string;
            credit_remaining?: number;
          }
        | undefined,
    };

    response.data.forEach((fi) => {
      // Count by status
      switch (fi.entity_status) {
        case FundingInstrumentEntityStatus.ACTIVE:
          summary.active_count++;
          break;
        case FundingInstrumentEntityStatus.PAUSED:
          summary.paused_count++;
          break;
        case FundingInstrumentEntityStatus.CANCELLED:
          summary.cancelled_count++;
          break;
      }

      // Count by type
      switch (fi.type) {
        case FundingInstrumentType.CREDIT_CARD:
          summary.credit_card_count++;
          break;
        case FundingInstrumentType.INSERTION_ORDER:
          summary.insertion_order_count++;
          break;
      }

      // Set default funding instrument
      if (fi.is_default === true) {
        summary.default_funding_instrument = {
          id: fi.id,
          type: fi.type,
          currency: fi.currency,
          credit_remaining: fi.credit_remaining_local_micro,
        };
      }
    });

    return summary;
  }
}
