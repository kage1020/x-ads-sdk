[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / OAuth

# Class: OAuth

Defined in: [auth/oauth.ts:5](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L5)

## Constructors

### Constructor

> **new OAuth**(`config`): `OAuth`

Defined in: [auth/oauth.ts:12](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L12)

#### Parameters

##### config

[`AuthConfig`](../interfaces/AuthConfig.md)

#### Returns

`OAuth`

## Methods

### validateConfig()

> `private` **validateConfig**(): `void`

Defined in: [auth/oauth.ts:23](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L23)

#### Returns

`void`

***

### generateNonce()

> **generateNonce**(): `string`

Defined in: [auth/oauth.ts:34](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L34)

#### Returns

`string`

***

### generateTimestamp()

> **generateTimestamp**(): `string`

Defined in: [auth/oauth.ts:38](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L38)

#### Returns

`string`

***

### percentEncode()

> **percentEncode**(`str`): `string`

Defined in: [auth/oauth.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L42)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### generateSignature()

> **generateSignature**(`httpMethod`, `baseURL`, `parameters`): `string`

Defined in: [auth/oauth.ts:47](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L47)

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

Defined in: [auth/oauth.ts:74](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L74)

#### Parameters

##### options

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

[`OAuthSignature`](../interfaces/OAuthSignature.md)

***

### generateAuthorizationHeader()

> **generateAuthorizationHeader**(`signature`): `string`

Defined in: [auth/oauth.ts:112](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L112)

#### Parameters

##### signature

[`OAuthSignature`](../interfaces/OAuthSignature.md)

#### Returns

`string`

***

### signRequest()

> **signRequest**(`options`): [`RequestOptions`](../interfaces/RequestOptions.md)

Defined in: [auth/oauth.ts:121](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L121)

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

***

### signature\_method

> `private` **signature\_method**: `"HMAC-SHA1"` \| `"HMAC-SHA256"`

Defined in: [auth/oauth.ts:10](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L10)
