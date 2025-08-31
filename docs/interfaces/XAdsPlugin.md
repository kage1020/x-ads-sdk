[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsPlugin

# Interface: XAdsPlugin

Defined in: [plugins/base.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L26)

## Methods

### beforeRequest()?

> `optional` **beforeRequest**(`config`): `undefined` \| `PluginRequestConfig` \| `Promise`\<`undefined` \| `PluginRequestConfig`\>

Defined in: [plugins/base.ts:31](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L31)

#### Parameters

##### config

`PluginRequestConfig`

#### Returns

`undefined` \| `PluginRequestConfig` \| `Promise`\<`undefined` \| `PluginRequestConfig`\>

***

### afterResponse()?

> `optional` **afterResponse**(`response`, `config`): `undefined` \| `PluginResponse`\<`unknown`\> \| `Promise`\<`undefined` \| `PluginResponse`\<`unknown`\>\>

Defined in: [plugins/base.ts:34](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L34)

#### Parameters

##### response

`PluginResponse`

##### config

`PluginRequestConfig`

#### Returns

`undefined` \| `PluginResponse`\<`unknown`\> \| `Promise`\<`undefined` \| `PluginResponse`\<`unknown`\>\>

***

### onError()?

> `optional` **onError**(`error`, `config`): `undefined` \| `PluginResponse`\<`unknown`\> \| `Promise`\<`undefined` \| `PluginResponse`\<`unknown`\>\>

Defined in: [plugins/base.ts:38](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L38)

#### Parameters

##### error

`Error`

##### config

`PluginRequestConfig`

#### Returns

`undefined` \| `PluginResponse`\<`unknown`\> \| `Promise`\<`undefined` \| `PluginResponse`\<`unknown`\>\>

***

### install()?

> `optional` **install**(`client`): `void` \| `Promise`\<`void`\>

Defined in: [plugins/base.ts:44](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L44)

#### Parameters

##### client

`PluginClient`

#### Returns

`void` \| `Promise`\<`void`\>

***

### uninstall()?

> `optional` **uninstall**(`client`): `void` \| `Promise`\<`void`\>

Defined in: [plugins/base.ts:45](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L45)

#### Parameters

##### client

`PluginClient`

#### Returns

`void` \| `Promise`\<`void`\>

## Properties

### name

> **name**: `string`

Defined in: [plugins/base.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L27)

***

### version?

> `optional` **version**: `string`

Defined in: [plugins/base.ts:28](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L28)
