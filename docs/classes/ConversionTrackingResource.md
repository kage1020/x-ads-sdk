[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / ConversionTrackingResource

# Class: ConversionTrackingResource

Defined in: [resources/conversion-tracking.ts:28](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L28)

Conversion Tracking resource class for managing conversion tags and events

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new ConversionTrackingResource**(`httpClient`): `ConversionTrackingResource`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`ConversionTrackingResource`

#### Inherited from

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

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

***

### getConversionTags()

> **getConversionTags**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:34](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L34)

Get all conversion tags for an account

#### Parameters

##### accountId

`string`

##### options?

###### conversion_tag_ids?

`string`[]

###### tag_types?

[`ConversionTrackingTagType`](../enumerations/ConversionTrackingTagType.md)[]

###### states?

[`ConversionTrackingTagState`](../enumerations/ConversionTrackingTagState.md)[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

[`ConversionTagSortField`](../type-aliases/ConversionTagSortField.md)

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

***

### getConversionTag()

> **getConversionTag**(`accountId`, `conversionTagId`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:84](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L84)

Get a specific conversion tag

#### Parameters

##### accountId

`string`

##### conversionTagId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### createConversionTag()

> **createConversionTag**(`accountId`, `tagData`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:101](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L101)

Create a new conversion tag

#### Parameters

##### accountId

`string`

##### tagData

[`CreateConversionTagRequest`](../interfaces/CreateConversionTagRequest.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### updateConversionTag()

> **updateConversionTag**(`accountId`, `conversionTagId`, `updates`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:119](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L119)

Update a conversion tag

#### Parameters

##### accountId

`string`

##### conversionTagId

`string`

##### updates

[`UpdateConversionTagRequest`](../interfaces/UpdateConversionTagRequest.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### deleteConversionTag()

> **deleteConversionTag**(`accountId`, `conversionTagId`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:138](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L138)

Delete a conversion tag

#### Parameters

##### accountId

`string`

##### conversionTagId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### submitConversionEvent()

> **submitConversionEvent**(`accountId`, `eventData`, `requestOptions?`): `Promise`\<\{ `success`: `boolean`; `event_id?`: `string`; \}\>

Defined in: [resources/conversion-tracking.ts:157](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L157)

Submit conversion events (server-to-server tracking)

#### Parameters

##### accountId

`string`

##### eventData

[`ConversionEventRequest`](../interfaces/ConversionEventRequest.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<\{ `success`: `boolean`; `event_id?`: `string`; \}\>

***

### submitConversionEventsBatch()

> **submitConversionEventsBatch**(`accountId`, `events`, `requestOptions?`): `Promise`\<\{ `success`: `boolean`; `processed_events`: `number`; `failed_events`: `number`; `event_ids?`: `string`[]; \}\>

Defined in: [resources/conversion-tracking.ts:175](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L175)

Submit multiple conversion events in batch

#### Parameters

##### accountId

`string`

##### events

[`ConversionEventRequest`](../interfaces/ConversionEventRequest.md)[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<\{ `success`: `boolean`; `processed_events`: `number`; `failed_events`: `number`; `event_ids?`: `string`[]; \}\>

***

### getWebConversionTags()

> **getWebConversionTags**(`accountId`, `requestOptions?`): `Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:205](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L205)

Get all web conversion tags

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

***

### getMobileAppConversionTags()

> **getMobileAppConversionTags**(`accountId`, `requestOptions?`): `Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:222](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L222)

Get all mobile app conversion tags

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

***

### getActiveConversionTags()

> **getActiveConversionTags**(`accountId`, `requestOptions?`): `Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:239](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L239)

Get all active conversion tags

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ConversionTagResponse`](../interfaces/ConversionTagResponse.md)\>

***

### pauseConversionTag()

> **pauseConversionTag**(`accountId`, `conversionTagId`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:255](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L255)

Pause a conversion tag

#### Parameters

##### accountId

`string`

##### conversionTagId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### resumeConversionTag()

> **resumeConversionTag**(`accountId`, `conversionTagId`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:273](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L273)

Resume a conversion tag

#### Parameters

##### accountId

`string`

##### conversionTagId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### createWebConversionTag()

> **createWebConversionTag**(`accountId`, `name`, `options?`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:291](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L291)

Create a web conversion tag

#### Parameters

##### accountId

`string`

##### name

`string`

##### options?

###### click_attribution_window?

[`AttributionWindow`](../enumerations/AttributionWindow.md)

###### view_attribution_window?

[`AttributionWindow`](../enumerations/AttributionWindow.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### createMobileAppConversionTag()

> **createMobileAppConversionTag**(`accountId`, `name`, `appEventProvider`, `appEventName`, `options?`, `requestOptions?`): `Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

Defined in: [resources/conversion-tracking.ts:312](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L312)

Create a mobile app conversion tag

#### Parameters

##### accountId

`string`

##### name

`string`

##### appEventProvider

`string`

##### appEventName

`string`

##### options?

###### click_attribution_window?

[`AttributionWindow`](../enumerations/AttributionWindow.md)

###### view_attribution_window?

[`AttributionWindow`](../enumerations/AttributionWindow.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleConversionTagResponse`](../interfaces/SingleConversionTagResponse.md)\>

***

### getConversionTagsSummary()

> **getConversionTagsSummary**(`accountId`, `requestOptions?`): `Promise`\<\{ `total_count`: `number`; `active_count`: `number`; `paused_count`: `number`; `web_tags_count`: `number`; `mobile_app_tags_count`: `number`; \}\>

Defined in: [resources/conversion-tracking.ts:337](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/conversion-tracking.ts#L337)

Get conversion tags summary

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<\{ `total_count`: `number`; `active_count`: `number`; `paused_count`: `number`; `web_tags_count`: `number`; `mobile_app_tags_count`: `number`; \}\>

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
