[**X Ads SDK v1.0.1**](../README.md)

***

[X Ads SDK](../globals.md) / toPluginResponse

# Function: toPluginResponse()

> **toPluginResponse**\<`T`\>(`data`, `status`, `statusText`, `headers`): `PluginResponse`\<`T`\>

Defined in: utils/plugin.ts:70

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

`PluginResponse`\<`T`\>

Plugin-compatible response
