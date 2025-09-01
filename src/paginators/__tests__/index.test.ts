import { describe, expect, it, vi } from 'vitest';
import { CursorPaginator, type CursorPaginatorResult, OffsetPaginator } from '../index.js';

interface TestItem {
  id: number;
  name: string;
}

describe('CursorPaginator', () => {
  const createMockFetcher = (pages: CursorPaginatorResult<TestItem>[]) => {
    let currentPage = 0;
    return vi.fn(async (cursor?: string, _count?: number) => {
      if (cursor) {
        const pageIndex = pages.findIndex((p) => p.next_cursor === cursor) + 1;
        currentPage = pageIndex;
      }

      if (currentPage >= pages.length) {
        return { data: [], next_cursor: undefined };
      }

      const page = pages[currentPage];
      currentPage++;
      return page;
    });
  };

  describe('constructor', () => {
    it('should initialize with fetcher and default options', () => {
      const mockFetcher = vi.fn();
      const paginator = new CursorPaginator(mockFetcher);

      expect(paginator).toBeInstanceOf(CursorPaginator);
    });

    it('should initialize with fetcher and custom options', () => {
      const mockFetcher = vi.fn();
      const options = { maxResults: 100, pageSize: 25 };
      const paginator = new CursorPaginator(mockFetcher, options);

      expect(paginator).toBeInstanceOf(CursorPaginator);
    });
  });

  describe('async iteration', () => {
    it('should iterate through multiple pages', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor1',
        },
        {
          data: [
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
          ],
          next_cursor: 'cursor2',
        },
        { data: [{ id: 5, name: 'Item 5' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
      expect(results[1]).toEqual([
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
      ]);
      expect(results[2]).toEqual([{ id: 5, name: 'Item 5' }]);
    });

    it('should stop when no more data available', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        { data: [{ id: 1, name: 'Item 1' }], next_cursor: 'cursor1' },
        { data: [], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual([{ id: 1, name: 'Item 1' }]);
    });

    it('should respect maxResults option', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor1',
        },
        {
          data: [
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
          ],
          next_cursor: 'cursor2',
        },
        { data: [{ id: 5, name: 'Item 5' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher, { maxResults: 3 });

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(2); // Should stop after getting 3 items (2 + 1 from stopping condition)
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });

    it('should pass pageSize to fetcher', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        { data: [{ id: 1, name: 'Item 1' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher, { pageSize: 50 });

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(mockFetcher).toHaveBeenCalledWith(undefined, 50);
    });
  });

  describe('items()', () => {
    it('should iterate through individual items', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor1',
        },
        { data: [{ id: 3, name: 'Item 3' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const items: TestItem[] = [];
      for await (const item of paginator.items()) {
        items.push(item);
      }

      expect(items).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ]);
    });

    it('should handle empty pages', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [{ data: [], next_cursor: undefined }];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const items: TestItem[] = [];
      for await (const item of paginator.items()) {
        items.push(item);
      }

      expect(items).toEqual([]);
    });
  });

  describe('all()', () => {
    it('should return all items from all pages', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor1',
        },
        { data: [{ id: 3, name: 'Item 3' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const allItems = await paginator.all();

      expect(allItems).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ]);
    });

    it('should return empty array when no items', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [{ data: [], next_cursor: undefined }];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const allItems = await paginator.all();

      expect(allItems).toEqual([]);
    });
  });

  describe('first()', () => {
    it('should return first item by default', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor1',
        },
        { data: [{ id: 3, name: 'Item 3' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const first = await paginator.first();

      expect(first).toEqual([{ id: 1, name: 'Item 1' }]);
    });

    it('should return specified number of first items', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        {
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
          next_cursor: 'cursor1',
        },
        { data: [{ id: 3, name: 'Item 3' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const first = await paginator.first(2);

      expect(first).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
    });

    it('should handle requesting more items than available', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [
        { data: [{ id: 1, name: 'Item 1' }], next_cursor: undefined },
      ];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const first = await paginator.first(5);

      expect(first).toEqual([{ id: 1, name: 'Item 1' }]);
    });

    it('should return empty array when no items available', async () => {
      const pages: CursorPaginatorResult<TestItem>[] = [{ data: [], next_cursor: undefined }];

      const mockFetcher = createMockFetcher(pages);
      const paginator = new CursorPaginator(mockFetcher);

      const first = await paginator.first(3);

      expect(first).toEqual([]);
    });
  });

  describe('reset()', () => {
    it('should reset paginator state', async () => {
      // Create a simple mock fetcher that returns first page on first call
      let callCount = 0;
      const mockFetcher = vi.fn(async () => {
        callCount++;
        if (callCount === 1) {
          return { data: [{ id: 1, name: 'Item 1' }], next_cursor: undefined };
        }
        return { data: [{ id: 1, name: 'Item 1' }], next_cursor: undefined };
      });

      const paginator = new CursorPaginator(mockFetcher);

      // First iteration
      const firstResult = await paginator.first(1);
      expect(firstResult).toEqual([{ id: 1, name: 'Item 1' }]);

      // Reset and iterate again
      paginator.reset();
      callCount = 0; // Reset call count to simulate fresh start
      mockFetcher.mockClear();

      const secondResult = await paginator.first(1);
      expect(secondResult).toEqual([{ id: 1, name: 'Item 1' }]);
      expect(mockFetcher).toHaveBeenCalledWith(undefined, undefined);
    });
  });

  describe('error handling', () => {
    it('should propagate fetcher errors', async () => {
      const mockFetcher = vi.fn().mockRejectedValue(new Error('Fetch failed'));
      const paginator = new CursorPaginator(mockFetcher);

      await expect(paginator.all()).rejects.toThrow('Fetch failed');
    });

    it('should handle fetcher returning null data gracefully', async () => {
      const mockFetcher = vi.fn().mockResolvedValue({ data: null as unknown });
      const paginator = new CursorPaginator(mockFetcher);

      // This should throw due to null data.length access
      await expect(paginator.all()).rejects.toThrow();
    });
  });
});

