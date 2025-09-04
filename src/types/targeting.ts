export interface TargetingCriteria {
  id: string;
  name: string;
  line_item_id: string;
  targeting_type:
    | 'LOCATION'
    | 'AGE'
    | 'GENDER'
    | 'LANGUAGE'
    | 'PLATFORM'
    | 'DEVICE'
    | 'CARRIER'
    | 'NETWORK'
    | 'TAILORED_AUDIENCE'
    | 'BROAD_KEYWORD'
    | 'EXACT_KEYWORD'
    | 'PHRASE_KEYWORD'
    | 'UNORDERED_KEYWORD'
    | 'NEGATIVE_EXACT_KEYWORD'
    | 'NEGATIVE_PHRASE_KEYWORD'
    | 'NEGATIVE_UNORDERED_KEYWORD';
  targeting_value: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface TailoredAudience {
  id: string;
  name: string;
  audience_type: 'CUSTOM' | 'LOOKALIKE' | 'WEB' | 'DEVICE' | 'CRM';
  audience_size: number;
  partner_source?: string;
  reasons_not_targetable?: string[];
  targetable: boolean;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface TargetingCriteriaCreateData {
  line_item_id: string;
  targeting_type: TargetingCriteria['targeting_type'];
  targeting_value: string;
  name?: string;
  [key: string]: unknown;
}

export interface TargetingCriteriaListOptions {
  count?: number;
  cursor?: string;
  line_item_ids?: string[];
  targeting_criteria_ids?: string[];
  targeting_types?: TargetingCriteria['targeting_type'][];
  [key: string]: unknown;
}

export interface TargetingCriteriaResponse {
  data: TargetingCriteria;
}

export interface TargetingCriteriaListResponse {
  data: TargetingCriteria[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}

export interface TailoredAudienceResponse {
  data: TailoredAudience;
}

export interface TailoredAudienceListResponse {
  data: TailoredAudience[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}

export interface LocationCriteria {
  country_codes?: string[];
  region_codes?: string[];
  metro_codes?: string[];
  postal_codes?: string[];
}

export interface TargetingCriteriaData {
  locations?: LocationCriteria;
  age_ranges?: string[];
  genders?: string[];
  languages?: string[];
  platforms?: string[];
  devices?: string[];
}

export interface TargetingCriteriaOptionsResponse {
  data: TargetingCriteriaData;
}
