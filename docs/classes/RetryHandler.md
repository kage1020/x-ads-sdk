[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / RetryHandler

# Class: RetryHandler

Defined in: [client/retry.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L17)

## Constructors

### Constructor

> **new RetryHandler**(`options`): `RetryHandler`

Defined in: [client/retry.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L20)

#### Parameters

##### options

`Partial`\<[`RetryOptions`](../interfaces/RetryOptions.md)\> = `{}`

#### Returns

`RetryHandler`

## Methods

### executeWithRetry()

> **executeWithRetry**\<`T`\>(`operation`, `context`): `Promise`\<`T`\>

Defined in: [client/retry.ts:31](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L31)

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

### getNextDelay()

> **getNextDelay**(`attempt`): `number`

Defined in: [client/retry.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L71)

#### Parameters

##### attempt

`number`

#### Returns

`number`

***

### isRetryable()

> **isRetryable**(`error`): `boolean`

Defined in: [client/retry.ts:78](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L78)

#### Parameters

##### error

`Error`

#### Returns

`boolean`

## Properties

### options

> `readonly` **options**: [`RetryOptions`](../interfaces/RetryOptions.md)

Defined in: [client/retry.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/retry.ts#L18)
