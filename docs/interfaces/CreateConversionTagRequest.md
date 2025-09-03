[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / CreateConversionTagRequest

# Interface: CreateConversionTagRequest

Defined in: [types/conversion-tracking.ts:57](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L57)

## Properties

### name

> **name**: `string`

Defined in: [types/conversion-tracking.ts:59](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L59)

Tag name

***

### tag\_type

> **tag\_type**: [`ConversionTrackingTagType`](../enumerations/ConversionTrackingTagType.md)

Defined in: [types/conversion-tracking.ts:61](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L61)

Tag type

***

### click\_attribution\_window?

> `optional` **click\_attribution\_window**: [`AttributionWindow`](../enumerations/AttributionWindow.md)

Defined in: [types/conversion-tracking.ts:63](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L63)

Click attribution window (optional, defaults to THIRTY_DAYS)

***

### view\_attribution\_window?

> `optional` **view\_attribution\_window**: [`AttributionWindow`](../enumerations/AttributionWindow.md)

Defined in: [types/conversion-tracking.ts:65](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L65)

View attribution window (optional, defaults to ONE_DAY)

***

### attribution\_model?

> `optional` **attribution\_model**: [`ConversionAttribution`](../enumerations/ConversionAttribution.md)

Defined in: [types/conversion-tracking.ts:67](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L67)

Attribution model (optional, defaults to LAST_TOUCH)

***

### app\_event\_provider?

> `optional` **app\_event\_provider**: `string`

Defined in: [types/conversion-tracking.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L69)

App event provider (required for mobile tags)

***

### app\_event\_name?

> `optional` **app\_event\_name**: `string`

Defined in: [types/conversion-tracking.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/conversion-tracking.ts#L71)

App event name (required for mobile tags)
