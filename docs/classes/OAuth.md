[**X Ads SDK v1.0.4**](../README.md)

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

> **generateNonce**(): `Promise`\<`string`\>

Defined in: [auth/oauth.ts:32](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L32)

#### Returns

`Promise`\<`string`\>

***

### generateTimestamp()

> **generateTimestamp**(): `string`

Defined in: [auth/oauth.ts:36](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L36)

#### Returns

`string`

***

### percentEncode()

> **percentEncode**(`str`): `string`

Defined in: [auth/oauth.ts:40](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L40)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### generateSignature()

> **generateSignature**(`httpMethod`, `baseURL`, `parameters`): `Promise`\<`string`\>

Defined in: [auth/oauth.ts:47](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L47)

#### Parameters

##### httpMethod

`string`

##### baseURL

`string`

##### parameters

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`string`\>

***

### generateOAuthSignature()

> **generateOAuthSignature**(`options`): `Promise`\<[`OAuthSignature`](../interfaces/OAuthSignature.md)\>

Defined in: [auth/oauth.ts:72](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L72)

#### Parameters

##### options

[`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)

#### Returns

`Promise`\<[`OAuthSignature`](../interfaces/OAuthSignature.md)\>

***

### generateAuthorizationHeader()

> **generateAuthorizationHeader**(`signature`): `string`

Defined in: [auth/oauth.ts:106](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L106)

#### Parameters

##### signature

[`OAuthSignature`](../interfaces/OAuthSignature.md)

#### Returns

`string`

***

### signRequest()

> **signRequest**(`options`): `Promise`\<[`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)\>

Defined in: [auth/oauth.ts:115](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L115)

#### Parameters

##### options

[`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)

#### Returns

`Promise`\<[`OAuthRequestOptions`](../interfaces/OAuthRequestOptions.md)\>

## Properties

### consumerKey

> `private` **consumerKey**: `string`

Defined in: [auth/oauth.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L6)

***

### consumerSecret

> `private` **consumerSecret**: `string`

Defined in: [auth/oauth.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L7)

***

### accessToken

> `private` **accessToken**: `string`

Defined in: [auth/oauth.ts:8](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L8)

***

### accessTokenSecret

> `private` **accessTokenSecret**: `string`

Defined in: [auth/oauth.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L9)

***

### signatureMethod

> `private` **signatureMethod**: `"HMAC-SHA1"` \| `"HMAC-SHA256"`

Defined in: [auth/oauth.ts:10](https://github.com/kage1020/x-ads-sdk/blob/main/src/auth/oauth.ts#L10)
