[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / RateLimiter

# Class: RateLimiter

Defined in: [client/rate-limit.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L17)

## Constructors

### Constructor

> **new RateLimiter**(`options`): `RateLimiter`

Defined in: [client/rate-limit.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L21)

#### Parameters

##### options

`Partial`\<[`RateLimitOptions`](../interfaces/RateLimitOptions.md)\> = `{}`

#### Returns

`RateLimiter`

## Methods

### updateLimits()

> **updateLimits**(`endpoint`, `headers`): `void`

Defined in: [client/rate-limit.ts:30](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L30)

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

Defined in: [client/rate-limit.ts:47](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L47)

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

Defined in: [client/rate-limit.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L18)

***

### options

> `private` **options**: [`RateLimitOptions`](../interfaces/RateLimitOptions.md)

Defined in: [client/rate-limit.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L19)
