/**
 * API Version Management Types for X Ads SDK
 *
 * X Ads API follows a 6-month deprecation cycle with 2 concurrent versions supported.
 * This module provides type-safe version management.
 */

export enum APIVersion {
  V11 = '11.0',
  V12 = '12.0',
  // Add new versions as they are released
}

export const SUPPORTED_VERSIONS = [APIVersion.V11, APIVersion.V12] as const;
export const DEFAULT_VERSION = APIVersion.V12;
export const LEGACY_VERSION = APIVersion.V11;

export type SupportedAPIVersion = (typeof SUPPORTED_VERSIONS)[number];

export interface APIVersionInfo {
  version: APIVersion;
  releaseDate: Date;
  deprecationDate?: Date;
  isDefault: boolean;
  isDeprecated: boolean;
  supportedUntil?: Date;
}

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

export interface APIVersionResponse {
  currentVersion: APIVersion;
  warnings: string[];
  isVersionSupported: boolean;
  recommendedAction?: 'upgrade' | 'maintain' | 'none';
}

export class APIVersionManager {
  private version: APIVersion;
  private autoUpgrade: boolean;

  constructor(version: APIVersion = DEFAULT_VERSION, autoUpgrade: boolean = false) {
    this.version = version;
    this.autoUpgrade = autoUpgrade;
    this.validateVersion(version);
  }

  private validateVersion(version: APIVersion): void {
    if (!SUPPORTED_VERSIONS.includes(version as SupportedAPIVersion)) {
      throw new Error(
        `Unsupported API version: ${version}. Supported versions: ${SUPPORTED_VERSIONS.join(', ')}`
      );
    }
  }

  getCurrentVersion(): APIVersion {
    return this.version;
  }

  setVersion(version: APIVersion): void {
    this.validateVersion(version);
    this.version = version;
  }

  getVersionPath(): string {
    return `/${this.version}`;
  }

  isVersionDeprecated(version?: APIVersion): boolean {
    const targetVersion = version || this.version;
    return API_VERSION_METADATA[targetVersion].isDeprecated;
  }

  getVersionInfo(version?: APIVersion): APIVersionInfo {
    const targetVersion = version || this.version;
    return API_VERSION_METADATA[targetVersion];
  }

  shouldUpgrade(): boolean {
    return this.isVersionDeprecated() && this.autoUpgrade;
  }

  getUpgradeRecommendation(): APIVersionResponse {
    const currentInfo = this.getVersionInfo();
    const warnings: string[] = [];
    let recommendedAction: 'upgrade' | 'maintain' | 'none' = 'none';

    if (currentInfo.isDeprecated) {
      warnings.push(
        `API version ${this.version} is deprecated. Consider upgrading to ${DEFAULT_VERSION}.`
      );
      recommendedAction = 'upgrade';
    }

    if (currentInfo.supportedUntil && currentInfo.supportedUntil < new Date()) {
      warnings.push(`API version ${this.version} is no longer supported.`);
      recommendedAction = 'upgrade';
    }

    return {
      currentVersion: this.version,
      warnings,
      isVersionSupported: SUPPORTED_VERSIONS.includes(this.version as SupportedAPIVersion),
      recommendedAction,
    };
  }

  parseResponseHeaders(headers: Record<string, string>): APIVersionResponse {
    const currentVersionHeader = headers['x-current-api-version'];
    const warningHeader = headers['x-api-warn'];

    const warnings: string[] = [];
    if (warningHeader) {
      warnings.push(warningHeader);
    }

    let recommendedAction: 'upgrade' | 'maintain' | 'none' = 'none';

    // If API reports a different current version, suggest upgrade
    if (currentVersionHeader && currentVersionHeader !== this.version) {
      warnings.push(
        `API reports current version as ${currentVersionHeader}, you are using ${this.version}`
      );
      recommendedAction = 'upgrade';
    }

    return {
      currentVersion: this.version,
      warnings,
      isVersionSupported: true, // If we got a response, version is supported
      recommendedAction,
    };
  }

  /**
   * Migrates endpoints between versions
   * Some endpoints may change between versions
   */
  migrateEndpoint(endpoint: string, _fromVersion: APIVersion, _toVersion: APIVersion): string {
    // This would contain version-specific endpoint migrations
    // For now, most endpoints remain the same between versions
    return endpoint;
  }

  /**
   * Gets all available versions with their status
   */
  static getAllVersions(): APIVersionInfo[] {
    return Object.values(API_VERSION_METADATA);
  }

  /**
   * Gets the latest supported version
   */
  static getLatestVersion(): APIVersion {
    return DEFAULT_VERSION;
  }

  /**
   * Checks if a version is currently supported
   */
  static isVersionSupported(version: APIVersion): boolean {
    return SUPPORTED_VERSIONS.includes(version as SupportedAPIVersion);
  }
}

export default APIVersionManager;
