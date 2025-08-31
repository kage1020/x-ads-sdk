[**X Ads SDK v1.0.0**](../README.md)

***

[X Ads SDK](../globals.md) / CursorPaginator

# Class: CursorPaginator\<T\>

Defined in: [paginators/index.ts:13](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L13)

## Type Parameters

### T

`T`

## Implements

- `AsyncIterable`\<`T`[]\>

## Constructors

### Constructor

> **new CursorPaginator**\<`T`\>(`fetcher`, `options`): `CursorPaginator`\<`T`\>

Defined in: [paginators/index.ts:18](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L18)

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

Defined in: [paginators/index.ts:23](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L23)

#### Returns

`AsyncIterator`\<`T`[]\>

#### Implementation of

`AsyncIterable.[asyncIterator]`

***

### items()

> **items**(): `AsyncIterableIterator`\<`T`\>

Defined in: [paginators/index.ts:42](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L42)

#### Returns

`AsyncIterableIterator`\<`T`\>

***

### all()

> **all**(): `Promise`\<`T`[]\>

Defined in: [paginators/index.ts:50](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L50)

#### Returns

`Promise`\<`T`[]\>

***

### first()

> **first**(`count`): `Promise`\<`T`[]\>

Defined in: [paginators/index.ts:58](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L58)

#### Parameters

##### count

`number` = `1`

#### Returns

`Promise`\<`T`[]\>

***

### shouldContinue()

> `private` **shouldContinue**(): `boolean`

Defined in: [paginators/index.ts:69](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L69)

#### Returns

`boolean`

***

### reset()

> **reset**(): `void`

Defined in: [paginators/index.ts:76](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L76)

#### Returns

`void`

## Properties

### currentCursor?

> `private` `optional` **currentCursor**: `string`

Defined in: [paginators/index.ts:14](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L14)

***

### hasMore

> `private` **hasMore**: `boolean` = `true`

Defined in: [paginators/index.ts:15](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L15)

***

### totalFetched

> `private` **totalFetched**: `number` = `0`

Defined in: [paginators/index.ts:16](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L16)

***

### fetcher()

> `private` **fetcher**: (`cursor?`, `count?`) => `Promise`\<`CursorPaginatorResult`\<`T`\>\>

Defined in: [paginators/index.ts:19](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L19)

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

Defined in: [paginators/index.ts:20](https://github.com/kage1020/x-ads-sdk/blob/main/src/paginators/index.ts#L20)
