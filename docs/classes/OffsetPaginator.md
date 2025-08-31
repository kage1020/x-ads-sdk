[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / OffsetPaginator

# Class: OffsetPaginator\<T\>

Defined in: [paginators/index.ts:83](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L83)

## Type Parameters

### T

`T`

## Implements

- `AsyncIterable`\<`T`[]\>

## Constructors

### Constructor

> **new OffsetPaginator**\<`T`\>(`fetcher`, `options`): `OffsetPaginator`\<`T`\>

Defined in: [paginators/index.ts:88](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L88)

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

Defined in: [paginators/index.ts:114](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L114)

#### Returns

`AsyncIterableIterator`\<`T`\>

***

### all()

> **all**(): `Promise`\<`T`[]\>

Defined in: [paginators/index.ts:122](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L122)

#### Returns

`Promise`\<`T`[]\>

***

### shouldContinue()

> `private` **shouldContinue**(): `boolean`

Defined in: [paginators/index.ts:130](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L130)

#### Returns

`boolean`

***

### reset()

> **reset**(): `void`

Defined in: [paginators/index.ts:137](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L137)

#### Returns

`void`

## Properties

### currentOffset

> `private` **currentOffset**: `number` = `0`

Defined in: [paginators/index.ts:84](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L84)

***

### hasMore

> `private` **hasMore**: `boolean` = `true`

Defined in: [paginators/index.ts:85](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L85)

***

### totalFetched

> `private` **totalFetched**: `number` = `0`

Defined in: [paginators/index.ts:86](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L86)

***

### fetcher()

> `private` **fetcher**: (`offset`, `limit?`) => `Promise`\<\{ `data`: `T`[]; `total_count?`: `number`; \}\>

Defined in: [paginators/index.ts:89](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L89)

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
