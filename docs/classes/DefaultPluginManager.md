[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / DefaultPluginManager

# Class: DefaultPluginManager

Defined in: [plugins/base.ts:158](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L158)

Default implementation of PluginManager

Handles plugin installation, removal, and execution of plugin hooks.

## Implements

- [`PluginManager`](../interfaces/PluginManager.md)

## Constructors

### Constructor

> **new DefaultPluginManager**(`client?`): `DefaultPluginManager`

Defined in: [plugins/base.ts:166](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L166)

Create a new plugin manager

#### Parameters

##### client?

[`PluginClient`](../interfaces/PluginClient.md)

Optional client instance for plugin hooks

#### Returns

`DefaultPluginManager`

## Methods

### use()

> **use**(`plugin`): `void`

Defined in: [plugins/base.ts:168](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L168)

Install a plugin

#### Parameters

##### plugin

[`XAdsPlugin`](../interfaces/XAdsPlugin.md)

#### Returns

`void`

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`use`](../interfaces/PluginManager.md#use)

***

### remove()

> **remove**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:181](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L181)

Remove a plugin by name

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`remove`](../interfaces/PluginManager.md#remove)

***

### has()

> **has**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:195](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L195)

Check if a plugin is installed

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`has`](../interfaces/PluginManager.md#has)

***

### get()

> **get**(`pluginName`): `undefined` \| [`XAdsPlugin`](../interfaces/XAdsPlugin.md)

Defined in: [plugins/base.ts:199](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L199)

Get a plugin by name

#### Parameters

##### pluginName

`string`

#### Returns

`undefined` \| [`XAdsPlugin`](../interfaces/XAdsPlugin.md)

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`get`](../interfaces/PluginManager.md#get)

***

### executeBeforeRequest()

> **executeBeforeRequest**(`config`): `Promise`\<[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)\>

Defined in: [plugins/base.ts:203](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L203)

Execute beforeRequest hooks for all plugins

#### Parameters

##### config

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

`Promise`\<[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeBeforeRequest`](../interfaces/PluginManager.md#executebeforerequest)

***

### executeAfterResponse()

> **executeAfterResponse**(`response`, `config`): `Promise`\<[`PluginResponse`](../interfaces/PluginResponse.md)\<`unknown`\>\>

Defined in: [plugins/base.ts:216](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L216)

Execute afterResponse hooks for all plugins

#### Parameters

##### response

[`PluginResponse`](../interfaces/PluginResponse.md)

##### config

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

`Promise`\<[`PluginResponse`](../interfaces/PluginResponse.md)\<`unknown`\>\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeAfterResponse`](../interfaces/PluginManager.md#executeafterresponse)

***

### executeOnError()

> **executeOnError**(`error`, `config`): `Promise`\<[`PluginResponse`](../interfaces/PluginResponse.md)\<`unknown`\>\>

Defined in: [plugins/base.ts:232](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L232)

Execute onError hooks for all plugins

#### Parameters

##### error

`Error`

##### config

[`PluginRequestConfig`](../interfaces/PluginRequestConfig.md)

#### Returns

`Promise`\<[`PluginResponse`](../interfaces/PluginResponse.md)\<`unknown`\>\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeOnError`](../interfaces/PluginManager.md#executeonerror)

## Properties

### plugins

> **plugins**: `Map`\<`string`, [`XAdsPlugin`](../interfaces/XAdsPlugin.md)\>

Defined in: [plugins/base.ts:160](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L160)

Map of installed plugins

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`plugins`](../interfaces/PluginManager.md#plugins)

***

### client?

> `private` `optional` **client**: [`PluginClient`](../interfaces/PluginClient.md)

Defined in: [plugins/base.ts:166](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L166)

Optional client instance for plugin hooks
