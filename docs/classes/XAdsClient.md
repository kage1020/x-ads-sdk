[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsClient

# Class: XAdsClient

Defined in: [client/x-ads-client.ts:58](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L58)

X Ads SDK Main Client

The XAdsClient is the primary interface for interacting with the X Ads API.
It provides access to all advertising modules including accounts, campaigns,
ad groups, and analytics.

## Examples

```typescript
import { XAdsClient, Environment } from 'x-ads-sdk';

const client = new XAdsClient({
  auth: {
    consumerKey: 'your_consumer_key',
    consumerSecret: 'your_consumer_secret',
    accessToken: 'your_access_token',
    accessTokenSecret: 'your_access_token_secret'
  },
  environment: Environment.SANDBOX
});

// Get accounts
const accounts = await client.accounts.list();

// Get campaigns for an account
const campaignResource = client.getCampaignResource(accountId);
const campaigns = await campaignResource.list();
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

Defined in: [client/x-ads-client.ts:85](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L85)

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
    consumerKey: process.env.X_CONSUMER_KEY!,
    consumerSecret: process.env.X_CONSUMER_SECRET!,
    accessToken: process.env.X_ACCESS_TOKEN!,
    accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET!
  },
  environment: Environment.SANDBOX,
  apiVersion: APIVersion.V12,
  timeout: 30000
});
```

## Methods

### getCampaignResource()

> **getCampaignResource**(`accountId`): [`CampaignResource`](CampaignResource.md)

Defined in: [client/x-ads-client.ts:119](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L119)

Get a campaign resource for the specified account

#### Parameters

##### accountId

`string`

The account ID to operate on

#### Returns

[`CampaignResource`](CampaignResource.md)

Campaign resource instance

#### Example

```typescript
const campaignResource = client.getCampaignResource('account_id');
const campaigns = await campaignResource.list();
```

***

### getLineItemResource()

> **getLineItemResource**(`accountId`): [`LineItemResource`](LineItemResource.md)

Defined in: [client/x-ads-client.ts:134](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L134)

Get a line item resource for the specified account

#### Parameters

##### accountId

`string`

The account ID to operate on

#### Returns

[`LineItemResource`](LineItemResource.md)

Line item resource instance

#### Example

```typescript
const lineItemResource = client.getLineItemResource('account_id');
const lineItems = await lineItemResource.list();
```

***

### getHttpClient()

> **getHttpClient**(): [`HttpClient`](HttpClient.md)

Defined in: [client/x-ads-client.ts:144](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L144)

Get the underlying HTTP client for advanced usage

This method is for advanced users who need direct access to the HTTP layer

#### Returns

[`HttpClient`](HttpClient.md)

The HTTP client instance used by this SDK client

***

### use()

> **use**(`plugin`): `this`

Defined in: [client/x-ads-client.ts:161](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L161)

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

Defined in: [client/x-ads-client.ts:172](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L172)

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

Defined in: [client/x-ads-client.ts:182](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L182)

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

Defined in: [client/x-ads-client.ts:191](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L191)

Get the current API version being used for requests

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

The current API version

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: [client/x-ads-client.ts:205](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L205)

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

Defined in: [client/x-ads-client.ts:221](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L221)

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

Defined in: [client/x-ads-client.ts:230](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L230)

Check if the current API version is deprecated

#### Returns

`boolean`

True if the current version is deprecated, false otherwise

## Properties

### httpClient

> `private` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [client/x-ads-client.ts:59](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L59)

***

### accounts

> **accounts**: [`AccountResource`](AccountResource.md)

Defined in: [client/x-ads-client.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/x-ads-client.ts#L62)

Accounts resource for managing advertising accounts
