[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / LineItemResource

# Class: LineItemResource

Defined in: [resources/line-item.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L15)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new LineItemResource**(`httpClient`, `accountId`): `LineItemResource`

Defined in: [resources/line-item.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L18)

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

***

### list()

> **list**(`options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: [resources/line-item.ts:28](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L28)

Get line items for the account

#### Parameters

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<[`LineItemSortField`](../type-aliases/LineItemSortField.md)\>

Request options (supports sorting with sort_by parameter)

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### get()

> **get**(`lineItemId`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: [resources/line-item.ts:44](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L44)

Get a specific line item by ID

#### Parameters

##### lineItemId

`string`

Line item ID

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### create()

> **create**(`data`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: [resources/line-item.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L60)

Create a new line item

#### Parameters

##### data

[`LineItemCreateRequest`](../interfaces/LineItemCreateRequest.md)

Line item creation data

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### update()

> **update**(`lineItemId`, `data`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: [resources/line-item.ts:78](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L78)

Update a line item

#### Parameters

##### lineItemId

`string`

Line item ID

##### data

[`LineItemUpdateRequest`](../interfaces/LineItemUpdateRequest.md)

Line item update data

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

***

### delete()

> **delete**(`lineItemId`, `options?`): `Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Defined in: [resources/line-item.ts:99](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L99)

Delete a line item

#### Parameters

##### lineItemId

`string`

Line item ID

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

Request options

#### Returns

`Promise`\<[`LineItemResponse`](../interfaces/LineItemResponse.md)\>

Line item response

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)

***

### accountId

> `private` **accountId**: `string`

Defined in: [resources/line-item.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/line-item.ts#L16)
