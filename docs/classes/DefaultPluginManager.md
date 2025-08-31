[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / DefaultPluginManager

# Class: DefaultPluginManager

Defined in: [plugins/base.ts:65](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L65)

## Implements

- [`PluginManager`](../interfaces/PluginManager.md)

## Constructors

### Constructor

> **new DefaultPluginManager**(`client?`): `DefaultPluginManager`

Defined in: [plugins/base.ts:68](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L68)

#### Parameters

##### client?

`PluginClient`

#### Returns

`DefaultPluginManager`

## Methods

### use()

> **use**(`plugin`): `void`

Defined in: [plugins/base.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L70)

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

Defined in: [plugins/base.ts:83](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L83)

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

Defined in: [plugins/base.ts:97](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L97)

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

Defined in: [plugins/base.ts:101](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L101)

#### Parameters

##### pluginName

`string`

#### Returns

`undefined` \| [`XAdsPlugin`](../interfaces/XAdsPlugin.md)

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`get`](../interfaces/PluginManager.md#get)

***

### executeBeforeRequest()

> **executeBeforeRequest**(`config`): `Promise`\<`PluginRequestConfig`\>

Defined in: [plugins/base.ts:105](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L105)

#### Parameters

##### config

`PluginRequestConfig`

#### Returns

`Promise`\<`PluginRequestConfig`\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeBeforeRequest`](../interfaces/PluginManager.md#executebeforerequest)

***

### executeAfterResponse()

> **executeAfterResponse**(`response`, `config`): `Promise`\<`PluginResponse`\<`unknown`\>\>

Defined in: [plugins/base.ts:118](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L118)

#### Parameters

##### response

`PluginResponse`

##### config

`PluginRequestConfig`

#### Returns

`Promise`\<`PluginResponse`\<`unknown`\>\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeAfterResponse`](../interfaces/PluginManager.md#executeafterresponse)

***

### executeOnError()

> **executeOnError**(`error`, `config`): `Promise`\<`PluginResponse`\<`unknown`\>\>

Defined in: [plugins/base.ts:134](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L134)

#### Parameters

##### error

`Error`

##### config

`PluginRequestConfig`

#### Returns

`Promise`\<`PluginResponse`\<`unknown`\>\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeOnError`](../interfaces/PluginManager.md#executeonerror)

## Properties

### plugins

> **plugins**: `Map`\<`string`, [`XAdsPlugin`](../interfaces/XAdsPlugin.md)\>

Defined in: [plugins/base.ts:66](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L66)

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`plugins`](../interfaces/PluginManager.md#plugins)

***

### client?

> `private` `optional` **client**: `PluginClient`

Defined in: [plugins/base.ts:68](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L68)
