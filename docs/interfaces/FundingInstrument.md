[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / FundingInstrument

# Interface: FundingInstrument

Defined in: [types/resources/funding-instrument.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L15)

## Properties

### id

> **id**: `string`

Defined in: [types/resources/funding-instrument.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L17)

Funding instrument ID

***

### type

> **type**: [`FundingInstrumentType`](../enumerations/FundingInstrumentType.md)

Defined in: [types/resources/funding-instrument.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L19)

Funding instrument type

***

### entity\_status

> **entity\_status**: [`FundingInstrumentEntityStatus`](../enumerations/FundingInstrumentEntityStatus.md)

Defined in: [types/resources/funding-instrument.ts:21](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L21)

Funding instrument entity status

***

### currency

> **currency**: `string`

Defined in: [types/resources/funding-instrument.ts:23](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L23)

Currency code

***

### description?

> `optional` **description**: `string`

Defined in: [types/resources/funding-instrument.ts:25](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L25)

Funding instrument description

***

### is\_default?

> `optional` **is\_default**: `boolean`

Defined in: [types/resources/funding-instrument.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L27)

Whether this is the account's default funding instrument

***

### credit\_remaining\_local\_micro?

> `optional` **credit\_remaining\_local\_micro**: `number`

Defined in: [types/resources/funding-instrument.ts:29](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L29)

Credit remaining in micros

***

### credit\_limit\_local\_micro?

> `optional` **credit\_limit\_local\_micro**: `number`

Defined in: [types/resources/funding-instrument.ts:31](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L31)

Credit limit in micros

***

### created\_at

> **created\_at**: `string`

Defined in: [types/resources/funding-instrument.ts:33](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L33)

Funding instrument creation time

***

### updated\_at

> **updated\_at**: `string`

Defined in: [types/resources/funding-instrument.ts:35](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L35)

Funding instrument last update time

***

### deleted?

> `optional` **deleted**: `boolean`

Defined in: [types/resources/funding-instrument.ts:37](https://github.com/kage1020/x-ads-sdk/blob/main/src/types/resources/funding-instrument.ts#L37)

Whether funding instrument is deleted
