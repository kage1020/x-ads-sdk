/**
 * Conversion Tracking resource for X Ads API
 */

import type { RequestOptions } from '../types/auth.js';
import type {
  AttributionWindow,
  ConversionEventRequest,
  ConversionTagResponse,
  CreateConversionTagRequest,
  SingleConversionTagResponse,
  UpdateConversionTagRequest,
} from '../types/conversion-tracking.js';
import {
  ConversionTrackingTagState,
  ConversionTrackingTagType,
} from '../types/conversion-tracking.js';
import { BaseResource } from './base.js';

/**
 * Conversion tracking sort field type
 */
export type ConversionTagSortField = 'created_at' | 'updated_at' | 'name' | 'state';

/**
 * Conversion Tracking resource class for managing conversion tags and events
 */
export class ConversionTrackingResource extends BaseResource {
  // Conversion Tag Management

  /**
   * Get all conversion tags for an account
   */
  async getConversionTags(
    accountId: string,
    options?: {
      conversion_tag_ids?: string[];
      tag_types?: ConversionTrackingTagType[];
      states?: ConversionTrackingTagState[];
      count?: number;
      cursor?: string;
      sort_by?: ConversionTagSortField;
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<ConversionTagResponse> {
    const params: Record<string, string> = {};

    if (options?.conversion_tag_ids) {
      params.conversion_tag_ids = options.conversion_tag_ids.join(',');
    }
    if (options?.tag_types) {
      params.tag_types = options.tag_types.join(',');
    }
    if (options?.states) {
      params.states = options.states.join(',');
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
      endpoint: `/12/accounts/${accountId}/conversion_tags`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ConversionTagResponse>(requestConfig);
  }

  /**
   * Get a specific conversion tag
   */
  async getConversionTag(
    accountId: string,
    conversionTagId: string,
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/conversion_tags/${conversionTagId}`,
      ...requestOptions,
    };

    return this.httpClient.request<SingleConversionTagResponse>(requestConfig);
  }

  /**
   * Create a new conversion tag
   */
  async createConversionTag(
    accountId: string,
    tagData: CreateConversionTagRequest,
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/conversion_tags`,
      data: tagData,
      ...requestOptions,
    };

    return this.httpClient.request<SingleConversionTagResponse>(requestConfig);
  }

  /**
   * Update a conversion tag
   */
  async updateConversionTag(
    accountId: string,
    conversionTagId: string,
    updates: UpdateConversionTagRequest,
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/conversion_tags/${conversionTagId}`,
      data: updates,
      ...requestOptions,
    };

    return this.httpClient.request<SingleConversionTagResponse>(requestConfig);
  }

  /**
   * Delete a conversion tag
   */
  async deleteConversionTag(
    accountId: string,
    conversionTagId: string,
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/conversion_tags/${conversionTagId}`,
      ...requestOptions,
    };

    return this.httpClient.request<SingleConversionTagResponse>(requestConfig);
  }

  // Conversion Event Tracking

  /**
   * Submit conversion events (server-to-server tracking)
   */
  async submitConversionEvent(
    accountId: string,
    eventData: ConversionEventRequest,
    requestOptions?: RequestOptions
  ): Promise<{ success: boolean; event_id?: string }> {
    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/conversion_events`,
      data: eventData,
      ...requestOptions,
    };

    return this.httpClient.request<{ success: boolean; event_id?: string }>(requestConfig);
  }

  /**
   * Submit multiple conversion events in batch
   */
  async submitConversionEventsBatch(
    accountId: string,
    events: ConversionEventRequest[],
    requestOptions?: RequestOptions
  ): Promise<{
    success: boolean;
    processed_events: number;
    failed_events: number;
    event_ids?: string[];
  }> {
    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/conversion_events/batch`,
      data: { events },
      ...requestOptions,
    };

    return this.httpClient.request<{
      success: boolean;
      processed_events: number;
      failed_events: number;
      event_ids?: string[];
    }>(requestConfig);
  }

