[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / OffsetPaginator

# Class: OffsetPaginator\<T\>

Defined in: paginators/index.ts:83

## Type Parameters

### T

`T`

## Implements

- `AsyncIterable`\<`T`[]\>

## Constructors

### Constructor

> **new OffsetPaginator**\<`T`\>(`fetcher`, `options`): `OffsetPaginator`\<`T`\>

Defined in: paginators/index.ts:88

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

Defined in: paginators/index.ts:93

#### Returns

`AsyncIterator`\<`T`[]\>

#### Implementation of

`AsyncIterable.[asyncIterator]`

***

### items()

> **items**(): `AsyncIterableIterator`\<`T`\>

Defined in: paginators/index.ts:114

#### Returns

`AsyncIterableIterator`\<`T`\>

***

### all()

> **all**(): `Promise`\<`T`[]\>

Defined in: paginators/index.ts:122

#### Returns

`Promise`\<`T`[]\>

***

### shouldContinue()

> `private` **shouldContinue**(): `boolean`

Defined in: paginators/index.ts:130

#### Returns

`boolean`

***

### reset()

> **reset**(): `void`

Defined in: paginators/index.ts:137

#### Returns

`void`

## Properties

### currentOffset

> `private` **currentOffset**: `number` = `0`

Defined in: paginators/index.ts:84

***

### hasMore

> `private` **hasMore**: `boolean` = `true`

Defined in: paginators/index.ts:85

***

### totalFetched

> `private` **totalFetched**: `number` = `0`

Defined in: paginators/index.ts:86

***

### fetcher()

> `private` **fetcher**: (`offset`, `limit?`) => `Promise`\<\{ `data`: `T`[]; `total_count?`: `number`; \}\>

Defined in: paginators/index.ts:89

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

Defined in: paginators/index.ts:90
