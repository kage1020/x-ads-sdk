[**X Ads SDK v1.0.2**](../README.md)

***

[X Ads SDK](../globals.md) / RateLimiter

# Class: RateLimiter

Defined in: [client/rate-limit.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L16)

## Constructors

### Constructor

> **new RateLimiter**(`options`): `RateLimiter`

Defined in: [client/rate-limit.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L20)

#### Parameters

##### options

`Partial`\<[`RateLimitOptions`](../interfaces/RateLimitOptions.md)\> = `{}`

#### Returns

`RateLimiter`

## Methods

### updateLimits()

> **updateLimits**(`endpoint`, `headers`): `void`

Defined in: [client/rate-limit.ts:29](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L29)

#### Parameters

##### endpoint

`string`

##### headers

`Record`\<`string`, `string`\>

#### Returns

`void`

***

### checkRateLimit()

> **checkRateLimit**(`endpoint`): `Promise`\<`void`\>

Defined in: [client/rate-limit.ts:46](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L46)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`void`\>

***

### getRemainingRequests()

> **getRemainingRequests**(`endpoint`): `null` \| `number`

Defined in: [client/rate-limit.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L82)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `number`

***

### getResetTime()

> **getResetTime**(`endpoint`): `null` \| `Date`

Defined in: [client/rate-limit.ts:96](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L96)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `Date`

## Properties

### limits

> `private` **limits**: `Map`\<`string`, [`ClientRateLimitInfo`](../interfaces/ClientRateLimitInfo.md)\>

Defined in: [client/rate-limit.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L17)

***

### options

> `private` **options**: [`RateLimitOptions`](../interfaces/RateLimitOptions.md)

Defined in: [client/rate-limit.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L18)
