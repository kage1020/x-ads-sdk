[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / CampaignResource

# Class: CampaignResource

Defined in: resources/campaign.ts:14

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new CampaignResource**(`httpClient`, `accountId`): `CampaignResource`

Defined in: resources/campaign.ts:17

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

### list()

> **list**(`options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: resources/campaign.ts:27

Get campaigns for the account

#### Parameters

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### get()

> **get**(`campaignId`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: resources/campaign.ts:43

Get a specific campaign by ID

#### Parameters

##### campaignId

`string`

Campaign ID

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### create()

> **create**(`data`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: resources/campaign.ts:59

Create a new campaign

#### Parameters

##### data

[`CampaignCreateRequest`](../interfaces/CampaignCreateRequest.md)

Campaign creation data

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### update()

> **update**(`campaignId`, `data`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: resources/campaign.ts:77

Update a campaign

#### Parameters

##### campaignId

`string`

Campaign ID

##### data

[`CampaignUpdateRequest`](../interfaces/CampaignUpdateRequest.md)

Campaign update data

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

***

### delete()

> **delete**(`campaignId`, `options?`): `Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Defined in: resources/campaign.ts:98

Delete a campaign

#### Parameters

##### campaignId

`string`

Campaign ID

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`CampaignResponse`](../interfaces/CampaignResponse.md)\>

Campaign response

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: resources/base.ts:7

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)

***

### accountId

> `private` **accountId**: `string`

Defined in: resources/campaign.ts:15
