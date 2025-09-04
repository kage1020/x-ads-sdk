import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';
import type {
  TargetingCriteria,
  TargetingCriteriaCreateData,
  TargetingCriteriaListOptions,
} from '@/types/targeting';

describe('Targeting Contract Tests', () => {
  let client: XAdsClient;
  const testAccountId = '18ce54d4x5t';
  const testLineItemId = 'lineitem123';

  beforeEach(() => {
    const config: SDKConfig = {
      credentials: {
        consumerKey: 'test-consumer-key',
        consumerSecret: 'test-consumer-secret',
        accessToken: 'test-access-token',
        accessTokenSecret: 'test-access-token-secret',
      },
      environment: 'sandbox',
    };

    client = new XAdsClient(config);
  });

  describe('Create Targeting Criteria', () => {
    it('should create targeting criteria successfully', async () => {
      const criteriaData: TargetingCriteriaCreateData = {
        line_item_id: testLineItemId,
        targeting_type: 'LOCATION',
        targeting_value: 'US',
        name: 'US Location Targeting',
      };

      const response = await client.targeting.create(testAccountId, testLineItemId, criteriaData);

      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'US Location Targeting');
      expect(response.data).toHaveProperty('account_id', testAccountId);
      expect(response.data).toHaveProperty('line_item_id', testLineItemId);
      expect(response.data).toHaveProperty('targeting_type', 'LOCATION');
      expect(response.data).toHaveProperty('targeting_value', 'US');
      expect(response.data).toHaveProperty('created_at');
      expect(response.data).toHaveProperty('updated_at');
      expect(response.data).toHaveProperty('deleted', false);
    });

    it('should create age targeting criteria', async () => {
      const criteriaData: TargetingCriteriaCreateData = {
        line_item_id: testLineItemId,
        targeting_type: 'AGE',
        targeting_value: '25-34',
      };

      const response = await client.targeting.create(testAccountId, testLineItemId, criteriaData);

      expect(response.data).toHaveProperty('targeting_type', 'AGE');
      expect(response.data).toHaveProperty('targeting_value', '25-34');
    });

    it('should create gender targeting criteria', async () => {
      const criteriaData: TargetingCriteriaCreateData = {
        line_item_id: testLineItemId,
        targeting_type: 'GENDER',
        targeting_value: 'MALE',
      };

      const response = await client.targeting.create(testAccountId, testLineItemId, criteriaData);

      expect(response.data).toHaveProperty('targeting_type', 'GENDER');
      expect(response.data).toHaveProperty('targeting_value', 'MALE');
    });

    it('should handle validation errors for missing fields', async () => {
      const invalidData = {
        line_item_id: testLineItemId,
        targeting_type: 'LOCATION',
        // missing targeting_value
      } as TargetingCriteriaCreateData;

      await expect(
        client.targeting.create(testAccountId, testLineItemId, invalidData)
      ).rejects.toThrow();
    });

    it('should handle long targeting criteria names', async () => {
      const longName = 'a'.repeat(300); // Very long name

      const criteriaData: TargetingCriteriaCreateData = {
        line_item_id: testLineItemId,
        targeting_type: 'LOCATION',
        targeting_value: 'US',
        name: longName,
      };

      await expect(
        client.targeting.create(testAccountId, testLineItemId, criteriaData)
      ).rejects.toThrow();
    });
  });

  describe('List Targeting Criteria', () => {
    it('should list all targeting criteria', async () => {
      const response = await client.targeting.list(testAccountId);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data[0]).toHaveProperty('id');
      expect(response.data[0]).toHaveProperty('name');
      expect(response.data[0]).toHaveProperty('targeting_type');
      expect(response.data[0]).toHaveProperty('targeting_value');
      expect(response.data[0]).toHaveProperty('account_id', testAccountId);
      expect(response.request).toHaveProperty('params');
    });

    it('should list targeting criteria with filtering options', async () => {
      const options: TargetingCriteriaListOptions = {
        line_item_id: testLineItemId,
        targeting_types: ['LOCATION', 'AGE'],
        count: 10,
        cursor: 'test-cursor',
      };

      const response = await client.targeting.list(testAccountId, options);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.request.params).toHaveProperty('line_item_id', testLineItemId);
    });

    it('should handle empty targeting criteria list', async () => {
      const response = await client.targeting.list('empty-account');

      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('Delete Targeting Criteria', () => {
    it('should delete targeting criteria successfully', async () => {
      const criteriaId = 'targeting123';
      const response = await client.targeting.delete(testAccountId, criteriaId);

      expect(response.data).toHaveProperty('id', criteriaId);
      expect(response.data).toHaveProperty('deleted', true);
      expect(response.data).toHaveProperty('account_id', testAccountId);
    });

    it('should handle non-existent targeting criteria deletion', async () => {
      await expect(client.targeting.delete(testAccountId, 'non-existent')).rejects.toThrow();
    });
  });

  describe('Get Targeting Criteria Options', () => {
    it('should retrieve targeting criteria location options', async () => {
      const response = await client.targeting.getCriteria(testAccountId);

      expect(response.data).toBeInstanceOf(Object);
      expect(response.data).toBeDefined();

      // Check if location options exist and have expected structure
      if (response.data.locations) {
        expect(response.data.locations).toHaveProperty('country_codes');
      }

      // Check for other targeting criteria
      expect(typeof response.data).toBe('object');
    });
  });

  describe('Tailored Audiences', () => {
    it('should list tailored audiences', async () => {
      const response = await client.targeting.getTailoredAudiences(testAccountId);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data[0]).toHaveProperty('id');
      expect(response.data[0]).toHaveProperty('name');
      expect(response.data[0]).toHaveProperty('audience_type');
      expect(response.data[0]).toHaveProperty('audience_size');
      expect(response.data[0]).toHaveProperty('account_id', testAccountId);
      expect(response.request).toHaveProperty('params');
    });

    it('should retrieve a specific tailored audience', async () => {
      const audienceId = 'audience123';
      const response = await client.targeting.getTailoredAudience(testAccountId, audienceId);

      expect(response.data).toHaveProperty('id', audienceId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('audience_type');
      expect(response.data).toHaveProperty('audience_size');
      expect(response.data).toHaveProperty('account_id', testAccountId);
    });

    it('should handle non-existent tailored audience', async () => {
      await expect(
        client.targeting.getTailoredAudience(testAccountId, 'non-existent')
      ).rejects.toThrow();
    });
  });

  describe('Targeting Client Integration', () => {
    it('should have targeting client available on main client', () => {
      expect(client.targeting).toBeDefined();
      expect(typeof client.targeting.create).toBe('function');
      expect(typeof client.targeting.list).toBe('function');
      expect(typeof client.targeting.delete).toBe('function');
      expect(typeof client.targeting.getCriteria).toBe('function');
      expect(typeof client.targeting.getTailoredAudiences).toBe('function');
      expect(typeof client.targeting.getTailoredAudience).toBe('function');
    });

    it('should handle different targeting types', async () => {
      const targetingTypes: Array<TargetingCriteria['targeting_type']> = [
        'LOCATION',
        'AGE',
        'GENDER',
        'LANGUAGE',
        'BROAD_KEYWORD',
      ];

      for (const targetingType of targetingTypes) {
        const criteriaData: TargetingCriteriaCreateData = {
          line_item_id: testLineItemId,
          targeting_type: targetingType,
          targeting_value: 'test-value',
        };

        const response = await client.targeting.create(testAccountId, testLineItemId, criteriaData);
        expect(response.data).toHaveProperty('targeting_type', targetingType);
      }
    });

    it('should handle concurrent targeting operations', async () => {
      const operations = [
        client.targeting.list(testAccountId),
        client.targeting.getCriteria(testAccountId),
        client.targeting.getTailoredAudiences(testAccountId),
      ];

      const results = await Promise.all(operations);

      expect(results).toHaveLength(3);
      expect(results[0].data).toBeInstanceOf(Array); // list criteria
      expect(results[1].data).toBeInstanceOf(Array); // criteria options
      expect(results[2].data).toBeInstanceOf(Array); // tailored audiences
    });

    it('should validate parameter requirements', async () => {
      // Test empty account ID
      await expect(client.targeting.list('')).rejects.toThrow();

      // Test empty criteria ID for deletion
      await expect(client.targeting.delete(testAccountId, '')).rejects.toThrow();

      // Test empty audience ID
      await expect(client.targeting.getTailoredAudience(testAccountId, '')).rejects.toThrow();
    });
  });
});
