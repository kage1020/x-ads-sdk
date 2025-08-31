export { OAuth } from './auth';
export {
  HttpClient,
  type HttpClientConfig,
  RateLimiter,
  type RateLimitInfo as ClientRateLimitInfo,
  type RateLimitOptions,
  type RequestConfig,
  RetryHandler,
  type RetryOptions,
  XAdsClient,
} from './client';
export * from './errors';
export {
  AccountsModule,
  AdGroupsModule,
  AnalyticsModule,
  CampaignsModule,
} from './modules';
export {
  CursorPaginator,
  type CursorPaginatorResult,
  OffsetPaginator,
  type PaginatorOptions,
} from './paginators';
export {
  DefaultPluginManager,
  type PluginManager,
  type RateLimitInfo,
  RateLimitTracker,
  type RateLimitTrackerOptions,
  type XAdsPlugin,
} from './plugins';
export * from './types';
export { APIVersionManager } from './types/api-version';
export * from './utils';
