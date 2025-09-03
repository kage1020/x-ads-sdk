[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / ConfigurationError

# Class: ConfigurationError

Defined in: [errors/index.ts:138](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L138)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`XAdsError`](XAdsError.md)

## Constructors

### Constructor

> **new ConfigurationError**(`message`, `configField?`, `code?`): `ConfigurationError`

Defined in: [errors/index.ts:139](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L139)

#### Parameters

##### message

`string`

##### configField?

`string`

##### code?

`string`

#### Returns

`ConfigurationError`

#### Overrides

[`XAdsError`](XAdsError.md).[`constructor`](XAdsError.md#constructor)

## Methods

### toJSON()

> **toJSON**(): `object`

Defined in: [errors/index.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L19)

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

#### Inherited from

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

### configField?

> `readonly` `optional` **configField**: `string`

Defined in: [errors/index.ts:141](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L141)
