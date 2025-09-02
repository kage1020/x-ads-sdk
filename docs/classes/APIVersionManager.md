[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / APIVersionManager

# Class: APIVersionManager

Defined in: client/api-version-manager.ts:12

Manages API version selection and compatibility

## Constructors

### Constructor

> **new APIVersionManager**(`version`, `autoUpgrade`): `APIVersionManager`

Defined in: client/api-version-manager.ts:16

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

Defined in: client/api-version-manager.ts:22

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getCurrentVersion()

> **getCurrentVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: client/api-version-manager.ts:30

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setVersion()

> **setVersion**(`version`): `void`

Defined in: client/api-version-manager.ts:34

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionPath()

> **getVersionPath**(): `string`

Defined in: client/api-version-manager.ts:39

#### Returns

`string`

***

### isVersionDeprecated()

> **isVersionDeprecated**(`version?`): `boolean`

Defined in: client/api-version-manager.ts:43

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

***

### getVersionInfo()

> **getVersionInfo**(`version?`): [`APIVersionInfo`](../interfaces/APIVersionInfo.md)

Defined in: client/api-version-manager.ts:48

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)

***

### shouldUpgrade()

> **shouldUpgrade**(): `boolean`

Defined in: client/api-version-manager.ts:53

#### Returns

`boolean`

***

### getUpgradeRecommendation()

> **getUpgradeRecommendation**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: client/api-version-manager.ts:57

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### parseResponseHeaders()

> **parseResponseHeaders**(`headers`): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: client/api-version-manager.ts:82

#### Parameters

##### headers

`Record`\<`string`, `string`\>

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### migrateEndpoint()

> **migrateEndpoint**(`endpoint`, `_fromVersion`, `_toVersion`): `string`

Defined in: client/api-version-manager.ts:113

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

Defined in: client/api-version-manager.ts:122

Gets all available versions with their status

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)[]

***

### getLatestVersion()

> `static` **getLatestVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: client/api-version-manager.ts:129

Gets the latest supported version

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### isVersionSupported()

> `static` **isVersionSupported**(`version`): `boolean`

Defined in: client/api-version-manager.ts:136

Checks if a version is currently supported

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

## Properties

### version

> `private` **version**: [`APIVersion`](../enumerations/APIVersion.md)

Defined in: client/api-version-manager.ts:13

***

### autoUpgrade

> `private` **autoUpgrade**: `boolean`

Defined in: client/api-version-manager.ts:14
