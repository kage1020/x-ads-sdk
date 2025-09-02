[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / AccountResource

# Class: AccountResource

Defined in: resources/account.ts:14

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new AccountResource**(`httpClient`): `AccountResource`

Defined in: resources/base.ts:9

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

Defined in: resources/account.ts:20

Get accounts accessible to the current user

#### Parameters

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

### get()

> **get**(`accountId`, `options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: resources/account.ts:36

Get a specific account by ID

#### Parameters

##### accountId

`string`

Account ID

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

### create()

> **create**(`data`, `options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: resources/account.ts:52

Create a new account (Sandbox only)

#### Parameters

##### data

[`AccountCreateRequest`](../interfaces/AccountCreateRequest.md)

Account creation data

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

***

### update()

> **update**(`accountId`, `data`, `options?`): `Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Defined in: resources/account.ts:70

Update an account

#### Parameters

##### accountId

`string`

Account ID

##### data

[`AccountUpdateRequest`](../interfaces/AccountUpdateRequest.md)

Account update data

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`AccountResponse`](../interfaces/AccountResponse.md)\>

Account response

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: resources/base.ts:7

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
