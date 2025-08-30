[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / ValidationError

# Class: ValidationError

Defined in: [errors/index.ts:48](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L48)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`XAdsError`](XAdsError.md)

## Constructors

### Constructor

> **new ValidationError**(`message`, `field?`, `code?`): `ValidationError`

Defined in: [errors/index.ts:49](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L49)

#### Parameters

##### message

`string`

##### field?

`string`

##### code?

`string`

#### Returns

`ValidationError`

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

### field?

> `readonly` `optional` **field**: `string`

Defined in: [errors/index.ts:51](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L51)
