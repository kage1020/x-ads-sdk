[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / PluginResponse

# Interface: PluginResponse\<T\>

Defined in: [plugins/base.ts:31](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L31)

Response object for plugin interactions

This interface defines the structure of HTTP response data
that plugins can access and modify during afterResponse hook.

## Type Parameters

### T

`T` = `unknown`

Type of response data

## Properties

### data

> **data**: `T`

Defined in: [plugins/base.ts:33](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L33)

Response data payload

***

### status

> **status**: `number`

Defined in: [plugins/base.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L35)

HTTP status code

***

### statusText

> **statusText**: `string`

Defined in: [plugins/base.ts:37](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L37)

HTTP status text

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [plugins/base.ts:39](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L39)

Response headers
