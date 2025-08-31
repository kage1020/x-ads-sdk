[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsError

# Class: XAdsError

Defined in: [errors/index.ts:1](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L1)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- `Error`

### Extended by

- [`AuthenticationError`](AuthenticationError.md)
- [`RateLimitError`](RateLimitError.md)
- [`ValidationError`](ValidationError.md)
- [`APIError`](APIError.md)
- [`NetworkError`](NetworkError.md)
- [`TimeoutError`](TimeoutError.md)
- [`ConfigurationError`](ConfigurationError.md)
- [`PluginError`](PluginError.md)

## Constructors

### Constructor

> **new XAdsError**(`message`, `code?`, `cause?`): `XAdsError`

Defined in: [errors/index.ts:4](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L4)

#### Parameters

##### message

`string`

##### code?

`string`

##### cause?

`Error`

#### Returns

`XAdsError`

#### Overrides

`Error.constructor`

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

## Properties

### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [errors/index.ts:2](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L2)

***

### code?

> `readonly` `optional` **code**: `string`

Defined in: [errors/index.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L6)

***

### cause?

> `readonly` `optional` **cause**: `Error`

Defined in: [errors/index.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/errors/index.ts#L7)
