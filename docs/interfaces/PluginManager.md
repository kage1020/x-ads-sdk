[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / PluginManager

# Interface: PluginManager

Defined in: [plugins/base.ts:48](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L48)

## Methods

### use()

> **use**(`plugin`): `void`

Defined in: [plugins/base.ts:51](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L51)

#### Parameters

##### plugin

[`XAdsPlugin`](XAdsPlugin.md)

#### Returns

`void`

***

### remove()

> **remove**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:52](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L52)

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

***

### has()

> **has**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:53](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L53)

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

***

### get()

> **get**(`pluginName`): `undefined` \| [`XAdsPlugin`](XAdsPlugin.md)

Defined in: [plugins/base.ts:54](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L54)

#### Parameters

##### pluginName

`string`

#### Returns

`undefined` \| [`XAdsPlugin`](XAdsPlugin.md)

***

### executeBeforeRequest()

> **executeBeforeRequest**(`config`): `Promise`\<`PluginRequestConfig`\>

Defined in: [plugins/base.ts:57](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L57)

#### Parameters

##### config

`PluginRequestConfig`

#### Returns

`Promise`\<`PluginRequestConfig`\>

***

### executeAfterResponse()

> **executeAfterResponse**(`response`, `config`): `Promise`\<`PluginResponse`\<`unknown`\>\>

Defined in: [plugins/base.ts:58](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L58)

#### Parameters

##### response

`PluginResponse`

##### config

`PluginRequestConfig`

#### Returns

`Promise`\<`PluginResponse`\<`unknown`\>\>

***

### executeOnError()

> **executeOnError**(`error`, `config`): `Promise`\<`PluginResponse`\<`unknown`\>\>

Defined in: [plugins/base.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L62)

#### Parameters

##### error

`Error`

##### config

`PluginRequestConfig`

#### Returns

`Promise`\<`PluginResponse`\<`unknown`\>\>

## Properties

### plugins

> **plugins**: `Map`\<`string`, [`XAdsPlugin`](XAdsPlugin.md)\>

Defined in: [plugins/base.ts:49](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L49)
