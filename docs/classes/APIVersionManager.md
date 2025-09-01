[**X Ads SDK v1.0.3**](../README.md)

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

Defined in: [types/api-version.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L71)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setVersion()

> **setVersion**(`version`): `void`

Defined in: [types/api-version.ts:75](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L75)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionPath()

> **getVersionPath**(): `string`

Defined in: [types/api-version.ts:80](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L80)

#### Returns

`string`

***

### isVersionDeprecated()

> **isVersionDeprecated**(`version?`): `boolean`

Defined in: [types/api-version.ts:84](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L84)

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

***

### getVersionInfo()

> **getVersionInfo**(`version?`): [`APIVersionInfo`](../interfaces/APIVersionInfo.md)

Defined in: [types/api-version.ts:89](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L89)

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)

***

### shouldUpgrade()

> **shouldUpgrade**(): `boolean`

Defined in: [types/api-version.ts:94](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L94)

#### Returns

`boolean`

***

### getUpgradeRecommendation()

> **getUpgradeRecommendation**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [types/api-version.ts:98](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L98)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### parseResponseHeaders()

> **parseResponseHeaders**(`headers`): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [types/api-version.ts:123](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L123)

#### Parameters

##### headers

`Record`\<`string`, `string`\>

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### migrateEndpoint()

> **migrateEndpoint**(`endpoint`, `_fromVersion`, `_toVersion`): `string`

Defined in: [types/api-version.ts:154](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L154)

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

Defined in: [types/api-version.ts:163](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L163)

Gets all available versions with their status

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)[]

***

### getLatestVersion()

> `static` **getLatestVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [types/api-version.ts:170](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L170)

Gets the latest supported version

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### isVersionSupported()

> `static` **isVersionSupported**(`version`): `boolean`

Defined in: [types/api-version.ts:177](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/api-version.ts#L177)

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
