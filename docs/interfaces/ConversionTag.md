[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / ConversionTag

# Interface: ConversionTag

Defined in: [types/conversion-tracking.ts:28](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L28)

## Properties

### id

> **id**: `string`

Defined in: [types/conversion-tracking.ts:30](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L30)

Conversion tag ID

***

### name

> **name**: `string`

Defined in: [types/conversion-tracking.ts:32](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L32)

Conversion tag name

***

### tag\_type

> **tag\_type**: [`ConversionTrackingTagType`](../enumerations/ConversionTrackingTagType.md)

Defined in: [types/conversion-tracking.ts:34](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L34)

Tag type (Web or Mobile App)

***

### state

> **state**: [`ConversionTrackingTagState`](../enumerations/ConversionTrackingTagState.md)

Defined in: [types/conversion-tracking.ts:36](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L36)

Current state of the tag

***

### click\_attribution\_window

> **click\_attribution\_window**: [`AttributionWindow`](../enumerations/AttributionWindow.md)

Defined in: [types/conversion-tracking.ts:38](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L38)

Click attribution window

***

### view\_attribution\_window

> **view\_attribution\_window**: [`AttributionWindow`](../enumerations/AttributionWindow.md)

Defined in: [types/conversion-tracking.ts:40](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L40)

View attribution window

***

### attribution\_model

> **attribution\_model**: [`ConversionAttribution`](../enumerations/ConversionAttribution.md)

Defined in: [types/conversion-tracking.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L42)

Conversion attribution model

***

### created\_at

> **created\_at**: `string`

Defined in: [types/conversion-tracking.ts:44](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L44)

Tag creation time

***

### updated\_at

> **updated\_at**: `string`

Defined in: [types/conversion-tracking.ts:46](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L46)

Tag last update time

***

### deleted?

> `optional` **deleted**: `boolean`

Defined in: [types/conversion-tracking.ts:48](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L48)

Whether tag is deleted

***

### pixel\_code?

> `optional` **pixel\_code**: `string`

Defined in: [types/conversion-tracking.ts:50](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L50)

Tag pixel code (for web tags)

***

### app\_event\_provider?

> `optional` **app\_event\_provider**: `string`

Defined in: [types/conversion-tracking.ts:52](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L52)

App event provider (for mobile tags)

***

### app\_event\_name?

> `optional` **app\_event\_name**: `string`

Defined in: [types/conversion-tracking.ts:54](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L54)

App event name (for mobile tags)
