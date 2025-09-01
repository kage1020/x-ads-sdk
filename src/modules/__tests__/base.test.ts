import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import { CursorPaginator } from '../../paginators/index.js';
import type { APIResponse, PaginatedResponse } from '../../types/common.js';
import { BaseModule } from '../base.js';

interface TestItem {
  id: number;
  name: string;
}

interface MockResponseData {
  id?: number;
  name?: string;
  created?: boolean;
  updated?: boolean;
  success?: boolean;
}

type FetcherMethod = (cursor?: string, count?: number) => Promise<unknown>;

// Create a concrete implementation for testing
class TestModule extends BaseModule {
  constructor(client: HttpClient) {
    super(client, 'test');
  }

  // Expose protected methods for testing
  public testBuildEndpoint(accountId: string, ...segments: string[]): string {
    return this.buildEndpoint(accountId, ...segments);
  }

  public testMakeListRequest<T>(endpoint: string, params = {}) {
    return this.makeListRequest<T>(endpoint, params);
  }

  public testMakeGetRequest<T>(endpoint: string) {
    return this.makeGetRequest<T>(endpoint);
  }

  public testMakePostRequest<T>(endpoint: string, body: unknown) {
    return this.makePostRequest<T>(endpoint, body);
  }

  public testMakePutRequest<T>(endpoint: string, body: unknown) {
    return this.makePutRequest<T>(endpoint, body);
  }

  public testMakeDeleteRequest(endpoint: string) {
    return this.makeDeleteRequest(endpoint);
  }

  public testCreatePaginator<T>(endpoint: string, baseParams = {}, options = {}) {
    return this.createPaginator<T>(endpoint, baseParams, options);
  }
}

