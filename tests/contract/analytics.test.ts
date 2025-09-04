import { describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { AnalyticsRequest } from '@/types/analytics';

describe('Analytics API Contract', () => {
  const client = new XAdsClient({
    credentials: {
      consumerKey: 'test-key',
      consumerSecret: 'test-secret',
      accessToken: 'test-token',
      accessTokenSecret: 'test-token-secret',
    },
    environment: 'sandbox',
  });

  const accountId = '18ce54d4x5t';
  const campaignId = 'campaign123';
  const lineItemId = 'lineitem123';

  describe('GET /stats/accounts/:accountId', () => {
    it('should retrieve analytics data for campaigns', async () => {
      const request: AnalyticsRequest = {
        entity: 'CAMPAIGN',
        entity_ids: [campaignId],
        start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'DAY',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions', 'clicks', 'spend_micro'],
      };

      const response = await client.analytics.getStats(accountId, request);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.time_series_length).toBeGreaterThanOrEqual(0);
      expect(response.request).toMatchObject(request);

      if (response.data.length > 0) {
        const metric = response.data[0];
        expect(metric.id).toBeDefined();
        expect(metric.id_data).toBeInstanceOf(Array);

        if (metric.id_data.length > 0) {
          const dataPoint = metric.id_data[0];
          expect(dataPoint.metrics).toBeDefined();
          expect(typeof dataPoint.metrics).toBe('object');
        }
      }
    });

    it('should retrieve analytics data for line items', async () => {
      const request: AnalyticsRequest = {
        entity: 'LINE_ITEM',
        entity_ids: [lineItemId],
        start_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'HOUR',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions', 'engagements', 'engagement_rate'],
      };

      const response = await client.analytics.getStats(accountId, request);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.request.entity).toBe('LINE_ITEM');
      expect(response.request.granularity).toBe('HOUR');
    });

    it('should support segmentation by demographics', async () => {
      const request: AnalyticsRequest = {
        entity: 'CAMPAIGN',
        entity_ids: [campaignId],
        start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'TOTAL',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions', 'clicks'],
        segmentation_type: 'AGE',
      };

      const response = await client.analytics.getStats(accountId, request);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);

      if (response.data.length > 0 && response.data[0].id_data.length > 0) {
        const dataPoint = response.data[0].id_data[0];
        if (dataPoint.segment) {
          expect(dataPoint.segment).toBeDefined();
          expect(typeof dataPoint.segment).toBe('object');
        }
      }
    });

    it('should validate required parameters', async () => {
      const invalidRequest = {
        entity: 'CAMPAIGN',
        entity_ids: [],
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'DAY',
        placement: 'ALL_ON_TWITTER',
        metrics: [],
      } as AnalyticsRequest;

      await expect(client.analytics.getStats(accountId, invalidRequest)).rejects.toThrow();
    });

    it('should validate date range constraints', async () => {
      const invalidRequest: AnalyticsRequest = {
        entity: 'CAMPAIGN',
        entity_ids: [campaignId],
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        granularity: 'DAY',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions'],
      };

      await expect(client.analytics.getStats(accountId, invalidRequest)).rejects.toThrow(
        /date range/i
      );
    });

    it('should validate entity type and granularity compatibility', async () => {
      const invalidRequest: AnalyticsRequest = {
        entity: 'ACCOUNT',
        entity_ids: [accountId],
        start_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'HOUR',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions'],
      };

      await expect(client.analytics.getStats(accountId, invalidRequest)).rejects.toThrow(
        /granularity/i
      );
    });
  });

  describe('POST /stats/jobs/accounts/:accountId', () => {
    it('should create async analytics job for large datasets', async () => {
      const request: AnalyticsRequest = {
        entity: 'CAMPAIGN',
        entity_ids: [campaignId],
        start_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'DAY',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions', 'clicks', 'spend_micro', 'engagements'],
      };

      const response = await client.analytics.createJob(accountId, request);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.job_id).toMatch(/^[a-z0-9-]+$/);
      expect(response.data.status).toBe('QUEUED');
      expect(response.data.created_at).toBeDefined();
    });

    it('should reject job creation with invalid date range', async () => {
      const invalidRequest: AnalyticsRequest = {
        entity: 'CAMPAIGN',
        entity_ids: [campaignId],
        start_time: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date().toISOString(),
        granularity: 'DAY',
        placement: 'ALL_ON_TWITTER',
        metrics: ['impressions'],
      };

      await expect(client.analytics.createJob(accountId, invalidRequest)).rejects.toThrow(
        /date range exceeds/i
      );
    });
  });

  describe('GET /stats/jobs/accounts/:accountId/:jobId', () => {
    it('should get analytics job status', async () => {
      const jobId = 'job123';
      const response = await client.analytics.getJob(accountId, jobId);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.data.job_id).toBe(jobId);
      expect(response.data.status).toMatch(/^(QUEUED|PROCESSING|SUCCESS|FAILED)$/);
      expect(response.data.created_at).toBeDefined();
      expect(response.data.updated_at).toBeDefined();
    });

    it('should include download URL when job is completed', async () => {
      const completedJobId = 'completed-job123';
      const response = await client.analytics.getJob(accountId, completedJobId);

      if (response.data.status === 'SUCCESS') {
        expect(response.data.url).toBeDefined();
        expect(response.data.url).toMatch(/^https:\/\//);
        expect(response.data.expires_at).toBeDefined();
      }
    });

    it('should throw error for non-existent job', async () => {
      const nonExistentJobId = 'non-existent-job';

      await expect(client.analytics.getJob(accountId, nonExistentJobId)).rejects.toThrow();
    });
  });

  describe('GET /stats/jobs/accounts/:accountId', () => {
    it('should list analytics jobs for account', async () => {
      const response = await client.analytics.listJobs(accountId);

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThanOrEqual(0);

      if (response.data.length > 0) {
        const job = response.data[0];
        expect(job.job_id).toBeDefined();
        expect(job.status).toMatch(/^(QUEUED|PROCESSING|SUCCESS|FAILED)$/);
        expect(job.created_at).toBeDefined();
      }
    });

    it('should support pagination for job listing', async () => {
      const response = await client.analytics.listJobs(accountId, {
        count: 10,
        cursor: undefined,
      });

      expect(response).toBeDefined();
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeLessThanOrEqual(10);
    });
  });
});
