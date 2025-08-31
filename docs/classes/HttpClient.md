[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / HttpClient

# Class: HttpClient

Defined in: [client/base.ts:34](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L34)

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in: [client/base.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L43)

#### Parameters

##### config

[`HttpClientConfig`](../interfaces/HttpClientConfig.md)

#### Returns

`HttpClient`

## Methods

### getBaseURL()

> `private` **getBaseURL**(`environment`): `string`

Defined in: [client/base.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L62)

#### Parameters

##### environment

[`Environment`](../enumerations/Environment.md) = `Environment.SANDBOX`

#### Returns

`string`

***

### buildURL()

> `private` **buildURL**(`endpoint`, `params?`): `string`

Defined in: [client/base.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L71)

#### Parameters

##### endpoint

`string`

##### params?

`Record`\<`string`, `any`\>

#### Returns

`string`

***

### buildRequestOptions()

> `private` **buildRequestOptions**(`config`): [`RequestOptions`](../interfaces/RequestOptions.md)

Defined in: [client/base.ts:87](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L87)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`RequestOptions`](../interfaces/RequestOptions.md)

***

### request()

> **request**\<`T`\>(`config`): `Promise`\<`T`\>

Defined in: [client/base.ts:103](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L103)

#### Type Parameters

##### T

`T`

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

`Promise`\<`T`\>

***

### makeRequest()

> `private` **makeRequest**\<`T`\>(`config`): `Promise`\<`T`\>

Defined in: [client/base.ts:124](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L124)

#### Type Parameters

##### T

`T`

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

`Promise`\<`T`\>

***

### handleErrorResponse()

> `private` **handleErrorResponse**(`response`): `Promise`\<`void`\>

Defined in: [client/base.ts:198](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L198)

#### Parameters

##### response

`Response`

#### Returns

`Promise`\<`void`\>

***

### headersToRecord()

> `private` **headersToRecord**(`headers`): `Record`\<`string`, `string`\>

Defined in: [client/base.ts:250](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L250)

#### Parameters

##### headers

`Headers`

#### Returns

`Record`\<`string`, `string`\>

***

### get()

> **get**\<`T`\>(`endpoint`, `params?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:259](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L259)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### params?

`Record`\<`string`, `any`\>

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### post()

> **post**\<`T`\>(`endpoint`, `body?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:268](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L268)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body?

`any`

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### put()

> **put**\<`T`\>(`endpoint`, `body?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:277](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L277)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body?

`any`

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### delete()

> **delete**\<`T`\>(`endpoint`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:286](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L286)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### getPluginManager()

> **getPluginManager**(): [`PluginManager`](../interfaces/PluginManager.md)

Defined in: [client/base.ts:295](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L295)

#### Returns

[`PluginManager`](../interfaces/PluginManager.md)

***

### getAPIVersion()

> **getAPIVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/base.ts:300](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L300)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: [client/base.ts:304](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L304)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionManager()

> **getVersionManager**(): [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:308](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L308)

#### Returns

[`APIVersionManager`](APIVersionManager.md)

***

### getVersionInfo()

> **getVersionInfo**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client/base.ts:312](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L312)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### isVersionDeprecated()

> **isVersionDeprecated**(): `boolean`

Defined in: [client/base.ts:316](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L316)

#### Returns

`boolean`

## Properties

### oauth

> `private` **oauth**: [`OAuth`](OAuth.md)

Defined in: [client/base.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L35)

***

### rateLimiter

> `private` **rateLimiter**: [`RateLimiter`](RateLimiter.md)

Defined in: [client/base.ts:36](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L36)

***

### retryHandler

> `private` **retryHandler**: [`RetryHandler`](RetryHandler.md)

Defined in: [client/base.ts:37](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L37)

***

### baseURL

> `private` **baseURL**: `string`

Defined in: [client/base.ts:38](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L38)

***

### timeout

> `private` **timeout**: `number`

Defined in: [client/base.ts:39](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L39)

***

### pluginManager

> `private` **pluginManager**: [`PluginManager`](../interfaces/PluginManager.md)

Defined in: [client/base.ts:40](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L40)

***

### versionManager

> `private` **versionManager**: [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:41](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L41)
