[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / XAdsPlugin

# Interface: XAdsPlugin

Defined in: [plugins/base.ts:1](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L1)

## Methods

### beforeRequest()?

> `optional` **beforeRequest**(`config`): `any`

Defined in: [plugins/base.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L6)

#### Parameters

##### config

`any`

#### Returns

`any`

***

### afterResponse()?

> `optional` **afterResponse**(`response`, `config`): `any`

Defined in: [plugins/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L7)

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

Defined in: [plugins/base.ts:8](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L8)

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

Defined in: [plugins/base.ts:11](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L11)

#### Parameters

##### client

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### uninstall()?

> `optional` **uninstall**(`client`): `void` \| `Promise`\<`void`\>

Defined in: [plugins/base.ts:12](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L12)

#### Parameters

##### client

`any`

#### Returns

`void` \| `Promise`\<`void`\>

## Properties

### name

> **name**: `string`

Defined in: [plugins/base.ts:2](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L2)

***

### version?

> `optional` **version**: `string`

Defined in: [plugins/base.ts:3](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L3)
