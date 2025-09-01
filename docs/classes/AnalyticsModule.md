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

> **getAnalytics**(`accountId`, `options`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L21)

Get analytics data for entities

#### Parameters

##### accountId

`string`

##### options

[`AnalyticsOptions`](../interfaces/AnalyticsOptions.md)

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getCampaignAnalytics()

> **getCampaignAnalytics**(`accountId`, `campaignIds`, `dateRange`, `options`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:43](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L43)

Get campaign analytics

#### Parameters

##### accountId

`string`

##### campaignIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### options

`Partial`\<[`AnalyticsOptions`](../interfaces/AnalyticsOptions.md)\> = `{}`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getAdGroupAnalytics()

> **getAdGroupAnalytics**(`accountId`, `adGroupIds`, `dateRange`, `options`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L60)

Get ad group (line item) analytics

#### Parameters

##### accountId

`string`

##### adGroupIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### options

`Partial`\<[`AnalyticsOptions`](../interfaces/AnalyticsOptions.md)\> = `{}`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getAccountAnalytics()

> **getAccountAnalytics**(`accountId`, `dateRange`, `options`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:77](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L77)

Get account-level analytics

#### Parameters

##### accountId

`string`

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### options

`Partial`\<[`AnalyticsOptions`](../interfaces/AnalyticsOptions.md)\> = `{}`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getEngagementAnalytics()

> **getEngagementAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:93](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L93)

Get analytics with engagement metrics

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### granularity

[`Granularity`](../enumerations/Granularity.md) = `Granularity.TOTAL`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getBillingAnalytics()

> **getBillingAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:112](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L112)

Get analytics with billing metrics

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### granularity

[`Granularity`](../enumerations/Granularity.md) = `Granularity.TOTAL`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getVideoAnalytics()

> **getVideoAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:131](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L131)

Get analytics with video metrics

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### granularity

[`Granularity`](../enumerations/Granularity.md) = `Granularity.TOTAL`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getComprehensiveAnalytics()

> **getComprehensiveAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `granularity`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:150](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L150)

Get comprehensive analytics with all metric groups

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### granularity

[`Granularity`](../enumerations/Granularity.md) = `Granularity.TOTAL`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getDailyAnalytics()

> **getDailyAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `metricGroups`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:169](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L169)

Get analytics for a specific date range with daily granularity

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getHourlyAnalytics()

> **getHourlyAnalytics**(`accountId`, `entityType`, `entityIds`, `dateRange`, `metricGroups`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:188](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L188)

Get analytics for a specific date range with hourly granularity

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### dateRange

[`DateRange`](../interfaces/DateRange.md)

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### createDateRange()

> `static` **createDateRange**(`days`): [`DateRange`](../interfaces/DateRange.md)

Defined in: [modules/analytics.ts:207](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L207)

Create date range for common periods

#### Parameters

##### days

`number`

#### Returns

[`DateRange`](../interfaces/DateRange.md)

***

### getLastWeekAnalytics()

> **getLastWeekAnalytics**(`accountId`, `entityType`, `entityIds`, `metricGroups`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:221](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L221)

Get analytics for the last 7 days

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

***

### getLastMonthAnalytics()

> **getLastMonthAnalytics**(`accountId`, `entityType`, `entityIds`, `metricGroups`): `Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

Defined in: [modules/analytics.ts:239](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/analytics.ts#L239)

Get analytics for the last 30 days

#### Parameters

##### accountId

`string`

##### entityType

[`EntityType`](../enumerations/EntityType.md)

##### entityIds

`string`[]

##### metricGroups

`string`[] = `...`

#### Returns

`Promise`\<[`AnalyticsResponse`](../interfaces/AnalyticsResponse.md)\>

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

> `protected` **makeListRequest**\<`T`\>(`endpoint`, `params`): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<`T`\>\>

Defined in: [modules/base.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/modules/base.ts#L19)

#### Type Parameters

##### T

`T`

#### Parameters

##### endpoint

`string`

##### params

[`ListParams`](../interfaces/ListParams.md) = `{}`

#### Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<`T`\>\>

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
