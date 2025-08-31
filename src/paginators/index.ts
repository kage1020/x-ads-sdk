export interface PaginatorOptions {
  maxResults?: number;
  pageSize?: number;
}

export interface CursorPaginatorResult<T> {
  data: T[];
  next_cursor?: string;
  previous_cursor?: string;
  total_count?: number;
}

export class CursorPaginator<T> implements AsyncIterable<T[]> {
  private currentCursor?: string;
  private hasMore = true;
  private totalFetched = 0;

  constructor(
    private fetcher: (cursor?: string, count?: number) => Promise<CursorPaginatorResult<T>>,
    private options: PaginatorOptions = {}
  ) {}

  async *[Symbol.asyncIterator](): AsyncIterator<T[]> {
    while (this.hasMore && this.shouldContinue()) {
      const result = await this.fetcher(this.currentCursor, this.options.pageSize);

      if (result.data.length === 0) {
        break;
      }

      this.totalFetched += result.data.length;
      this.currentCursor = result.next_cursor;
      this.hasMore = !!result.next_cursor;

      yield result.data;
    }
  }

  async *items(): AsyncIterableIterator<T> {
    for await (const page of this) {
      for (const item of page) {
        yield item;
      }
    }
  }

  async all(): Promise<T[]> {
    const allItems: T[] = [];
    for await (const page of this) {
      allItems.push(...page);
    }
    return allItems;
  }

  async first(count = 1): Promise<T[]> {
    const items: T[] = [];
    for await (const item of this.items()) {
      items.push(item);
      if (items.length >= count) {
        break;
      }
    }
    return items;
  }

  private shouldContinue(): boolean {
    if (this.options.maxResults) {
      return this.totalFetched < this.options.maxResults;
    }
    return true;
  }

  reset(): void {
    this.currentCursor = undefined;
    this.hasMore = true;
    this.totalFetched = 0;
  }
}

export class OffsetPaginator<T> implements AsyncIterable<T[]> {
  private currentOffset = 0;
  private hasMore = true;
  private totalFetched = 0;

  constructor(
    private fetcher: (
      offset: number,
      limit?: number
    ) => Promise<{ data: T[]; total_count?: number }>,
    private options: PaginatorOptions = {}
  ) {}

  async *[Symbol.asyncIterator](): AsyncIterator<T[]> {
    while (this.hasMore && this.shouldContinue()) {
      const result = await this.fetcher(this.currentOffset, this.options.pageSize);

      if (result.data.length === 0) {
        break;
      }

      this.totalFetched += result.data.length;
      this.currentOffset += result.data.length;

      // Check if we have more based on page size
      this.hasMore = result.data.length === (this.options.pageSize || 20);

      yield result.data;
    }
  }

  async *items(): AsyncIterableIterator<T> {
    for await (const page of this) {
      for (const item of page) {
        yield item;
      }
    }
  }

  async all(): Promise<T[]> {
    const allItems: T[] = [];
    for await (const page of this) {
      allItems.push(...page);
    }
    return allItems;
  }

  private shouldContinue(): boolean {
    if (this.options.maxResults) {
      return this.totalFetched < this.options.maxResults;
    }
    return true;
  }

  reset(): void {
    this.currentOffset = 0;
    this.hasMore = true;
    this.totalFetched = 0;
  }
}
