import type {
  AuthenticationContext,
  BaseResponse,
  ListResponse,
  QueryParams,
  RequestData,
  RequestOptions,
} from '../types';
import type { HttpClient } from './http-client';

export abstract class BaseClient {
  protected http: HttpClient;
  protected context: AuthenticationContext;

  constructor(http: HttpClient, context: AuthenticationContext) {
    this.http = http;
    this.context = context;
  }

  protected async get<T>(path: string, params?: QueryParams): Promise<BaseResponse<T>> {
    const options: RequestOptions = {
      method: 'GET',
      url: `${this.context.baseUrl}${path}`,
      params,
    };

    return this.http.request<BaseResponse<T>>(options);
  }

  protected async getList<T>(path: string, params?: QueryParams): Promise<ListResponse<T>> {
    const options: RequestOptions = {
      method: 'GET',
      url: `${this.context.baseUrl}${path}`,
      params,
    };

    return this.http.request<ListResponse<T>>(options);
  }

  protected async post<T>(
    path: string,
    data?: RequestData,
    params?: QueryParams
  ): Promise<BaseResponse<T>> {
    const options: RequestOptions = {
      method: 'POST',
      url: `${this.context.baseUrl}${path}`,
      data,
      params,
    };

    return this.http.request<BaseResponse<T>>(options);
  }

  protected async put<T>(
    path: string,
    data?: RequestData,
    params?: QueryParams
  ): Promise<BaseResponse<T>> {
    const options: RequestOptions = {
      method: 'PUT',
      url: `${this.context.baseUrl}${path}`,
      data,
      params,
    };

    return this.http.request<BaseResponse<T>>(options);
  }

  protected async deleteRequest<T>(path: string, params?: QueryParams): Promise<BaseResponse<T>> {
    const options: RequestOptions = {
      method: 'DELETE',
      url: `${this.context.baseUrl}${path}`,
      params,
    };

    return this.http.request<BaseResponse<T>>(options);
  }
}
