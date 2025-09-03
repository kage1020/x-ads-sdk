[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / LineItem

# Interface: LineItem

Defined in: [types/resources/line-item.ts:38](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L38)

## Properties

### id

> **id**: `string`

Defined in: [types/resources/line-item.ts:40](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L40)

Line item ID

***

### name?

> `optional` **name**: `string`

Defined in: [types/resources/line-item.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L42)

Line item name

***

### campaign\_id

> **campaign\_id**: `string`

Defined in: [types/resources/line-item.ts:44](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L44)

Associated campaign ID

***

### entity\_status

> **entity\_status**: [`LineItemEntityStatus`](../enumerations/LineItemEntityStatus.md)

Defined in: [types/resources/line-item.ts:46](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L46)

Line item entity status

***

### objective

> **objective**: [`LineItemObjective`](../enumerations/LineItemObjective.md)

Defined in: [types/resources/line-item.ts:48](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L48)

Line item objective

***

### product\_type

> **product\_type**: [`LineItemProductType`](../enumerations/LineItemProductType.md)

Defined in: [types/resources/line-item.ts:50](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L50)

Product type

***

### placements

> **placements**: [`LineItemPlacement`](../enumerations/LineItemPlacement.md)[]

Defined in: [types/resources/line-item.ts:52](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L52)

Placements

***

### bid\_type?

> `optional` **bid\_type**: [`LineItemBidType`](../enumerations/LineItemBidType.md)

Defined in: [types/resources/line-item.ts:54](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L54)

Bid type

***

### bid\_amount\_local\_micro?

> `optional` **bid\_amount\_local\_micro**: `number`

Defined in: [types/resources/line-item.ts:56](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L56)

Bid amount in micros

***

### target\_cpa\_local\_micro?

> `optional` **target\_cpa\_local\_micro**: `number`

Defined in: [types/resources/line-item.ts:58](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L58)

Target CPA amount in micros

***

### daily\_budget\_amount\_local\_micro?

> `optional` **daily\_budget\_amount\_local\_micro**: `number`

Defined in: [types/resources/line-item.ts:60](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L60)

Daily budget amount in micros

***

### total\_budget\_amount\_local\_micro?

> `optional` **total\_budget\_amount\_local\_micro**: `number`

Defined in: [types/resources/line-item.ts:62](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L62)

Total budget amount in micros

***

### automatically\_select\_bid?

> `optional` **automatically\_select\_bid**: `boolean`

Defined in: [types/resources/line-item.ts:64](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L64)

Whether this is automatically select bid

***

### created\_at

> **created\_at**: `string`

Defined in: [types/resources/line-item.ts:66](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L66)

Line item creation time

***

### updated\_at

> **updated\_at**: `string`

Defined in: [types/resources/line-item.ts:68](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L68)

Line item last update time

***

### deleted?

> `optional` **deleted**: `boolean`

Defined in: [types/resources/line-item.ts:70](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/line-item.ts#L70)

Whether line item is deleted
