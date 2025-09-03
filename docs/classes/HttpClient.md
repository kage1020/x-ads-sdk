[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / HttpClient

# Class: HttpClient

Defined in: [client/base.ts:58](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L58)

Basic client interface that plugins can interact with

This interface provides plugins with access to basic client
configuration without exposing internal implementation details.

## Implements

- [`PluginClient`](../interfaces/PluginClient.md)

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in: [client/base.ts:73](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L73)

#### Parameters

##### config

[`HttpClientConfig`](../interfaces/HttpClientConfig.md)

#### Returns

`HttpClient`

## Methods

### getBaseURL()

> `private` **getBaseURL**(`environment`): `string`

Defined in: [client/base.ts:99](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L99)

#### Parameters

##### environment

[`Environment`](../enumerations/Environment.md) = `Environment.SANDBOX`

#### Returns

`string`

***

### buildURL()

> `private` **buildURL**(`endpoint`, `params?`): `string`

Defined in: [client/base.ts:108](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L108)

#### Parameters

##### endpoint

`string`

##### params?

`Record`\<`string`, `unknown`\>

#### Returns

`string`

***

### buildRequestOptions()

> `private` **buildRequestOptions**(`config`): [`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)

Defined in: [client/base.ts:113](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L113)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)

***

### toPluginConfig()

> `private` **toPluginConfig**(`config`): [`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

Defined in: [client/base.ts:130](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L130)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

***

### fromPluginConfig()

> `private` **fromPluginConfig**(`pluginConfig`): [`RequestConfig`](../interfaces/RequestConfig.md)

Defined in: [client/base.ts:135](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L135)

#### Parameters

##### pluginConfig

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

[`RequestConfig`](../interfaces/RequestConfig.md)

***

### toPluginResponse()

> `private` **toPluginResponse**\<`T`\>(`data`, `status`, `statusText`, `headers`): [`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

Defined in: [client/base.ts:140](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L140)

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

Defined in: [client/base.ts:149](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L149)

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

Defined in: [client/base.ts:186](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L186)

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

Defined in: [client/base.ts:252](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L252)

#### Parameters

##### response

`Response`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**\<`T`\>(`endpoint`, `params?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:302](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L302)

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

Defined in: [client/base.ts:315](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L315)

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

Defined in: [client/base.ts:324](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L324)

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

Defined in: [client/base.ts:333](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L333)

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

Defined in: [client/base.ts:342](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L342)

#### Returns

[`PluginManager`](../interfaces/PluginManager.md)

***

### getAPIVersion()

> **getAPIVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/base.ts:347](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L347)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: [client/base.ts:351](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L351)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionManager()

> **getVersionManager**(): [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:355](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L355)

#### Returns

[`APIVersionManager`](APIVersionManager.md)

***

### getVersionInfo()

> **getVersionInfo**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client/base.ts:359](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L359)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### isVersionDeprecated()

> **isVersionDeprecated**(): `boolean`

Defined in: [client/base.ts:363](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L363)

#### Returns

`boolean`

## Properties

### config

> `readonly` **config**: `object`

Defined in: [client/base.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L60)

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

Defined in: [client/base.ts:65](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L65)

***

### rateLimiter

> `private` **rateLimiter**: [`RateLimiter`](RateLimiter.md)

Defined in: [client/base.ts:66](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L66)

***

### retryHandler

> `private` **retryHandler**: [`RetryHandler`](RetryHandler.md)

Defined in: [client/base.ts:67](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L67)

***

### baseURL

> `private` **baseURL**: `string`

Defined in: [client/base.ts:68](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L68)

***

### timeout

> `private` **timeout**: `number`

Defined in: [client/base.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L69)

***

### pluginManager

> `private` **pluginManager**: [`PluginManager`](../interfaces/PluginManager.md)

Defined in: [client/base.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L70)

***

### versionManager

> `private` **versionManager**: [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L71)
