[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / LineItemCreateRequest

# Interface: LineItemCreateRequest

Defined in: types/resources/line-item.ts:73

## Properties

### name?

> `optional` **name**: `string`

Defined in: types/resources/line-item.ts:75

Line item name

***

### campaign\_id

> **campaign\_id**: `string`

Defined in: types/resources/line-item.ts:77

Associated campaign ID

***

### objective

> **objective**: [`LineItemObjective`](../enumerations/LineItemObjective.md)

Defined in: types/resources/line-item.ts:79

Line item objective

***

### product\_type

> **product\_type**: [`LineItemProductType`](../enumerations/LineItemProductType.md)

Defined in: types/resources/line-item.ts:81

Product type

***

### placements

> **placements**: [`LineItemPlacement`](../enumerations/LineItemPlacement.md)[]

Defined in: types/resources/line-item.ts:83

Placements

***

### entity\_status?

> `optional` **entity\_status**: [`LineItemEntityStatus`](../enumerations/LineItemEntityStatus.md)

Defined in: types/resources/line-item.ts:85

Line item entity status

***

### bid\_type?

> `optional` **bid\_type**: [`LineItemBidType`](../enumerations/LineItemBidType.md)

Defined in: types/resources/line-item.ts:87

Bid type

***

### bid\_amount\_local\_micro?

> `optional` **bid\_amount\_local\_micro**: `number`

Defined in: types/resources/line-item.ts:89

Bid amount in micros

***

### target\_cpa\_local\_micro?

> `optional` **target\_cpa\_local\_micro**: `number`

Defined in: types/resources/line-item.ts:91

Target CPA amount in micros

***

### daily\_budget\_amount\_local\_micro?

> `optional` **daily\_budget\_amount\_local\_micro**: `number`

Defined in: types/resources/line-item.ts:93

Daily budget amount in micros

***

### total\_budget\_amount\_local\_micro?

> `optional` **total\_budget\_amount\_local\_micro**: `number`

Defined in: types/resources/line-item.ts:95

Total budget amount in micros

***

### automatically\_select\_bid?

> `optional` **automatically\_select\_bid**: `boolean`

Defined in: types/resources/line-item.ts:97

Whether this is automatically select bid
