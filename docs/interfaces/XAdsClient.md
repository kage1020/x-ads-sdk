[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsClient

# Interface: XAdsClient

Defined in: client/x-ads-client.ts:61

X Ads SDK Main Client

The XAdsClient is the primary interface for interacting with the X Ads API.
It provides access to all advertising modules including accounts, campaigns,
ad groups, and analytics.

## Examples

```typescript
import { XAdsClient, Environment } from 'x-ads-sdk';

const client = new XAdsClient({
  auth: {
    consumer_key: 'your_consumer_key',
    consumerSecret: 'your_consumer_secret',
    accessToken: 'your_access_token',
    accessTokenSecret: 'your_access_token_secret'
  },
  environment: Environment.SANDBOX
});

// Get accounts
const accounts = await client.accounts.list();

// Create a campaign
const campaign = await client.campaigns.create(accountId, {
  name: 'My Campaign',
  funding_instrument_id: 'abc123',
  entity_status: 'ACTIVE'
});
```

```typescript
import { XAdsClient, RateLimitTracker, APIVersion } from 'x-ads-sdk';

const client = new XAdsClient({
  auth: { ... },
  apiVersion: APIVersion.V12,
  autoUpgradeVersion: false
});

// Add rate limiting plugin
client.use(new RateLimitTracker({ logEnabled: true }));

// Check version status
const versionInfo = client.getVersionInfo();
if (versionInfo.warnings.length > 0) {
  console.log('Version warnings:', versionInfo.warnings);
}
```

## Methods

### getHttpClient()

> **getHttpClient**(): [`HttpClient`](HttpClient.md)

Defined in: client/x-ads-client.ts:126

Get the underlying HTTP client for advanced usage

This method is for advanced users who need direct access to the HTTP layer

#### Returns

[`HttpClient`](HttpClient.md)

The HTTP client instance used by this SDK client

***

### use()

> **use**(`plugin`): `this`

Defined in: client/x-ads-client.ts:143

Add a plugin to the SDK for enhanced functionality

#### Parameters

##### plugin

[`XAdsPlugin`](XAdsPlugin.md)

The plugin instance to add

#### Returns

`this`

The client instance for method chaining

#### Example

```typescript
import { RateLimitTracker } from 'x-ads-sdk';

const rateLimitTracker = new RateLimitTracker({ logEnabled: true });
client.use(rateLimitTracker);
```

***

### removePlugin()

> **removePlugin**(`pluginName`): `boolean`

Defined in: client/x-ads-client.ts:154

Remove a plugin from the SDK

#### Parameters

##### pluginName

`string`

Name of the plugin to remove

#### Returns

`boolean`

True if the plugin was removed, false if it wasn't found

***

### hasPlugin()

> **hasPlugin**(`pluginName`): `boolean`

Defined in: client/x-ads-client.ts:164

Check if a plugin is currently installed

#### Parameters

##### pluginName

`string`

Name of the plugin to check

#### Returns

`boolean`

True if the plugin is installed, false otherwise

***

### getAPIVersion()

> **getAPIVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: client/x-ads-client.ts:173

Get the current API version being used for requests

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

The current API version

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: client/x-ads-client.ts:187

Set the API version to use for future requests

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

The API version to use

#### Returns

`void`

#### Throws

If the version is not supported

#### Example

```typescript
client.setAPIVersion(APIVersion.V12);
```

***

### getVersionInfo()

> **getVersionInfo**(): [`APIVersionResponse`](APIVersionResponse.md)

Defined in: client/x-ads-client.ts:203

Get detailed version information and upgrade recommendations

#### Returns

[`APIVersionResponse`](APIVersionResponse.md)

Version information including warnings and recommendations

#### Example

```typescript
const versionInfo = client.getVersionInfo();
if (versionInfo.recommendedAction === 'upgrade') {
  console.warn('Consider upgrading API version:', versionInfo.warnings);
}
```

***

### isVersionDeprecated()

> **isVersionDeprecated**(): `boolean`

Defined in: client/x-ads-client.ts:212

Check if the current API version is deprecated

#### Returns

`boolean`

True if the current version is deprecated, false otherwise

## Properties

### httpClient

> `private` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: client/x-ads-client.ts:62

***

### accounts

> **accounts**: [`AccountsModule`](../classes/AccountsModule.md)

Defined in: client/x-ads-client.ts:65

Accounts module for managing advertising accounts

***

### campaigns

> **campaigns**: [`CampaignsModule`](../classes/CampaignsModule.md)

Defined in: client/x-ads-client.ts:67

Campaigns module for managing advertising campaigns

***

### adGroups

> **adGroups**: [`AdGroupsModule`](../classes/AdGroupsModule.md)

Defined in: client/x-ads-client.ts:69

Ad Groups module for managing ad groups within campaigns

***

### analytics

> **analytics**: [`AnalyticsModule`](../classes/AnalyticsModule.md)

Defined in: client/x-ads-client.ts:71

Analytics module for retrieving campaign performance data
