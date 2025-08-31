[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / PluginManager

# Interface: PluginManager

Defined in: [plugins/base.ts:127](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L127)

Plugin Manager Interface

Manages plugin lifecycle and executes plugin hooks during HTTP operations.

## Methods

### use()

> **use**(`plugin`): `void`

Defined in: [plugins/base.ts:132](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L132)

Install a plugin

#### Parameters

##### plugin

[`XAdsPlugin`](XAdsPlugin.md)

#### Returns

`void`

***

### remove()

> **remove**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:134](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L134)

Remove a plugin by name

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

***

### has()

> **has**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:136](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L136)

Check if a plugin is installed

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

***

### get()

> **get**(`pluginName`): `undefined` \| [`XAdsPlugin`](XAdsPlugin.md)

Defined in: [plugins/base.ts:138](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L138)

Get a plugin by name

#### Parameters

##### pluginName

`string`

#### Returns

`undefined` \| [`XAdsPlugin`](XAdsPlugin.md)

***

### executeBeforeRequest()

> **executeBeforeRequest**(`config`): `Promise`\<[`PluginRequestConfig`](PluginRequestConfig.md)\>

Defined in: [plugins/base.ts:141](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L141)

Execute beforeRequest hooks for all plugins

#### Parameters

##### config

[`PluginRequestConfig`](PluginRequestConfig.md)

#### Returns

`Promise`\<[`PluginRequestConfig`](PluginRequestConfig.md)\>

***

### executeAfterResponse()

> **executeAfterResponse**(`response`, `config`): `Promise`\<[`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

Defined in: [plugins/base.ts:143](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L143)

Execute afterResponse hooks for all plugins

#### Parameters

##### response

[`PluginResponse`](PluginResponse.md)

##### config

[`PluginRequestConfig`](PluginRequestConfig.md)

#### Returns

`Promise`\<[`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

***

### executeOnError()

> **executeOnError**(`error`, `config`): `Promise`\<[`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

Defined in: [plugins/base.ts:148](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L148)

Execute onError hooks for all plugins

#### Parameters

##### error

`Error`

##### config

[`PluginRequestConfig`](PluginRequestConfig.md)

#### Returns

`Promise`\<[`PluginResponse`](PluginResponse.md)\<`unknown`\>\>

## Properties

### plugins

> **plugins**: `Map`\<`string`, [`XAdsPlugin`](XAdsPlugin.md)\>

Defined in: [plugins/base.ts:129](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L129)

Map of installed plugins by name
