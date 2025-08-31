[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / hmac

# Function: hmac()

> **hmac**(`algorithm`, `key`, `data`): `Promise`\<`string`\>

Defined in: [utils/crypto.ts:56](https://github.com/kage1020/x-ads-sdk/blob/main/src/utils/crypto.ts#L56)

HMAC signature generation using Web Crypto API

## Parameters

### algorithm

'SHA-1' or 'SHA-256'

`"SHA-1"` | `"SHA-256"`

### key

`string`

Signing key as string

### data

`string`

Data to sign as string

## Returns

`Promise`\<`string`\>

Promise<string> - Base64 encoded signature
