[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / BaseResource

# Abstract Class: BaseResource

Defined in: [resources/base.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L6)

## Hierarchy

[View Summary](../hierarchy.md)

### Extended by

- [`AccountResource`](AccountResource.md)
- [`Analytics`](Analytics.md)
- [`Audiences`](Audiences.md)
- [`CampaignResource`](CampaignResource.md)
- [`CatalogManagement`](CatalogManagement.md)
- [`ConversionTrackingResource`](ConversionTrackingResource.md)
- [`Creatives`](Creatives.md)
- [`FundingInstrumentResource`](FundingInstrumentResource.md)
- [`LineItemResource`](LineItemResource.md)

## Constructors

### Constructor

> **new BaseResource**(`httpClient`): `BaseResource`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`BaseResource`

## Methods

### getApiVersionPath()

> `protected` **getApiVersionPath**(): `string`

Defined in: [resources/base.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L17)

Get the current API version path from the HTTP client

#### Returns

`string`

API version path (e.g., '/12')

***

### buildEndpoint()

> `protected` **buildEndpoint**(`path`): `string`

Defined in: [resources/base.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L26)

Build endpoint with current API version

#### Parameters

##### path

`string`

API path without version

#### Returns

`string`

Complete endpoint with API version

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)
