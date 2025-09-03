[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / HttpClient

# Class: HttpClient

Defined in: [client/base.ts:57](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L57)

Basic client interface that plugins can interact with

This interface provides plugins with access to basic client
configuration without exposing internal implementation details.

## Implements

- [`PluginClient`](../interfaces/PluginClient.md)

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in: [client/base.ts:72](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L72)

#### Parameters

##### config

[`HttpClientConfig`](../interfaces/HttpClientConfig.md)

#### Returns

`HttpClient`

## Methods

### getBaseURL()

> `private` **getBaseURL**(`environment`): `string`

Defined in: [client/base.ts:98](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L98)

#### Parameters

##### environment

[`Environment`](../enumerations/Environment.md) = `Environment.SANDBOX`

#### Returns

`string`

***

### buildURL()

> `private` **buildURL**(`endpoint`, `params?`): `string`

Defined in: [client/base.ts:107](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L107)

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

Defined in: [client/base.ts:112](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L112)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)

***

### toPluginConfig()

> `private` **toPluginConfig**(`config`): [`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

Defined in: [client/base.ts:129](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L129)

#### Parameters

##### config

[`RequestConfig`](../interfaces/RequestConfig.md)

#### Returns

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

***

### fromPluginConfig()

> `private` **fromPluginConfig**(`pluginConfig`): [`RequestConfig`](../interfaces/RequestConfig.md)

Defined in: [client/base.ts:134](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L134)

#### Parameters

##### pluginConfig

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

[`RequestConfig`](../interfaces/RequestConfig.md)

***

### toPluginResponse()

> `private` **toPluginResponse**\<`T`\>(`data`, `status`, `statusText`, `headers`): [`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

Defined in: [client/base.ts:139](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L139)

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

Defined in: [client/base.ts:148](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L148)

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

Defined in: [client/base.ts:185](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L185)

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

Defined in: [client/base.ts:251](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L251)

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

Defined in: [client/base.ts:59](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L59)

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

Defined in: [client/base.ts:64](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L64)

***

### rateLimiter

> `private` **rateLimiter**: [`RateLimiter`](RateLimiter.md)

Defined in: [client/base.ts:65](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L65)

***

### retryHandler

> `private` **retryHandler**: [`RetryHandler`](RetryHandler.md)

Defined in: [client/base.ts:66](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L66)

***

### baseURL

> `private` **baseURL**: `string`

Defined in: [client/base.ts:67](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L67)

***

### timeout

> `private` **timeout**: `number`

Defined in: [client/base.ts:68](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L68)

***

### pluginManager

> `private` **pluginManager**: [`PluginManager`](../interfaces/PluginManager.md)

Defined in: [client/base.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L69)

***

### versionManager

> `private` **versionManager**: [`APIVersionManager`](APIVersionManager.md)

Defined in: [client/base.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/base.ts#L70)
