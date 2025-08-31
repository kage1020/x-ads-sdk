// Main SDK exports
export { XAdsClient } from './client.js';

// Core modules
export { AccountsModule, CampaignsModule, AdGroupsModule, AnalyticsModule } from './modules/index.js';

// HTTP client (for advanced usage)
export { HttpClient, RateLimiter, RetryHandler } from './client/index.js';
export type { HttpClientConfig, RequestConfig, RateLimitInfo as ClientRateLimitInfo, RateLimitOptions, RetryOptions } from './client/index.js';

// Pagination
export { CursorPaginator, OffsetPaginator } from './paginators/index.js';
export type { PaginatorOptions, CursorPaginatorResult } from './paginators/index.js';

// Plugins
export { DefaultPluginManager, RateLimitTracker } from './plugins/index.js';
export type { XAdsPlugin, PluginManager, RateLimitInfo, RateLimitTrackerOptions } from './plugins/index.js';

// Types
export * from './types/index.js';

// API Version Management
export { APIVersionManager } from './types/api-version.js';

// Errors
export * from './errors/index.js';

// Authentication
export { OAuth } from './auth/index.js';