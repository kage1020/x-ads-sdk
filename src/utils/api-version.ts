import { APIVersion, type APIVersionInfo, type SupportedAPIVersion } from '../types/api-version.js';

/**
 * Metadata for all API versions
 */
export const API_VERSION_METADATA: Record<APIVersion, APIVersionInfo> = {
  [APIVersion.V11]: {
    version: APIVersion.V11,
    releaseDate: new Date('2022-03-31'),
    deprecationDate: new Date('2022-10-27'), // When v12 was released
    supportedUntil: new Date('2023-04-27'), // 6 months after v12 release
    isDefault: false,
    isDeprecated: true,
  },
  [APIVersion.V12]: {
    version: APIVersion.V12,
    releaseDate: new Date('2022-10-27'),
    isDefault: true,
    isDeprecated: false,
  },
};

/**
 * Default API version to use when none specified
 */
export const DEFAULT_VERSION = APIVersion.V12;

/**
 * Legacy API version for backwards compatibility
 */
export const LEGACY_VERSION = APIVersion.V11;

/**
 * Array of all supported API versions
 */
export const SUPPORTED_VERSIONS: SupportedAPIVersion[] = [APIVersion.V11, APIVersion.V12];
