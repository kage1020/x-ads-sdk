[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L13)

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new AnalyticsModule**(`client`): `AnalyticsModule`

Defined in: [modules/analytics.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L14)

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`AnalyticsModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getAnalytics()

> **getAnalytics**(`accountId`, `options`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L21)

Get analytics data for entities

#### Parameters

##### accountId

`string`

##### options

`AnalyticsOptions`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getCampaignAnalytics()

> **getCampaignAnalytics**(`accountId`, `campaignIds`, `dateRange`, `options`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L43)

Get campaign analytics

#### Parameters

##### accountId

`string`

##### campaignIds

`string`[]

##### dateRange

`DateRange`

##### options

`Partial`\<`AnalyticsOptions`\> = `{}`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getAdGroupAnalytics()

> **getAdGroupAnalytics**(`accountId`, `adGroupIds`, `dateRange`, `options`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L60)

Get ad group (line item) analytics

#### Parameters

##### accountId

`string`

##### adGroupIds

`string`[]

##### dateRange

`DateRange`

##### options

`Partial`\<`AnalyticsOptions`\> = `{}`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getAccountAnalytics()

> **getAccountAnalytics**(`accountId`, `dateRange`, `options`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:77](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L77)

Get account-level analytics

#### Parameters

##### accountId

`string`

##### dateRange

`DateRange`

##### options

`Partial`\<`AnalyticsOptions`\> = `{}`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getEngagementAnalytics()

> **getEngagementAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:93](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L93)

Get analytics with engagement metrics

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### dateRange

`DateRange`

##### granularity

`Granularity` = `Granularity.TOTAL`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getBillingAnalytics()

> **getBillingAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:112](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L112)

Get analytics with billing metrics

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### dateRange

`DateRange`

##### granularity

`Granularity` = `Granularity.TOTAL`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getVideoAnalytics()

> **getVideoAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:131](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L131)

Get analytics with video metrics

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### dateRange

`DateRange`

##### granularity

`Granularity` = `Granularity.TOTAL`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getComprehensiveAnalytics()

> **getComprehensiveAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:150](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L150)

Get comprehensive analytics with all metric groups

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### dateRange

`DateRange`

##### granularity

`Granularity` = `Granularity.TOTAL`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getDailyAnalytics()

> **getDailyAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `metricGroups`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:169](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L169)

Get analytics for a specific date range with daily granularity

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### dateRange

`DateRange`

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getHourlyAnalytics()

> **getHourlyAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `metricGroups`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:188](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L188)

Get analytics for a specific date range with hourly granularity

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### dateRange

`DateRange`

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### createDateRange()

> `static` **createDateRange**(`days`): `DateRange`

Defined in: [modules/analytics.ts:207](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L207)

Create date range for common periods

#### Parameters

##### days

`number`

#### Returns

`DateRange`

***

### getLastWeekAnalytics()

> **getLastWeekAnalytics**(`accountId`, `entityType`, `entityIds`, `metricGroups`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:221](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L221)

Get analytics for the last 7 days

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### getLastMonthAnalytics()

> **getLastMonthAnalytics**(`accountId`, `entityType`, `entityIds`, `metricGroups`): `Promise`\<`AnalyticsResponse`\>

Defined in: [modules/analytics.ts:239](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L239)

Get analytics for the last 30 days

#### Parameters

##### accountId

`string`

##### entityType

`EntityType`

##### entityIds

`string`[]

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<`AnalyticsResponse`\>

***

### buildEndpoint()

> `protected` **buildEndpoint**(`accountId`, ...`segments`): `string`

Defined in: [modules/base.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L14)

#### Parameters

##### accountId

`string`

##### segments

...`string`[]

#### Returns

`string`

#### Inherited from

[`BaseModule`](BaseModule.md).[`buildEndpoint`](BaseModule.md#buildendpoint)

***

### makeListRequest()

> `protected` **makeListRequest**\<`T`\>(`endpoint`, `params`): `Promise`\<`PaginatedResponse`\<`T`\>\>

Defined in: [modules/base.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L19)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### params

`ListParams` = `{}`

#### Returns

`Promise`\<`PaginatedResponse`\<`T`\>\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makeListRequest`](BaseModule.md#makelistrequest)

***

### makeGetRequest()

> `protected` **makeGetRequest**\<`T`\>(`endpoint`): `Promise`\<`T`\>

Defined in: [modules/base.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L27)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makeGetRequest`](BaseModule.md#makegetrequest)

***

### makePostRequest()

> `protected` **makePostRequest**\<`T`\>(`endpoint`, `body`): `Promise`\<`T`\>

Defined in: [modules/base.ts:32](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L32)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body

`unknown`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makePostRequest`](BaseModule.md#makepostrequest)

***

### makePutRequest()

> `protected` **makePutRequest**\<`T`\>(`endpoint`, `body`): `Promise`\<`T`\>

Defined in: [modules/base.ts:37](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L37)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### body

`unknown`

#### Returns

`Promise`\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makePutRequest`](BaseModule.md#makeputrequest)

***

### makeDeleteRequest()

> `protected` **makeDeleteRequest**(`endpoint`): `Promise`\<`void`\>

Defined in: [modules/base.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L42)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`makeDeleteRequest`](BaseModule.md#makedeleterequest)

***

### createPaginator()

> `protected` **createPaginator**\<`T`\>(`endpoint`, `baseParams`, `options`): [`CursorPaginator`](CursorPaginator.md)\<`T`\>

Defined in: [modules/base.ts:46](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L46)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### baseParams

`Record`\<`string`, `unknown`\> = `{}`

##### options

[`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<`T`\>

#### Inherited from

[`BaseModule`](BaseModule.md).[`createPaginator`](BaseModule.md#createpaginator)

## Properties

### client

> `protected` **client**: [`HttpClient`](HttpClient.md)

Defined in: [modules/base.ts:6](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L6)

#### Inherited from

[`BaseModule`](BaseModule.md).[`client`](BaseModule.md#client)

***

### baseEndpoint

> `protected` **baseEndpoint**: `string`

Defined in: [modules/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L7)

#### Inherited from

[`BaseModule`](BaseModule.md).[`baseEndpoint`](BaseModule.md#baseendpoint)
