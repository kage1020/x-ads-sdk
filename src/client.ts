import { HttpClient, HttpClientConfig } from './client/index.js';
import { AccountsModule, CampaignsModule, AdGroupsModule, AnalyticsModule } from './modules/index.js';
import { ClientConfig, Environment } from './types/common.js';
import { XAdsPlugin } from './plugins/base.js';
import { APIVersion, APIVersionResponse } from './types/api-version.js';

/**
 * X Ads SDK Main Client
 * 
 * The XAdsClient is the primary interface for interacting with the X Ads API.
 * It provides access to all advertising modules including accounts, campaigns,
 * ad groups, and analytics.
 * 
 * @example Basic Usage
 * ```typescript
 * import { XAdsClient, Environment } from 'x-ads-sdk';
 * 
 * const client = new XAdsClient({
 *   auth: {
 *     consumer_key: 'your_consumer_key',
 *     consumer_secret: 'your_consumer_secret',
 *     access_token: 'your_access_token',
 *     access_token_secret: 'your_access_token_secret'
 *   },
 *   environment: Environment.SANDBOX
 * });
 * 
 * // Get accounts
 * const accounts = await client.accounts.list();
 * 
 * // Create a campaign
 * const campaign = await client.campaigns.create(accountId, {
 *   name: 'My Campaign',
 *   funding_instrument_id: 'abc123',
 *   entity_status: 'ACTIVE'
 * });
 * ```
 * 
 * @example With Plugins and Version Management
 * ```typescript
 * import { XAdsClient, RateLimitTracker, APIVersion } from 'x-ads-sdk';
 * 
 * const client = new XAdsClient({
 *   auth: { ... },
 *   apiVersion: APIVersion.V12,
 *   autoUpgradeVersion: false
 * });
 * 
 * // Add rate limiting plugin
 * client.use(new RateLimitTracker({ logEnabled: true }));
 * 
 * // Check version status
 * const versionInfo = client.getVersionInfo();
 * if (versionInfo.warnings.length > 0) {
 *   console.log('Version warnings:', versionInfo.warnings);
 * }
 * ```
 * 
 * @category Client
 */
export class XAdsClient {
  private httpClient: HttpClient;
  
  /** Accounts module for managing advertising accounts */
  public accounts: AccountsModule;
  /** Campaigns module for managing advertising campaigns */
  public campaigns: CampaignsModule;
  /** Ad Groups module for managing ad groups within campaigns */
  public adGroups: AdGroupsModule;
  /** Analytics module for retrieving campaign performance data */
  public analytics: AnalyticsModule;

  /**
   * Creates a new X Ads SDK client instance
   * 
   * @param config - Client configuration including authentication and options
   * @throws {Error} When authentication credentials are invalid or missing
   * 
   * @example
   * ```typescript
   * const client = new XAdsClient({
   *   auth: {
   *     consumer_key: process.env.X_CONSUMER_KEY!,
   *     consumer_secret: process.env.X_CONSUMER_SECRET!,
   *     access_token: process.env.X_ACCESS_TOKEN!,
   *     access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
   *   },
   *   environment: Environment.SANDBOX,
   *   apiVersion: APIVersion.V12,
   *   timeout: 30000
   * });
   * ```
   */
  constructor(config: ClientConfig) {
    // Convert ClientConfig to HttpClientConfig
    const httpConfig: HttpClientConfig = {
      auth: config.auth,
      environment: config.environment || Environment.SANDBOX,
      baseURL: config.baseURL,
      timeout: config.timeout,
      apiVersion: config.apiVersion,
      autoUpgradeVersion: config.autoUpgradeVersion,
      rateLimitOptions: {
        strategy: config.rateLimitStrategy || 'wait'
      },
      retryOptions: {
        maxRetries: config.maxRetries || 3
      }
    };

    this.httpClient = new HttpClient(httpConfig);

    // Initialize modules
    this.accounts = new AccountsModule(this.httpClient);
    this.campaigns = new CampaignsModule(this.httpClient);
    this.adGroups = new AdGroupsModule(this.httpClient);
    this.analytics = new AnalyticsModule(this.httpClient);
  }

  /**
   * Get the underlying HTTP client for advanced usage
   * 
   * @returns The HTTP client instance used by this SDK client
   * @advanced This method is for advanced users who need direct access to the HTTP layer
   */
  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  /**
   * Add a plugin to the SDK for enhanced functionality
   * 
   * @param plugin - The plugin instance to add
   * @returns The client instance for method chaining
   * @example
   * ```typescript
   * import { RateLimitTracker } from 'x-ads-sdk';
   * 
   * const rateLimitTracker = new RateLimitTracker({ logEnabled: true });
   * client.use(rateLimitTracker);
   * ```
   */
  use(plugin: XAdsPlugin): this {
    this.httpClient.getPluginManager().use(plugin);
    return this;
  }

  /**
   * Remove a plugin from the SDK
   * 
   * @param pluginName - Name of the plugin to remove
   * @returns True if the plugin was removed, false if it wasn't found
   */
  removePlugin(pluginName: string): boolean {
    return this.httpClient.getPluginManager().remove(pluginName);
  }

  /**
   * Check if a plugin is currently installed
   * 
   * @param pluginName - Name of the plugin to check
   * @returns True if the plugin is installed, false otherwise
   */
  hasPlugin(pluginName: string): boolean {
    return this.httpClient.getPluginManager().has(pluginName);
  }

  /**
   * Get the current API version being used for requests
   * 
   * @returns The current API version
   */
  getAPIVersion(): APIVersion {
    return this.httpClient.getAPIVersion();
  }

  /**
   * Set the API version to use for future requests
   * 
   * @param version - The API version to use
   * @throws {Error} If the version is not supported
   * @example
   * ```typescript
   * client.setAPIVersion(APIVersion.V12);
   * ```
   */
  setAPIVersion(version: APIVersion): void {
    this.httpClient.setAPIVersion(version);
  }

  /**
   * Get detailed version information and upgrade recommendations
   * 
   * @returns Version information including warnings and recommendations
   * @example
   * ```typescript
   * const versionInfo = client.getVersionInfo();
   * if (versionInfo.recommendedAction === 'upgrade') {
   *   console.warn('Consider upgrading API version:', versionInfo.warnings);
   * }
   * ```
   */
  getVersionInfo(): APIVersionResponse {
    return this.httpClient.getVersionInfo();
  }

  /**
   * Check if the current API version is deprecated
   * 
   * @returns True if the current version is deprecated, false otherwise
   */
  isVersionDeprecated(): boolean {
    return this.httpClient.isVersionDeprecated();
  }
}