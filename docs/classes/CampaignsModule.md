[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / CampaignsModule

# Class: CampaignsModule

Defined in: [modules/campaigns.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L13)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- `BaseModule`

## Constructors

### Constructor

> **new CampaignsModule**(`client`): `CampaignsModule`

Defined in: [modules/campaigns.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L14)

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`CampaignsModule`

#### Overrides

`BaseModule.constructor`

## Methods

### buildEndpoint()

> `protected` **buildEndpoint**(`accountId`, ...`segments`): `string`

Defined in: [modules/base.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L14)

#### Parameters

##### accountId

`string`

##### segments

...`string`[]

#### Returns

`string`

#### Inherited from

`BaseModule.buildEndpoint`

***

### makeListRequest()

> `protected` **makeListRequest**\<`T`\>(`endpoint`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<`T`\>\>

Defined in: [modules/base.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L19)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### params

[`ListParams`](../interfaces/ListParams.md) = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<`T`\>\>

#### Inherited from

`BaseModule.makeListRequest`

***

### makeGetRequest()

> `protected` **makeGetRequest**\<`T`\>(`endpoint`): `Promise`\<`T`\>

Defined in: [modules/base.ts:30](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L30)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`T`\>

#### Inherited from

`BaseModule.makeGetRequest`

***

### makePostRequest()

> `protected` **makePostRequest**\<`T`\>(`endpoint`, `body`): `Promise`\<`T`\>

Defined in: [modules/base.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L35)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body

`any`

#### Returns

`Promise`\<`T`\>

#### Inherited from

`BaseModule.makePostRequest`

***

### makePutRequest()

> `protected` **makePutRequest**\<`T`\>(`endpoint`, `body`): `Promise`\<`T`\>

Defined in: [modules/base.ts:40](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L40)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body

`any`

#### Returns

`Promise`\<`T`\>

#### Inherited from

`BaseModule.makePutRequest`

***

### makeDeleteRequest()

> `protected` **makeDeleteRequest**(`endpoint`): `Promise`\<`void`\>

Defined in: [modules/base.ts:45](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L45)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`BaseModule.makeDeleteRequest`

***

### createPaginator()

> `protected` **createPaginator**\<`T`\>(`endpoint`, `baseParams`, `options`): [`CursorPaginator`](CursorPaginator.md)\<`T`\>

Defined in: [modules/base.ts:49](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L49)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### baseParams

`Record`\<`string`, `any`\> = `{}`

##### options

[`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<`T`\>

#### Inherited from

`BaseModule.createPaginator`

***

### list()

> **list**(`accountId`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

Defined in: [modules/campaigns.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L21)

List campaigns for an account

#### Parameters

##### accountId

`string`

##### params

[`CampaignListParams`](../interfaces/CampaignListParams.md) = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

***

### get()

> **get**(`accountId`, `campaignId`): `Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:32](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L32)

Get a specific campaign by ID

#### Parameters

##### accountId

`string`

##### campaignId

`string`

#### Returns

`Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

***

### create()

> **create**(`accountId`, `data`): `Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:40](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L40)

Create a new campaign

#### Parameters

##### accountId

`string`

##### data

[`CreateCampaignData`](../interfaces/CreateCampaignData.md)

#### Returns

`Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

***

### update()

> **update**(`accountId`, `campaignId`, `data`): `Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:61](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L61)

Update an existing campaign

#### Parameters

##### accountId

`string`

##### campaignId

`string`

##### data

[`UpdateCampaignData`](../interfaces/UpdateCampaignData.md)

#### Returns

`Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

***

### delete()

> **delete**(`accountId`, `campaignId`): `Promise`\<`void`\>

Defined in: [modules/campaigns.ts:73](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L73)

Delete a campaign (soft delete)

#### Parameters

##### accountId

`string`

##### campaignId

`string`

#### Returns

`Promise`\<`void`\>

***

### pause()

> **pause**(`accountId`, `campaignId`): `Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:81](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L81)

Pause a campaign

#### Parameters

##### accountId

`string`

##### campaignId

`string`

#### Returns

`Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

***

### activate()

> **activate**(`accountId`, `campaignId`): `Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:90](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L90)

Activate a campaign

#### Parameters

##### accountId

`string`

##### campaignId

`string`

#### Returns

`Promise`\<[`Campaign`](../interfaces/Campaign.md)\>

***

### getByStatus()

> **getByStatus**(`accountId`, `status`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

Defined in: [modules/campaigns.ts:99](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L99)

Get campaigns by status

#### Parameters

##### accountId

`string`

##### status

[`CampaignStatus`](../enumerations/CampaignStatus.md)

##### params

`Omit`\<[`CampaignListParams`](../interfaces/CampaignListParams.md), `"with_deleted"`\> = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

***

### getActive()

> **getActive**(`accountId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

Defined in: [modules/campaigns.ts:121](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L121)

Get active campaigns

#### Parameters

##### accountId

`string`

##### params?

`Omit`\<[`CampaignListParams`](../interfaces/CampaignListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

***

### getPaused()

> **getPaused**(`accountId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

Defined in: [modules/campaigns.ts:131](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L131)

Get paused campaigns

#### Parameters

##### accountId

`string`

##### params?

`Omit`\<[`CampaignListParams`](../interfaces/CampaignListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

***

### getDeleted()

> **getDeleted**(`accountId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

Defined in: [modules/campaigns.ts:141](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L141)

Get deleted campaigns

#### Parameters

##### accountId

`string`

##### params?

`Omit`\<[`CampaignListParams`](../interfaces/CampaignListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Campaign`](../interfaces/Campaign.md)\>\>

***

### paginate()

> **paginate**(`accountId`, `params`, `options`): [`CursorPaginator`](CursorPaginator.md)\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:151](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L151)

Create a paginator for campaigns

#### Parameters

##### accountId

`string`

##### params

[`CampaignListParams`](../interfaces/CampaignListParams.md) = `{}`

##### options

[`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<[`Campaign`](../interfaces/Campaign.md)\>

***

### iterateAll()

> **iterateAll**(`accountId`, `params`): `AsyncIterator`\<[`Campaign`](../interfaces/Campaign.md)\>

Defined in: [modules/campaigns.ts:163](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/campaigns.ts#L163)

Iterate through all campaigns using async iterator

#### Parameters

##### accountId

`string`

##### params

[`CampaignListParams`](../interfaces/CampaignListParams.md) = `{}`

#### Returns

`AsyncIterator`\<[`Campaign`](../interfaces/Campaign.md)\>

## Properties

### client

> `protected` **client**: [`HttpClient`](HttpClient.md)

Defined in: [modules/base.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L6)

#### Inherited from

`BaseModule.client`

***

### baseEndpoint

> `protected` **baseEndpoint**: `string`

Defined in: [modules/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L7)

#### Inherited from

`BaseModule.baseEndpoint`
