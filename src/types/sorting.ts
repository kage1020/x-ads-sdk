/**
 * Sorting types for X Ads API based on official documentation
 * @see https://docs.x.com/x-ads-api/fundamentals/sorting
 */

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Generic sort field type
 */
export type SortField<T extends string> = `${T}-${SortDirection}`;

/**
 * Account sortable fields
 */
export type AccountSortField = SortField<'created_at' | 'updated_at' | 'deleted' | 'name'>;

/**
 * Campaign sortable fields
 */
export type CampaignSortField = SortField<
  | 'created_at'
  | 'updated_at'
  | 'deleted'
  | 'name'
  | 'start_time'
  | 'end_time'
  | 'daily_budget_amount_local_micro'
  | 'total_budget_amount_local_micro'
  | 'standard_delivery'
>;

/**
 * Line Item sortable fields
 */
export type LineItemSortField = SortField<
  'created_at' | 'updated_at' | 'deleted' | 'bid_amount_local_micro'
>;

/**
 * Funding Instrument sortable fields
 */
export type FundingInstrumentSortField = SortField<
  'created_at' | 'updated_at' | 'deleted' | 'funded_amount_local_micro' | 'start_time' | 'end_time'
>;

/**
 * Card sortable fields
 */
export type CardSortField = SortField<'created_at' | 'updated_at' | 'deleted' | 'name'>;

/**
 * Promoted Account sortable fields
 */
export type PromotedAccountSortField = SortField<
  'created_at' | 'updated_at' | 'deleted' | 'paused'
>;

/**
 * Promoted Tweet sortable fields
 */
export type PromotedTweetSortField = SortField<'created_at' | 'updated_at' | 'deleted' | 'paused'>;

/**
 * App Event Tag sortable fields
 */
export type AppEventTagSortField = SortField<
  | 'created_at'
  | 'updated_at'
  | 'deleted'
  | 'post_view_attribution_window'
  | 'post_engagement_attribution_window'
  | 'assisted_conversion'
  | 'provider_app_event_name'
>;
