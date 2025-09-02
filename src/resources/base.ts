/**
 * Base resource class
 */
import type { HttpClient } from '../client/base.js';

export abstract class BaseResource {
  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
}
