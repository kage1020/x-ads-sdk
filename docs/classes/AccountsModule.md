[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / AccountsModule

# Class: AccountsModule

Defined in: [modules/accounts.ts:11](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L11)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new AccountsModule**(`client`): `AccountsModule`

Defined in: [modules/accounts.ts:12](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L12)

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`AccountsModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### list()

> **list**(`params`): `Promise`\<`PaginatedResponse`\<`Account`\>\>

Defined in: [modules/accounts.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L19)

List all accessible accounts

#### Parameters

##### params

`AccountListParams` = `{}`

#### Returns

`Promise`\<`PaginatedResponse`\<`Account`\>\>

***

### get()

> **get**(`accountId`): `Promise`\<`Account`\>

Defined in: [modules/accounts.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L27)

Get a specific account by ID

#### Parameters

##### accountId

`string`

#### Returns

`Promise`\<`Account`\>

***

### update()

> **update**(`accountId`, `data`): `Promise`\<`Account`\>

Defined in: [modules/accounts.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L35)

Update an existing account

#### Parameters

##### accountId

`string`

##### data

`UpdateAccountData`

#### Returns

`Promise`\<`Account`\>

***

### getByStatus()

> **getByStatus**(`status`, `params`): `Promise`\<`PaginatedResponse`\<`Account`\>\>

Defined in: [modules/accounts.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L43)

Get accounts by status

#### Parameters

##### status

`AccountStatus`

##### params

`Omit`\<`AccountListParams`, `"with_deleted"`\> = `{}`

#### Returns

`Promise`\<`PaginatedResponse`\<`Account`\>\>

***

### getActive()

> **getActive**(`params?`): `Promise`\<`PaginatedResponse`\<`Account`\>\>

Defined in: [modules/accounts.ts:64](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L64)

Get active accounts

#### Parameters

##### params?

`Omit`\<`AccountListParams`, `"with_deleted"`\>

#### Returns

`Promise`\<`PaginatedResponse`\<`Account`\>\>

***

### getSuspended()

> **getSuspended**(`params?`): `Promise`\<`PaginatedResponse`\<`Account`\>\>

Defined in: [modules/accounts.ts:73](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L73)

Get suspended accounts

#### Parameters

##### params?

`Omit`\<`AccountListParams`, `"with_deleted"`\>

#### Returns

`Promise`\<`PaginatedResponse`\<`Account`\>\>

***

### getDeleted()

> **getDeleted**(`params?`): `Promise`\<`PaginatedResponse`\<`Account`\>\>

Defined in: [modules/accounts.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L82)

Get deleted accounts

#### Parameters

##### params?

`Omit`\<`AccountListParams`, `"with_deleted"`\>

#### Returns

`Promise`\<`PaginatedResponse`\<`Account`\>\>

***

### getFirstActive()

> **getFirstActive**(): `Promise`\<`null` \| `Account`\>

Defined in: [modules/accounts.ts:91](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L91)

Get the first active account (convenience method)

#### Returns

`Promise`\<`null` \| `Account`\>

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

> `protected` **makeListRequest**\<`T`\>(`endpoint`, `params`): `Promise`\<`PaginatedResponse`\<`T`\>\>

Defined in: [modules/base.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L19)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### params

`ListParams` = `{}`

#### Returns

`Promise`\<`PaginatedResponse`\<`T`\>\>

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
