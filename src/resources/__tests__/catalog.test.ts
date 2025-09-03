import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  BatchProductsResponse,
  DeleteProductsResponse,
  ProductCatalogResponse,
  ProductCatalogsResponse,
  ProductFeedResponse,
  ProductFeedsResponse,
  ProductSetResponse,
  ProductSetsResponse,
  ProductsResponse,
} from '../../types/catalog.js';
import { CatalogManagement } from '../catalog.js';

describe('CatalogManagement', () => {
  let httpClient: HttpClient;
  let catalogManagement: CatalogManagement;

  beforeEach(() => {
    httpClient = {
      request: vi.fn(),
    } as unknown as HttpClient;

    catalogManagement = new CatalogManagement(httpClient);
  });

  describe('Product Catalog Management', () => {
    const mockProductCatalogResponse: ProductCatalogResponse = {
      data: {
        id: 'catalog_123',
        id_str: 'catalog_123',
        account_id: 'account_123',
        name: 'Test Catalog',
        description: 'Test catalog description',
        status: 'ACTIVE',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        product_count: 100,
        feed_count: 2,
      },
      request: { params: {} },
    };

    const mockProductCatalogsResponse: ProductCatalogsResponse = {
      data: [mockProductCatalogResponse.data],
      request: { params: {} },
    };

    describe('getProductCatalogs', () => {
      it('should get product catalogs with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogsResponse);

        const result = await catalogManagement.getProductCatalogs('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: {},
        });
        expect(result).toEqual(mockProductCatalogsResponse);
      });

      it('should get product catalogs with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogsResponse);

        const options = {
          product_catalog_ids: ['catalog_1', 'catalog_2'],
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
          with_deleted: true,
        };

        await catalogManagement.getProductCatalogs('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: {
            product_catalog_ids: 'catalog_1,catalog_2',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
            with_deleted: 'true',
          },
        });
      });

      it('should handle requestOptions.params', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogsResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        await catalogManagement.getProductCatalogs('account_123', undefined, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: { custom_param: 'custom_value' },
        });
      });
    });

    describe('getProductCatalog', () => {
      it('should get specific product catalog', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogResponse);

        const result = await catalogManagement.getProductCatalog('account_123', 'catalog_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123',
        });
        expect(result).toEqual(mockProductCatalogResponse);
      });
    });

    describe('createProductCatalog', () => {
      it('should create product catalog with required fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogResponse);

        const options = {
          name: 'Test Catalog',
        };

        const result = await catalogManagement.createProductCatalog('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: {
            name: 'Test Catalog',
          },
        });
        expect(result).toEqual(mockProductCatalogResponse);
      });

      it('should create product catalog with all fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogResponse);

        const options = {
          name: 'Test Catalog',
          description: 'Test catalog description',
        };

        await catalogManagement.createProductCatalog('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: {
            name: 'Test Catalog',
            description: 'Test catalog description',
          },
        });
      });
    });

    describe('updateProductCatalog', () => {
      it('should update product catalog', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogResponse);

        const options = {
          name: 'Updated Catalog',
          description: 'Updated description',
          status: 'PAUSED' as const,
        };

        const result = await catalogManagement.updateProductCatalog(
          'account_123',
          'catalog_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123',
          params: {
            name: 'Updated Catalog',
            description: 'Updated description',
            status: 'PAUSED',
          },
        });
        expect(result).toEqual(mockProductCatalogResponse);
      });
    });

    describe('deleteProductCatalog', () => {
      it('should delete product catalog', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductCatalogResponse);

        const result = await catalogManagement.deleteProductCatalog('account_123', 'catalog_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123',
        });
        expect(result).toEqual(mockProductCatalogResponse);
      });
    });
  });

  describe('Product Management', () => {
    const mockProductsResponse: ProductsResponse = {
      data: [
        {
          id: 'product_123',
          availability: 'IN_STOCK',
          condition: 'NEW',
          description: 'Test product',
          image_url: 'https://example.com/image.jpg',
          link: 'https://example.com/product',
          price: '99.99',
          sale_price: '79.99',
          title: 'Test Product',
          brand: 'Test Brand',
          google_product_category: 'Electronics',
          product_type: 'Gadget',
          currency: 'USD',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ],
      request: { params: {} },
    };

    const mockBatchProductsResponse: BatchProductsResponse = {
      data: {
        success_count: 2,
        error_count: 0,
      },
      request: { params: {} },
    };

    const mockDeleteProductsResponse: DeleteProductsResponse = {
      data: {
        success_count: 2,
        error_count: 0,
      },
      request: { params: {} },
    };

    describe('getProducts', () => {
      it('should get products with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductsResponse);

        const result = await catalogManagement.getProducts('account_123', 'catalog_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/products',
          params: {},
        });
        expect(result).toEqual(mockProductsResponse);
      });

      it('should get products with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductsResponse);

        const options = {
          product_ids: ['product_1', 'product_2'],
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
        };

        await catalogManagement.getProducts('account_123', 'catalog_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/products',
          params: {
            product_ids: 'product_1,product_2',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
          },
        });
      });
    });

    describe('batchUpdateProducts', () => {
      it('should batch update products', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockBatchProductsResponse);

        const options = {
          products: [
            {
              id: 'product_1',
              title: 'Product 1',
              availability: 'IN_STOCK' as const,
              condition: 'NEW' as const,
              price: '99.99',
            },
            {
              id: 'product_2',
              title: 'Product 2',
              availability: 'OUT_OF_STOCK' as const,
              condition: 'NEW' as const,
              price: '149.99',
            },
          ],
        };

        const result = await catalogManagement.batchUpdateProducts(
          'account_123',
          'catalog_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/products',
          params: {
            products: JSON.stringify(options.products),
          },
        });
        expect(result).toEqual(mockBatchProductsResponse);
      });
    });

    describe('deleteProducts', () => {
      it('should delete products', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockDeleteProductsResponse);

        const options = {
          product_ids: ['product_1', 'product_2'],
        };

        const result = await catalogManagement.deleteProducts(
          'account_123',
          'catalog_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/products',
          params: {
            product_ids: 'product_1,product_2',
          },
        });
        expect(result).toEqual(mockDeleteProductsResponse);
      });
    });
  });

  describe('Product Set Management', () => {
    const mockProductSetResponse: ProductSetResponse = {
      data: {
        id: 'set_123',
        id_str: 'set_123',
        name: 'Test Product Set',
        description: 'Test product set description',
        product_catalog_id: 'catalog_123',
        type: 'MANUAL',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        product_count: 5,
        product_ids: ['product_1', 'product_2', 'product_3'],
      },
      request: { params: {} },
    };

    const mockProductSetsResponse: ProductSetsResponse = {
      data: [mockProductSetResponse.data],
      request: { params: {} },
    };

    describe('getProductSets', () => {
      it('should get product sets with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetsResponse);

        const result = await catalogManagement.getProductSets('account_123', 'catalog_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets',
          params: {},
        });
        expect(result).toEqual(mockProductSetsResponse);
      });

      it('should get product sets with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetsResponse);

        const options = {
          product_set_ids: ['set_1', 'set_2'],
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
          with_deleted: true,
        };

        await catalogManagement.getProductSets('account_123', 'catalog_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets',
          params: {
            product_set_ids: 'set_1,set_2',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
            with_deleted: 'true',
          },
        });
      });
    });

    describe('createProductSet', () => {
      it('should create manual product set', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetResponse);

        const options = {
          name: 'Test Product Set',
          type: 'MANUAL' as const,
          product_ids: ['product_1', 'product_2'],
        };

        const result = await catalogManagement.createProductSet(
          'account_123',
          'catalog_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets',
          params: {
            name: 'Test Product Set',
            type: 'MANUAL',
            product_ids: 'product_1,product_2',
          },
        });
        expect(result).toEqual(mockProductSetResponse);
      });

      it('should create filter product set', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetResponse);

        const options = {
          name: 'Test Filter Set',
          type: 'FILTER' as const,
          description: 'Filter-based set',
          filter_rules: [
            { field: 'price', operator: 'GREATER_THAN' as const, value: 50 },
            { field: 'brand', operator: 'EQUALS' as const, value: 'TestBrand' },
          ],
        };

        await catalogManagement.createProductSet('account_123', 'catalog_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets',
          params: {
            name: 'Test Filter Set',
            type: 'FILTER',
            description: 'Filter-based set',
            filter_rules: JSON.stringify(options.filter_rules),
          },
        });
      });
    });

    describe('updateProductSet', () => {
      it('should update product set', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetResponse);

        const options = {
          name: 'Updated Product Set',
          product_ids: ['product_1', 'product_3', 'product_4'],
        };

        const result = await catalogManagement.updateProductSet(
          'account_123',
          'catalog_123',
          'set_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
          params: {
            name: 'Updated Product Set',
            product_ids: 'product_1,product_3,product_4',
          },
        });
        expect(result).toEqual(mockProductSetResponse);
      });
    });

    describe('deleteProductSet', () => {
      it('should delete product set', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetResponse);

        const result = await catalogManagement.deleteProductSet(
          'account_123',
          'catalog_123',
          'set_123'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        });
        expect(result).toEqual(mockProductSetResponse);
      });
    });
  });

  describe('Product Feed Management', () => {
    const mockProductFeedResponse: ProductFeedResponse = {
      data: {
        id: 'feed_123',
        id_str: 'feed_123',
        name: 'Test Product Feed',
        url: 'https://example.com/products.csv',
        format: 'CSV',
        status: 'ACTIVE',
        product_catalog_id: 'catalog_123',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        schedule: '0 0 * * *',
        timezone: 'UTC',
      },
      request: { params: {} },
    };

    const mockProductFeedsResponse: ProductFeedsResponse = {
      data: [mockProductFeedResponse.data],
      request: { params: {} },
    };

    describe('getProductFeeds', () => {
      it('should get product feeds with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedsResponse);

        const result = await catalogManagement.getProductFeeds('account_123', 'catalog_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds',
          params: {},
        });
        expect(result).toEqual(mockProductFeedsResponse);
      });

      it('should get product feeds with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedsResponse);

        const options = {
          product_feed_ids: ['feed_1', 'feed_2'],
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
          with_deleted: true,
        };

        await catalogManagement.getProductFeeds('account_123', 'catalog_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds',
          params: {
            product_feed_ids: 'feed_1,feed_2',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
            with_deleted: 'true',
          },
        });
      });
    });

    describe('createProductFeed', () => {
      it('should create product feed with required fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedResponse);

        const options = {
          name: 'Test Product Feed',
          url: 'https://example.com/products.csv',
          format: 'CSV' as const,
        };

        const result = await catalogManagement.createProductFeed(
          'account_123',
          'catalog_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds',
          params: {
            name: 'Test Product Feed',
            url: 'https://example.com/products.csv',
            format: 'CSV',
          },
        });
        expect(result).toEqual(mockProductFeedResponse);
      });

      it('should create product feed with all fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedResponse);

        const options = {
          name: 'Test Product Feed',
          url: 'https://example.com/products.csv',
          format: 'CSV' as const,
          schedule: '0 0 * * *',
          timezone: 'UTC',
        };

        await catalogManagement.createProductFeed('account_123', 'catalog_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds',
          params: {
            name: 'Test Product Feed',
            url: 'https://example.com/products.csv',
            format: 'CSV',
            schedule: '0 0 * * *',
            timezone: 'UTC',
          },
        });
      });
    });

    describe('updateProductFeed', () => {
      it('should update product feed', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedResponse);

        const options = {
          name: 'Updated Product Feed',
          status: 'PAUSED' as const,
          schedule: '0 0 * * 1',
        };

        const result = await catalogManagement.updateProductFeed(
          'account_123',
          'catalog_123',
          'feed_123',
          options
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds/feed_123',
          params: {
            name: 'Updated Product Feed',
            status: 'PAUSED',
            schedule: '0 0 * * 1',
          },
        });
        expect(result).toEqual(mockProductFeedResponse);
      });
    });

    describe('deleteProductFeed', () => {
      it('should delete product feed', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedResponse);

        const result = await catalogManagement.deleteProductFeed(
          'account_123',
          'catalog_123',
          'feed_123'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds/feed_123',
        });
        expect(result).toEqual(mockProductFeedResponse);
      });
    });
  });

  describe('Convenience Methods', () => {
    describe('createManualProductSet', () => {
      it('should create manual product set', async () => {
        const mockProductSetResponse: ProductSetResponse = {
          data: {
            id: 'set_123',
            id_str: 'set_123',
            name: 'Manual Set',
            product_catalog_id: 'catalog_123',
            type: 'MANUAL',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetResponse);

        const result = await catalogManagement.createManualProductSet(
          'account_123',
          'catalog_123',
          'Manual Set',
          ['product_1', 'product_2'],
          'Manual set description'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets',
          params: {
            name: 'Manual Set',
            type: 'MANUAL',
            product_ids: 'product_1,product_2',
            description: 'Manual set description',
          },
        });
        expect(result).toEqual(mockProductSetResponse);
      });
    });

    describe('createFilterProductSet', () => {
      it('should create filter product set', async () => {
        const mockProductSetResponse: ProductSetResponse = {
          data: {
            id: 'set_123',
            id_str: 'set_123',
            name: 'Filter Set',
            product_catalog_id: 'catalog_123',
            type: 'FILTER',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockProductSetResponse);

        const filterRules = [
          { field: 'price', operator: 'GREATER_THAN' as const, value: 100 },
          { field: 'brand', operator: 'EQUALS' as const, value: 'TestBrand' },
        ];

        const result = await catalogManagement.createFilterProductSet(
          'account_123',
          'catalog_123',
          'Filter Set',
          filterRules,
          'Filter set description'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets',
          params: {
            name: 'Filter Set',
            type: 'FILTER',
            filter_rules: JSON.stringify(filterRules),
            description: 'Filter set description',
          },
        });
        expect(result).toEqual(mockProductSetResponse);
      });
    });

    describe('addProductsToSet', () => {
      it('should add products to existing product set', async () => {
        const mockCurrentSet: ProductSetResponse = {
          data: {
            id: 'set_123',
            id_str: 'set_123',
            name: 'Test Set',
            product_catalog_id: 'catalog_123',
            type: 'MANUAL',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            product_ids: ['product_1', 'product_2'],
          },
          request: { params: {} },
        };

        const mockUpdatedSet: ProductSetResponse = {
          data: {
            ...mockCurrentSet.data,
            product_ids: ['product_1', 'product_2', 'product_3', 'product_4'],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request)
          .mockResolvedValueOnce(mockCurrentSet) // getProductSet call
          .mockResolvedValueOnce(mockUpdatedSet); // updateProductSet call

        const result = await catalogManagement.addProductsToSet(
          'account_123',
          'catalog_123',
          'set_123',
          ['product_3', 'product_4']
        );

        expect(httpClient.request).toHaveBeenCalledTimes(2);

        // First call: get current product set
        expect(httpClient.request).toHaveBeenNthCalledWith(1, {
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        });

        // Second call: update product set with merged product IDs
        expect(httpClient.request).toHaveBeenNthCalledWith(2, {
          method: 'PUT',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
          params: {
            product_ids: 'product_1,product_2,product_3,product_4',
          },
        });

        expect(result).toEqual(mockUpdatedSet);
      });
    });

    describe('removeProductsFromSet', () => {
      it('should remove products from existing product set', async () => {
        const mockCurrentSet: ProductSetResponse = {
          data: {
            id: 'set_123',
            id_str: 'set_123',
            name: 'Test Set',
            product_catalog_id: 'catalog_123',
            type: 'MANUAL',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            product_ids: ['product_1', 'product_2', 'product_3', 'product_4'],
          },
          request: { params: {} },
        };

        const mockUpdatedSet: ProductSetResponse = {
          data: {
            ...mockCurrentSet.data,
            product_ids: ['product_1', 'product_3'],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request)
          .mockResolvedValueOnce(mockCurrentSet) // getProductSet call
          .mockResolvedValueOnce(mockUpdatedSet); // updateProductSet call

        const result = await catalogManagement.removeProductsFromSet(
          'account_123',
          'catalog_123',
          'set_123',
          ['product_2', 'product_4']
        );

        expect(httpClient.request).toHaveBeenCalledTimes(2);

        // First call: get current product set
        expect(httpClient.request).toHaveBeenNthCalledWith(1, {
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        });

        // Second call: update product set with filtered product IDs
        expect(httpClient.request).toHaveBeenNthCalledWith(2, {
          method: 'PUT',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
          params: {
            product_ids: 'product_1,product_3',
          },
        });

        expect(result).toEqual(mockUpdatedSet);
      });
    });

    describe('createDailyScheduledFeed', () => {
      it('should create daily scheduled feed', async () => {
        const mockProductFeedResponse: ProductFeedResponse = {
          data: {
            id: 'feed_123',
            id_str: 'feed_123',
            name: 'Daily Feed',
            url: 'https://example.com/daily.csv',
            format: 'CSV',
            status: 'ACTIVE',
            product_catalog_id: 'catalog_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            schedule: '0 0 * * *',
            timezone: 'UTC',
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedResponse);

        const result = await catalogManagement.createDailyScheduledFeed(
          'account_123',
          'catalog_123',
          'Daily Feed',
          'https://example.com/daily.csv',
          'CSV'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds',
          params: {
            name: 'Daily Feed',
            url: 'https://example.com/daily.csv',
            format: 'CSV',
            schedule: '0 0 * * *',
            timezone: 'UTC',
          },
        });
        expect(result).toEqual(mockProductFeedResponse);
      });
    });

    describe('createWeeklyScheduledFeed', () => {
      it('should create weekly scheduled feed', async () => {
        const mockProductFeedResponse: ProductFeedResponse = {
          data: {
            id: 'feed_123',
            id_str: 'feed_123',
            name: 'Weekly Feed',
            url: 'https://example.com/weekly.csv',
            format: 'CSV',
            status: 'ACTIVE',
            product_catalog_id: 'catalog_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            schedule: '0 0 * * 1',
            timezone: 'PST',
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockProductFeedResponse);

        const result = await catalogManagement.createWeeklyScheduledFeed(
          'account_123',
          'catalog_123',
          'Weekly Feed',
          'https://example.com/weekly.csv',
          'CSV',
          1, // Monday
          'PST'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds',
          params: {
            name: 'Weekly Feed',
            url: 'https://example.com/weekly.csv',
            format: 'CSV',
            schedule: '0 0 * * 1',
            timezone: 'PST',
          },
        });
        expect(result).toEqual(mockProductFeedResponse);
      });
    });
  });

  describe('Branch Coverage Tests', () => {
    describe('getProductCatalogs with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: ProductCatalogsResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          product_catalog_ids: ['catalog_1'],
          count: 5,
        };

        await catalogManagement.getProductCatalogs('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: {
            custom_param: 'custom_value',
            product_catalog_ids: 'catalog_1',
            count: '5',
          },
        });
      });
    });

    describe('createProductCatalog with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: ProductCatalogResponse = {
          data: {
            id: 'catalog_123',
            id_str: 'catalog_123',
            account_id: 'account_123',
            name: 'Test Catalog',
            status: 'ACTIVE',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          name: 'Test Catalog',
        };

        await catalogManagement.createProductCatalog('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/product_catalogs',
          params: {
            custom_param: 'custom_value',
            name: 'Test Catalog',
          },
        });
      });
    });
  });

  describe('updateProductSet with individual optional parameters', () => {
    it('should handle name only', async () => {
      const mockResponse: ProductSetResponse = {
        data: {
          id: 'set_123',
          id_str: 'set_123',
          name: 'Updated Set Name Only',
          type: 'MANUAL',
          product_catalog_id: 'catalog_123',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await catalogManagement.updateProductSet(
        'account_123',
        'catalog_123',
        'set_123',
        { name: 'Updated Set Name Only' }
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        params: {
          name: 'Updated Set Name Only',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle description only', async () => {
      const mockResponse: ProductSetResponse = {
        data: {
          id: 'set_123',
          id_str: 'set_123',
          name: 'Test Set',
          type: 'MANUAL',
          product_catalog_id: 'catalog_123',
          description: 'Updated Description Only',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await catalogManagement.updateProductSet(
        'account_123',
        'catalog_123',
        'set_123',
        { description: 'Updated Description Only' }
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        params: {
          description: 'Updated Description Only',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle filter_rules only', async () => {
      const mockResponse: ProductSetResponse = {
        data: {
          id: 'set_123',
          id_str: 'set_123',
          name: 'Test Set',
          type: 'FILTER',
          product_catalog_id: 'catalog_123',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await catalogManagement.updateProductSet(
        'account_123',
        'catalog_123',
        'set_123',
        {
          filter_rules: [{ field: 'price', operator: 'GREATER_THAN' as const, value: 100 }],
        }
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        params: {
          filter_rules: JSON.stringify([{ field: 'price', operator: 'GREATER_THAN', value: 100 }]),
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle product_ids only', async () => {
      const mockResponse: ProductSetResponse = {
        data: {
          id: 'set_123',
          id_str: 'set_123',
          name: 'Test Set',
          type: 'MANUAL',
          product_catalog_id: 'catalog_123',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await catalogManagement.updateProductSet(
        'account_123',
        'catalog_123',
        'set_123',
        { product_ids: ['product_1', 'product_2'] }
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_sets/set_123',
        params: {
          product_ids: 'product_1,product_2',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProductFeed method coverage', () => {
    it('should get specific product feed', async () => {
      const mockResponse: ProductFeedResponse = {
        data: {
          id: 'feed_123',
          id_str: 'feed_123',
          product_catalog_id: 'catalog_123',
          name: 'Test Feed',
          url: 'https://example.com/feed.csv',
          format: 'CSV',
          status: 'ACTIVE',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await catalogManagement.getProductFeed(
        'account_123',
        'catalog_123',
        'feed_123'
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds/feed_123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProductFeed with all optional parameters', () => {
    it('should handle all optional parameters for updateProductFeed', async () => {
      const mockResponse: ProductFeedResponse = {
        data: {
          id: 'feed_123',
          id_str: 'feed_123',
          product_catalog_id: 'catalog_123',
          name: 'Updated Feed',
          url: 'https://updated.example.com/feed.csv',
          format: 'CSV',
          status: 'ACTIVE',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const updateOptions = {
        name: 'Updated Feed',
        url: 'https://updated.example.com/feed.csv',
        format: 'CSV' as const,
        status: 'ACTIVE' as const,
        schedule: '0 0 * * *',
        timezone: 'UTC',
      };

      const result = await catalogManagement.updateProductFeed(
        'account_123',
        'catalog_123',
        'feed_123',
        updateOptions
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/product_catalogs/catalog_123/product_feeds/feed_123',
        params: {
          name: 'Updated Feed',
          url: 'https://updated.example.com/feed.csv',
          format: 'CSV',
          status: 'ACTIVE',
          schedule: '0 0 * * *',
          timezone: 'UTC',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP client errors', async () => {
      const error = new Error('Network error') as unknown as { captureStackTrace?: unknown };
      vi.mocked(httpClient.request).mockRejectedValue(error);

      await expect(catalogManagement.getProductCatalogs('account_123')).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle empty response', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(null);

      const result = await catalogManagement.getProductCatalogs('account_123');
      expect(result).toBeNull();
    });
  });
});
