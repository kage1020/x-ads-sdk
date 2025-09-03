[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / Analytics

# Class: Analytics

Defined in: resources/analytics.ts:24

Analytics resource class

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new Analytics**(`httpClient`): `Analytics`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`Analytics`

#### Inherited from

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### getSyncAnalytics()

> **getSyncAnalytics**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:29

Get synchronous analytics data
Maximum time range of 7 days allowed

#### Parameters

##### accountId

`string`

##### options

[`AnalyticsRequestOptions`](../interfaces/AnalyticsRequestOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### createAsyncJob()

> **createAsyncJob**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`AnalyticsJobResponse`](../interfaces/AnalyticsJobResponse.md)\>

Defined in: resources/analytics.ts:57

Create an asynchronous analytics job
Supports up to 90 days of data and segmentation

#### Parameters

##### accountId

`string`

##### options

[`AsyncAnalyticsRequestOptions`](../interfaces/AsyncAnalyticsRequestOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsJobResponse`](../interfaces/AnalyticsJobResponse.md)\>

***

### getAsyncJobs()

> **getAsyncJobs**(`accountId`, `jobIds?`, `requestOptions?`): `Promise`\<[`AnalyticsJobsResponse`](../interfaces/AnalyticsJobsResponse.md)\>

Defined in: resources/analytics.ts:87

Get status of asynchronous analytics jobs

#### Parameters

##### accountId

`string`

##### jobIds?

`string`[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsJobsResponse`](../interfaces/AnalyticsJobsResponse.md)\>

***

### getActiveEntities()

> **getActiveEntities**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`ActiveEntitiesResponse`](../interfaces/ActiveEntitiesResponse.md)\>

Defined in: resources/analytics.ts:107

Get active entities that have analytics changes
Maximum time range of 90 days allowed

#### Parameters

##### accountId

`string`

##### options

[`ActiveEntitiesRequestOptions`](../interfaces/ActiveEntitiesRequestOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ActiveEntitiesResponse`](../interfaces/ActiveEntitiesResponse.md)\>

***

### downloadAsyncData()

> **downloadAsyncData**(`downloadUrl`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:135

Download completed async analytics data

#### Parameters

##### downloadUrl

`string`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### decompressGzip()

> `private` **decompressGzip**(`buffer`): `Promise`\<`string`\>

Defined in: resources/analytics.ts:162

Helper method to decompress gzip data

#### Parameters

##### buffer

`ArrayBuffer`

#### Returns

`Promise`\<`string`\>

***

### getAccountAnalytics()

> **getAccountAnalytics**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:204

Get account-level analytics

#### Parameters

##### accountId

`string`

##### options

###### start_time

`string`

###### end_time

`string`

###### granularity?

[`AnalyticsGranularity`](../type-aliases/AnalyticsGranularity.md)

###### placement?

[`AnalyticsPlacement`](../type-aliases/AnalyticsPlacement.md)

###### metric_groups?

[`AnalyticsMetricGroup`](../type-aliases/AnalyticsMetricGroup.md)[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getCampaignAnalytics()

> **getCampaignAnalytics**(`accountId`, `campaignIds`, `options`, `requestOptions?`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:233

Get campaign analytics

#### Parameters

##### accountId

`string`

##### campaignIds

`string`[]

##### options

###### start_time

`string`

###### end_time

`string`

###### granularity?

[`AnalyticsGranularity`](../type-aliases/AnalyticsGranularity.md)

###### placement?

[`AnalyticsPlacement`](../type-aliases/AnalyticsPlacement.md)

###### metric_groups?

[`AnalyticsMetricGroup`](../type-aliases/AnalyticsMetricGroup.md)[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getLineItemAnalytics()

> **getLineItemAnalytics**(`accountId`, `lineItemIds`, `options`, `requestOptions?`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:263

Get line item analytics

#### Parameters

##### accountId

`string`

##### lineItemIds

`string`[]

##### options

###### start_time

`string`

###### end_time

`string`

###### granularity?

[`AnalyticsGranularity`](../type-aliases/AnalyticsGranularity.md)

###### placement?

[`AnalyticsPlacement`](../type-aliases/AnalyticsPlacement.md)

###### metric_groups?

[`AnalyticsMetricGroup`](../type-aliases/AnalyticsMetricGroup.md)[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getComprehensiveAnalytics()

> **getComprehensiveAnalytics**(`accountId`, `entityType`, `entityIds`, `options`, `granularity`, `requestOptions?`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:293

Get comprehensive analytics with multiple metric groups

#### Parameters

##### accountId

`string`

##### entityType

[`AnalyticsEntityType`](../type-aliases/AnalyticsEntityType.md)

##### entityIds

`string`[]

##### options

###### start_time

`string`

###### end_time

`string`

###### placement?

[`AnalyticsPlacement`](../type-aliases/AnalyticsPlacement.md)

##### granularity

[`AnalyticsGranularity`](../type-aliases/AnalyticsGranularity.md) = `'TOTAL'`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getDailyAnalytics()

> **getDailyAnalytics**(`accountId`, `entityType`, `entityIds`, `options`, `requestOptions?`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: resources/analytics.ts:330

Get daily analytics for trending analysis

#### Parameters

##### accountId

`string`

##### entityType

[`AnalyticsEntityType`](../type-aliases/AnalyticsEntityType.md)

##### entityIds

`string`[]

##### options

###### start_time

`string`

###### end_time

`string`

###### placement?

[`AnalyticsPlacement`](../type-aliases/AnalyticsPlacement.md)

###### metric_groups?

[`AnalyticsMetricGroup`](../type-aliases/AnalyticsMetricGroup.md)[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getApiVersionPath()

> `protected` **getApiVersionPath**(): `string`

Defined in: [resources/base.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L17)

Get the current API version path from the HTTP client

#### Returns

`string`

API version path (e.g., '/12')

#### Inherited from

[`BaseResource`](BaseResource.md).[`getApiVersionPath`](BaseResource.md#getapiversionpath)

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

#### Inherited from

[`BaseResource`](BaseResource.md).[`buildEndpoint`](BaseResource.md#buildendpoint)

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
