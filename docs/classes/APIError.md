[**X Ads SDK v1.0.2**](../README.md)

***

[X Ads SDK](../globals.md) / APIError

# Class: APIError

Defined in: [errors/index.ts:75](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L75)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`XAdsError`](XAdsError.md)

## Constructors

### Constructor

> **new APIError**(`message`, `statusCode`, `errorCode?`, `details?`, `request?`, `response?`): `APIError`

Defined in: [errors/index.ts:76](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L76)

#### Parameters

##### message

`string`

##### statusCode

`number`

##### errorCode?

`string`

##### details?

[`APIErrorDetails`](../interfaces/APIErrorDetails.md)

##### request?

[`APIErrorRequest`](../interfaces/APIErrorRequest.md)

##### response?

[`APIErrorResponse`](../interfaces/APIErrorResponse.md)

#### Returns

`APIError`

#### Overrides

[`XAdsError`](XAdsError.md).[`constructor`](XAdsError.md#constructor)

## Methods

### isRetryable()

> **isRetryable**(): `boolean`

Defined in: [errors/index.ts:88](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L88)

#### Returns

`boolean`

***

### isRateLimit()

> **isRateLimit**(): `boolean`

Defined in: [errors/index.ts:92](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L92)

#### Returns

`boolean`

***

### isServerError()

> **isServerError**(): `boolean`

Defined in: [errors/index.ts:96](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L96)

#### Returns

`boolean`

***

### isClientError()

> **isClientError**(): `boolean`

Defined in: [errors/index.ts:100](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L100)

#### Returns

`boolean`

***

### toJSON()

> **toJSON**(): `object`

Defined in: [errors/index.ts:104](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L104)

#### Returns

`object`

##### name

> **name**: `string`

##### message

> **message**: `string`

##### code

> **code**: `undefined` \| `string`

##### timestamp

> **timestamp**: `string`

##### stack

> **stack**: `undefined` \| `string`

##### statusCode

> **statusCode**: `number`

##### errorCode

> **errorCode**: `undefined` \| `string`

##### details

> **details**: `undefined` \| [`APIErrorDetails`](../interfaces/APIErrorDetails.md)

##### request

> **request**: `undefined` \| [`APIErrorRequest`](../interfaces/APIErrorRequest.md)

##### response

> **response**: `undefined` \| [`APIErrorResponse`](../interfaces/APIErrorResponse.md)

#### Overrides

[`XAdsError`](XAdsError.md).[`toJSON`](XAdsError.md#tojson)

## Properties

### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [errors/index.ts:2](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L2)

#### Inherited from

[`XAdsError`](XAdsError.md).[`timestamp`](XAdsError.md#timestamp)

***

### code?

> `readonly` `optional` **code**: `string`

Defined in: [errors/index.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L6)

#### Inherited from

[`XAdsError`](XAdsError.md).[`code`](XAdsError.md#code)

***

### cause?

> `readonly` `optional` **cause**: `Error`

Defined in: [errors/index.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L7)

#### Inherited from

[`XAdsError`](XAdsError.md).[`cause`](XAdsError.md#cause)

***

### statusCode

> `readonly` **statusCode**: `number`

Defined in: [errors/index.ts:78](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L78)

***

### errorCode?

> `readonly` `optional` **errorCode**: `string`

Defined in: [errors/index.ts:79](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L79)

***

### details?

> `readonly` `optional` **details**: [`APIErrorDetails`](../interfaces/APIErrorDetails.md)

Defined in: [errors/index.ts:80](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L80)

***

### request?

> `readonly` `optional` **request**: [`APIErrorRequest`](../interfaces/APIErrorRequest.md)

Defined in: [errors/index.ts:81](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L81)

***

### response?

> `readonly` `optional` **response**: [`APIErrorResponse`](../interfaces/APIErrorResponse.md)

Defined in: [errors/index.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L82)