describe('OffsetPaginator', () => {
  const createMockOffsetFetcher = (allData: TestItem[], pageSize = 2) => {
    return vi.fn(async (offset: number, limit = pageSize) => {
      const data = allData.slice(offset, offset + limit);
      return {
        data,
        total_count: allData.length,
      };
    });
  };

  describe('constructor', () => {
    it('should initialize with fetcher and default options', () => {
      const mockFetcher = vi.fn();
      const paginator = new OffsetPaginator(mockFetcher);

      expect(paginator).toBeInstanceOf(OffsetPaginator);
    });

    it('should initialize with fetcher and custom options', () => {
      const mockFetcher = vi.fn();
      const options = { maxResults: 100, pageSize: 25 };
      const paginator = new OffsetPaginator(mockFetcher, options);

      expect(paginator).toBeInstanceOf(OffsetPaginator);
    });
  });

  describe('async iteration', () => {
    it('should iterate through multiple pages with offset', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData);
      const paginator = new OffsetPaginator(mockFetcher, { pageSize: 2 });

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
      expect(results[1]).toEqual([
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
      ]);
      expect(results[2]).toEqual([{ id: 5, name: 'Item 5' }]);

      expect(mockFetcher).toHaveBeenCalledWith(0, 2);
      expect(mockFetcher).toHaveBeenCalledWith(2, 2);
      expect(mockFetcher).toHaveBeenCalledWith(4, 2);
    });

    it('should stop when page size is smaller than expected', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData, 5); // Page size larger than data
      const paginator = new OffsetPaginator(mockFetcher, { pageSize: 5 });

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(allData);
    });

    it('should respect maxResults option', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData);
      const paginator = new OffsetPaginator(mockFetcher, { maxResults: 3, pageSize: 2 });

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(2); // Should stop after fetching 4 items (exceeds maxResults of 3)
      expect(mockFetcher).toHaveBeenCalledTimes(2);
    });

    it('should use default page size of 20 when not specified', async () => {
      const allData: TestItem[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
      }));

      const mockFetcher = createMockOffsetFetcher(allData, 20);
      const paginator = new OffsetPaginator(mockFetcher); // No pageSize specified

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(2);
      expect(results[0]).toHaveLength(20);
      expect(results[1]).toHaveLength(5);
    });
  });

  describe('items()', () => {
    it('should iterate through individual items', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData);
      const paginator = new OffsetPaginator(mockFetcher, { pageSize: 2 });

      const items: TestItem[] = [];
      for await (const item of paginator.items()) {
        items.push(item);
      }

      expect(items).toEqual(allData);
    });
  });

  describe('all()', () => {
    it('should return all items from all pages', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData);
      const paginator = new OffsetPaginator(mockFetcher, { pageSize: 2 });

      const result = await paginator.all();

      expect(result).toEqual(allData);
    });

    it('should return empty array when no data', async () => {
      const mockFetcher = createMockOffsetFetcher([]);
      const paginator = new OffsetPaginator(mockFetcher);

      const result = await paginator.all();

      expect(result).toEqual([]);
    });
  });

  describe('reset()', () => {
    it('should reset paginator state', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData);
      const paginator = new OffsetPaginator(mockFetcher, { pageSize: 1 });

      // First iteration - get first page
      const firstResult: TestItem[][] = [];
      for await (const page of paginator) {
        firstResult.push(page);
        break; // Only get first page
      }
      expect(firstResult[0]).toEqual([{ id: 1, name: 'Item 1' }]);

      // Reset and iterate again
      paginator.reset();
      mockFetcher.mockClear();

      const secondResult: TestItem[][] = [];
      for await (const page of paginator) {
        secondResult.push(page);
        break; // Only get first page
      }

      expect(secondResult[0]).toEqual([{ id: 1, name: 'Item 1' }]);
      expect(mockFetcher).toHaveBeenCalledWith(0, 1); // Should start from offset 0 again
    });
  });

  describe('error handling', () => {
    it('should propagate fetcher errors', async () => {
      const mockFetcher = vi.fn().mockRejectedValue(new Error('Offset fetch failed'));
      const paginator = new OffsetPaginator(mockFetcher);

      await expect(paginator.all()).rejects.toThrow('Offset fetch failed');
    });
  });

  describe('integration with different page sizes', () => {
    it('should handle exact page size matches', async () => {
      const allData: TestItem[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
      ];

      const mockFetcher = createMockOffsetFetcher(allData);
      const paginator = new OffsetPaginator(mockFetcher, { pageSize: 2 });

      const results: TestItem[][] = [];
      for await (const page of paginator) {
        results.push(page);
      }

      expect(results).toHaveLength(2);
      expect(results[0]).toHaveLength(2);
      expect(results[1]).toHaveLength(2);
    });
  });
});
