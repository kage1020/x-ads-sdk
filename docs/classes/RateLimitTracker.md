[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / RateLimitTracker

# Class: RateLimitTracker

Defined in: [plugins/rate-limit-tracker.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L19)

## Implements

- [`XAdsPlugin`](../interfaces/XAdsPlugin.md)

## Constructors

### Constructor

> **new RateLimitTracker**(`options`): `RateLimitTracker`

Defined in: [plugins/rate-limit-tracker.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L26)

#### Parameters

##### options

`RateLimitTrackerOptions` = `{}`

#### Returns

`RateLimitTracker`

## Methods

### afterResponse()

> **afterResponse**(`response`, `config`): `any`

Defined in: [plugins/rate-limit-tracker.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L35)

#### Parameters

##### response

`any`

##### config

`any`

#### Returns

`any`

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`afterResponse`](../interfaces/XAdsPlugin.md#afterresponse)

***

### onError()

> **onError**(`error`, `config`): `any`

Defined in: [plugins/rate-limit-tracker.ts:75](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L75)

#### Parameters

##### error

`any`

##### config

`any`

#### Returns

`any`

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`onError`](../interfaces/XAdsPlugin.md#onerror)

***

### extractEndpoint()

> `private` **extractEndpoint**(`url`): `string`

Defined in: [plugins/rate-limit-tracker.ts:100](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L100)

#### Parameters

##### url

`string`

#### Returns

`string`

***

### getHeaderValue()

> `private` **getHeaderValue**(`headers`, `name`): `null` \| `string`

Defined in: [plugins/rate-limit-tracker.ts:109](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L109)

#### Parameters

##### headers

`Record`\<`string`, `string`\> | `Headers`

##### name

`string`

#### Returns

`null` \| `string`

***

### getRateLimitInfo()

> **getRateLimitInfo**(`endpoint`): `undefined` \| `RateLimitInfo`

Defined in: [plugins/rate-limit-tracker.ts:117](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L117)

#### Parameters

##### endpoint

`string`

#### Returns

`undefined` \| `RateLimitInfo`

***

### getAllRateLimits()

> **getAllRateLimits**(): `Map`\<`string`, `RateLimitInfo`\>

Defined in: [plugins/rate-limit-tracker.ts:121](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L121)

#### Returns

`Map`\<`string`, `RateLimitInfo`\>

***

### getRemainingRequests()

> **getRemainingRequests**(`endpoint`): `null` \| `number`

Defined in: [plugins/rate-limit-tracker.ts:125](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L125)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `number`

***

### getTimeUntilReset()

> **getTimeUntilReset**(`endpoint`): `null` \| `number`

Defined in: [plugins/rate-limit-tracker.ts:138](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L138)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `number`

***

### clearTrackedLimits()

> **clearTrackedLimits**(): `void`

Defined in: [plugins/rate-limit-tracker.ts:153](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L153)

#### Returns

`void`

***

### getSummary()

> **getSummary**(): `object`[]

Defined in: [plugins/rate-limit-tracker.ts:158](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L158)

#### Returns

`object`[]

## Properties

### name

> `readonly` **name**: `"rate-limit-tracker"` = `'rate-limit-tracker'`

Defined in: [plugins/rate-limit-tracker.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L20)

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`name`](../interfaces/XAdsPlugin.md#name)

***

### version

> `readonly` **version**: `"1.0.0"` = `'1.0.0'`

Defined in: [plugins/rate-limit-tracker.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L21)

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`version`](../interfaces/XAdsPlugin.md#version)

***

### rateLimits

> `private` **rateLimits**: `Map`\<`string`, `RateLimitInfo`\>

Defined in: [plugins/rate-limit-tracker.ts:23](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L23)

***

### options

> `private` **options**: `Required`\<`RateLimitTrackerOptions`\>

Defined in: [plugins/rate-limit-tracker.ts:24](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L24)
