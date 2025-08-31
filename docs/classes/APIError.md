[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / APIError

# Class: APIError

Defined in: [errors/index.ts:59](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L59)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`XAdsError`](XAdsError.md)

## Constructors

### Constructor

> **new APIError**(`message`, `statusCode`, `errorCode?`, `details?`, `request?`, `response?`): `APIError`

Defined in: [errors/index.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L60)

#### Parameters

##### message

`string`

##### statusCode

`number`

##### errorCode?

`string`

##### details?

`any`

##### request?

###### method

`string`

###### url

`string`

###### headers?

`Record`\<`string`, `string`\>

##### response?

###### headers

`Record`\<`string`, `string`\>

###### data?

`any`

#### Returns

`APIError`

#### Overrides

[`XAdsError`](XAdsError.md).[`constructor`](XAdsError.md#constructor)

## Methods

### isRetryable()

> **isRetryable**(): `boolean`

Defined in: [errors/index.ts:79](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L79)

#### Returns

`boolean`

***

### isRateLimit()

> **isRateLimit**(): `boolean`

Defined in: [errors/index.ts:83](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L83)

#### Returns

`boolean`

***

### isServerError()

> **isServerError**(): `boolean`

Defined in: [errors/index.ts:87](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L87)

#### Returns

`boolean`

***

### isClientError()

> **isClientError**(): `boolean`

Defined in: [errors/index.ts:91](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L91)

#### Returns

`boolean`

***

### toJSON()

> **toJSON**(): `object`

Defined in: [errors/index.ts:95](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L95)

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

> **details**: `any`

##### request

> **request**: `undefined` \| \{ `method`: `string`; `url`: `string`; `headers?`: `Record`\<`string`, `string`\>; \}

##### response

> **response**: `undefined` \| \{ `headers`: `Record`\<`string`, `string`\>; `data?`: `any`; \}

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

Defined in: [errors/index.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L62)

***

### errorCode?

> `readonly` `optional` **errorCode**: `string`

Defined in: [errors/index.ts:63](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L63)

***

### details?

> `readonly` `optional` **details**: `any`

Defined in: [errors/index.ts:64](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L64)

***

### request?

> `readonly` `optional` **request**: `object`

Defined in: [errors/index.ts:65](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L65)

#### method

> **method**: `string`

#### url

> **url**: `string`

#### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

***

### response?

> `readonly` `optional` **response**: `object`

Defined in: [errors/index.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L70)

#### headers

> **headers**: `Record`\<`string`, `string`\>

#### data?

> `optional` **data**: `any`
