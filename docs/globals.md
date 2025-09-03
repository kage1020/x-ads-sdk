[**X Ads SDK v1.0.3**](README.md)

***

# X Ads SDK v1.0.3

## Classes

### Client

- [XAdsClient](classes/XAdsClient.md)

### Other

- [OAuth](classes/OAuth.md)
- [APIVersionManager](classes/APIVersionManager.md)
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
- [CursorPaginator](classes/CursorPaginator.md)
- [OffsetPaginator](classes/OffsetPaginator.md)
- [AccountResource](classes/AccountResource.md)
- [BaseResource](classes/BaseResource.md)
- [CampaignResource](classes/CampaignResource.md)
- [LineItemResource](classes/LineItemResource.md)

### Plugin

- [HttpClient](classes/HttpClient.md)
- [DefaultPluginManager](classes/DefaultPluginManager.md)
- [RateLimitTracker](classes/RateLimitTracker.md)

## Interfaces

### Other

- [HttpClientConfig](interfaces/HttpClientConfig.md)
- [RequestConfig](interfaces/RequestConfig.md)
- [ClientRateLimitInfo](interfaces/ClientRateLimitInfo.md)
- [RateLimitOptions](interfaces/RateLimitOptions.md)
- [RetryOptions](interfaces/RetryOptions.md)
- [RetryContext](interfaces/RetryContext.md)
- [APIErrorDetails](interfaces/APIErrorDetails.md)
- [APIErrorRequest](interfaces/APIErrorRequest.md)
- [APIErrorResponse](interfaces/APIErrorResponse.md)
- [PaginatorOptions](interfaces/PaginatorOptions.md)
- [CursorPaginatorResult](interfaces/CursorPaginatorResult.md)
- [RateLimitInfo](interfaces/RateLimitInfo.md)
- [RateLimitTrackerOptions](interfaces/RateLimitTrackerOptions.md)
- [APIVersionInfo](interfaces/APIVersionInfo.md)
- [APIVersionResponse](interfaces/APIVersionResponse.md)
- [AuthConfig](interfaces/AuthConfig.md)
- [OAuthSignature](interfaces/OAuthSignature.md)
- [RequestOptions](interfaces/RequestOptions.md)
- [OAuthRequestOptions](interfaces/OAuthRequestOptions.md)
- [PaginatedResponse](interfaces/PaginatedResponse.md)
- [APIResponse](interfaces/APIResponse.md)
- [ClientConfig](interfaces/ClientConfig.md)
- [Account](interfaces/Account.md)
- [AccountCreateRequest](interfaces/AccountCreateRequest.md)
- [AccountUpdateRequest](interfaces/AccountUpdateRequest.md)
- [AccountResponse](interfaces/AccountResponse.md)
- [Campaign](interfaces/Campaign.md)
- [CampaignCreateRequest](interfaces/CampaignCreateRequest.md)
- [CampaignUpdateRequest](interfaces/CampaignUpdateRequest.md)
- [CampaignResponse](interfaces/CampaignResponse.md)
- [FundingInstrument](interfaces/FundingInstrument.md)
- [FundingInstrumentResponse](interfaces/FundingInstrumentResponse.md)
- [LineItem](interfaces/LineItem.md)
- [LineItemCreateRequest](interfaces/LineItemCreateRequest.md)
- [LineItemUpdateRequest](interfaces/LineItemUpdateRequest.md)
- [LineItemResponse](interfaces/LineItemResponse.md)

### Plugin

- [PluginRequestConfig](interfaces/PluginRequestConfig.md)
- [PluginResponse](interfaces/PluginResponse.md)
- [PluginClient](interfaces/PluginClient.md)
- [XAdsPlugin](interfaces/XAdsPlugin.md)
- [PluginManager](interfaces/PluginManager.md)

## Type Aliases

- [SupportedAPIVersion](type-aliases/SupportedAPIVersion.md)
- [SortDirection](type-aliases/SortDirection.md)
- [SortField](type-aliases/SortField.md)
- [AccountSortField](type-aliases/AccountSortField.md)
- [CampaignSortField](type-aliases/CampaignSortField.md)
- [LineItemSortField](type-aliases/LineItemSortField.md)
- [FundingInstrumentSortField](type-aliases/FundingInstrumentSortField.md)
- [CardSortField](type-aliases/CardSortField.md)
- [PromotedAccountSortField](type-aliases/PromotedAccountSortField.md)
- [PromotedTweetSortField](type-aliases/PromotedTweetSortField.md)
- [AppEventTagSortField](type-aliases/AppEventTagSortField.md)

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
- [randomBytes](functions/randomBytes.md)
- [bytesToHex](functions/bytesToHex.md)
- [stringToBytes](functions/stringToBytes.md)
- [bytesToBase64](functions/bytesToBase64.md)
- [hmac](functions/hmac.md)
- [randomHex](functions/randomHex.md)
- [extractErrorMessage](functions/extractErrorMessage.md)
- [extractErrorCode](functions/extractErrorCode.md)
- [extractErrorDetails](functions/extractErrorDetails.md)
- [hasStatusCode](functions/hasStatusCode.md)
- [headersToRecord](functions/headersToRecord.md)
- [buildURL](functions/buildURL.md)
- [extractEndpointFromUrl](functions/extractEndpointFromUrl.md)
- [toPluginConfig](functions/toPluginConfig.md)
- [fromPluginConfig](functions/fromPluginConfig.md)
- [toPluginResponse](functions/toPluginResponse.md)
- [unixTimestampToDate](functions/unixTimestampToDate.md)
- [sleep](functions/sleep.md)

## Variables

- [API\_VERSION\_METADATA](variables/API_VERSION_METADATA.md)
- [DEFAULT\_VERSION](variables/DEFAULT_VERSION.md)
- [LEGACY\_VERSION](variables/LEGACY_VERSION.md)
- [SUPPORTED\_VERSIONS](variables/SUPPORTED_VERSIONS.md)

## Enumerations

- [APIVersion](enumerations/APIVersion.md)
- [Environment](enumerations/Environment.md)
- [CampaignEntityStatus](enumerations/CampaignEntityStatus.md)
- [FundingInstrumentType](enumerations/FundingInstrumentType.md)
- [FundingInstrumentEntityStatus](enumerations/FundingInstrumentEntityStatus.md)
- [LineItemEntityStatus](enumerations/LineItemEntityStatus.md)
- [LineItemObjective](enumerations/LineItemObjective.md)
- [LineItemProductType](enumerations/LineItemProductType.md)
- [LineItemPlacement](enumerations/LineItemPlacement.md)
- [LineItemBidType](enumerations/LineItemBidType.md)
