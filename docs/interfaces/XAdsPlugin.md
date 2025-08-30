[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsPlugin

# Interface: XAdsPlugin

Defined in: plugins/base.ts:1

## Methods

### beforeRequest()?

> `optional` **beforeRequest**(`config`): `any`

Defined in: plugins/base.ts:6

#### Parameters

##### config

`any`

#### Returns

`any`

***

### afterResponse()?

> `optional` **afterResponse**(`response`, `config`): `any`

Defined in: plugins/base.ts:7

#### Parameters

##### response

`any`

##### config

`any`

#### Returns

`any`

***

### onError()?

> `optional` **onError**(`error`, `config`): `any`

Defined in: plugins/base.ts:8

#### Parameters

##### error

`any`

##### config

`any`

#### Returns

`any`

***

### install()?

> `optional` **install**(`client`): `void` \| `Promise`\<`void`\>

Defined in: plugins/base.ts:11

#### Parameters

##### client

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### uninstall()?

> `optional` **uninstall**(`client`): `void` \| `Promise`\<`void`\>

Defined in: plugins/base.ts:12

#### Parameters

##### client

`any`

#### Returns

`void` \| `Promise`\<`void`\>

## Properties

### name

> **name**: `string`

Defined in: plugins/base.ts:2

***

### version?

> `optional` **version**: `string`

Defined in: plugins/base.ts:3
