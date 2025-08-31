[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / APIVersionManager

# Class: APIVersionManager

Defined in: [types/api-version.ts:53](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L53)

## Constructors

### Constructor

> **new APIVersionManager**(`version`, `autoUpgrade`): `APIVersionManager`

Defined in: [types/api-version.ts:57](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L57)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md) = `DEFAULT_VERSION`

##### autoUpgrade

`boolean` = `false`

#### Returns

`APIVersionManager`

## Methods

### validateVersion()

> `private` **validateVersion**(`version`): `void`

Defined in: [types/api-version.ts:63](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L63)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getCurrentVersion()

> **getCurrentVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [types/api-version.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L69)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setVersion()

> **setVersion**(`version`): `void`

Defined in: [types/api-version.ts:73](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L73)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionPath()

> **getVersionPath**(): `string`

Defined in: [types/api-version.ts:78](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L78)

#### Returns

`string`

***

### isVersionDeprecated()

> **isVersionDeprecated**(`version?`): `boolean`

Defined in: [types/api-version.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L82)

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

***

### getVersionInfo()

> **getVersionInfo**(`version?`): [`APIVersionInfo`](../interfaces/APIVersionInfo.md)

Defined in: [types/api-version.ts:87](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L87)

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)

***

### shouldUpgrade()

> **shouldUpgrade**(): `boolean`

Defined in: [types/api-version.ts:92](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L92)

#### Returns

`boolean`

***

### getUpgradeRecommendation()

> **getUpgradeRecommendation**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [types/api-version.ts:96](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L96)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### parseResponseHeaders()

> **parseResponseHeaders**(`headers`): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [types/api-version.ts:119](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L119)

#### Parameters

##### headers

`Record`\<`string`, `string`\>

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### migrateEndpoint()

> **migrateEndpoint**(`endpoint`, `_fromVersion`, `_toVersion`): `string`

Defined in: [types/api-version.ts:148](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L148)

Migrates endpoints between versions
Some endpoints may change between versions

#### Parameters

##### endpoint

`string`

##### \_fromVersion

[`APIVersion`](../enumerations/APIVersion.md)

##### \_toVersion

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`string`

***

### getAllVersions()

> `static` **getAllVersions**(): [`APIVersionInfo`](../interfaces/APIVersionInfo.md)[]

Defined in: [types/api-version.ts:157](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L157)

Gets all available versions with their status

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)[]

***

### getLatestVersion()

> `static` **getLatestVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [types/api-version.ts:164](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L164)

Gets the latest supported version

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### isVersionSupported()

> `static` **isVersionSupported**(`version`): `boolean`

Defined in: [types/api-version.ts:171](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L171)

Checks if a version is currently supported

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

## Properties

### version

> `private` **version**: [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [types/api-version.ts:54](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L54)

***

### autoUpgrade

> `private` **autoUpgrade**: `boolean`

Defined in: [types/api-version.ts:55](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L55)