  // Convenience Methods

  /**
   * Get all web conversion tags
   */
  async getWebConversionTags(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<ConversionTagResponse> {
    return this.getConversionTags(
      accountId,
      {
        tag_types: [ConversionTrackingTagType.WEB],
        states: [ConversionTrackingTagState.ACTIVE],
      },
      requestOptions
    );
  }

  /**
   * Get all mobile app conversion tags
   */
  async getMobileAppConversionTags(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<ConversionTagResponse> {
    return this.getConversionTags(
      accountId,
      {
        tag_types: [ConversionTrackingTagType.MOBILE_APP],
        states: [ConversionTrackingTagState.ACTIVE],
      },
      requestOptions
    );
  }

  /**
   * Get all active conversion tags
   */
  async getActiveConversionTags(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<ConversionTagResponse> {
    return this.getConversionTags(
      accountId,
      {
        states: [ConversionTrackingTagState.ACTIVE],
      },
      requestOptions
    );
  }

  /**
   * Pause a conversion tag
   */
  async pauseConversionTag(
    accountId: string,
    conversionTagId: string,
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    return this.updateConversionTag(
      accountId,
      conversionTagId,
      {
        state: ConversionTrackingTagState.PAUSED,
      },
      requestOptions
    );
  }

  /**
   * Resume a conversion tag
   */
  async resumeConversionTag(
    accountId: string,
    conversionTagId: string,
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    return this.updateConversionTag(
      accountId,
      conversionTagId,
      {
        state: ConversionTrackingTagState.ACTIVE,
      },
      requestOptions
    );
  }

  /**
   * Create a web conversion tag
   */
  async createWebConversionTag(
    accountId: string,
    name: string,
    options?: {
      click_attribution_window?: AttributionWindow;
      view_attribution_window?: AttributionWindow;
    },
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    const tagData: CreateConversionTagRequest = {
      name,
      tag_type: ConversionTrackingTagType.WEB,
      ...options,
    };

    return this.createConversionTag(accountId, tagData, requestOptions);
  }

  /**
   * Create a mobile app conversion tag
   */
  async createMobileAppConversionTag(
    accountId: string,
    name: string,
    appEventProvider: string,
    appEventName: string,
    options?: {
      click_attribution_window?: AttributionWindow;
      view_attribution_window?: AttributionWindow;
    },
    requestOptions?: RequestOptions
  ): Promise<SingleConversionTagResponse> {
    const tagData: CreateConversionTagRequest = {
      name,
      tag_type: ConversionTrackingTagType.MOBILE_APP,
      app_event_provider: appEventProvider,
      app_event_name: appEventName,
      ...options,
    };

    return this.createConversionTag(accountId, tagData, requestOptions);
  }

  /**
   * Get conversion tags summary
   */
  async getConversionTagsSummary(
    accountId: string,
    requestOptions?: RequestOptions
  ): Promise<{
    total_count: number;
    active_count: number;
    paused_count: number;
    web_tags_count: number;
    mobile_app_tags_count: number;
  }> {
    const response = await this.getConversionTags(accountId, {}, requestOptions);

    const summary = {
      total_count: response.data.length,
      active_count: 0,
      paused_count: 0,
      web_tags_count: 0,
      mobile_app_tags_count: 0,
    };

    response.data.forEach((tag) => {
      // Count by state
      switch (tag.state) {
        case ConversionTrackingTagState.ACTIVE:
          summary.active_count++;
          break;
        case ConversionTrackingTagState.PAUSED:
          summary.paused_count++;
          break;
      }

      // Count by type
      switch (tag.tag_type) {
        case ConversionTrackingTagType.WEB:
          summary.web_tags_count++;
          break;
        case ConversionTrackingTagType.MOBILE_APP:
          summary.mobile_app_tags_count++;
          break;
      }
    });

    return summary;
  }
}
