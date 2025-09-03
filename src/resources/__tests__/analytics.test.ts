/**
 * Analytics resource tests
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  ActiveEntitiesResponse,
  AnalyticsJobResponse,
  AnalyticsJobsResponse,
  AnalyticsResponse,
} from '../../types/analytics.js';
import { Analytics } from '../analytics.js';

describe('Analytics', () => {
  let analytics: Analytics;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn(),
    } as unknown as HttpClient;
    analytics = new Analytics(mockHttpClient);
  });

  describe('getSyncAnalytics', () => {
    it('should get synchronous analytics data', async () => {
      const mockResponse: AnalyticsResponse = {
        data_type: 'stats',
        time_series_length: 1,
        data: [
          {
            id: 'line_item_123',
            id_data: [
              {
                segment: null,
                metrics: {
                  impressions: [1000],
                  engagements: [50],
                  clicks: [25],
                },
              },
            ],
          },
        ],
        request: {
          params: {},
        },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        entity: 'LINE_ITEM' as const,
        entity_ids: ['line_item_123'],
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-07T23:59:59Z',
        granularity: 'TOTAL' as const,
        placement: 'ALL_ON_TWITTER' as const,
        metric_groups: ['ENGAGEMENT' as const],
      };

      const result = await analytics.getSyncAnalytics('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/stats/accounts/account_123',
        params: {
          entity: 'LINE_ITEM',
          entity_ids: 'line_item_123',
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
          granularity: 'TOTAL',
          placement: 'ALL_ON_TWITTER',
          metric_groups: 'ENGAGEMENT',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('downloadAsyncData', () => {
    it('should download and parse JSON data', async () => {
      const mockAnalyticsData = {
        data_type: 'stats',
        time_series_length: 1,
        data: [
          {
            id: 'test_entity',
            id_data: [
              {
                segment: null,
                metrics: {
                  impressions: [5000],
                  engagements: [250],
                },
              },
            ],
          },
        ],
        request: { params: {} },
      };

      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: { get: vi.fn().mockReturnValue(null) },
        json: vi.fn().mockResolvedValue(mockAnalyticsData),
      });

      const result = await analytics.downloadAsyncData('https://example.com/data.json');

      expect(fetch).toHaveBeenCalledWith('https://example.com/data.json');
      expect(result).toEqual(mockAnalyticsData);
    });

    it('should handle download errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(analytics.downloadAsyncData('https://example.com/missing.json')).rejects.toThrow(
        'Failed to download analytics data: 404'
      );
    });
  });

  describe('createAsyncJob', () => {
    it('should create an asynchronous analytics job', async () => {
      const mockJobResponse: AnalyticsJobResponse = {
        data: {
          id: 'job_123',
          id_str: 'job_123',
          account_id: 'account_123',
          entity: 'CAMPAIGN',
          entity_ids: ['campaign_456'],
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-30T23:59:59Z',
          granularity: 'DAY',
          placement: 'ALL_ON_TWITTER',
          metric_groups: ['ENGAGEMENT', 'BILLING'],
          segmentation_type: 'AGE',
          country: 'US',
          platform: 'IOS',
          status: 'QUEUED',
          url: null,
          expires_at: null,
          created_at: '2024-01-01T10:00:00Z',
          updated_at: '2024-01-01T10:00:00Z',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockJobResponse);

      const options = {
        entity: 'CAMPAIGN' as const,
        entity_ids: ['campaign_456'],
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-30T23:59:59Z',
        granularity: 'DAY' as const,
        placement: 'ALL_ON_TWITTER' as const,
        metric_groups: ['ENGAGEMENT' as const, 'BILLING' as const],
        segmentation_type: 'AGE' as const,
        country: 'US',
        platform: 'IOS',
      };

      const result = await analytics.createAsyncJob('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/stats/jobs/accounts/account_123',
        params: {
          entity: 'CAMPAIGN',
          entity_ids: 'campaign_456',
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-30T23:59:59Z',
          granularity: 'DAY',
          placement: 'ALL_ON_TWITTER',
          metric_groups: 'ENGAGEMENT,BILLING',
          segmentation_type: 'AGE',
          country: 'US',
          platform: 'IOS',
        },
      });
      expect(result).toEqual(mockJobResponse);
    });

    it('should create async job without optional parameters', async () => {
      const mockJobResponse: AnalyticsJobResponse = {
        data: {
          id: 'job_456',
          id_str: 'job_456',
          account_id: 'account_123',
          entity: 'LINE_ITEM',
          entity_ids: ['line_item_789'],
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
          granularity: 'TOTAL',
          placement: 'ALL_ON_TWITTER',
          metric_groups: ['ENGAGEMENT'],
          segmentation_type: null,
          country: null,
          platform: null,
          status: 'PROCESSING',
          url: null,
          expires_at: null,
          created_at: '2024-01-01T10:00:00Z',
          updated_at: '2024-01-01T10:00:00Z',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockJobResponse);

      const options = {
        entity: 'LINE_ITEM' as const,
        entity_ids: ['line_item_789'],
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-07T23:59:59Z',
        granularity: 'TOTAL' as const,
        placement: 'ALL_ON_TWITTER' as const,
        metric_groups: ['ENGAGEMENT' as const],
      };

      const result = await analytics.createAsyncJob('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/stats/jobs/accounts/account_123',
        params: {
          entity: 'LINE_ITEM',
          entity_ids: 'line_item_789',
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
          granularity: 'TOTAL',
          placement: 'ALL_ON_TWITTER',
          metric_groups: 'ENGAGEMENT',
        },
      });
      expect(result).toEqual(mockJobResponse);
    });
  });

  describe('getAsyncJobs', () => {
    it('should get all async jobs for account', async () => {
      const mockJobsResponse: AnalyticsJobsResponse = {
        data: [
          {
            id: 'job_123',
            id_str: 'job_123',
            account_id: 'account_123',
            entity: 'CAMPAIGN',
            entity_ids: ['campaign_456'],
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-30T23:59:59Z',
            granularity: 'DAY',
            placement: 'ALL_ON_TWITTER',
            metric_groups: ['ENGAGEMENT'],
            segmentation_type: null,
            country: null,
            platform: null,
            status: 'SUCCESS',
            url: 'https://example.com/download/job_123',
            expires_at: '2024-02-01T00:00:00Z',
            created_at: '2024-01-01T10:00:00Z',
            updated_at: '2024-01-01T11:00:00Z',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockJobsResponse);

      const result = await analytics.getAsyncJobs('account_123');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/stats/jobs/accounts/account_123',
        params: {},
      });
      expect(result).toEqual(mockJobsResponse);
    });

    it('should get specific async jobs by IDs', async () => {
      const mockJobsResponse: AnalyticsJobsResponse = {
        data: [
          {
            id: 'job_123',
            id_str: 'job_123',
            account_id: 'account_123',
            entity: 'CAMPAIGN',
            entity_ids: ['campaign_456'],
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-30T23:59:59Z',
            granularity: 'DAY',
            placement: 'ALL_ON_TWITTER',
            metric_groups: ['ENGAGEMENT'],
            segmentation_type: null,
            country: null,
            platform: null,
            status: 'SUCCESS',
            url: 'https://example.com/download/job_123',
            expires_at: '2024-02-01T00:00:00Z',
            created_at: '2024-01-01T10:00:00Z',
            updated_at: '2024-01-01T11:00:00Z',
          },
        ],
        next_cursor: 'cursor_next',
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockJobsResponse);

      const result = await analytics.getAsyncJobs('account_123', ['job_123', 'job_456']);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/stats/jobs/accounts/account_123',
        params: {
          job_ids: 'job_123,job_456',
        },
      });
      expect(result).toEqual(mockJobsResponse);
    });
  });

  describe('getActiveEntities', () => {
    it('should get active entities', async () => {
      const mockActiveEntitiesResponse: ActiveEntitiesResponse = {
        data: [
          {
            entity_id: 'campaign_123',
            activity_start_time: '2024-01-01T00:00:00Z',
            activity_end_time: '2024-01-07T23:59:59Z',
            placements: ['ALL_ON_TWITTER'],
          },
          {
            entity_id: 'campaign_456',
            activity_start_time: '2024-01-02T00:00:00Z',
            activity_end_time: '2024-01-06T23:59:59Z',
            placements: ['ALL_ON_TWITTER', 'PUBLISHER_NETWORK'],
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockActiveEntitiesResponse);

      const options = {
        entity: 'CAMPAIGN' as const,
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-07T23:59:59Z',
        campaign_ids: ['campaign_123', 'campaign_456'],
        funding_instrument_ids: ['funding_123'],
        line_item_ids: ['line_item_789'],
      };

      const result = await analytics.getActiveEntities('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/stats/accounts/account_123/active_entities',
        params: {
          entity: 'CAMPAIGN',
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
          campaign_ids: 'campaign_123,campaign_456',
          funding_instrument_ids: 'funding_123',
          line_item_ids: 'line_item_789',
        },
      });
      expect(result).toEqual(mockActiveEntitiesResponse);
    });

    it('should get active entities without optional filters', async () => {
      const mockActiveEntitiesResponse: ActiveEntitiesResponse = {
        data: [
          {
            entity_id: 'line_item_123',
            activity_start_time: '2024-01-01T00:00:00Z',
            activity_end_time: '2024-01-07T23:59:59Z',
            placements: ['ALL_ON_TWITTER'],
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockActiveEntitiesResponse);

      const options = {
        entity: 'LINE_ITEM' as const,
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-01-07T23:59:59Z',
      };

      const result = await analytics.getActiveEntities('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/stats/accounts/account_123/active_entities',
        params: {
          entity: 'LINE_ITEM',
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
        },
      });
      expect(result).toEqual(mockActiveEntitiesResponse);
    });
  });

  describe('convenience methods', () => {
    const mockResponse: AnalyticsResponse = {
      data_type: 'stats',
      time_series_length: 1,
      data: [
        {
          id: 'test_entity',
          id_data: [
            {
              segment: null,
              metrics: {
                impressions: [1000],
                engagements: [50],
              },
            },
          ],
        },
      ],
      request: { params: {} },
    };

    describe('getAccountAnalytics', () => {
      it('should get account analytics with default options', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const options = {
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
        };

        const result = await analytics.getAccountAnalytics('account_123', options);

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'ACCOUNT',
            entity_ids: 'account_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'TOTAL',
            placement: 'ALL_ON_TWITTER',
            metric_groups: 'ENGAGEMENT',
          },
        });
        expect(result).toEqual(mockResponse);
      });

      it('should get account analytics with custom options', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const options = {
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
          granularity: 'DAY' as const,
          placement: 'PUBLISHER_NETWORK' as const,
          metric_groups: ['ENGAGEMENT' as const, 'BILLING' as const],
        };

        const result = await analytics.getAccountAnalytics('account_123', options);

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'ACCOUNT',
            entity_ids: 'account_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'DAY',
            placement: 'PUBLISHER_NETWORK',
            metric_groups: 'ENGAGEMENT,BILLING',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getCampaignAnalytics', () => {
      it('should get campaign analytics', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const campaignIds = ['campaign_123', 'campaign_456'];
        const options = {
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
          granularity: 'HOUR' as const,
          metric_groups: ['VIDEO' as const, 'MEDIA' as const],
        };

        const result = await analytics.getCampaignAnalytics('account_123', campaignIds, options);

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'CAMPAIGN',
            entity_ids: 'campaign_123,campaign_456',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'HOUR',
            placement: 'ALL_ON_TWITTER',
            metric_groups: 'VIDEO,MEDIA',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getLineItemAnalytics', () => {
      it('should get line item analytics', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const lineItemIds = ['line_item_123'];
        const options = {
          start_time: '2024-01-01T00:00:00Z',
          end_time: '2024-01-07T23:59:59Z',
        };

        const result = await analytics.getLineItemAnalytics('account_123', lineItemIds, options);

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'LINE_ITEM',
            entity_ids: 'line_item_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'TOTAL',
            placement: 'ALL_ON_TWITTER',
            metric_groups: 'ENGAGEMENT',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getComprehensiveAnalytics', () => {
      it('should get comprehensive analytics for campaign entity', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await analytics.getComprehensiveAnalytics(
          'account_123',
          'CAMPAIGN',
          ['campaign_123'],
          {
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            placement: 'SPOTLIGHT',
          },
          'DAY'
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'CAMPAIGN',
            entity_ids: 'campaign_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'DAY',
            placement: 'SPOTLIGHT',
            metric_groups: 'ENGAGEMENT,BILLING,VIDEO,MEDIA',
          },
        });
        expect(result).toEqual(mockResponse);
      });

      it('should get comprehensive analytics for account entity (no video/media)', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await analytics.getComprehensiveAnalytics(
          'account_123',
          'ACCOUNT',
          ['account_123'],
          {
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
          }
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'ACCOUNT',
            entity_ids: 'account_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'TOTAL',
            placement: 'ALL_ON_TWITTER',
            metric_groups: 'ENGAGEMENT,BILLING',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getDailyAnalytics', () => {
      it('should get daily analytics with default options', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await analytics.getDailyAnalytics(
          'account_123',
          'LINE_ITEM',
          ['line_item_123'],
          {
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
          }
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'LINE_ITEM',
            entity_ids: 'line_item_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'DAY',
            placement: 'ALL_ON_TWITTER',
            metric_groups: 'ENGAGEMENT',
          },
        });
        expect(result).toEqual(mockResponse);
      });

      it('should get daily analytics with custom options', async () => {
        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await analytics.getDailyAnalytics(
          'account_123',
          'PROMOTED_TWEET',
          ['tweet_123'],
          {
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            placement: 'TREND',
            metric_groups: ['BILLING', 'WEB_CONVERSION'],
          }
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/stats/accounts/account_123',
          params: {
            entity: 'PROMOTED_TWEET',
            entity_ids: 'tweet_123',
            start_time: '2024-01-01T00:00:00Z',
            end_time: '2024-01-07T23:59:59Z',
            granularity: 'DAY',
            placement: 'TREND',
            metric_groups: 'BILLING,WEB_CONVERSION',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('downloadAsyncData - gzip handling', () => {
    beforeEach(() => {
      // Mock DecompressionStream as available
      global.DecompressionStream = vi.fn().mockImplementation((_format: string) => ({
        readable: {
          getReader: () => ({
            read: vi
              .fn()
              .mockResolvedValueOnce({ done: false, value: new Uint8Array([1, 2, 3]) })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      }));

      // Mock ReadableStream
      global.ReadableStream = vi.fn().mockImplementation(() => ({
        pipeThrough: vi.fn().mockReturnValue({
          getReader: () => ({
            read: vi
              .fn()
              .mockResolvedValueOnce({
                done: false,
                value: new TextEncoder().encode('{"test":"data"}'),
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        }),
      }));
    });

    it('should handle gzipped content', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: { get: vi.fn().mockReturnValue('gzip') },
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
      });

      const result = await analytics.downloadAsyncData('https://example.com/gzipped.json.gz');

      expect(fetch).toHaveBeenCalledWith('https://example.com/gzipped.json.gz');
      expect(result).toEqual(JSON.parse('{"test":"data"}'));
    });

    it('should throw error when DecompressionStream is not available', async () => {
      // Remove DecompressionStream
      delete (global as { DecompressionStream?: unknown }).DecompressionStream;

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: { get: vi.fn().mockReturnValue('gzip') },
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(10)),
      });

      await expect(
        analytics.downloadAsyncData('https://example.com/gzipped.json.gz')
      ).rejects.toThrow('Gzip decompression not available. Please provide decompressed data URL.');
    });
  });
});