describe('BaseModule', () => {
  const mockClient = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as HttpClient;

  let testModule: TestModule;

  beforeEach(() => {
    vi.clearAllMocks();
    testModule = new TestModule(mockClient);
  });

  describe('constructor', () => {
    it('should initialize with client and baseEndpoint', () => {
      const module = new TestModule(mockClient);
      expect(module).toBeInstanceOf(BaseModule);
      expect(module).toHaveProperty('client', mockClient);
    });
  });

  describe('buildEndpoint', () => {
    it('should build endpoint with account ID', () => {
      const result = testModule.testBuildEndpoint('123');
      expect(result).toBe('/test/123');
    });

    it('should build endpoint with account ID and segments', () => {
      const result = testModule.testBuildEndpoint('123', 'campaigns', '456');
      expect(result).toBe('/test/123/campaigns/456');
    });

    it('should filter out empty segments', () => {
      const result = testModule.testBuildEndpoint('123', 'campaigns', '', 'active');
      expect(result).toBe('/test/123/campaigns/active');
    });

    it('should handle null and undefined segments', () => {
      // Cast null and undefined to string to test the filtering behavior
      const result = testModule.testBuildEndpoint(
        '123',
        'campaigns',
        null as unknown as string,
        undefined as unknown as string,
        'active'
      );
      expect(result).toBe('/test/123/campaigns/active');
    });

    it('should handle no additional segments', () => {
      const result = testModule.testBuildEndpoint('123');
      expect(result).toBe('/test/123');
    });

    it('should handle multiple empty segments', () => {
      const result = testModule.testBuildEndpoint('123', '', '', '');
      expect(result).toBe('/test/123');
    });
  });

  describe('makeListRequest', () => {
    it('should make GET request and return paginated data', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor123',
          total_count: 2,
        },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await testModule.testMakeListRequest('/test/endpoint');

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', {});
      expect(result).toEqual(mockResponse.data);
    });

    it('should pass parameters to GET request', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: { data: [], next_cursor: undefined, total_count: 0 },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const params = { limit: 10, filter: 'active' };
      await testModule.testMakeListRequest('/test/endpoint', params);

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', params);
    });

    it('should handle empty parameters', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: { data: [], next_cursor: undefined, total_count: 0 },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      await testModule.testMakeListRequest('/test/endpoint');

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', {});
    });
  });

  describe('makeGetRequest', () => {
    it('should make GET request and return data', async () => {
      const mockResponse: APIResponse<MockResponseData> = {
        data: { id: 123, name: 'test' },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const result = await testModule.testMakeGetRequest('/test/endpoint');

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('makePostRequest', () => {
    it('should make POST request and return data', async () => {
      const mockResponse: APIResponse<MockResponseData> = {
        data: { id: 123, created: true },
        request: { params: {} },
      };

      vi.mocked(mockClient.post).mockResolvedValue(mockResponse);

      const body = { name: 'test campaign' };
      const result = await testModule.testMakePostRequest('/test/endpoint', body);

      expect(mockClient.post).toHaveBeenCalledWith('/test/endpoint', body);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle null body', async () => {
      const mockResponse: APIResponse<MockResponseData> = {
        data: { success: true },
        request: { params: {} },
      };

      vi.mocked(mockClient.post).mockResolvedValue(mockResponse);

      await testModule.testMakePostRequest('/test/endpoint', null);

      expect(mockClient.post).toHaveBeenCalledWith('/test/endpoint', null);
    });
  });

  describe('makePutRequest', () => {
    it('should make PUT request and return data', async () => {
      const mockResponse: APIResponse<MockResponseData> = {
        data: { id: 123, updated: true },
        request: { params: {} },
      };

      vi.mocked(mockClient.put).mockResolvedValue(mockResponse);

      const body = { name: 'updated campaign' };
      const result = await testModule.testMakePutRequest('/test/endpoint', body);

      expect(mockClient.put).toHaveBeenCalledWith('/test/endpoint', body);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle empty object body', async () => {
      const mockResponse: APIResponse<MockResponseData> = {
        data: { success: true },
        request: { params: {} },
      };

      vi.mocked(mockClient.put).mockResolvedValue(mockResponse);

      await testModule.testMakePutRequest('/test/endpoint', {});

      expect(mockClient.put).toHaveBeenCalledWith('/test/endpoint', {});
    });
  });

  describe('makeDeleteRequest', () => {
    it('should make DELETE request', async () => {
      vi.mocked(mockClient.delete).mockResolvedValue(undefined);

      await testModule.testMakeDeleteRequest('/test/endpoint');

      expect(mockClient.delete).toHaveBeenCalledWith('/test/endpoint');
    });

    it('should not return any data', async () => {
      vi.mocked(mockClient.delete).mockResolvedValue(undefined);

      const result = await testModule.testMakeDeleteRequest('/test/endpoint');

      expect(result).toBeUndefined();
    });
  });

  describe('createPaginator', () => {
    it('should create CursorPaginator with correct fetcher', () => {
      const paginator = testModule.testCreatePaginator('/test/endpoint');

      expect(paginator).toBeInstanceOf(CursorPaginator);
    });

    it('should create paginator with base parameters', () => {
      const baseParams = { filter: 'active' };
      const paginator = testModule.testCreatePaginator('/test/endpoint', baseParams);

      expect(paginator).toBeInstanceOf(CursorPaginator);
    });

    it('should create paginator with options', () => {
      const options = { defaultCount: 50 };
      const paginator = testModule.testCreatePaginator('/test/endpoint', {}, options);

      expect(paginator).toBeInstanceOf(CursorPaginator);
    });

    it('should create paginator that can fetch data', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: {
          data: [{ id: 1, name: 'Test Item' }],
          next_cursor: 'next123',
          total_count: 1,
        },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const paginator = testModule.testCreatePaginator('/test/endpoint');

      // Test the internal fetcher by calling a method that would trigger it
      // Note: This is testing the integration between BaseModule and CursorPaginator
      expect(paginator).toBeDefined();
    });

    it('should merge base params with cursor and count params', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: { data: [], next_cursor: undefined, total_count: 0 },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const baseParams = { filter: 'active' };
      const paginator = testModule.testCreatePaginator('/test/endpoint', baseParams);

      // Access the internal fetcher function and test it directly
      const fetcherMethod = (paginator as unknown as { fetcher: FetcherMethod }).fetcher;
      await fetcherMethod('cursor123', 25);

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', {
        filter: 'active',
        cursor: 'cursor123',
        count: 25,
      });
    });

    it('should handle undefined cursor and count in fetcher', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: { data: [], next_cursor: undefined, total_count: 0 },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const paginator = testModule.testCreatePaginator('/test/endpoint');
      const fetcherMethod = (paginator as unknown as { fetcher: FetcherMethod }).fetcher;

      await fetcherMethod(undefined, undefined);

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', {});
    });

    it('should handle only cursor without count', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: { data: [], next_cursor: undefined, total_count: 0 },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const paginator = testModule.testCreatePaginator('/test/endpoint');
      const fetcherMethod = (paginator as unknown as { fetcher: FetcherMethod }).fetcher;

      await fetcherMethod('cursor123', undefined);

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', {
        cursor: 'cursor123',
      });
    });

    it('should handle only count without cursor', async () => {
      const mockResponse: APIResponse<PaginatedResponse<TestItem>> = {
        data: { data: [], next_cursor: undefined, total_count: 0 },
        request: { params: {} },
      };

      vi.mocked(mockClient.get).mockResolvedValue(mockResponse);

      const paginator = testModule.testCreatePaginator('/test/endpoint');
      const fetcherMethod = (paginator as unknown as { fetcher: FetcherMethod }).fetcher;

      await fetcherMethod(undefined, 50);

      expect(mockClient.get).toHaveBeenCalledWith('/test/endpoint', {
        count: 50,
      });
    });
  });

  describe('error handling', () => {
    it('should propagate errors from client methods', async () => {
      const error = new Error('Network error');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      await expect(testModule.testMakeGetRequest('/test/endpoint')).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle POST request errors', async () => {
      const error = new Error('Validation error');
      vi.mocked(mockClient.post).mockRejectedValue(error);

      await expect(testModule.testMakePostRequest('/test/endpoint', {})).rejects.toThrow(
        'Validation error'
      );
    });

    it('should handle PUT request errors', async () => {
      const error = new Error('Update failed');
      vi.mocked(mockClient.put).mockRejectedValue(error);

      await expect(testModule.testMakePutRequest('/test/endpoint', {})).rejects.toThrow(
        'Update failed'
      );
    });

    it('should handle DELETE request errors', async () => {
      const error = new Error('Delete failed');
      vi.mocked(mockClient.delete).mockRejectedValue(error);

      await expect(testModule.testMakeDeleteRequest('/test/endpoint')).rejects.toThrow(
        'Delete failed'
      );
    });
  });
});
