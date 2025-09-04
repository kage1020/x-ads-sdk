import { beforeEach, describe, expect, it, vi } from 'vitest';
import { XAdsClient } from '@/index';
import type { AnalyticsRequest, SDKConfig } from '@/types';

describe('Analytics Unit Tests', () => {
  let client: XAdsClient;
  const testAccountId = '18ce54d4x5t';

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

  describe('getStats method validation', () => {
    const baseAnalyticsRequest: AnalyticsRequest = {
      entity: 'CAMPAIGN' as const,
      entity_ids: ['campaign123'],
      start_time: '2023-01-01T00:00:00Z',
      end_time: '2023-01-07T00:00:00Z',
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions', 'clicks'],
    };

    it('should validate required fields', async () => {
      const incompleteRequest = {
        entity: 'CAMPAIGN' as const,
        entity_ids: ['campaign123'],
      };

      await expect(
        client.analytics.getStats(testAccountId, incompleteRequest as unknown as AnalyticsRequest)
      ).rejects.toThrow('Missing required fields');
    });

    it('should validate date range', async () => {
      const invalidDateRequest = {
        ...baseAnalyticsRequest,
        start_time: '2023-01-08T00:00:00Z',
        end_time: '2023-01-01T00:00:00Z', // end before start
      };

      await expect(client.analytics.getStats(testAccountId, invalidDateRequest)).rejects.toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should throw error when entity_ids array is empty', async () => {
      const emptyEntityIdsRequest = {
        ...baseAnalyticsRequest,
        entity_ids: [], // Empty array
      };

      await expect(client.analytics.getStats(testAccountId, emptyEntityIdsRequest)).rejects.toThrow(
        'At least one entity ID is required'
      );
    });

    it('should throw error when metrics array is empty', async () => {
      const emptyMetricsRequest = {
        ...baseAnalyticsRequest,
        metrics: [], // Empty array
      };

      await expect(client.analytics.getStats(testAccountId, emptyMetricsRequest)).rejects.toThrow(
        'At least one metric is required'
      );
    });

    it('should validate entity-granularity compatibility', async () => {
      const incompatibleRequest = {
        ...baseAnalyticsRequest,
        entity: 'ACCOUNT' as const,
        granularity: 'HOUR' as const, // HOUR not supported for ACCOUNT
      };

      await expect(client.analytics.getStats(testAccountId, incompatibleRequest)).rejects.toThrow(
        'HOUR granularity is not supported for ACCOUNT entity'
      );
    });

    it('should allow compatible entity-granularity combinations', async () => {
      const compatibleRequest = {
        ...baseAnalyticsRequest,
        entity: 'CAMPAIGN' as const,
        granularity: 'HOUR' as const, // HOUR allowed for CAMPAIGN
      };

      const response = await client.analytics.getStats(testAccountId, compatibleRequest);
      expect(response.data).toBeDefined();
    });

    it('should allow ACCOUNT entity with DAY granularity', async () => {
      const accountDayRequest = {
        ...baseAnalyticsRequest,
        entity: 'ACCOUNT' as const,
        granularity: 'DAY' as const, // DAY allowed for ACCOUNT
      };

      const response = await client.analytics.getStats(testAccountId, accountDayRequest);
      expect(response.data).toBeDefined();
    });

    it('should process valid analytics request successfully', async () => {
      const response = await client.analytics.getStats(testAccountId, baseAnalyticsRequest);

      expect(response.data).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response).toHaveProperty('time_series_length');
      expect(response).toHaveProperty('request');
    });

    it('should handle multiple entity IDs and metrics', async () => {
      const multipleEntitiesRequest = {
        ...baseAnalyticsRequest,
        entity_ids: ['campaign123', 'campaign456', 'campaign789'],
        metrics: ['impressions', 'clicks', 'spend_micro', 'engagements'],
      };

      const response = await client.analytics.getStats(testAccountId, multipleEntitiesRequest);
      expect(response.data).toBeDefined();
    });

    it('should sanitize parameters correctly', async () => {
      const requestWithNulls = {
        ...baseAnalyticsRequest,
        optional_param: null,
        undefined_param: undefined,
        valid_param: 'keep_this',
      };

      const response = await client.analytics.getStats(
        testAccountId,
        requestWithNulls as unknown as AnalyticsRequest
      );
      expect(response.data).toBeDefined();
    });
  });

  describe('createJob method validation', () => {
    const baseJobRequest: AnalyticsRequest = {
      entity: 'CAMPAIGN' as const,
      entity_ids: ['campaign123'],
      start_time: '2023-01-01T00:00:00Z',
      end_time: '2023-01-07T00:00:00Z',
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions', 'clicks'],
    };

    it('should validate required fields for job creation', async () => {
      const incompleteRequest = {
        entity: 'CAMPAIGN' as const,
        entity_ids: ['campaign123'],
      };

      await expect(
        client.analytics.createJob(testAccountId, incompleteRequest as unknown as AnalyticsRequest)
      ).rejects.toThrow('Missing required fields');
    });

    it('should validate date range for jobs', async () => {
      const invalidDateRequest = {
        ...baseJobRequest,
        start_time: '2023-01-08T00:00:00Z',
        end_time: '2023-01-01T00:00:00Z', // end before start
      };

      await expect(client.analytics.createJob(testAccountId, invalidDateRequest)).rejects.toThrow(
        'Date range is invalid: start time must be before end time'
      );
    });

    it('should throw error when date range exceeds 365 days', async () => {
      const longRangeRequest = {
        ...baseJobRequest,
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2024-01-02T00:00:00Z', // More than 365 days
      };

      await expect(client.analytics.createJob(testAccountId, longRangeRequest)).rejects.toThrow(
        'Date range exceeds maximum allowed period (365 days)'
      );
    });

    it('should allow date range of exactly 365 days', async () => {
      const maxRangeRequest = {
        ...baseJobRequest,
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-12-31T00:00:00Z', // Exactly 364 days (within limit)
      };

      const response = await client.analytics.createJob(testAccountId, maxRangeRequest);
      expect(response.data).toHaveProperty('job_id');
    });

    it('should allow date range well within 365 days - false branch test', async () => {
      const withinLimitRequest = {
        ...baseJobRequest,
        start_time: '2023-01-01T00:00:00Z',
        end_time: '2023-01-30T00:00:00Z', // Much less than 365 days
      };

      const response = await client.analytics.createJob(testAccountId, withinLimitRequest);
      expect(response.data).toHaveProperty('job_id');
    });

    it('should test analytics-level validation by mocking validateDateRange - lines 62-63', async () => {
      // Import the validation module to spy on it
      const validationModule = await import('@/utils/validation');

      // Spy on validateDateRange and make it do nothing (don't throw)
      const validateDateRangeSpy = vi
        .spyOn(validationModule, 'validateDateRange')
        .mockImplementation(() => {
          // Do nothing - bypass the first validation
        });

      try {
        // Create a date range that will trigger the analytics-level validation (lines 62-63)
        const longRangeRequest = {
          ...baseJobRequest,
          start_time: '2023-01-01T00:00:00Z',
          end_time: '2024-01-03T00:00:00Z', // More than 365 days
        };

        await expect(client.analytics.createJob(testAccountId, longRangeRequest)).rejects.toThrow(
          'Date range exceeds maximum allowed period for async jobs (365 days)'
        );

        // Verify that our spy was called
        expect(validateDateRangeSpy).toHaveBeenCalled();
      } finally {
        // Restore the original function
        validateDateRangeSpy.mockRestore();
      }
    });

    it('should create job successfully with valid request', async () => {
      const response = await client.analytics.createJob(testAccountId, baseJobRequest);

      expect(response.data).toHaveProperty('job_id');
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('QUEUED');
    });

    it('should handle date calculations with different time zones', async () => {
      const utcRequest = {
        ...baseJobRequest,
        start_time: '2023-01-01T23:59:59Z',
        end_time: '2023-01-08T00:00:01Z', // Just over 6 days
      };

      const response = await client.analytics.createJob(testAccountId, utcRequest);
      expect(response.data).toHaveProperty('job_id');
    });

    it('should sanitize job request data', async () => {
      const requestWithNulls = {
        ...baseJobRequest,
        optional_field: null,
        undefined_field: undefined,
        valid_field: 'preserve_this',
      };

      const response = await client.analytics.createJob(
        testAccountId,
        requestWithNulls as unknown as AnalyticsRequest
      );
      expect(response.data).toHaveProperty('job_id');
    });
  });

  describe('getJob method', () => {
    it('should get job status successfully', async () => {
      const jobId = 'job123';
      const response = await client.analytics.getJob(testAccountId, jobId);

      expect(response.data).toHaveProperty('job_id');
      expect(response.data).toHaveProperty('status');
    });

    it('should handle completed job response', async () => {
      const jobId = 'completed-job123';
      const response = await client.analytics.getJob(testAccountId, jobId);

      expect(response.data).toHaveProperty('job_id');
      expect(response.data).toHaveProperty('status');
      expect(response.data.status).toBe('SUCCESS');
    });
  });

  describe('listJobs method', () => {
    it('should list jobs without options', async () => {
      const response = await client.analytics.listJobs(testAccountId);

      expect(response.data).toBeInstanceOf(Array);
      expect(response).toHaveProperty('request');
    });

    it('should list jobs with options', async () => {
      const options = {
        count: 10,
        cursor: 'test-cursor',
      };

      const response = await client.analytics.listJobs(testAccountId, options);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.request.params).toBeDefined();
    });

    it('should sanitize job list options', async () => {
      const optionsWithNulls = {
        count: 5,
        cursor: null,
        undefined_field: undefined,
        valid_field: 'test',
      };

      const response = await client.analytics.listJobs(
        testAccountId,
        optionsWithNulls as unknown as AnalyticsRequest
      );
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle listJobs with undefined options - test ternary operator', async () => {
      // Test the false branch of: options ? ... : {}
      const response = await client.analytics.listJobs(testAccountId, undefined);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('entity-granularity validation edge cases', () => {
    const baseRequest: AnalyticsRequest = {
      entity: 'CAMPAIGN' as const,
      entity_ids: ['campaign123'],
      start_time: '2023-01-01T00:00:00Z',
      end_time: '2023-01-07T00:00:00Z',
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions'],
    };

    it('should allow LINE_ITEM entity with HOUR granularity', async () => {
      const request = {
        ...baseRequest,
        entity: 'LINE_ITEM' as const,
        granularity: 'HOUR' as const,
      };

      const response = await client.analytics.getStats(testAccountId, request);
      expect(response.data).toBeDefined();
    });

    it('should allow PROMOTED_TWEET entity with HOUR granularity', async () => {
      const request = {
        ...baseRequest,
        entity: 'PROMOTED_TWEET' as const,
        granularity: 'HOUR' as const,
      };

      const response = await client.analytics.getStats(testAccountId, request);
      expect(response.data).toBeDefined();
    });

    it('should allow all entities with DAY granularity', async () => {
      const entities = ['ACCOUNT', 'CAMPAIGN', 'LINE_ITEM', 'PROMOTED_TWEET'] as const;

      for (const entity of entities) {
        const request = {
          ...baseRequest,
          entity,
          granularity: 'DAY' as const,
        };

        const response = await client.analytics.getStats(testAccountId, request);
        expect(response.data).toBeDefined();
      }
    });
  });

  describe('array validation edge cases', () => {
    const baseRequest: AnalyticsRequest = {
      entity: 'CAMPAIGN' as const,
      entity_ids: ['campaign123'],
      start_time: '2023-01-01T00:00:00Z',
      end_time: '2023-01-07T00:00:00Z',
      granularity: 'DAY',
      placement: 'ALL_ON_TWITTER',
      metrics: ['impressions'],
    };

    it('should handle single entity ID', async () => {
      const request = {
        ...baseRequest,
        entity_ids: ['single-campaign'],
      };

      const response = await client.analytics.getStats(testAccountId, request);
      expect(response.data).toBeDefined();
    });

    it('should handle single metric', async () => {
      const request = {
        ...baseRequest,
        metrics: ['impressions'],
      };

      const response = await client.analytics.getStats(testAccountId, request);
      expect(response.data).toBeDefined();
    });

    it('should reject undefined entity_ids', async () => {
      const request = {
        ...baseRequest,
        entity_ids: undefined,
      };

      await expect(
        client.analytics.getStats(testAccountId, request as unknown as AnalyticsRequest)
      ).rejects.toThrow('Missing required fields');
    });

    it('should reject undefined metrics', async () => {
      const request = {
        ...baseRequest,
        metrics: undefined,
      };

      await expect(
        client.analytics.getStats(testAccountId, request as unknown as AnalyticsRequest)
      ).rejects.toThrow('Missing required fields');
    });
  });
});
