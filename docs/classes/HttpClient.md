[**X Ads SDK v1.0.2**](../README.md)

***

[X Ads SDK](../globals.md) / HttpClient

# Class: HttpClient

Defined in: [client/base.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L60)

Basic client interface that plugins can interact with

This interface provides plugins with access to basic client
configuration without exposing internal implementation details.

## Implements

- [`PluginClient`](../interfaces/PluginClient.md)

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in: [client/base.ts:75](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L75)

#### Parameters

##### config

[`HttpClientConfig`](../interfaces/HttpClientConfig.md)

#### Returns

`HttpClient`

## Methods

### getBaseURL()

> `private` **getBaseURL**(`environment`): `string`

Defined in: [client/base.ts:101](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L101)

#### Parameters

##### environment

[`Environment`](../enumerations/Environment.md) = `Environment.SANDBOX`

#### Returns

`string`

***

### buildURL()

> `private` **buildURL**(`endpoint`, `params?`): `string`

Defined in: [client/base.ts:110](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L110)

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

Defined in: [client/base.ts:115](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L115)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`RequestOptions`](../interfaces/RequestOptions.md)

***

### toPluginConfig()

> `private` **toPluginConfig**(`config`): [`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

Defined in: [client/base.ts:132](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L132)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

***

### fromPluginConfig()

> `private` **fromPluginConfig**(`pluginConfig`): [`RequestConfig`](../interfaces/RequestConfig.md)

Defined in: [client/base.ts:137](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L137)

#### Parameters

##### pluginConfig

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

[`RequestConfig`](../interfaces/RequestConfig.md)

***

### toPluginResponse()

> `private` **toPluginResponse**\<`T`\>(`data`, `status`, `statusText`, `headers`): [`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

Defined in: [client/base.ts:142](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L142)

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

Defined in: [client/base.ts:151](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L151)

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

Defined in: [client/base.ts:188](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L188)

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

Defined in: [client/base.ts:254](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L254)

#### Parameters

##### response

`Response`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**\<`T`\>(`endpoint`, `params?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:305](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L305)

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

### put()

> **put**\<`T`\>(`endpoint`, `body?`, `headers?`): `Promise`\<`T`\>

Defined in: [client/base.ts:327](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L327)

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

Defined in: [client/base.ts:336](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L336)

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

Defined in: [client/base.ts:345](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L345)

#### Returns

[`PluginManager`](../interfaces/PluginManager.md)

***

### getAPIVersion()

> **getAPIVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/base.ts:350](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L350)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setAPIVersion()

> **setAPIVersion**(`version`): `void`

Defined in: [client/base.ts:354](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L354)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionManager()

> **getVersionManager**(): [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:358](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L358)

#### Returns

[`APIVersionManager`](APIVersionManager.md)

***

### getVersionInfo()

> **getVersionInfo**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client/base.ts:362](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L362)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### isVersionDeprecated()

> **isVersionDeprecated**(): `boolean`

Defined in: [client/base.ts:366](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L366)

#### Returns

`boolean`

## Properties

### config

> `readonly` **config**: `object`

Defined in: [client/base.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L62)

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

Defined in: [client/base.ts:67](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L67)

***

### rateLimiter

> `private` **rateLimiter**: [`RateLimiter`](RateLimiter.md)

Defined in: [client/base.ts:68](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L68)

***

### retryHandler

> `private` **retryHandler**: [`RetryHandler`](RetryHandler.md)

Defined in: [client/base.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L69)

***

### baseURL

> `private` **baseURL**: `string`

Defined in: [client/base.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L70)

***

### timeout

> `private` **timeout**: `number`

Defined in: [client/base.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L71)

***

### pluginManager

> `private` **pluginManager**: [`PluginManager`](../interfaces/PluginManager.md)

Defined in: [client/base.ts:72](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L72)

***

### versionManager

> `private` **versionManager**: [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:73](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L73)
