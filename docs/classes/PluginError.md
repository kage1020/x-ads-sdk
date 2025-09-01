[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / PluginError

# Class: PluginError

Defined in: [errors/index.ts:149](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L149)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`XAdsError`](XAdsError.md)

## Constructors

### Constructor

> **new PluginError**(`message`, `pluginName?`, `code?`): `PluginError`

Defined in: [errors/index.ts:150](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L150)

#### Parameters

##### message

`string`

##### pluginName?

`string`

##### code?

`string`

#### Returns

`PluginError`

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

### pluginName?

> `readonly` `optional` **pluginName**: `string`

Defined in: [errors/index.ts:152](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L152)
