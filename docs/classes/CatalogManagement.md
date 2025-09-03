[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / CatalogManagement

# Class: CatalogManagement

Defined in: resources/catalog.ts:31

Catalog Management resource class

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new CatalogManagement**(`httpClient`): `CatalogManagement`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`CatalogManagement`

#### Inherited from

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### getApiVersionPath()

> `protected` **getApiVersionPath**(): `string`

Defined in: [resources/base.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L17)

Get the current API version path from the HTTP client

#### Returns

`string`

API version path (e.g., '/12')

#### Inherited from

[`BaseResource`](BaseResource.md).[`getApiVersionPath`](BaseResource.md#getapiversionpath)

***

### buildEndpoint()

> `protected` **buildEndpoint**(`path`): `string`

Defined in: [resources/base.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L26)

Build endpoint with current API version

#### Parameters

##### path

`string`

API path without version

#### Returns

`string`

Complete endpoint with API version

#### Inherited from

[`BaseResource`](BaseResource.md).[`buildEndpoint`](BaseResource.md#buildendpoint)

***

### getProductCatalogs()

> **getProductCatalogs**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`ProductCatalogsResponse`](../interfaces/ProductCatalogsResponse.md)\>

Defined in: resources/catalog.ts:37

Get all product catalogs for an account

#### Parameters

##### accountId

`string`

##### options?

###### product_catalog_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductCatalogsResponse`](../interfaces/ProductCatalogsResponse.md)\>

***

### getProductCatalog()

> **getProductCatalog**(`accountId`, `catalogId`, `requestOptions?`): `Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

Defined in: resources/catalog.ts:79

Get a specific product catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

***

### createProductCatalog()

> **createProductCatalog**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

Defined in: resources/catalog.ts:96

Create a new product catalog

#### Parameters

##### accountId

`string`

##### options

[`CreateProductCatalogOptions`](../interfaces/CreateProductCatalogOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

***

### updateProductCatalog()

> **updateProductCatalog**(`accountId`, `catalogId`, `options`, `requestOptions?`): `Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

Defined in: resources/catalog.ts:119

Update a product catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options

[`UpdateProductCatalogOptions`](../interfaces/UpdateProductCatalogOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

***

### deleteProductCatalog()

> **deleteProductCatalog**(`accountId`, `catalogId`, `requestOptions?`): `Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

Defined in: resources/catalog.ts:150

Delete a product catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductCatalogResponse`](../interfaces/ProductCatalogResponse.md)\>

***

### getProducts()

> **getProducts**(`accountId`, `catalogId`, `options?`, `requestOptions?`): `Promise`\<[`ProductsResponse`](../interfaces/ProductsResponse.md)\>

Defined in: resources/catalog.ts:169

Get all products for a catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options?

###### product_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductsResponse`](../interfaces/ProductsResponse.md)\>

***

### batchUpdateProducts()

> **batchUpdateProducts**(`accountId`, `catalogId`, `options`, `requestOptions?`): `Promise`\<[`BatchProductsResponse`](../interfaces/BatchProductsResponse.md)\>

Defined in: resources/catalog.ts:208

Create or update products in batch

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options

[`BatchProductsOptions`](../interfaces/BatchProductsOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`BatchProductsResponse`](../interfaces/BatchProductsResponse.md)\>

***

### deleteProducts()

> **deleteProducts**(`accountId`, `catalogId`, `options`, `requestOptions?`): `Promise`\<[`DeleteProductsResponse`](../interfaces/DeleteProductsResponse.md)\>

Defined in: resources/catalog.ts:231

Delete products from catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options

[`DeleteProductsOptions`](../interfaces/DeleteProductsOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DeleteProductsResponse`](../interfaces/DeleteProductsResponse.md)\>

***

### getProductSets()

> **getProductSets**(`accountId`, `catalogId`, `options?`, `requestOptions?`): `Promise`\<[`ProductSetsResponse`](../interfaces/ProductSetsResponse.md)\>

Defined in: resources/catalog.ts:256

Get all product sets for a catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options?

###### product_set_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetsResponse`](../interfaces/ProductSetsResponse.md)\>

***

### getProductSet()

> **getProductSet**(`accountId`, `catalogId`, `productSetId`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:299

Get a specific product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### productSetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### createProductSet()

> **createProductSet**(`accountId`, `catalogId`, `options`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:317

Create a new product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options

[`CreateProductSetOptions`](../interfaces/CreateProductSetOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### updateProductSet()

> **updateProductSet**(`accountId`, `catalogId`, `productSetId`, `options`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:344

Update a product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### productSetId

`string`

##### options

[`UpdateProductSetOptions`](../interfaces/UpdateProductSetOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### deleteProductSet()

> **deleteProductSet**(`accountId`, `catalogId`, `productSetId`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:379

Delete a product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### productSetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### getProductFeeds()

> **getProductFeeds**(`accountId`, `catalogId`, `options?`, `requestOptions?`): `Promise`\<[`ProductFeedsResponse`](../interfaces/ProductFeedsResponse.md)\>

Defined in: resources/catalog.ts:399

Get all product feeds for a catalog

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options?

###### product_feed_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedsResponse`](../interfaces/ProductFeedsResponse.md)\>

***

### getProductFeed()

> **getProductFeed**(`accountId`, `catalogId`, `feedId`, `requestOptions?`): `Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

Defined in: resources/catalog.ts:442

Get a specific product feed

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### feedId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

***

### createProductFeed()

> **createProductFeed**(`accountId`, `catalogId`, `options`, `requestOptions?`): `Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

Defined in: resources/catalog.ts:460

Create a new product feed

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### options

[`CreateProductFeedOptions`](../interfaces/CreateProductFeedOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

***

### updateProductFeed()

> **updateProductFeed**(`accountId`, `catalogId`, `feedId`, `options`, `requestOptions?`): `Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

Defined in: resources/catalog.ts:487

Update a product feed

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### feedId

`string`

##### options

[`UpdateProductFeedOptions`](../interfaces/UpdateProductFeedOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

***

### deleteProductFeed()

> **deleteProductFeed**(`accountId`, `catalogId`, `feedId`, `requestOptions?`): `Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

Defined in: resources/catalog.ts:528

Delete a product feed

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### feedId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

***

### createManualProductSet()

> **createManualProductSet**(`accountId`, `catalogId`, `name`, `productIds`, `description?`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:548

Create a manual product set with specific product IDs

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### name

`string`

##### productIds

`string`[]

##### description?

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### createFilterProductSet()

> **createFilterProductSet**(`accountId`, `catalogId`, `name`, `filterRules`, `description?`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:572

Create a filter-based product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### name

`string`

##### filterRules

[`ProductSetFilter`](../interfaces/ProductSetFilter.md)[]

##### description?

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### addProductsToSet()

> **addProductsToSet**(`accountId`, `catalogId`, `productSetId`, `productIds`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:596

Add products to a manual product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### productSetId

`string`

##### productIds

`string`[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### removeProductsFromSet()

> **removeProductsFromSet**(`accountId`, `catalogId`, `productSetId`, `productIds`, `requestOptions?`): `Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

Defined in: resources/catalog.ts:624

Remove products from a manual product set

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### productSetId

`string`

##### productIds

`string`[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductSetResponse`](../interfaces/ProductSetResponse.md)\>

***

### createDailyScheduledFeed()

> **createDailyScheduledFeed**(`accountId`, `catalogId`, `name`, `url`, `format`, `timezone`, `requestOptions?`): `Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

Defined in: resources/catalog.ts:652

Create a daily scheduled feed

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### name

`string`

##### url

`string`

##### format

`"CSV"` | `"TSV"` | `"XML"`

##### timezone

`string` = `'UTC'`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

***

### createWeeklyScheduledFeed()

> **createWeeklyScheduledFeed**(`accountId`, `catalogId`, `name`, `url`, `format`, `dayOfWeek`, `timezone`, `requestOptions?`): `Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

Defined in: resources/catalog.ts:678

Create a weekly scheduled feed

#### Parameters

##### accountId

`string`

##### catalogId

`string`

##### name

`string`

##### url

`string`

##### format

`"CSV"` | `"TSV"` | `"XML"`

##### dayOfWeek

`number` = `1`

##### timezone

`string` = `'UTC'`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ProductFeedResponse`](../interfaces/ProductFeedResponse.md)\>

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
