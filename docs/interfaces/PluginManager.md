[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / PluginManager

# Interface: PluginManager

Defined in: [plugins/base.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L15)

## Methods

### use()

> **use**(`plugin`): `void`

Defined in: [plugins/base.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L18)

#### Parameters

##### plugin

[`XAdsPlugin`](XAdsPlugin.md)

#### Returns

`void`

***

### remove()

> **remove**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L19)

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

***

### has()

> **has**(`pluginName`): `boolean`

Defined in: [plugins/base.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L20)

#### Parameters

##### pluginName

`string`

#### Returns

`boolean`

***

### get()

> **get**(`pluginName`): `undefined` \| [`XAdsPlugin`](XAdsPlugin.md)

Defined in: [plugins/base.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L21)

#### Parameters

##### pluginName

`string`

#### Returns

`undefined` \| [`XAdsPlugin`](XAdsPlugin.md)

***

### executeBeforeRequest()

> **executeBeforeRequest**(`config`): `Promise`\<`any`\>

Defined in: [plugins/base.ts:24](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L24)

#### Parameters

##### config

`any`

#### Returns

`Promise`\<`any`\>

***

### executeAfterResponse()

> **executeAfterResponse**(`response`, `config`): `Promise`\<`any`\>

Defined in: [plugins/base.ts:25](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L25)

#### Parameters

##### response

`any`

##### config

`any`

#### Returns

`Promise`\<`any`\>

***

### executeOnError()

> **executeOnError**(`error`, `config`): `Promise`\<`any`\>

Defined in: [plugins/base.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L26)

#### Parameters

##### error

`any`

##### config

`any`

#### Returns

`Promise`\<`any`\>

## Properties

### plugins

> **plugins**: `Map`\<`string`, [`XAdsPlugin`](XAdsPlugin.md)\>

Defined in: [plugins/base.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L16)
