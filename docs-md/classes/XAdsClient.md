[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsClient

# Class: XAdsClient

Defined in: [client.ts:61](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L61)

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
    consumer_secret: 'your_consumer_secret',
    access_token: 'your_access_token',
    access_token_secret: 'your_access_token_secret'
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

## Constructors

### Constructor

> **new XAdsClient**(`config`): `XAdsClient`

Defined in: [client.ts:94](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L94)

Creates a new X Ads SDK client instance

#### Parameters

##### config

[`ClientConfig`](../interfaces/ClientConfig.md)

Client configuration including authentication and options

#### Returns

`XAdsClient`

#### Throws

When authentication credentials are invalid or missing

#### Example

```typescript
const client = new XAdsClient({
  auth: {
    consumer_key: process.env.X_CONSUMER_KEY!,
    consumer_secret: process.env.X_CONSUMER_SECRET!,
    access_token: process.env.X_ACCESS_TOKEN!,
    access_token_secret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.SANDBOX,
  apiVersion: APIVersion.V12,
  timeout: 30000
});
```

## Methods

### getHttpClient()

> **getHttpClient**(): [`HttpClient`](HttpClient.md)

Defined in: [client.ts:126](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L126)

Get the underlying HTTP client for advanced usage

#### Returns

[`HttpClient`](HttpClient.md)

The HTTP client instance used by this SDK client

#### Advanced

This method is for advanced users who need direct access to the HTTP layer

***

### testConnection()

> **testConnection**(): `Promise`\<`boolean`\>

Defined in: [client.ts:142](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L142)

Test the connection and authentication credentials

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to true if authentication is successful, false otherwise

#### Example

```typescript
const isConnected = await client.testConnection();
if (!isConnected) {
  throw new Error('Failed to authenticate with X Ads API');
}
```

***

### use()

> **use**(`plugin`): `this`

Defined in: [client.ts:164](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L164)

Add a plugin to the SDK for enhanced functionality

#### Parameters

##### plugin

[`XAdsPlugin`](../interfaces/XAdsPlugin.md)

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

Defined in: [client.ts:175](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L175)

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

Defined in: [client.ts:185](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L185)

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

Defined in: [client.ts:194](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L194)

Get the current API version being used for requests

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

The current API version

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: [client.ts:208](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L208)

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

> **getVersionInfo**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client.ts:224](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L224)

Get detailed version information and upgrade recommendations

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

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

Defined in: [client.ts:233](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L233)

Check if the current API version is deprecated

#### Returns

`boolean`

True if the current version is deprecated, false otherwise

## Properties

### httpClient

> `private` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [client.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L62)

***

### accounts

> **accounts**: [`AccountsModule`](AccountsModule.md)

Defined in: [client.ts:65](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L65)

Accounts module for managing advertising accounts

***

### campaigns

> **campaigns**: [`CampaignsModule`](CampaignsModule.md)

Defined in: [client.ts:67](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L67)

Campaigns module for managing advertising campaigns

***

### adGroups

> **adGroups**: [`AdGroupsModule`](AdGroupsModule.md)

Defined in: [client.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L69)

Ad Groups module for managing ad groups within campaigns

***

### analytics

> **analytics**: [`AnalyticsModule`](AnalyticsModule.md)

Defined in: [client.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/client.ts#L71)

Analytics module for retrieving campaign performance data
