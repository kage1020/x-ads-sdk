[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / RateLimitTracker

# Class: RateLimitTracker

Defined in: [plugins/rate-limit-tracker.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L20)

X Ads SDK Plugin Interface

Plugins can hook into the request/response lifecycle to modify behavior,
add functionality, or handle errors. All hooks are optional.

## Implements

- [`XAdsPlugin`](../interfaces/XAdsPlugin.md)

## Constructors

### Constructor

> **new RateLimitTracker**(`options`): `RateLimitTracker`

Defined in: [plugins/rate-limit-tracker.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L27)

#### Parameters

##### options

[`RateLimitTrackerOptions`](../interfaces/RateLimitTrackerOptions.md) = `{}`

#### Returns

`RateLimitTracker`

## Methods

### afterResponse()

> **afterResponse**(`response`, `config`): [`PluginResponse`](../interfaces/PluginResponse.md)

Defined in: [plugins/rate-limit-tracker.ts:36](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L36)

Hook called after receiving a response

#### Parameters

##### response

[`PluginResponse`](../interfaces/PluginResponse.md)

Response to potentially modify

##### config

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

Original request configuration

#### Returns

[`PluginResponse`](../interfaces/PluginResponse.md)

Modified response or undefined to use original

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`afterResponse`](../interfaces/XAdsPlugin.md#afterresponse)

***

### onError()

> **onError**(`error`, `config`): `undefined`

Defined in: [plugins/rate-limit-tracker.ts:76](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L76)

Hook called when an error occurs

#### Parameters

##### error

`Error`

The error that occurred

##### config

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

Original request configuration

#### Returns

`undefined`

Response to use instead of error, or undefined to propagate error

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`onError`](../interfaces/XAdsPlugin.md#onerror)

***

### extractEndpoint()

> `private` **extractEndpoint**(`url`): `string`

Defined in: [plugins/rate-limit-tracker.ts:101](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L101)

#### Parameters

##### url

`string`

#### Returns

`string`

***

### getHeaderValue()

> `private` **getHeaderValue**(`headers`, `name`): `null` \| `string`

Defined in: [plugins/rate-limit-tracker.ts:110](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L110)

#### Parameters

##### headers

`Record`\<`string`, `string`\> | `Headers`

##### name

`string`

#### Returns

`null` \| `string`

***

### getRateLimitInfo()

> **getRateLimitInfo**(`endpoint`): `undefined` \| [`RateLimitInfo`](../interfaces/RateLimitInfo.md)

Defined in: [plugins/rate-limit-tracker.ts:129](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L129)

#### Parameters

##### endpoint

`string`

#### Returns

`undefined` \| [`RateLimitInfo`](../interfaces/RateLimitInfo.md)

***

### getAllRateLimits()

> **getAllRateLimits**(): `Map`\<`string`, [`RateLimitInfo`](../interfaces/RateLimitInfo.md)\>

Defined in: [plugins/rate-limit-tracker.ts:133](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L133)

#### Returns

`Map`\<`string`, [`RateLimitInfo`](../interfaces/RateLimitInfo.md)\>

***

### getRemainingRequests()

> **getRemainingRequests**(`endpoint`): `null` \| `number`

Defined in: [plugins/rate-limit-tracker.ts:137](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L137)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `number`

***

### getTimeUntilReset()

> **getTimeUntilReset**(`endpoint`): `null` \| `number`

Defined in: [plugins/rate-limit-tracker.ts:152](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L152)

#### Parameters

##### endpoint

`string`

#### Returns

`null` \| `number`

***

### clearTrackedLimits()

> **clearTrackedLimits**(): `void`

Defined in: [plugins/rate-limit-tracker.ts:169](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L169)

#### Returns

`void`

***

### getSummary()

> **getSummary**(): `object`[]

Defined in: [plugins/rate-limit-tracker.ts:174](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L174)

#### Returns

`object`[]

## Properties

### name

> `readonly` **name**: `"rate-limit-tracker"` = `'rate-limit-tracker'`

Defined in: [plugins/rate-limit-tracker.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L21)

Unique plugin name

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`name`](../interfaces/XAdsPlugin.md#name)

***

### version

> `readonly` **version**: `"1.0.0"` = `'1.0.0'`

Defined in: [plugins/rate-limit-tracker.ts:22](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L22)

Plugin version

#### Implementation of

[`XAdsPlugin`](../interfaces/XAdsPlugin.md).[`version`](../interfaces/XAdsPlugin.md#version)

***

### rateLimits

> `private` **rateLimits**: `Map`\<`string`, [`RateLimitInfo`](../interfaces/RateLimitInfo.md)\>

Defined in: [plugins/rate-limit-tracker.ts:24](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L24)

***

### options

> `private` **options**: `Required`\<[`RateLimitTrackerOptions`](../interfaces/RateLimitTrackerOptions.md)\>

Defined in: [plugins/rate-limit-tracker.ts:25](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/rate-limit-tracker.ts#L25)
