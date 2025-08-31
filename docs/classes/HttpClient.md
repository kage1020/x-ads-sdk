[**X Ads SDK v1.0.2**](../README.md)

***

[X Ads SDK](../globals.md) / HttpClient

# Class: HttpClient

Defined in: [client/base.ts:51](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L51)

Basic client interface that plugins can interact with

This interface provides plugins with access to basic client
configuration without exposing internal implementation details.

## Implements

- [`PluginClient`](../interfaces/PluginClient.md)

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in: [client/base.ts:66](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L66)

#### Parameters

##### config

[`HttpClientConfig`](../interfaces/HttpClientConfig.md)

#### Returns

`HttpClient`

## Methods

### getBaseURL()

> `private` **getBaseURL**(`environment`): `string`

Defined in: [client/base.ts:92](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L92)

#### Parameters

##### environment

[`Environment`](../enumerations/Environment.md) = `Environment.SANDBOX`

#### Returns

`string`

***

### buildURL()

> `private` **buildURL**(`endpoint`, `params?`): `string`

Defined in: [client/base.ts:101](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L101)

#### Parameters

##### endpoint

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### Returns

`string`

***

### buildRequestOptions()

> `private` **buildRequestOptions**(`config`): [`RequestOptions`](../interfaces/RequestOptions.md)

Defined in: [client/base.ts:106](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L106)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`RequestOptions`](../interfaces/RequestOptions.md)

***

### toPluginConfig()

> `private` **toPluginConfig**(`config`): [`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

Defined in: [client/base.ts:123](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L123)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

***

### fromPluginConfig()

> `private` **fromPluginConfig**(`pluginConfig`): [`RequestConfig`](../interfaces/RequestConfig.md)

Defined in: [client/base.ts:128](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L128)

#### Parameters

##### pluginConfig

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

[`RequestConfig`](../interfaces/RequestConfig.md)

***

### toPluginResponse()

> `private` **toPluginResponse**\<`T`\>(`data`, `status`, `statusText`, `headers`): [`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

Defined in: [client/base.ts:133](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L133)

#### Type Parameters

##### T

`T`

#### Parameters

##### data

`T`

##### status

`number` = `200`

##### statusText

`string` = `'OK'`

##### headers

`Record`\<`string`, `string`\> = `{}`

#### Returns

[`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

***

### request()

> **request**\<`T`\>(`config`): `Promise`\<`T`\>

Defined in: [client/base.ts:142](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L142)

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

Defined in: [client/base.ts:179](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L179)

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

Defined in: [client/base.ts:245](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L245)

#### Parameters

##### response

`Response`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**\<`T`\>(`endpoint`, `params?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:296](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L296)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### params?

`Record`\<`string`, `unknown`\>

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### post()

> **post**\<`T`\>(`endpoint`, `body?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:309](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L309)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body?

`unknown`

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### put()

> **put**\<`T`\>(`endpoint`, `body?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:318](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L318)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body?

`unknown`

##### headers?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`T`\>

***

### delete()

> **delete**\<`T`\>(`endpoint`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:327](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L327)

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

Defined in: [client/base.ts:336](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L336)

#### Returns

[`PluginManager`](../interfaces/PluginManager.md)

***

### getAPIVersion()

> **getAPIVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/base.ts:341](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L341)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: [client/base.ts:345](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L345)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionManager()

> **getVersionManager**(): [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:349](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L349)

#### Returns

[`APIVersionManager`](APIVersionManager.md)

***

### getVersionInfo()

> **getVersionInfo**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client/base.ts:353](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L353)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### isVersionDeprecated()

> **isVersionDeprecated**(): `boolean`

Defined in: [client/base.ts:357](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L357)

#### Returns

`boolean`

## Properties

### config

> `readonly` **config**: `object`

Defined in: [client/base.ts:53](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L53)

Read-only client configuration

#### baseURL?

> `optional` **baseURL**: `string`

#### timeout?

> `optional` **timeout**: `number`

#### maxRetries?

> `optional` **maxRetries**: `number`

#### Implementation of

[`PluginClient`](../interfaces/PluginClient.md).[`config`](../interfaces/PluginClient.md#config)

***

### oauth

> `private` **oauth**: [`OAuth`](OAuth.md)

Defined in: [client/base.ts:58](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L58)

***

### rateLimiter

> `private` **rateLimiter**: [`RateLimiter`](RateLimiter.md)

Defined in: [client/base.ts:59](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L59)

***

### retryHandler

> `private` **retryHandler**: [`RetryHandler`](RetryHandler.md)

Defined in: [client/base.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L60)

***

### baseURL

> `private` **baseURL**: `string`

Defined in: [client/base.ts:61](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L61)

***

### timeout

> `private` **timeout**: `number`

Defined in: [client/base.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L62)

***

### pluginManager

> `private` **pluginManager**: [`PluginManager`](../interfaces/PluginManager.md)

Defined in: [client/base.ts:63](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L63)

***

### versionManager

> `private` **versionManager**: [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:64](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L64)
