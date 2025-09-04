// Base types for API parameters
export type PrimitiveValue = string | number | boolean | null;
export type QueryParamValue = PrimitiveValue | PrimitiveValue[] | unknown;
export type QueryParams = Record<string, QueryParamValue>;
export type RequestData = Record<string, unknown> | FormData;

export interface APIError {
  code: string;
  message: string;
  parameter?: string;
  details?: string;
}

export interface ErrorResponse {
  errors: APIError[];
  request: {
    params: QueryParams;
  };
}

export interface BaseResponse<T> {
  data: T;
}

export interface ListResponse<T> {
  data: T[];
  next_cursor?: string;
  request: {
    params: QueryParams;
  };
}

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  params?: QueryParams;
  data?: RequestData;
  headers?: Record<string, string>;
  timeout?: number;
}
