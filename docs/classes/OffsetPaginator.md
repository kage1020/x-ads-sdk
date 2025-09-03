[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / OffsetPaginator

# Class: OffsetPaginator\<T\>

Defined in: [paginators/index.ts:80](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L80)

## Type Parameters

### T

`T`

## Implements

- `AsyncIterable`\<`T`[]\>

## Constructors

### Constructor

> **new OffsetPaginator**\<`T`\>(`fetcher`, `options`): `OffsetPaginator`\<`T`\>

Defined in: [paginators/index.ts:85](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L85)

#### Parameters

##### fetcher

(`offset`, `limit?`) => `Promise`\<\{ `data`: `T`[]; `total_count?`: `number`; \}\>

##### options

[`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

#### Returns

`OffsetPaginator`\<`T`\>

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncIterator`\<`T`[]\>

Defined in: [paginators/index.ts:93](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L93)

#### Returns

`AsyncIterator`\<`T`[]\>

#### Implementation of

`AsyncIterable.[asyncIterator]`

***

### items()

> **items**(): `AsyncIterableIterator`\<`T`\>

Defined in: [paginators/index.ts:111](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L111)

#### Returns

`AsyncIterableIterator`\<`T`\>

***

### all()

> **all**(): `Promise`\<`T`[]\>

Defined in: [paginators/index.ts:119](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L119)

#### Returns

`Promise`\<`T`[]\>

***

### shouldContinue()

> `private` **shouldContinue**(): `boolean`

Defined in: [paginators/index.ts:127](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L127)

#### Returns

`boolean`

***

### reset()

> **reset**(): `void`

Defined in: [paginators/index.ts:134](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L134)

#### Returns

`void`

## Properties

### currentOffset

> `private` **currentOffset**: `number` = `0`

Defined in: [paginators/index.ts:81](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L81)

***

### hasMore

> `private` **hasMore**: `boolean` = `true`

Defined in: [paginators/index.ts:82](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L82)

***

### totalFetched

> `private` **totalFetched**: `number` = `0`

Defined in: [paginators/index.ts:83](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L83)

***

### fetcher()

> `private` **fetcher**: (`offset`, `limit?`) => `Promise`\<\{ `data`: `T`[]; `total_count?`: `number`; \}\>

Defined in: [paginators/index.ts:86](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L86)

#### Parameters

##### offset

`number`

##### limit?

`number`

#### Returns

`Promise`\<\{ `data`: `T`[]; `total_count?`: `number`; \}\>

***

### options

> `private` **options**: [`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

Defined in: [paginators/index.ts:90](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L90)
