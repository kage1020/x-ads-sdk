[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / LineItemResource

# Class: LineItemResource

Defined in: resources/line-item.ts:14

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new LineItemResource**(`httpClient`, `accountId`): `LineItemResource`

Defined in: resources/line-item.ts:17

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### accountId

`string`

#### Returns

`LineItemResource`

#### Overrides

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### list()

> **list**(`options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: resources/line-item.ts:27

Get line items for the account

#### Parameters

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### get()

> **get**(`lineItemId`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: resources/line-item.ts:43

Get a specific line item by ID

#### Parameters

##### lineItemId

`string`

Line item ID

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### create()

> **create**(`data`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: resources/line-item.ts:59

Create a new line item

#### Parameters

##### data

[`LineItemCreateRequest`](../interfaces/LineItemCreateRequest.md)

Line item creation data

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### update()

> **update**(`lineItemId`, `data`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: resources/line-item.ts:77

Update a line item

#### Parameters

##### lineItemId

`string`

Line item ID

##### data

[`LineItemUpdateRequest`](../interfaces/LineItemUpdateRequest.md)

Line item update data

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### delete()

> **delete**(`lineItemId`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: resources/line-item.ts:98

Delete a line item

#### Parameters

##### lineItemId

`string`

Line item ID

##### options?

`RequestOptions`

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: resources/base.ts:7

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)

***

### accountId

> `private` **accountId**: `string`

Defined in: resources/line-item.ts:15
