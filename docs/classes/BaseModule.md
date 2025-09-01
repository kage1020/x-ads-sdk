[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / BaseModule

# Abstract Class: BaseModule

Defined in: [modules/base.ts:5](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L5)

## Hierarchy

[View Summary](../hierarchy.md)

### Extended by

- [`AccountsModule`](AccountsModule.md)
- [`AdGroupsModule`](AdGroupsModule.md)
- [`AnalyticsModule`](AnalyticsModule.md)
- [`CampaignsModule`](CampaignsModule.md)

## Constructors

### Constructor

> **new BaseModule**(`client`, `baseEndpoint`): `BaseModule`

Defined in: [modules/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L9)

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

##### baseEndpoint

`string`

#### Returns

`BaseModule`

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

***

### makeDeleteRequest()

> `protected` **makeDeleteRequest**(`endpoint`): `Promise`\<`void`\>

Defined in: [modules/base.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L42)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`void`\>

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

## Properties

### client

> `protected` **client**: [`HttpClient`](HttpClient.md)

Defined in: [modules/base.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L6)

***

### baseEndpoint

> `protected` **baseEndpoint**: `string`

Defined in: [modules/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L7)
