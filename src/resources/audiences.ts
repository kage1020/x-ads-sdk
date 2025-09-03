/**
 * Audiences resource for X Ads API
 */

import type {
  AddUsersToAudienceOptions,
  AudiencePermissionsResponse,
  AudienceTargetedResponse,
  CreateAudiencePermissionOptions,
  CreateCustomAudienceOptions,
  CreateDoNotReachListOptions,
  CustomAudienceResponse,
  CustomAudiencesResponse,
  DoNotReachListResponse,
  DoNotReachListsResponse,
  KeywordInsightsOptions,
  KeywordInsightsResponse,
  TailoredAudienceResponse,
  UpdateCustomAudienceOptions,
} from '../types/audiences.js';
import type { RequestOptions } from '../types/auth.js';
import { BaseResource } from './base.js';

/**
 * Audiences resource class
 */
export class Audiences extends BaseResource {
  // Custom Audiences Management

  /**
   * Get all custom audiences for an account
   */
  async getCustomAudiences(
    accountId: string,
    options?: {
      custom_audience_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
    },
    requestOptions?: RequestOptions
  ): Promise<CustomAudiencesResponse> {
    const params: Record<string, string> = {};

    if (options?.custom_audience_ids) {
      params.custom_audience_ids = options.custom_audience_ids.join(',');
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

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CustomAudiencesResponse>(requestConfig);
  }

  /**
   * Get a specific custom audience
   */
  async getCustomAudience(
    accountId: string,
    customAudienceId: string,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}`,
      ...requestOptions,
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  /**
   * Create a new custom audience
   */
  async createCustomAudience(
    accountId: string,
    options: CreateCustomAudienceOptions,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const params = {
      name: options.name,
      audience_type: options.audience_type,
      ...(options.list_type && { list_type: options.list_type }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  /**
   * Update a custom audience
   */
  async updateCustomAudience(
    accountId: string,
    customAudienceId: string,
    options: UpdateCustomAudienceOptions,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const params: Record<string, unknown> = {};

    if (options.name) {
      params.name = options.name;
    }
    if (options.operation_type) {
      params.operation_type = options.operation_type;
    }
    if (options.users) {
      params.users = options.users;
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  /**
   * Delete a custom audience
   */
  async deleteCustomAudience(
    accountId: string,
    customAudienceId: string,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}`,
      ...requestOptions,
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  /**
   * Add users to a custom audience
   */
  async addUsersToAudience(
    accountId: string,
    customAudienceId: string,
    options: AddUsersToAudienceOptions,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const params = {
      users: options.users,
      operation_type: options.operation_type || 'UPDATE',
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}/users`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  /**
   * Check if a custom audience is being targeted
   */
  async isCustomAudienceTargeted(
    accountId: string,
    customAudienceId: string,
    requestOptions?: RequestOptions
  ): Promise<AudienceTargetedResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}/targeted`,
      ...requestOptions,
    };

    return this.httpClient.request<AudienceTargetedResponse>(requestConfig);
  }

  // Custom Audience Permissions

