/**
 * Catalog Management resource for X Ads API
 */

import type { RequestOptions } from '../types/auth.js';
import type {
  BatchProductsOptions,
  BatchProductsResponse,
  CreateProductCatalogOptions,
  CreateProductFeedOptions,
  CreateProductSetOptions,
  DeleteProductsOptions,
  DeleteProductsResponse,
  ProductCatalogResponse,
  ProductCatalogsResponse,
  ProductFeedResponse,
  ProductFeedsResponse,
  ProductSetFilter,
  ProductSetResponse,
  ProductSetsResponse,
  ProductsResponse,
  UpdateProductCatalogOptions,
  UpdateProductFeedOptions,
  UpdateProductSetOptions,
} from '../types/catalog.js';
import { BaseResource } from './base.js';

/**
 * Catalog Management resource class
 */
export class CatalogManagement extends BaseResource {
  // Product Catalog Management

  /**
   * Get all product catalogs for an account
   */
  async getProductCatalogs(
    accountId: string,
    options?: {
      product_catalog_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<ProductCatalogsResponse> {
    const params: Record<string, string> = {};

    if (options?.product_catalog_ids) {
      params.product_catalog_ids = options.product_catalog_ids.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductCatalogsResponse>(requestConfig);
  }

  /**
   * Get a specific product catalog
   */
  async getProductCatalog(
    accountId: string,
    catalogId: string,
    requestOptions?: RequestOptions
  ): Promise<ProductCatalogResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ProductCatalogResponse>(requestConfig);
  }

  /**
   * Create a new product catalog
   */
  async createProductCatalog(
    accountId: string,
    options: CreateProductCatalogOptions,
    requestOptions?: RequestOptions
  ): Promise<ProductCatalogResponse> {
    const params = {
      name: options.name,
      ...(options.description && { description: options.description }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductCatalogResponse>(requestConfig);
  }

  /**
   * Update a product catalog
   */
  async updateProductCatalog(
    accountId: string,
    catalogId: string,
    options: UpdateProductCatalogOptions,
    requestOptions?: RequestOptions
  ): Promise<ProductCatalogResponse> {
    const params: Record<string, unknown> = {};

    if (options.name) {
      params.name = options.name;
    }
    if (options.description) {
      params.description = options.description;
    }
    if (options.status) {
      params.status = options.status;
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductCatalogResponse>(requestConfig);
  }

  /**
   * Delete a product catalog
   */
  async deleteProductCatalog(
    accountId: string,
    catalogId: string,
    requestOptions?: RequestOptions
  ): Promise<ProductCatalogResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ProductCatalogResponse>(requestConfig);
  }

  // Product Management

  /**
   * Get all products for a catalog
   */
  async getProducts(
    accountId: string,
    catalogId: string,
    options?: {
      product_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
    },
    requestOptions?: RequestOptions
  ): Promise<ProductsResponse> {
    const params: Record<string, string> = {};

    if (options?.product_ids) {
      params.product_ids = options.product_ids.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/products`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductsResponse>(requestConfig);
  }

  /**
   * Create or update products in batch
   */
  async batchUpdateProducts(
    accountId: string,
    catalogId: string,
    options: BatchProductsOptions,
    requestOptions?: RequestOptions
  ): Promise<BatchProductsResponse> {
    const params = {
      products: JSON.stringify(options.products),
    };

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/products`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<BatchProductsResponse>(requestConfig);
  }

  /**
   * Delete products from catalog
   */
  async deleteProducts(
    accountId: string,
    catalogId: string,
    options: DeleteProductsOptions,
    requestOptions?: RequestOptions
  ): Promise<DeleteProductsResponse> {
    const params = {
      product_ids: options.product_ids.join(','),
    };

    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/products`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DeleteProductsResponse>(requestConfig);
  }

  // Product Set Management

  /**
   * Get all product sets for a catalog
   */
  async getProductSets(
    accountId: string,
    catalogId: string,
    options?: {
      product_set_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<ProductSetsResponse> {
    const params: Record<string, string> = {};

    if (options?.product_set_ids) {
      params.product_set_ids = options.product_set_ids.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_sets`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductSetsResponse>(requestConfig);
  }

  /**
   * Get a specific product set
   */
  async getProductSet(
    accountId: string,
    catalogId: string,
    productSetId: string,
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_sets/${productSetId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ProductSetResponse>(requestConfig);
  }

  /**
   * Create a new product set
   */
  async createProductSet(
    accountId: string,
    catalogId: string,
    options: CreateProductSetOptions,
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    const params = {
      name: options.name,
      type: options.type,
      ...(options.description && { description: options.description }),
      ...(options.filter_rules && { filter_rules: JSON.stringify(options.filter_rules) }),
      ...(options.product_ids && { product_ids: options.product_ids.join(',') }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_sets`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductSetResponse>(requestConfig);
  }

  /**
   * Update a product set
   */
  async updateProductSet(
    accountId: string,
    catalogId: string,
    productSetId: string,
    options: UpdateProductSetOptions,
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    const params: Record<string, unknown> = {};

    if (options.name) {
      params.name = options.name;
    }
    if (options.description) {
      params.description = options.description;
    }
    if (options.filter_rules) {
      params.filter_rules = JSON.stringify(options.filter_rules);
    }
    if (options.product_ids) {
      params.product_ids = options.product_ids.join(',');
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_sets/${productSetId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductSetResponse>(requestConfig);
  }

  /**
   * Delete a product set
   */
  async deleteProductSet(
    accountId: string,
    catalogId: string,
    productSetId: string,
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_sets/${productSetId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ProductSetResponse>(requestConfig);
  }

  // Product Feed Management

  /**
   * Get all product feeds for a catalog
   */
  async getProductFeeds(
    accountId: string,
    catalogId: string,
    options?: {
      product_feed_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<ProductFeedsResponse> {
    const params: Record<string, string> = {};

    if (options?.product_feed_ids) {
      params.product_feed_ids = options.product_feed_ids.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_feeds`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductFeedsResponse>(requestConfig);
  }

  /**
   * Get a specific product feed
   */
  async getProductFeed(
    accountId: string,
    catalogId: string,
    feedId: string,
    requestOptions?: RequestOptions
  ): Promise<ProductFeedResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_feeds/${feedId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ProductFeedResponse>(requestConfig);
  }

  /**
   * Create a new product feed
   */
  async createProductFeed(
    accountId: string,
    catalogId: string,
    options: CreateProductFeedOptions,
    requestOptions?: RequestOptions
  ): Promise<ProductFeedResponse> {
    const params = {
      name: options.name,
      url: options.url,
      format: options.format,
      ...(options.schedule && { schedule: options.schedule }),
      ...(options.timezone && { timezone: options.timezone }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_feeds`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductFeedResponse>(requestConfig);
  }

  /**
   * Update a product feed
   */
  async updateProductFeed(
    accountId: string,
    catalogId: string,
    feedId: string,
    options: UpdateProductFeedOptions,
    requestOptions?: RequestOptions
  ): Promise<ProductFeedResponse> {
    const params: Record<string, unknown> = {};

    if (options.name) {
      params.name = options.name;
    }
    if (options.url) {
      params.url = options.url;
    }
    if (options.format) {
      params.format = options.format;
    }
    if (options.status) {
      params.status = options.status;
    }
    if (options.schedule) {
      params.schedule = options.schedule;
    }
    if (options.timezone) {
      params.timezone = options.timezone;
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_feeds/${feedId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ProductFeedResponse>(requestConfig);
  }

  /**
   * Delete a product feed
   */
  async deleteProductFeed(
    accountId: string,
    catalogId: string,
    feedId: string,
    requestOptions?: RequestOptions
  ): Promise<ProductFeedResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/product_catalogs/${catalogId}/product_feeds/${feedId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ProductFeedResponse>(requestConfig);
  }

  // Convenience Methods

  /**
   * Create a manual product set with specific product IDs
   */
  async createManualProductSet(
    accountId: string,
    catalogId: string,
    name: string,
    productIds: string[],
    description?: string,
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    return this.createProductSet(
      accountId,
      catalogId,
      {
        name,
        type: 'MANUAL',
        product_ids: productIds,
        ...(description && { description }),
      },
      requestOptions
    );
  }

  /**
   * Create a filter-based product set
   */
  async createFilterProductSet(
    accountId: string,
    catalogId: string,
    name: string,
    filterRules: ProductSetFilter[],
    description?: string,
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    return this.createProductSet(
      accountId,
      catalogId,
      {
        name,
        type: 'FILTER',
        filter_rules: filterRules,
        ...(description && { description }),
      },
      requestOptions
    );
  }

  /**
   * Add products to a manual product set
   */
  async addProductsToSet(
    accountId: string,
    catalogId: string,
    productSetId: string,
    productIds: string[],
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    // First get current product set to preserve existing products
    const currentSet = await this.getProductSet(accountId, catalogId, productSetId, requestOptions);
    const existingProductIds = currentSet.data.product_ids || [];

    // Merge with new product IDs (avoiding duplicates)
    const allProductIds = [...new Set([...existingProductIds, ...productIds])];

    return this.updateProductSet(
      accountId,
      catalogId,
      productSetId,
      {
        product_ids: allProductIds,
      },
      requestOptions
    );
  }

  /**
   * Remove products from a manual product set
   */
  async removeProductsFromSet(
    accountId: string,
    catalogId: string,
    productSetId: string,
    productIds: string[],
    requestOptions?: RequestOptions
  ): Promise<ProductSetResponse> {
    // First get current product set
    const currentSet = await this.getProductSet(accountId, catalogId, productSetId, requestOptions);
    const existingProductIds = currentSet.data.product_ids || [];

    // Remove specified product IDs
    const filteredProductIds = existingProductIds.filter((id) => !productIds.includes(id));

    return this.updateProductSet(
      accountId,
      catalogId,
      productSetId,
      {
        product_ids: filteredProductIds,
      },
      requestOptions
    );
  }

  /**
   * Create a daily scheduled feed
   */
  async createDailyScheduledFeed(
    accountId: string,
    catalogId: string,
    name: string,
    url: string,
    format: 'CSV' | 'TSV' | 'XML',
    timezone = 'UTC',
    requestOptions?: RequestOptions
  ): Promise<ProductFeedResponse> {
    return this.createProductFeed(
      accountId,
      catalogId,
      {
        name,
        url,
        format,
        schedule: '0 0 * * *', // Daily at midnight
        timezone,
      },
      requestOptions
    );
  }

  /**
   * Create a weekly scheduled feed
   */
  async createWeeklyScheduledFeed(
    accountId: string,
    catalogId: string,
    name: string,
    url: string,
    format: 'CSV' | 'TSV' | 'XML',
    dayOfWeek = 1, // Monday = 1
    timezone = 'UTC',
    requestOptions?: RequestOptions
  ): Promise<ProductFeedResponse> {
    return this.createProductFeed(
      accountId,
      catalogId,
      {
        name,
        url,
        format,
        schedule: `0 0 * * ${dayOfWeek}`, // Weekly on specified day at midnight
        timezone,
      },
      requestOptions
    );
  }
}
