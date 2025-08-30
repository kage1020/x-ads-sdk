[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / DefaultPluginManager

# Class: DefaultPluginManager

Defined in: plugins/base.ts:29

## Implements

- [`PluginManager`](../interfaces/PluginManager.md)

## Constructors

### Constructor

> **new DefaultPluginManager**(`client?`): `DefaultPluginManager`

Defined in: plugins/base.ts:32

#### Parameters

##### client?

`any`

#### Returns

`DefaultPluginManager`

## Methods

### use()

> **use**(`plugin`): `void`

Defined in: plugins/base.ts:34

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

Defined in: plugins/base.ts:47

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

Defined in: plugins/base.ts:61

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

Defined in: plugins/base.ts:65

#### Parameters

##### pluginName

`string`

#### Returns

`undefined` \| [`XAdsPlugin`](../interfaces/XAdsPlugin.md)

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`get`](../interfaces/PluginManager.md#get)

***

### executeBeforeRequest()

> **executeBeforeRequest**(`config`): `Promise`\<`any`\>

Defined in: plugins/base.ts:69

#### Parameters

##### config

`any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeBeforeRequest`](../interfaces/PluginManager.md#executebeforerequest)

***

### executeAfterResponse()

> **executeAfterResponse**(`response`, `config`): `Promise`\<`any`\>

Defined in: plugins/base.ts:81

#### Parameters

##### response

`any`

##### config

`any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeAfterResponse`](../interfaces/PluginManager.md#executeafterresponse)

***

### executeOnError()

> **executeOnError**(`error`, `config`): `Promise`\<`any`\>

Defined in: plugins/base.ts:93

#### Parameters

##### error

`any`

##### config

`any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`executeOnError`](../interfaces/PluginManager.md#executeonerror)

## Properties

### plugins

> **plugins**: `Map`\<`string`, [`XAdsPlugin`](../interfaces/XAdsPlugin.md)\>

Defined in: plugins/base.ts:30

#### Implementation of

[`PluginManager`](../interfaces/PluginManager.md).[`plugins`](../interfaces/PluginManager.md#plugins)

***

### client?

> `private` `optional` **client**: `any`

Defined in: plugins/base.ts:32
