[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / APIVersionManager

# Class: APIVersionManager

Defined in: [client/api-version-manager.ts:12](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L12)

Manages API version selection and compatibility

## Constructors

### Constructor

> **new APIVersionManager**(`version`, `autoUpgrade`): `APIVersionManager`

Defined in: [client/api-version-manager.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L16)

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

Defined in: [client/api-version-manager.ts:22](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L22)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getCurrentVersion()

> **getCurrentVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/api-version-manager.ts:30](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L30)

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### setVersion()

> **setVersion**(`version`): `void`

Defined in: [client/api-version-manager.ts:34](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L34)

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`void`

***

### getVersionPath()

> **getVersionPath**(): `string`

Defined in: [client/api-version-manager.ts:39](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L39)

#### Returns

`string`

***

### isVersionDeprecated()

> **isVersionDeprecated**(`version?`): `boolean`

Defined in: [client/api-version-manager.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L43)

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

***

### getVersionInfo()

> **getVersionInfo**(`version?`): [`APIVersionInfo`](../interfaces/APIVersionInfo.md)

Defined in: [client/api-version-manager.ts:48](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L48)

#### Parameters

##### version?

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)

***

### shouldUpgrade()

> **shouldUpgrade**(): `boolean`

Defined in: [client/api-version-manager.ts:53](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L53)

#### Returns

`boolean`

***

### getUpgradeRecommendation()

> **getUpgradeRecommendation**(): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client/api-version-manager.ts:57](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L57)

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### parseResponseHeaders()

> **parseResponseHeaders**(`headers`): [`APIVersionResponse`](../interfaces/APIVersionResponse.md)

Defined in: [client/api-version-manager.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L82)

#### Parameters

##### headers

`Record`\<`string`, `string`\>

#### Returns

[`APIVersionResponse`](../interfaces/APIVersionResponse.md)

***

### migrateEndpoint()

> **migrateEndpoint**(`endpoint`, `_fromVersion`, `_toVersion`): `string`

Defined in: [client/api-version-manager.ts:113](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L113)

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

Defined in: [client/api-version-manager.ts:122](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L122)

Gets all available versions with their status

#### Returns

[`APIVersionInfo`](../interfaces/APIVersionInfo.md)[]

***

### getLatestVersion()

> `static` **getLatestVersion**(): [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/api-version-manager.ts:129](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L129)

Gets the latest supported version

#### Returns

[`APIVersion`](../enumerations/APIVersion.md)

***

### isVersionSupported()

> `static` **isVersionSupported**(`version`): `boolean`

Defined in: [client/api-version-manager.ts:136](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L136)

Checks if a version is currently supported

#### Parameters

##### version

[`APIVersion`](../enumerations/APIVersion.md)

#### Returns

`boolean`

## Properties

### version

> `private` **version**: [`APIVersion`](../enumerations/APIVersion.md)

Defined in: [client/api-version-manager.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L13)

***

### autoUpgrade

> `private` **autoUpgrade**: `boolean`

Defined in: [client/api-version-manager.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/client/api-version-manager.ts#L14)
