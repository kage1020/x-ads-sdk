[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / PluginClient

# Interface: PluginClient

Defined in: [plugins/base.ts:50](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L50)

Basic client interface that plugins can interact with

This interface provides plugins with access to basic client
configuration without exposing internal implementation details.

## Properties

### config

> `readonly` **config**: `object`

Defined in: [plugins/base.ts:52](https://github.com/kage1020/x-ads-sdk/blob/main/src/plugins/base.ts#L52)

Read-only client configuration

#### baseURL?

> `optional` **baseURL**: `string`

Base URL for API requests

#### timeout?

> `optional` **timeout**: `number`

Request timeout in milliseconds

#### maxRetries?

> `optional` **maxRetries**: `number`

Maximum number of retry attempts
