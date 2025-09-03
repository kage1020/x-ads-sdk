/**
 * X Ads Catalog Management API types
 * @see https://docs.x.com/x-ads-api/catalog-management
 */

/**
 * Product catalog status
 */
export type ProductCatalogStatus = 'ACTIVE' | 'PAUSED' | 'DELETED';

/**
 * Product status in catalog
 */
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

/**
 * Product set type
 */
export type ProductSetType = 'MANUAL' | 'FILTER';

/**
 * Product feed status
 */
export type ProductFeedStatus = 'ACTIVE' | 'PAUSED' | 'DELETED';

/**
 * Product feed format
 */
export type ProductFeedFormat = 'CSV' | 'TSV' | 'XML';

/**
 * Product availability status
 */
export type ProductAvailability =
  | 'IN_STOCK'
  | 'OUT_OF_STOCK'
  | 'PREORDER'
  | 'AVAILABLE_FOR_ORDER'
  | 'DISCONTINUED';

/**
 * Product condition
 */
export type ProductCondition = 'NEW' | 'REFURBISHED' | 'USED';

/**
 * Filter operator for product sets
 */
export type FilterOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'LESS_THAN_OR_EQUAL';

/**
 * Product catalog entity
 */
export interface ProductCatalog {
  id: string;
  id_str: string;
  account_id: string;
  name: string;
  description?: string;
  status: ProductCatalogStatus;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  product_count?: number;
  feed_count?: number;
}

/**
 * Product entity in catalog
 */
export interface Product {
  id: string;
  availability: ProductAvailability;
  condition: ProductCondition;
  description?: string;
  image_url?: string;
  link?: string;
  price?: string;
  sale_price?: string;
  title: string;
  brand?: string;
  google_product_category?: string;
  product_type?: string;
  custom_fields?: Record<string, string>;
  inventory?: number;
  currency?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Product set entity
 */
export interface ProductSet {
  id: string;
  id_str: string;
  name: string;
  description?: string;
  product_catalog_id: string;
  type: ProductSetType;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  product_count?: number;
  filter_rules?: ProductSetFilter[];
  product_ids?: string[];
}

/**
 * Product set filter rule
 */
export interface ProductSetFilter {
  field: string;
  operator: FilterOperator;
  value: string | number;
}

/**
 * Product feed entity
 */
export interface ProductFeed {
  id: string;
  id_str: string;
  name: string;
  url: string;
  format: ProductFeedFormat;
  status: ProductFeedStatus;
  product_catalog_id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  last_upload_at?: string;
  schedule?: string;
  timezone?: string;
  error_message?: string;
}

/**
 * Product catalog response
 */
export interface ProductCatalogResponse {
  data: ProductCatalog;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product catalogs list response
 */
export interface ProductCatalogsResponse {
  data: ProductCatalog[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product response
 */
export interface ProductResponse {
  data: Product;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Products list response
 */
export interface ProductsResponse {
  data: Product[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product set response
 */
export interface ProductSetResponse {
  data: ProductSet;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product sets list response
 */
export interface ProductSetsResponse {
  data: ProductSet[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product feed response
 */
export interface ProductFeedResponse {
  data: ProductFeed;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product feeds list response
 */
export interface ProductFeedsResponse {
  data: ProductFeed[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product catalog creation options
 */
export interface CreateProductCatalogOptions {
  name: string;
  description?: string;
}

/**
 * Product catalog update options
 */
export interface UpdateProductCatalogOptions {
  name?: string;
  description?: string;
  status?: ProductCatalogStatus;
}

/**
 * Product creation/update data
 */
export interface ProductData {
  id: string;
  availability: ProductAvailability;
  condition: ProductCondition;
  description?: string;
  image_url?: string;
  link?: string;
  price?: string;
  sale_price?: string;
  title: string;
  brand?: string;
  google_product_category?: string;
  product_type?: string;
  custom_fields?: Record<string, string>;
  inventory?: number;
  currency?: string;
}

/**
 * Batch products operation options
 */
export interface BatchProductsOptions {
  products: ProductData[];
}

/**
 * Product set creation options
 */
export interface CreateProductSetOptions {
  name: string;
  description?: string;
  type: ProductSetType;
  filter_rules?: ProductSetFilter[];
  product_ids?: string[];
}

/**
 * Product set update options
 */
export interface UpdateProductSetOptions {
  name?: string;
  description?: string;
  filter_rules?: ProductSetFilter[];
  product_ids?: string[];
}

/**
 * Product feed creation options
 */
export interface CreateProductFeedOptions {
  name: string;
  url: string;
  format: ProductFeedFormat;
  schedule?: string;
  timezone?: string;
}

/**
 * Product feed update options
 */
export interface UpdateProductFeedOptions {
  name?: string;
  url?: string;
  format?: ProductFeedFormat;
  status?: ProductFeedStatus;
  schedule?: string;
  timezone?: string;
}

/**
 * Batch products operation response
 */
export interface BatchProductsResponse {
  data: {
    success_count: number;
    error_count: number;
    errors?: Array<{
      product_id: string;
      error_message: string;
    }>;
  };
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Product deletion options
 */
export interface DeleteProductsOptions {
  product_ids: string[];
}

/**
 * Product deletion response
 */
export interface DeleteProductsResponse {
  data: {
    success_count: number;
    error_count: number;
    errors?: Array<{
      product_id: string;
      error_message: string;
    }>;
  };
  request: {
    params: Record<string, unknown>;
  };
}
