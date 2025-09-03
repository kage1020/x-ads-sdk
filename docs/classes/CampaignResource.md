[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / CampaignResource

# Class: CampaignResource

Defined in: [resources/campaign.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L14)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new CampaignResource**(`httpClient`, `accountId`): `CampaignResource`

Defined in: [resources/campaign.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L17)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### accountId

`string`

#### Returns

`CampaignResource`

#### Overrides

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### getApiVersionPath()

> `protected` **getApiVersionPath**(): `string`

Defined in: [resources/base.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L17)

Get the current API version path from the HTTP client

#### Returns

`string`

API version path (e.g., '/12')

#### Inherited from

[`BaseResource`](BaseResource.md).[`getApiVersionPath`](BaseResource.md#getapiversionpath)

***

### buildEndpoint()

> `protected` **buildEndpoint**(`path`): `string`

Defined in: [resources/base.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L26)

Build endpoint with current API version

#### Parameters

##### path

`string`

API path without version

#### Returns

`string`

Complete endpoint with API version

#### Inherited from

[`BaseResource`](BaseResource.md).[`buildEndpoint`](BaseResource.md#buildendpoint)

***

### list()

> **list**(`options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: [resources/campaign.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L27)

Get campaigns for the account

#### Parameters

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### get()

> **get**(`campaignId`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: [resources/campaign.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L43)

Get a specific campaign by ID

#### Parameters

##### campaignId

`string`

Campaign ID

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### create()

> **create**(`data`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: [resources/campaign.ts:59](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L59)

Create a new campaign

#### Parameters

##### data

[`CampaignCreateRequest`](../interfaces/CampaignCreateRequest.md)

Campaign creation data

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### update()

> **update**(`campaignId`, `data`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: [resources/campaign.ts:77](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L77)

Update a campaign

#### Parameters

##### campaignId

`string`

Campaign ID

##### data

[`CampaignUpdateRequest`](../interfaces/CampaignUpdateRequest.md)

Campaign update data

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### delete()

> **delete**(`campaignId`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: [resources/campaign.ts:98](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L98)

Delete a campaign

#### Parameters

##### campaignId

`string`

Campaign ID

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)

***

### accountId

> `private` **accountId**: `string`

Defined in: [resources/campaign.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/campaign.ts#L15)
