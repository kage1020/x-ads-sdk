[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsPlugin

# Interface: XAdsPlugin

Defined in: [plugins/base.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L70)

X Ads SDK Plugin Interface

Plugins can hook into the request/response lifecycle to modify behavior,
add functionality, or handle errors. All hooks are optional.

## Methods

### beforeRequest()?

> `optional` **beforeRequest**(`config`): `undefined` \| [`PluginRequestConfig`](PluginRequestConfig.md) \| `Promise`\<`undefined` \| [`PluginRequestConfig`](PluginRequestConfig.md)\>

Defined in: [plugins/base.ts:81](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L81)

Hook called before making a request

#### Parameters

##### config

[`PluginRequestConfig`](PluginRequestConfig.md)

Request configuration to potentially modify

#### Returns

`undefined` \| [`PluginRequestConfig`](PluginRequestConfig.md) \| `Promise`\<`undefined` \| [`PluginRequestConfig`](PluginRequestConfig.md)\>

Modified config or undefined to use original

***

### afterResponse()?

> `optional` **afterResponse**(`response`, `config`): `undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\> \| `Promise`\<`undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

Defined in: [plugins/base.ts:91](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L91)

Hook called after receiving a response

#### Parameters

##### response

[`PluginResponse`](PluginResponse.md)

Response to potentially modify

##### config

[`PluginRequestConfig`](PluginRequestConfig.md)

Original request configuration

#### Returns

`undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\> \| `Promise`\<`undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

Modified response or undefined to use original

***

### onError()?

> `optional` **onError**(`error`, `config`): `undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\> \| `Promise`\<`undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

Defined in: [plugins/base.ts:102](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L102)

Hook called when an error occurs

#### Parameters

##### error

`Error`

The error that occurred

##### config

[`PluginRequestConfig`](PluginRequestConfig.md)

Original request configuration

#### Returns

`undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\> \| `Promise`\<`undefined` \| [`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

Response to use instead of error, or undefined to propagate error

***

### install()?

> `optional` **install**(`client`): `void` \| `Promise`\<`void`\>

Defined in: [plugins/base.ts:111](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L111)

Called when plugin is installed

#### Parameters

##### client

[`PluginClient`](PluginClient.md)

Client instance for plugin initialization

#### Returns

`void` \| `Promise`\<`void`\>

***

### uninstall()?

> `optional` **uninstall**(`client`): `void` \| `Promise`\<`void`\>

Defined in: [plugins/base.ts:117](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L117)

Called when plugin is uninstalled

#### Parameters

##### client

[`PluginClient`](PluginClient.md)

Client instance for plugin cleanup

#### Returns

`void` \| `Promise`\<`void`\>

## Properties

### name

> **name**: `string`

Defined in: [plugins/base.ts:72](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L72)

Unique plugin name

***

### version?

> `optional` **version**: `string`

Defined in: [plugins/base.ts:74](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L74)

Plugin version
