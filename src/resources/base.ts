/**
 * Base resource class
 */
import type { HttpClient } from '../client/base.js';

export abstract class BaseResource {
  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Get the current API version path from the HTTP client
   * @returns API version path (e.g., '/12')
   */
  protected getApiVersionPath(): string {
    return `/${this.httpClient.getAPIVersion()}`;
  }

  /**
   * Build endpoint with current API version
   * @param path - API path without version
   * @returns Complete endpoint with API version
   */
  protected buildEndpoint(path: string): string {
    return `${this.getApiVersionPath()}${path}`;
  }
}