  /**
   * Get custom audience permissions
   */
  async getCustomAudiencePermissions(
    accountId: string,
    customAudienceId: string,
    requestOptions?: RequestOptions
  ): Promise<AudiencePermissionsResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}/permissions`,
      ...requestOptions,
    };

    return this.httpClient.request<AudiencePermissionsResponse>(requestConfig);
  }

  /**
   * Create custom audience permission
   */
  async createCustomAudiencePermission(
    accountId: string,
    customAudienceId: string,
    options: CreateAudiencePermissionOptions,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const params = {
      granted_account_id: options.granted_account_id,
      permission_level: options.permission_level,
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}/permissions`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  /**
   * Delete custom audience permission
   */
  async deleteCustomAudiencePermission(
    accountId: string,
    customAudienceId: string,
    permissionId: string,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/custom_audiences/${customAudienceId}/permissions/${permissionId}`,
      ...requestOptions,
    };

    return this.httpClient.request<CustomAudienceResponse>(requestConfig);
  }

  // Tailored Audiences (Legacy)

  /**
   * Get tailored audience permissions
   */
  async getTailoredAudiencePermissions(
    accountId: string,
    tailoredAudienceId: string,
    requestOptions?: RequestOptions
  ): Promise<AudiencePermissionsResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/tailored_audiences/${tailoredAudienceId}/permissions`,
      ...requestOptions,
    };

    return this.httpClient.request<AudiencePermissionsResponse>(requestConfig);
  }

  /**
   * Create tailored audience permission
   */
  async createTailoredAudiencePermission(
    accountId: string,
    tailoredAudienceId: string,
    options: CreateAudiencePermissionOptions,
    requestOptions?: RequestOptions
  ): Promise<TailoredAudienceResponse> {
    const params = {
      granted_account_id: options.granted_account_id,
      permission_level: options.permission_level,
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/tailored_audiences/${tailoredAudienceId}/permissions`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<TailoredAudienceResponse>(requestConfig);
  }

  /**
   * Delete tailored audience permission
   */
  async deleteTailoredAudiencePermission(
    accountId: string,
    tailoredAudienceId: string,
    permissionId: string,
    requestOptions?: RequestOptions
  ): Promise<TailoredAudienceResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/tailored_audiences/${tailoredAudienceId}/permissions/${permissionId}`,
      ...requestOptions,
    };

    return this.httpClient.request<TailoredAudienceResponse>(requestConfig);
  }

  // Do Not Reach Lists

  /**
   * Get all do not reach lists
   */
  async getDoNotReachLists(
    accountId: string,
    options?: {
      count?: number;
      cursor?: string;
    },
    requestOptions?: RequestOptions
  ): Promise<DoNotReachListsResponse> {
    const params: Record<string, string> = {};

    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/do_not_reach_lists`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DoNotReachListsResponse>(requestConfig);
  }

  /**
   * Create a do not reach list
   */
  async createDoNotReachList(
    accountId: string,
    options: CreateDoNotReachListOptions,
    requestOptions?: RequestOptions
  ): Promise<DoNotReachListResponse> {
    const params = {
      name: options.name,
      list_type: options.list_type,
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/do_not_reach_lists`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DoNotReachListResponse>(requestConfig);
  }

  /**
   * Add users to do not reach list
   */
  async addUsersToDoNotReachList(
    accountId: string,
    doNotReachListId: string,
    options: AddUsersToAudienceOptions,
    requestOptions?: RequestOptions
  ): Promise<DoNotReachListResponse> {
    const params = {
      users: options.users,
      operation_type: options.operation_type || 'UPDATE',
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/batch/accounts/${accountId}/do_not_reach_lists/${doNotReachListId}/users`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DoNotReachListResponse>(requestConfig);
  }

  /**
   * Delete a do not reach list
   */
  async deleteDoNotReachList(
    accountId: string,
    doNotReachListId: string,
    requestOptions?: RequestOptions
  ): Promise<DoNotReachListResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/do_not_reach_lists/${doNotReachListId}`,
      ...requestOptions,
    };

    return this.httpClient.request<DoNotReachListResponse>(requestConfig);
  }

  // Keyword Insights

  /**
   * Search for keyword insights
   */
  async searchKeywordInsights(
    options: KeywordInsightsOptions,
    requestOptions?: RequestOptions
  ): Promise<KeywordInsightsResponse> {
    const params = {
      keywords: options.keywords.join(','),
      ...(options.country_code && { country_code: options.country_code }),
      ...(options.language && { language: options.language }),
    };

    const requestConfig = {
      method: 'GET' as const,
      endpoint: '/12/insights/keywords/search',
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<KeywordInsightsResponse>(requestConfig);
  }

  // Convenience Methods

  /**
   * Create CRM custom audience with email list
   */
  async createEmailAudience(
    accountId: string,
    name: string,
    emails: string[],
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    // Create audience
    const audience = await this.createCustomAudience(
      accountId,
      {
        name,
        audience_type: 'CRM',
        list_type: 'CRM',
      },
      requestOptions
    );

    // Add users
    if (emails.length > 0) {
      await this.addUsersToAudience(
        accountId,
        audience.data.id,
        {
          users: [
            {
              data_type: 'EMAIL',
              data: emails,
            },
          ],
        },
        requestOptions
      );
    }

    return audience;
  }

  /**
   * Create mobile advertising ID audience
   */
  async createMobileIdAudience(
    accountId: string,
    name: string,
    mobileIds: string[],
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    // Create audience
    const audience = await this.createCustomAudience(
      accountId,
      {
        name,
        audience_type: 'DEVICE_ID',
        list_type: 'DEVICE_ID',
      },
      requestOptions
    );

    // Add users
    if (mobileIds.length > 0) {
      await this.addUsersToAudience(
        accountId,
        audience.data.id,
        {
          users: [
            {
              data_type: 'MOBILE_ADVERTISING_ID',
              data: mobileIds,
            },
          ],
        },
        requestOptions
      );
    }

    return audience;
  }

  /**
   * Create X User ID audience
   */
  async createXUserIdAudience(
    accountId: string,
    name: string,
    userIds: string[],
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    // Create audience
    const audience = await this.createCustomAudience(
      accountId,
      {
        name,
        audience_type: 'CRM',
        list_type: 'CRM',
      },
      requestOptions
    );

    // Add users
    if (userIds.length > 0) {
      await this.addUsersToAudience(
        accountId,
        audience.data.id,
        {
          users: [
            {
              data_type: 'X_USER_ID',
              data: userIds,
            },
          ],
        },
        requestOptions
      );
    }

    return audience;
  }

  /**
   * Remove users from audience (opt-out)
   */
  async removeUsersFromAudience(
    accountId: string,
    customAudienceId: string,
    options: AddUsersToAudienceOptions,
    requestOptions?: RequestOptions
  ): Promise<CustomAudienceResponse> {
    return this.addUsersToAudience(
      accountId,
      customAudienceId,
      {
        ...options,
        operation_type: 'DELETE',
      },
      requestOptions
    );
  }
}
