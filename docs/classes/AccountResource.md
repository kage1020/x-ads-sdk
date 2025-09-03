[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / AccountResource

# Class: AccountResource

Defined in: [resources/account.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/account.ts#L15)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new AccountResource**(`httpClient`): `AccountResource`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`AccountResource`

#### Inherited from

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### list()

> **list**(`options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: [resources/account.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/account.ts#L21)

Get accounts accessible to the current user

#### Parameters

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<[`AccountSortField`](../type-aliases/AccountSortField.md)\>

Request options (supports sorting with sort_by parameter)

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

### get()

> **get**(`accountId`, `options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: [resources/account.ts:37](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/account.ts#L37)

Get a specific account by ID

#### Parameters

##### accountId

`string`

Account ID

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

### create()

> **create**(`data`, `options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: [resources/account.ts:53](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/account.ts#L53)

Create a new account (Sandbox only)

#### Parameters

##### data

[`AccountCreateRequest`](../interfaces/AccountCreateRequest.md)

Account creation data

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

### update()

> **update**(`accountId`, `data`, `options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: [resources/account.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/account.ts#L71)

Update an account

#### Parameters

##### accountId

`string`

Account ID

##### data

[`AccountUpdateRequest`](../interfaces/AccountUpdateRequest.md)

Account update data

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

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

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
