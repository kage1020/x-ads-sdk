[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / OAuth

# Class: OAuth

Defined in: [auth/oauth.ts:5](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L5)

## Constructors

### Constructor

> **new OAuth**(`config`): `OAuth`

Defined in: [auth/oauth.ts:11](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L11)

#### Parameters

##### config

[`AuthConfig`](../interfaces/AuthConfig.md)

#### Returns

`OAuth`

## Methods

### validateConfig()

> `private` **validateConfig**(): `void`

Defined in: [auth/oauth.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L20)

#### Returns

`void`

***

### generateNonce()

> **generateNonce**(): `string`

Defined in: [auth/oauth.ts:31](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L31)

#### Returns

`string`

***

### generateTimestamp()

> **generateTimestamp**(): `string`

Defined in: [auth/oauth.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L35)

#### Returns

`string`

***

### percentEncode()

> **percentEncode**(`str`): `string`

Defined in: [auth/oauth.ts:39](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L39)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### generateSignature()

> **generateSignature**(`httpMethod`, `baseURL`, `parameters`): `string`

Defined in: [auth/oauth.ts:44](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L44)

#### Parameters

##### httpMethod

`string`

##### baseURL

`string`

##### parameters

`Record`\<`string`, `string`\>

#### Returns

`string`

***

### generateOAuthSignature()

> **generateOAuthSignature**(`options`): [`OAuthSignature`](../interfaces/OAuthSignature.md)

Defined in: [auth/oauth.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L70)

#### Parameters

##### options

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

[`OAuthSignature`](../interfaces/OAuthSignature.md)

***

### generateAuthorizationHeader()

> **generateAuthorizationHeader**(`signature`): `string`

Defined in: [auth/oauth.ts:108](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L108)

#### Parameters

##### signature

[`OAuthSignature`](../interfaces/OAuthSignature.md)

#### Returns

`string`

***

### signRequest()

> **signRequest**(`options`): [`RequestOptions`](../interfaces/RequestOptions.md)

Defined in: [auth/oauth.ts:117](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L117)

#### Parameters

##### options

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

[`RequestOptions`](../interfaces/RequestOptions.md)

## Properties

### consumer\_key

> `private` **consumer\_key**: `string`

Defined in: [auth/oauth.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L6)

***

### consumer\_secret

> `private` **consumer\_secret**: `string`

Defined in: [auth/oauth.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L7)

***

### access\_token

> `private` **access\_token**: `string`

Defined in: [auth/oauth.ts:8](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L8)

***

### access\_token\_secret

> `private` **access\_token\_secret**: `string`

Defined in: [auth/oauth.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L9)
