[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / AdGroupsModule

# Class: AdGroupsModule

Defined in: [modules/ad-groups.ts:12](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L12)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- `BaseModule`

## Constructors

### Constructor

> **new AdGroupsModule**(`client`): `AdGroupsModule`

Defined in: [modules/ad-groups.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L13)

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`AdGroupsModule`

#### Overrides

`BaseModule.constructor`

## Methods

### list()

> **list**(`accountId`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L20)

List ad groups for an account

#### Parameters

##### accountId

`string`

##### params

[`AdGroupListParams`](../interfaces/AdGroupListParams.md) = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

### get()

> **get**(`accountId`, `adGroupId`): `Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

Defined in: [modules/ad-groups.ts:31](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L31)

Get a specific ad group by ID

#### Parameters

##### accountId

`string`

##### adGroupId

`string`

#### Returns

`Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

***

### create()

> **create**(`accountId`, `data`): `Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

Defined in: [modules/ad-groups.ts:39](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L39)

Create a new ad group

#### Parameters

##### accountId

`string`

##### data

[`CreateAdGroupData`](../interfaces/CreateAdGroupData.md)

#### Returns

`Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

***

### update()

> **update**(`accountId`, `adGroupId`, `data`): `Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

Defined in: [modules/ad-groups.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L62)

Update an existing ad group

#### Parameters

##### accountId

`string`

##### adGroupId

`string`

##### data

[`UpdateAdGroupData`](../interfaces/UpdateAdGroupData.md)

#### Returns

`Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

***

### delete()

> **delete**(`accountId`, `adGroupId`): `Promise`\<`void`\>

Defined in: [modules/ad-groups.ts:74](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L74)

Delete an ad group (soft delete)

#### Parameters

##### accountId

`string`

##### adGroupId

`string`

#### Returns

`Promise`\<`void`\>

***

### pause()

> **pause**(`accountId`, `adGroupId`): `Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

Defined in: [modules/ad-groups.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L82)

Pause an ad group

#### Parameters

##### accountId

`string`

##### adGroupId

`string`

#### Returns

`Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

***

### activate()

> **activate**(`accountId`, `adGroupId`): `Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

Defined in: [modules/ad-groups.ts:91](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L91)

Activate an ad group

#### Parameters

##### accountId

`string`

##### adGroupId

`string`

#### Returns

`Promise`\<[`AdGroup`](../interfaces/AdGroup.md)\>

***

### listByCampaign()

> **listByCampaign**(`accountId`, `campaignId`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:100](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L100)

List ad groups for a specific campaign

#### Parameters

##### accountId

`string`

##### campaignId

`string`

##### params

`Omit`\<[`AdGroupListParams`](../interfaces/AdGroupListParams.md), `"campaign_ids"`\> = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

### getByStatus()

> **getByStatus**(`accountId`, `status`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:114](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L114)

Get ad groups by status

#### Parameters

##### accountId

`string`

##### status

[`AdGroupStatus`](../enumerations/AdGroupStatus.md)

##### params

`Omit`\<[`AdGroupListParams`](../interfaces/AdGroupListParams.md), `"with_deleted"`\> = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

### getActive()

> **getActive**(`accountId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:136](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L136)

Get active ad groups

#### Parameters

##### accountId

`string`

##### params?

`Omit`\<[`AdGroupListParams`](../interfaces/AdGroupListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

### getPaused()

> **getPaused**(`accountId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:146](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L146)

Get paused ad groups

#### Parameters

##### accountId

`string`

##### params?

`Omit`\<[`AdGroupListParams`](../interfaces/AdGroupListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

### getDeleted()

> **getDeleted**(`accountId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:156](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L156)

Get deleted ad groups

#### Parameters

##### accountId

`string`

##### params?

`Omit`\<[`AdGroupListParams`](../interfaces/AdGroupListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

### getActiveByCampaign()

> **getActiveByCampaign**(`accountId`, `campaignId`, `params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

Defined in: [modules/ad-groups.ts:166](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L166)

Get active ad groups for a specific campaign

#### Parameters

##### accountId

`string`

##### campaignId

`string`

##### params?

`Omit`\<[`AdGroupListParams`](../interfaces/AdGroupListParams.md), `"with_deleted"` \| `"campaign_ids"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`AdGroup`](../interfaces/AdGroup.md)\>\>

***

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
