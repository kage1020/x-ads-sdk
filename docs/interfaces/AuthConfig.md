[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / AuthConfig

# Interface: AuthConfig

Defined in: [types/auth.ts:1](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L1)

## Properties

### consumer\_key

> **consumer\_key**: `string`

Defined in: [types/auth.ts:2](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L2)

***

### consumer\_secret

> **consumer\_secret**: `string`

Defined in: [types/auth.ts:3](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L3)

***

### access\_token

> **access\_token**: `string`

Defined in: [types/auth.ts:4](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L4)

***

### access\_token\_secret

> **access\_token\_secret**: `string`

Defined in: [types/auth.ts:5](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L5)

***

### sandbox?

> `optional` **sandbox**: `boolean`

Defined in: [types/auth.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L6)

***

### signature\_method?

> `optional` **signature\_method**: `"HMAC-SHA1"` \| `"HMAC-SHA256"`

Defined in: [types/auth.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/auth.ts#L13)

OAuth signature method to use for request signing.
This is for OAuth signature generation, not password hashing.
HMAC-SHA1 is the standard OAuth 1.0a signature method as defined in RFC 5849.

#### Default

```ts
'HMAC-SHA1' - Required by OAuth 1.0a specification for maximum compatibility
```
