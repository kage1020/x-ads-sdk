import type { HttpClient } from '../client/base';
import { CursorPaginator, type PaginatorOptions } from '../paginators';
import type { APIResponse, ListParams, PaginatedResponse } from '../types/common';

export abstract class BaseModule {
  protected client: HttpClient;
  protected baseEndpoint: string;

  constructor(client: HttpClient, baseEndpoint: string) {
    this.client = client;
    this.baseEndpoint = baseEndpoint;
  }

  protected buildEndpoint(accountId: string, ...segments: string[]): string {
    const parts = [this.baseEndpoint, accountId, ...segments.filter(Boolean)];
    return `/${parts.join('/')}`;
  }

  protected async makeListRequest<T>(
    endpoint: string,
    params: ListParams = {}
  ): Promise<PaginatedResponse<T>> {
    const response = await this.client.get<APIResponse<PaginatedResponse<T>>>(endpoint, params);
    return response.data;
  }

  protected async makeGetRequest<T>(endpoint: string): Promise<T> {
    const response = await this.client.get<APIResponse<T>>(endpoint);
    return response.data;
  }

  protected async makePostRequest<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await this.client.post<APIResponse<T>>(endpoint, body);
    return response.data;
  }

  protected async makePutRequest<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await this.client.put<APIResponse<T>>(endpoint, body);
    return response.data;
  }

  protected async makeDeleteRequest(endpoint: string): Promise<void> {
    await this.client.delete(endpoint);
  }

  protected createPaginator<T>(
    endpoint: string,
    baseParams: Record<string, unknown> = {},
    options: PaginatorOptions = {}
  ): CursorPaginator<T> {
    const fetcher = async (cursor?: string, count?: number) => {
      const params = {
        ...baseParams,
        ...(cursor && { cursor }),
        ...(count && { count }),
      };

      return this.makeListRequest<T>(endpoint, params);
    };

    return new CursorPaginator(fetcher, options);
  }
}
