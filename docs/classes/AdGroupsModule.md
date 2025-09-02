[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / AdGroupsModule

# Class: AdGroupsModule

Defined in: [modules/ad-groups.ts:12](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L12)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseModule`](BaseModule.md)

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

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

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

Defined in: [modules/ad-groups.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L70)

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

Defined in: [modules/ad-groups.ts:78](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L78)

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

Defined in: [modules/ad-groups.ts:87](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L87)

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

Defined in: [modules/ad-groups.ts:96](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L96)

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

Defined in: [modules/ad-groups.ts:110](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L110)

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

Defined in: [modules/ad-groups.ts:132](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L132)

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

Defined in: [modules/ad-groups.ts:142](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L142)

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

Defined in: [modules/ad-groups.ts:152](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L152)

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

Defined in: [modules/ad-groups.ts:162](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/ad-groups.ts#L162)

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

[`BaseModule`](BaseModule.md).[`buildEndpoint`](BaseModule.md#buildendpoint)

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

[`BaseModule`](BaseModule.md).[`makeListRequest`](BaseModule.md#makelistrequest)

***

### makeGetRequest()

> `protected` **makeGetRequest**\<`T`\>(`endpoint`): `Promise`\<`T`\>

Defined in: [modules/base.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L27)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makeGetRequest`](BaseModule.md#makegetrequest)

***

### makePostRequest()

> `protected` **makePostRequest**\<`T`\>(`endpoint`, `body`): `Promise`\<`T`\>

Defined in: [modules/base.ts:32](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L32)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body

`unknown`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makePostRequest`](BaseModule.md#makepostrequest)

***

### makePutRequest()

> `protected` **makePutRequest**\<`T`\>(`endpoint`, `body`): `Promise`\<`T`\>

Defined in: [modules/base.ts:37](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L37)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body

`unknown`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makePutRequest`](BaseModule.md#makeputrequest)

***

### makeDeleteRequest()

> `protected` **makeDeleteRequest**(`endpoint`): `Promise`\<`void`\>

Defined in: [modules/base.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L42)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makeDeleteRequest`](BaseModule.md#makedeleterequest)

***

### createPaginator()

> `protected` **createPaginator**\<`T`\>(`endpoint`, `baseParams`, `options`): [`CursorPaginator`](CursorPaginator.md)\<`T`\>

Defined in: [modules/base.ts:46](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L46)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### baseParams

`Record`\<`string`, `unknown`\> = `{}`

##### options

[`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`createPaginator`](BaseModule.md#createpaginator)

## Properties

### client

> `protected` **client**: [`HttpClient`](HttpClient.md)

Defined in: [modules/base.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L6)

#### Inherited from

[`BaseModule`](BaseModule.md).[`client`](BaseModule.md#client)

***

### baseEndpoint

> `protected` **baseEndpoint**: `string`

Defined in: [modules/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L7)

#### Inherited from

[`BaseModule`](BaseModule.md).[`baseEndpoint`](BaseModule.md#baseendpoint)
