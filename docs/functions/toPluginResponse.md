[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / toPluginResponse

# Function: toPluginResponse()

> **toPluginResponse**\<`T`\>(`data`, `status`, `statusText`, `headers`): [`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

Defined in: [utils/plugin.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/utils/plugin.ts#L70)

Convert response data to PluginResponse format

## Type Parameters

### T

`T`

## Parameters

### data

`T`

Response data

### status

`number` = `200`

HTTP status code (default: 200)

### statusText

`string` = `'OK'`

HTTP status text (default: 'OK')

### headers

`Record`\<`string`, `string`\> = `{}`

Response headers (default: {})

## Returns

[`PluginResponse`](../interfaces/PluginResponse.md)\<`T`\>

Plugin-compatible response
