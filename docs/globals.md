[**X Ads SDK v1.0.1**](README.md)

***

# X Ads SDK v1.0.1

## Classes

### Client

- [XAdsClient](classes/XAdsClient.md)

### Other

- [OAuth](classes/OAuth.md)
- [HttpClient](classes/HttpClient.md)
- [RateLimiter](classes/RateLimiter.md)
- [RetryHandler](classes/RetryHandler.md)
- [XAdsError](classes/XAdsError.md)
- [AuthenticationError](classes/AuthenticationError.md)
- [RateLimitError](classes/RateLimitError.md)
- [ValidationError](classes/ValidationError.md)
- [APIError](classes/APIError.md)
- [NetworkError](classes/NetworkError.md)
- [TimeoutError](classes/TimeoutError.md)
- [ConfigurationError](classes/ConfigurationError.md)
- [PluginError](classes/PluginError.md)
- [AccountsModule](classes/AccountsModule.md)
- [AdGroupsModule](classes/AdGroupsModule.md)
- [AnalyticsModule](classes/AnalyticsModule.md)
- [CampaignsModule](classes/CampaignsModule.md)
- [CursorPaginator](classes/CursorPaginator.md)
- [OffsetPaginator](classes/OffsetPaginator.md)
- [DefaultPluginManager](classes/DefaultPluginManager.md)
- [RateLimitTracker](classes/RateLimitTracker.md)
- [APIVersionManager](classes/APIVersionManager.md)

## Interfaces

- [HttpClientConfig](interfaces/HttpClientConfig.md)
- [RequestConfig](interfaces/RequestConfig.md)
- [ClientRateLimitInfo](interfaces/ClientRateLimitInfo.md)
- [RateLimitOptions](interfaces/RateLimitOptions.md)
- [RetryOptions](interfaces/RetryOptions.md)
- [PaginatorOptions](interfaces/PaginatorOptions.md)
- [CursorPaginatorResult](interfaces/CursorPaginatorResult.md)
- [XAdsPlugin](interfaces/XAdsPlugin.md)
- [PluginManager](interfaces/PluginManager.md)
- [RateLimitInfo](interfaces/RateLimitInfo.md)
- [RateLimitTrackerOptions](interfaces/RateLimitTrackerOptions.md)
- [Account](interfaces/Account.md)
- [UpdateAccountData](interfaces/UpdateAccountData.md)
- [AccountListParams](interfaces/AccountListParams.md)
- [AdGroup](interfaces/AdGroup.md)
- [CreateAdGroupData](interfaces/CreateAdGroupData.md)
- [UpdateAdGroupData](interfaces/UpdateAdGroupData.md)
- [AdGroupListParams](interfaces/AdGroupListParams.md)
- [MetricGroup](interfaces/MetricGroup.md)
- [AnalyticsQuery](interfaces/AnalyticsQuery.md)
- [AnalyticsMetrics](interfaces/AnalyticsMetrics.md)
- [AnalyticsData](interfaces/AnalyticsData.md)
- [AnalyticsResponse](interfaces/AnalyticsResponse.md)
- [DateRange](interfaces/DateRange.md)
- [AnalyticsOptions](interfaces/AnalyticsOptions.md)
- [APIVersionInfo](interfaces/APIVersionInfo.md)
- [APIVersionResponse](interfaces/APIVersionResponse.md)
- [AuthConfig](interfaces/AuthConfig.md)
- [OAuthSignature](interfaces/OAuthSignature.md)
- [RequestOptions](interfaces/RequestOptions.md)
- [Campaign](interfaces/Campaign.md)
- [CreateCampaignData](interfaces/CreateCampaignData.md)
- [UpdateCampaignData](interfaces/UpdateCampaignData.md)
- [CampaignListParams](interfaces/CampaignListParams.md)
- [ListParams](interfaces/ListParams.md)
- [PaginatedResponse](interfaces/PaginatedResponse.md)
- [APIResponse](interfaces/APIResponse.md)
- [ClientConfig](interfaces/ClientConfig.md)

## Type Aliases

- [SupportedAPIVersion](type-aliases/SupportedAPIVersion.md)

## Functions

- [createAPIError](functions/createAPIError.md)
- [createAuthError](functions/createAuthError.md)
- [createRateLimitError](functions/createRateLimitError.md)
- [isXAdsError](functions/isXAdsError.md)
- [isAPIError](functions/isAPIError.md)
- [isAuthenticationError](functions/isAuthenticationError.md)
- [isRateLimitError](functions/isRateLimitError.md)
- [isNetworkError](functions/isNetworkError.md)
- [isTimeoutError](functions/isTimeoutError.md)

## Variables

- [METRIC\_GROUPS](variables/METRIC_GROUPS.md)
- [SUPPORTED\_VERSIONS](variables/SUPPORTED_VERSIONS.md)
- [DEFAULT\_VERSION](variables/DEFAULT_VERSION.md)
- [LEGACY\_VERSION](variables/LEGACY_VERSION.md)
- [API\_VERSION\_METADATA](variables/API_VERSION_METADATA.md)

## Enumerations

- [AccountStatus](enumerations/AccountStatus.md)
- [AccountType](enumerations/AccountType.md)
- [AdGroupStatus](enumerations/AdGroupStatus.md)
- [AdGroupPlacement](enumerations/AdGroupPlacement.md)
- [AdGroupObjective](enumerations/AdGroupObjective.md)
- [BidType](enumerations/BidType.md)
- [EntityType](enumerations/EntityType.md)
- [Granularity](enumerations/Granularity.md)
- [Placement](enumerations/Placement.md)
- [APIVersion](enumerations/APIVersion.md)
- [CampaignStatus](enumerations/CampaignStatus.md)
- [CampaignObjective](enumerations/CampaignObjective.md)
- [CampaignPlacement](enumerations/CampaignPlacement.md)
- [Environment](enumerations/Environment.md)
