[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / PluginRequestConfig

# Interface: PluginRequestConfig

Defined in: [plugins/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L9)

Configuration object for plugin requests

This interface defines the structure of HTTP request configuration
that plugins can modify during the beforeRequest hook.

## Properties

### method

> **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"`

Defined in: [plugins/base.ts:11](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L11)

HTTP method for the request

***

### url

> **url**: `string`

Defined in: [plugins/base.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L13)

Full URL for the request

***

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Defined in: [plugins/base.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L15)

Optional HTTP headers

***

### params?

> `optional` **params**: `Record`\<`string`, `unknown`\>

Defined in: [plugins/base.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L17)

Optional query parameters or request parameters

***

### body?

> `optional` **body**: `unknown`

Defined in: [plugins/base.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L19)

Optional request body data
