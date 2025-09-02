/**
 * API Version Management Types for X Ads SDK
 *
 * X Ads API follows a 6-month deprecation cycle with 2 concurrent versions supported.
 * This module provides type-safe version management.
 */

/**
 * Supported API versions for X (Twitter) Ads API
 */
export enum APIVersion {
  V11 = '11.0',
  V12 = '12.0',
  // Add new versions as they are released
}

/**
 * Type for supported API versions
 */
export type SupportedAPIVersion = APIVersion.V11 | APIVersion.V12;

/**
 * Information about an API version
 */
export interface APIVersionInfo {
  version: APIVersion;
  releaseDate: Date;
  deprecationDate?: Date;
  isDefault: boolean;
  isDeprecated: boolean;
  supportedUntil?: Date;
}

/**
 * Response from API version operations
 */
export interface APIVersionResponse {
  currentVersion: APIVersion;
  warnings: string[];
  isVersionSupported: boolean;
  recommendedAction?: 'upgrade' | 'maintain' | 'none';
}
