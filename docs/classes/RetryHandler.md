[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / RetryHandler

# Class: RetryHandler

Defined in: [client/retry.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L15)

## Constructors

### Constructor

> **new RetryHandler**(`options`): `RetryHandler`

Defined in: [client/retry.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L18)

#### Parameters

##### options

`Partial`\<[`RetryOptions`](../interfaces/RetryOptions.md)\> = `{}`

#### Returns

`RetryHandler`

## Methods

### executeWithRetry()

> **executeWithRetry**\<`T`\>(`operation`, `context`): `Promise`\<`T`\>

Defined in: [client/retry.ts:29](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L29)

#### Type Parameters

##### T

`T`

#### Parameters

##### operation

() => `Promise`\<`T`\>

##### context

###### endpoint?

`string`

###### method?

`string`

#### Returns

`Promise`\<`T`\>

***

### isRetryableError()

> `private` **isRetryableError**(`error`): `boolean`

Defined in: [client/retry.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L69)

#### Parameters

##### error

`Error`

#### Returns

`boolean`

***

### sleep()

> `private` **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [client/retry.ts:94](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L94)

#### Parameters

##### ms

`number`

#### Returns

`Promise`\<`void`\>

***

### getNextDelay()

> **getNextDelay**(`attempt`): `number`

Defined in: [client/retry.ts:98](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L98)

#### Parameters

##### attempt

`number`

#### Returns

`number`

***

### isRetryable()

> **isRetryable**(`error`): `boolean`

Defined in: [client/retry.ts:105](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L105)

#### Parameters

##### error

`Error`

#### Returns

`boolean`

## Properties

### options

> `private` **options**: [`RetryOptions`](../interfaces/RetryOptions.md)

Defined in: [client/retry.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L16)
