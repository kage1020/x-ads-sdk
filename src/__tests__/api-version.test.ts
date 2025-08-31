import { beforeEach, describe, expect, it } from 'vitest';
import {
  API_VERSION_METADATA,
  APIVersion,
  APIVersionManager,
  DEFAULT_VERSION,
  SUPPORTED_VERSIONS,
} from '../types/api-version';

describe('APIVersionManager', () => {
  let versionManager: APIVersionManager;

  beforeEach(() => {
    versionManager = new APIVersionManager();
  });

  describe('construction', () => {
    it('should use default version when not specified', () => {
      expect(versionManager.getCurrentVersion()).toBe(DEFAULT_VERSION);
    });

    it('should accept specific version', () => {
      const manager = new APIVersionManager(APIVersion.V11);
      expect(manager.getCurrentVersion()).toBe(APIVersion.V11);
    });

    it('should throw error for unsupported version', () => {
      expect(() => {
        new APIVersionManager('unsupported' as APIVersion);
      }).toThrow('Unsupported API version');
    });
  });

  describe('version management', () => {
    it('should return correct version path', () => {
      expect(versionManager.getVersionPath()).toBe('/12.0');

      versionManager.setVersion(APIVersion.V11);
      expect(versionManager.getVersionPath()).toBe('/11.0');
    });

    it('should validate version when setting', () => {
      expect(() => {
        versionManager.setVersion('invalid' as APIVersion);
      }).toThrow('Unsupported API version');
    });

    it('should get version info correctly', () => {
      const info = versionManager.getVersionInfo();
      expect(info.version).toBe(DEFAULT_VERSION);
      expect(info.isDefault).toBe(true);
    });
  });

  describe('deprecation handling', () => {
    it('should identify deprecated versions', () => {
      versionManager.setVersion(APIVersion.V11);
      expect(versionManager.isVersionDeprecated()).toBe(true);
    });

    it('should identify current versions', () => {
      versionManager.setVersion(APIVersion.V12);
      expect(versionManager.isVersionDeprecated()).toBe(false);
    });

    it('should provide upgrade recommendations', () => {
      versionManager.setVersion(APIVersion.V11);
      const recommendation = versionManager.getUpgradeRecommendation();

      expect(recommendation.currentVersion).toBe(APIVersion.V11);
      expect(recommendation.warnings.length).toBeGreaterThan(0);
      expect(recommendation.recommendedAction).toBe('upgrade');
    });
  });

  describe('response header parsing', () => {
    it('should parse version headers correctly', () => {
      const headers = {
        'x-current-api-version': '12.0',
        'x-api-warn': 'Version 11.0 is deprecated',
      };

      const response = versionManager.parseResponseHeaders(headers);
      expect(response.warnings).toHaveLength(1);
      expect(response.warnings[0]).toContain('deprecated');
    });

    it('should detect version mismatch', () => {
      versionManager.setVersion(APIVersion.V11);
      const headers = {
        'x-current-api-version': '12.0',
      };

      const response = versionManager.parseResponseHeaders(headers);
      expect(response.warnings).toHaveLength(1);
      expect(response.warnings[0]).toContain('current version as 12.0');
      expect(response.recommendedAction).toBe('upgrade');
    });

    it('should handle missing headers gracefully', () => {
      const response = versionManager.parseResponseHeaders({});
      expect(response.warnings).toHaveLength(0);
      expect(response.recommendedAction).toBe('none');
    });
  });

  describe('static methods', () => {
    it('should return all versions', () => {
      const versions = APIVersionManager.getAllVersions();
      expect(versions).toHaveLength(2);
      expect(versions).toContain(API_VERSION_METADATA[APIVersion.V11]);
      expect(versions).toContain(API_VERSION_METADATA[APIVersion.V12]);
    });

    it('should return latest version', () => {
      expect(APIVersionManager.getLatestVersion()).toBe(DEFAULT_VERSION);
    });

    it('should check version support', () => {
      expect(APIVersionManager.isVersionSupported(APIVersion.V12)).toBe(true);
      expect(APIVersionManager.isVersionSupported(APIVersion.V11)).toBe(true);
      expect(APIVersionManager.isVersionSupported('unsupported' as APIVersion)).toBe(false);
    });
  });

  describe('endpoint migration', () => {
    it('should return same endpoint for now', () => {
      const endpoint = '/accounts';
      const migrated = versionManager.migrateEndpoint(endpoint, APIVersion.V11, APIVersion.V12);
      expect(migrated).toBe(endpoint);
    });
  });

  describe('auto upgrade', () => {
    it('should suggest upgrade when enabled and version deprecated', () => {
      const manager = new APIVersionManager(APIVersion.V11, true);
      expect(manager.shouldUpgrade()).toBe(true);
    });

    it('should not suggest upgrade when disabled', () => {
      const manager = new APIVersionManager(APIVersion.V11, false);
      expect(manager.shouldUpgrade()).toBe(false);
    });

    it('should not suggest upgrade for current version', () => {
      const manager = new APIVersionManager(APIVersion.V12, true);
      expect(manager.shouldUpgrade()).toBe(false);
    });
  });
});

describe('API Version constants', () => {
  it('should have correct supported versions', () => {
    expect(SUPPORTED_VERSIONS).toContain(APIVersion.V11);
    expect(SUPPORTED_VERSIONS).toContain(APIVersion.V12);
  });

  it('should have correct default version', () => {
    expect(DEFAULT_VERSION).toBe(APIVersion.V12);
  });

  it('should have valid metadata for all versions', () => {
    SUPPORTED_VERSIONS.forEach((version) => {
      const metadata = API_VERSION_METADATA[version];
      expect(metadata).toBeDefined();
      expect(metadata.version).toBe(version);
      expect(metadata.releaseDate).toBeInstanceOf(Date);
    });
  });
});
