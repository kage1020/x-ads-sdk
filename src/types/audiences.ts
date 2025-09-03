/**
 * X Ads Audiences API types
 * @see https://docs.x.com/x-ads-api/audiences
 */

/**
 * Custom audience types
 */
export type CustomAudienceType =
  | 'CRM'
  | 'WEB'
  | 'DEVICE_ID'
  | 'LOOKALIKE'
  | 'ENGAGEMENT'
  | 'VIDEO_VIEW'
  | 'CONVERSION';

/**
 * Custom audience data types
 */
export type CustomAudienceDataType =
  | 'EMAIL'
  | 'PHONE_NUMBER'
  | 'X_USER_ID'
  | 'MOBILE_ADVERTISING_ID'
  | 'PARTNER_AUDIENCE_ID';

/**
 * Custom audience list types
 */
export type CustomAudienceListType = 'CRM' | 'WEB' | 'DEVICE_ID';

/**
 * Do not reach list types
 */
export type DoNotReachListType = 'CRM' | 'WEB' | 'DEVICE_ID';

/**
 * Audience operation types
 */
export type AudienceOperationType = 'UPDATE' | 'REPLACE' | 'DELETE';

/**
 * Audience sharing permissions
 */
export type AudiencePermissionLevel = 'READ' | 'WRITE';

/**
 * Tailored audience types
 */
export type TailoredAudienceType =
  | 'FLEXIBLE'
  | 'WEB'
  | 'CRM'
  | 'LOOKALIKE'
  | 'REMARKETING'
  | 'ENGAGEMENT'
  | 'VIDEO_VIEW'
  | 'CONVERSION';

/**
 * Custom audience data structure
 */
export interface CustomAudienceData {
  data_type: CustomAudienceDataType;
  data: string[];
}

/**
 * Custom audience entity
 */
export interface CustomAudience {
  id: string;
  id_str: string;
  name: string;
  audience_type: CustomAudienceType;
  audience_size: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  is_owner: boolean;
  permission_level: AudiencePermissionLevel;
  reasons_not_targetable?: string[];
  targetable?: boolean;
  targetable_types?: string[];
  partner_audience_id?: string;
  list_type?: CustomAudienceListType;
}

/**
 * Tailored audience entity
 */
export interface TailoredAudience {
  id: string;
  id_str: string;
  name: string;
  audience_type: TailoredAudienceType;
  audience_size: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  is_owner: boolean;
  permission_level: AudiencePermissionLevel;
  reasons_not_targetable?: string[];
  targetable?: boolean;
  targetable_types?: string[];
  partner_source?: string;
}

/**
 * Do not reach list entity
 */
export interface DoNotReachList {
  id: string;
  id_str: string;
  name: string;
  list_type: DoNotReachListType;
  audience_size: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

/**
 * Audience permission entity
 */
export interface AudiencePermission {
  id: string;
  id_str: string;
  account_id: string;
  granted_account_id: string;
  permission_level: AudiencePermissionLevel;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

/**
 * Custom audience response
 */
export interface CustomAudienceResponse {
  data: CustomAudience;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Custom audiences list response
 */
export interface CustomAudiencesResponse {
  data: CustomAudience[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Tailored audience response
 */
export interface TailoredAudienceResponse {
  data: TailoredAudience;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Tailored audiences list response
 */
export interface TailoredAudiencesResponse {
  data: TailoredAudience[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Do not reach list response
 */
export interface DoNotReachListResponse {
  data: DoNotReachList;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Do not reach lists response
 */
export interface DoNotReachListsResponse {
  data: DoNotReachList[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Audience permissions response
 */
export interface AudiencePermissionsResponse {
  data: AudiencePermission[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Audience targeted response
 */
export interface AudienceTargetedResponse {
  data: {
    targeted: boolean;
  };
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Custom audience creation options
 */
export interface CreateCustomAudienceOptions {
  name: string;
  audience_type: CustomAudienceType;
  list_type?: CustomAudienceListType;
}

/**
 * Custom audience update options
 */
export interface UpdateCustomAudienceOptions {
  name?: string;
  operation_type?: AudienceOperationType;
  users?: CustomAudienceData[];
}

/**
 * Tailored audience creation options
 */
export interface CreateTailoredAudienceOptions {
  name: string;
  audience_type: TailoredAudienceType;
}

/**
 * Do not reach list creation options
 */
export interface CreateDoNotReachListOptions {
  name: string;
  list_type: DoNotReachListType;
}

/**
 * Audience permission creation options
 */
export interface CreateAudiencePermissionOptions {
  granted_account_id: string;
  permission_level: AudiencePermissionLevel;
}

/**
 * Add users to audience options
 */
export interface AddUsersToAudienceOptions {
  users: CustomAudienceData[];
  operation_type?: AudienceOperationType;
}

/**
 * Keyword insights response
 */
export interface KeywordInsightsResponse {
  data: Array<{
    keyword: string;
    volume?: number;
    competition?: 'LOW' | 'MEDIUM' | 'HIGH';
  }>;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Keyword insights query options
 */
export interface KeywordInsightsOptions {
  keywords: string[];
  country_code?: string;
  language?: string;
}
