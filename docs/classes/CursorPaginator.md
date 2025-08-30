[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / CursorPaginator

# Class: CursorPaginator\<T\>

Defined in: paginators/index.ts:13

## Type Parameters

### T

`T`

## Implements

- `AsyncIterable`\<`T`[]\>

## Constructors

### Constructor

> **new CursorPaginator**\<`T`\>(`fetcher`, `options`): `CursorPaginator`\<`T`\>

Defined in: paginators/index.ts:18

#### Parameters

##### fetcher

(`cursor?`, `count?`) => `Promise`\<`CursorPaginatorResult`\<`T`\>\>

##### options

[`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

#### Returns

`CursorPaginator`\<`T`\>

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncIterator`\<`T`[]\>

Defined in: paginators/index.ts:23

#### Returns

`AsyncIterator`\<`T`[]\>

#### Implementation of

`AsyncIterable.[asyncIterator]`

***

### items()

> **items**(): `AsyncIterableIterator`\<`T`\>

Defined in: paginators/index.ts:42

#### Returns

`AsyncIterableIterator`\<`T`\>

***

### all()

> **all**(): `Promise`\<`T`[]\>

Defined in: paginators/index.ts:50

#### Returns

`Promise`\<`T`[]\>

***

### first()

> **first**(`count`): `Promise`\<`T`[]\>

Defined in: paginators/index.ts:58

#### Parameters

##### count

`number` = `1`

#### Returns

`Promise`\<`T`[]\>

***

### shouldContinue()

> `private` **shouldContinue**(): `boolean`

Defined in: paginators/index.ts:69

#### Returns

`boolean`

***

### reset()

> **reset**(): `void`

Defined in: paginators/index.ts:76

#### Returns

`void`

## Properties

### currentCursor?

> `private` `optional` **currentCursor**: `string`

Defined in: paginators/index.ts:14

***

### hasMore

> `private` **hasMore**: `boolean` = `true`

Defined in: paginators/index.ts:15

***

### totalFetched

> `private` **totalFetched**: `number` = `0`

Defined in: paginators/index.ts:16

***

### fetcher()

> `private` **fetcher**: (`cursor?`, `count?`) => `Promise`\<`CursorPaginatorResult`\<`T`\>\>

Defined in: paginators/index.ts:19

#### Parameters

##### cursor?

`string`

##### count?

`number`

#### Returns

`Promise`\<`CursorPaginatorResult`\<`T`\>\>

***

### options

> `private` **options**: [`PaginatorOptions`](../interfaces/PaginatorOptions.md) = `{}`

Defined in: paginators/index.ts:20
