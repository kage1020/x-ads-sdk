[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / RateLimiter

# Class: RateLimiter

Defined in: [client/rate-limit.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L14)

## Constructors

### Constructor

> **new RateLimiter**(`options`): `RateLimiter`

Defined in: [client/rate-limit.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L18)

#### Parameters

##### options

`Partial`\<[`RateLimitOptions`](../interfaces/RateLimitOptions.md)\> = `{}`

#### Returns

`RateLimiter`

## Methods

### updateLimits()

> **updateLimits**(`endpoint`, `headers`): `void`

Defined in: [client/rate-limit.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L27)

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

Defined in: [client/rate-limit.ts:44](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L44)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`void`\>

***

### getRemainingRequests()

> **getRemainingRequests**(`endpoint`): `null` \| `number`

Defined in: [client/rate-limit.ts:78](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L78)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `number`

***

### getResetTime()

> **getResetTime**(`endpoint`): `null` \| `Date`

Defined in: [client/rate-limit.ts:92](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L92)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `Date`

***

### sleep()

> `private` **sleep**(`ms`): `Promise`\<`void`\>

Defined in: [client/rate-limit.ts:97](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L97)

#### Parameters

##### ms

`number`

#### Returns

`Promise`\<`void`\>

## Properties

### limits

> `private` **limits**: `Map`\<`string`, [`ClientRateLimitInfo`](../interfaces/ClientRateLimitInfo.md)\>

Defined in: [client/rate-limit.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L15)

***

### options

> `private` **options**: [`RateLimitOptions`](../interfaces/RateLimitOptions.md)

Defined in: [client/rate-limit.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/rate-limit.ts#L16)
