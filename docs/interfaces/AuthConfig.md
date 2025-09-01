[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / AuthConfig

# Interface: AuthConfig

Defined in: [types/auth.ts:1](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L1)

## Properties

### consumerKey

> **consumerKey**: `string`

Defined in: [types/auth.ts:2](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L2)

***

### consumerSecret

> **consumerSecret**: `string`

Defined in: [types/auth.ts:3](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L3)

***

### accessToken

> **accessToken**: `string`

Defined in: [types/auth.ts:4](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L4)

***

### accessTokenSecret

> **accessTokenSecret**: `string`

Defined in: [types/auth.ts:5](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L5)

***

### sandbox?

> `optional` **sandbox**: `boolean`

Defined in: [types/auth.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L6)

***

### signatureMethod?

> `optional` **signatureMethod**: `"HMAC-SHA1"` \| `"HMAC-SHA256"`

Defined in: [types/auth.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L14)

#### Default

```ts
'HMAC-SHA1' - Required by OAuth 1.0a specification for maximum compatibility

OAuth signature method to use for request signing.
This is for OAuth signature generation, not password hashing.
HMAC-SHA1 is the standard OAuth 1.0a signature method as defined in RFC 5849.
```
