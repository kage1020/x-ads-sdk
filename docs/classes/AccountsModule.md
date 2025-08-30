[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / AccountsModule

# Class: AccountsModule

Defined in: [modules/accounts.ts:11](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L11)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- `BaseModule`

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

`BaseModule.constructor`

## Methods

### list()

> **list**(`params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

Defined in: [modules/accounts.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L19)

List all accessible accounts

#### Parameters

##### params

[`AccountListParams`](../interfaces/AccountListParams.md) = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

***

### get()

> **get**(`accountId`): `Promise`\<[`Account`](../interfaces/Account.md)\>

Defined in: [modules/accounts.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L27)

Get a specific account by ID

#### Parameters

##### accountId

`string`

#### Returns

`Promise`\<[`Account`](../interfaces/Account.md)\>

***

### update()

> **update**(`accountId`, `data`): `Promise`\<[`Account`](../interfaces/Account.md)\>

Defined in: [modules/accounts.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L35)

Update an existing account

#### Parameters

##### accountId

`string`

##### data

[`UpdateAccountData`](../interfaces/UpdateAccountData.md)

#### Returns

`Promise`\<[`Account`](../interfaces/Account.md)\>

***

### getByStatus()

> **getByStatus**(`status`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

Defined in: [modules/accounts.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L43)

Get accounts by status

#### Parameters

##### status

[`AccountStatus`](../enumerations/AccountStatus.md)

##### params

`Omit`\<[`AccountListParams`](../interfaces/AccountListParams.md), `"with_deleted"`\> = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

***

### getActive()

> **getActive**(`params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

Defined in: [modules/accounts.ts:64](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L64)

Get active accounts

#### Parameters

##### params?

`Omit`\<[`AccountListParams`](../interfaces/AccountListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

***

### getSuspended()

> **getSuspended**(`params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

Defined in: [modules/accounts.ts:73](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L73)

Get suspended accounts

#### Parameters

##### params?

`Omit`\<[`AccountListParams`](../interfaces/AccountListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

***

### getDeleted()

> **getDeleted**(`params?`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

Defined in: [modules/accounts.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L82)

Get deleted accounts

#### Parameters

##### params?

`Omit`\<[`AccountListParams`](../interfaces/AccountListParams.md), `"with_deleted"`\>

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`Account`](../interfaces/Account.md)\>\>

***

### getFirstActive()

> **getFirstActive**(): `Promise`\<`null` \| [`Account`](../interfaces/Account.md)\>

Defined in: [modules/accounts.ts:91](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/accounts.ts#L91)

Get the first active account (convenience method)

#### Returns

`Promise`\<`null` \| [`Account`](../interfaces/Account.md)\>

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
