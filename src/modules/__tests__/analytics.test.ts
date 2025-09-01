import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type { AnalyticsOptions, AnalyticsResponse, DateRange } from '../../types/analytics.js';
import { EntityType, Granularity, METRIC_GROUPS, Placement } from '../../types/analytics.js';
import { AnalyticsModule } from '../analytics.js';

describe('AnalyticsModule', () => {
  let mockClient: HttpClient;
  let analyticsModule: AnalyticsModule;

  const mockAnalyticsResponse: AnalyticsResponse = {
    request: {
      params: {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['123', '456'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.DAY,
        metric_groups: ['ENGAGEMENT'],
      },
    },
    data: [
      {
        id: '123',
        id_data: [
          {
            segment: { time: '2023-01-01' },
            metrics: {
              impressions: 1000,
              clicks: 100,
              engagements: 50,
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue(mockAnalyticsResponse),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as unknown as HttpClient;

    analyticsModule = new AnalyticsModule(mockClient);
  });

  describe('constructor', () => {
    it('should initialize with correct base endpoint', () => {
      expect(analyticsModule).toBeInstanceOf(AnalyticsModule);
    });
  });

  describe('getAnalytics', () => {
    const mockOptions: AnalyticsOptions = {
      entity_type: EntityType.CAMPAIGN,
      entity_ids: ['123', '456'],
      date_range: {
        start_date: '2023-01-01',
        end_date: '2023-01-07',
      },
      granularity: Granularity.DAY,
      metric_groups: ['ENGAGEMENT'],
    };

    it('should call client.get with correct endpoint and query parameters', async () => {
      await analyticsModule.getAnalytics('account123', mockOptions);

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['123', '456'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.DAY,
        metric_groups: ['ENGAGEMENT'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getAnalytics('account123', mockOptions);

      expect(result).toEqual(mockAnalyticsResponse);
    });

    it('should use default granularity when not specified', async () => {
      const optionsWithoutGranularity = {
        ...mockOptions,
        granularity: undefined,
      };

      await analyticsModule.getAnalytics('account123', optionsWithoutGranularity);

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['123', '456'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: ['ENGAGEMENT'], // This test has the original options which include metric_groups
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should use default metric groups when not specified', async () => {
      const optionsWithoutMetricGroups = {
        ...mockOptions,
        metric_groups: undefined,
      };

      await analyticsModule.getAnalytics('account123', optionsWithoutMetricGroups);

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['123', '456'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.DAY,
        metric_groups: ['ENGAGEMENT', 'BILLING'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should include optional parameters when provided', async () => {
      const fullOptions: AnalyticsOptions = {
        ...mockOptions,
        placement: Placement.ALL_ON_TWITTER,
        segmentation_type: 'AGE',
        country: 'US',
        platform: 'DESKTOP',
      };

      await analyticsModule.getAnalytics('account123', fullOptions);

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['123', '456'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.DAY,
        metric_groups: ['ENGAGEMENT'],
        placement: Placement.ALL_ON_TWITTER,
        segmentation_type: 'AGE',
        country: 'US',
        platform: 'DESKTOP',
      });
    });
  });

  describe('getCampaignAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with CAMPAIGN entity type', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getCampaignAnalytics(
        'account123',
        ['campaign1', 'campaign2'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1', 'campaign2'],
        date_range: dateRange,
      });
    });

    it('should merge additional options', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const additionalOptions = {
        granularity: Granularity.HOUR,
        metric_groups: ['VIDEO'],
      };

      await analyticsModule.getCampaignAnalytics(
        'account123',
        ['campaign1', 'campaign2'],
        dateRange,
        additionalOptions
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        ...additionalOptions,
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1', 'campaign2'],
        date_range: dateRange,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getCampaignAnalytics(
        'account123',
        ['campaign1', 'campaign2'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getAdGroupAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with LINE_ITEM entity type', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getAdGroupAnalytics('account123', ['adgroup1', 'adgroup2'], dateRange);

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['adgroup1', 'adgroup2'],
        date_range: dateRange,
      });
    });

    it('should merge additional options', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const additionalOptions = {
        granularity: Granularity.DAY,
        placement: Placement.PUBLISHER_NETWORK,
      };

      await analyticsModule.getAdGroupAnalytics(
        'account123',
        ['adgroup1', 'adgroup2'],
        dateRange,
        additionalOptions
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        ...additionalOptions,
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['adgroup1', 'adgroup2'],
        date_range: dateRange,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getAdGroupAnalytics(
        'account123',
        ['adgroup1', 'adgroup2'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getAccountAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with ACCOUNT entity type and account ID as entity_ids', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getAccountAnalytics('account123', dateRange);

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.ACCOUNT,
        entity_ids: ['account123'],
        date_range: dateRange,
      });
    });

    it('should merge additional options', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const additionalOptions = {
        granularity: Granularity.TOTAL,
        country: 'JP',
      };

      await analyticsModule.getAccountAnalytics('account123', dateRange, additionalOptions);

      expect(spy).toHaveBeenCalledWith('account123', {
        ...additionalOptions,
        entity_type: EntityType.ACCOUNT,
        entity_ids: ['account123'],
        date_range: dateRange,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getAccountAnalytics('account123', dateRange);

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getEngagementAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with ENGAGEMENT metric group', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getEngagementAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: dateRange,
        granularity: Granularity.TOTAL,
        metric_groups: ['ENGAGEMENT'],
      });
    });

    it('should use custom granularity when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getEngagementAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange,
        Granularity.DAY
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: dateRange,
        granularity: Granularity.DAY,
        metric_groups: ['ENGAGEMENT'],
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getEngagementAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getBillingAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with BILLING metric group', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getBillingAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        date_range: dateRange,
        granularity: Granularity.TOTAL,
        metric_groups: ['BILLING'],
      });
    });

    it('should use custom granularity when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getBillingAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange,
        Granularity.HOUR
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        date_range: dateRange,
        granularity: Granularity.HOUR,
        metric_groups: ['BILLING'],
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getBillingAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getVideoAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with VIDEO metric group', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getVideoAnalytics(
        'account123',
        EntityType.PROMOTED_TWEET,
        ['tweet1'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.PROMOTED_TWEET,
        entity_ids: ['tweet1'],
        date_range: dateRange,
        granularity: Granularity.TOTAL,
        metric_groups: ['VIDEO'],
      });
    });

    it('should use custom granularity when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getVideoAnalytics(
        'account123',
        EntityType.PROMOTED_TWEET,
        ['tweet1'],
        dateRange,
        Granularity.DAY
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.PROMOTED_TWEET,
        entity_ids: ['tweet1'],
        date_range: dateRange,
        granularity: Granularity.DAY,
        metric_groups: ['VIDEO'],
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getVideoAnalytics(
        'account123',
        EntityType.PROMOTED_TWEET,
        ['tweet1'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getComprehensiveAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with all available metric groups', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getComprehensiveAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: dateRange,
        granularity: Granularity.TOTAL,
        metric_groups: Object.keys(METRIC_GROUPS),
      });
    });

    it('should use custom granularity when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getComprehensiveAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange,
        Granularity.HOUR
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: dateRange,
        granularity: Granularity.HOUR,
        metric_groups: Object.keys(METRIC_GROUPS),
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getComprehensiveAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getDailyAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with DAY granularity and default metric groups', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getDailyAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: dateRange,
        granularity: Granularity.DAY,
        metric_groups: ['ENGAGEMENT', 'BILLING'],
      });
    });

    it('should use custom metric groups when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const customMetricGroups = ['VIDEO', 'MEDIA'];

      await analyticsModule.getDailyAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange,
        customMetricGroups
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: dateRange,
        granularity: Granularity.DAY,
        metric_groups: customMetricGroups,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getDailyAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getHourlyAnalytics', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should call getAnalytics with HOUR granularity and default metric groups', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getHourlyAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        date_range: dateRange,
        granularity: Granularity.HOUR,
        metric_groups: ['ENGAGEMENT', 'BILLING'],
      });
    });

    it('should use custom metric groups when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const customMetricGroups = ['ENGAGEMENT', 'VIDEO'];

      await analyticsModule.getHourlyAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange,
        customMetricGroups
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        date_range: dateRange,
        granularity: Granularity.HOUR,
        metric_groups: customMetricGroups,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getHourlyAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('createDateRange', () => {
    beforeEach(() => {
      // Mock Date to ensure consistent test results
      const mockDate = new Date('2023-01-15T10:00:00.000Z');
      vi.setSystemTime(mockDate);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should create date range for 7 days', () => {
      const dateRange = AnalyticsModule.createDateRange(7);

      expect(dateRange).toEqual({
        start_date: '2023-01-08',
        end_date: '2023-01-15',
      });
    });

    it('should create date range for 30 days', () => {
      const dateRange = AnalyticsModule.createDateRange(30);

      expect(dateRange).toEqual({
        start_date: '2022-12-16',
        end_date: '2023-01-15',
      });
    });

    it('should create date range for 1 day', () => {
      const dateRange = AnalyticsModule.createDateRange(1);

      expect(dateRange).toEqual({
        start_date: '2023-01-14',
        end_date: '2023-01-15',
      });
    });

    it('should handle zero days', () => {
      const dateRange = AnalyticsModule.createDateRange(0);

      expect(dateRange).toEqual({
        start_date: '2023-01-15',
        end_date: '2023-01-15',
      });
    });

    it('should handle leap year correctly', () => {
      // Set date to 2024-03-01 (leap year)
      vi.setSystemTime(new Date('2024-03-01T10:00:00.000Z'));

      const dateRange = AnalyticsModule.createDateRange(30);

      expect(dateRange).toEqual({
        start_date: '2024-01-31',
        end_date: '2024-03-01',
      });
    });
  });

  describe('getLastWeekAnalytics', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('2023-01-15T10:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should call getAnalytics with 7-day date range and default metric groups', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getLastWeekAnalytics('account123', EntityType.CAMPAIGN, ['campaign1']);

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: {
          start_date: '2023-01-08',
          end_date: '2023-01-15',
        },
        metric_groups: ['ENGAGEMENT', 'BILLING'],
      });
    });

    it('should use custom metric groups when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const customMetricGroups = ['VIDEO', 'MEDIA'];

      await analyticsModule.getLastWeekAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        customMetricGroups
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        date_range: {
          start_date: '2023-01-08',
          end_date: '2023-01-15',
        },
        metric_groups: customMetricGroups,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getLastWeekAnalytics('account123', EntityType.CAMPAIGN, [
        'campaign1',
      ]);

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('getLastMonthAnalytics', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('2023-01-31T10:00:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should call getAnalytics with 30-day date range and default metric groups', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');

      await analyticsModule.getLastMonthAnalytics('account123', EntityType.LINE_ITEM, [
        'lineitem1',
      ]);

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        date_range: {
          start_date: '2023-01-01',
          end_date: '2023-01-31',
        },
        metric_groups: ['ENGAGEMENT', 'BILLING'],
      });
    });

    it('should use custom metric groups when provided', async () => {
      const spy = vi.spyOn(analyticsModule, 'getAnalytics');
      const customMetricGroups = ['ENGAGEMENT', 'VIDEO', 'BILLING'];

      await analyticsModule.getLastMonthAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        customMetricGroups
      );

      expect(spy).toHaveBeenCalledWith('account123', {
        entity_type: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        date_range: {
          start_date: '2023-01-01',
          end_date: '2023-01-31',
        },
        metric_groups: customMetricGroups,
      });
    });

    it('should return analytics response', async () => {
      const result = await analyticsModule.getLastMonthAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1']
      );

      expect(result).toEqual(mockAnalyticsResponse);
    });
  });

  describe('error handling', () => {
    it('should propagate client errors', async () => {
      const error = new Error('Network error');
      vi.mocked(mockClient.get).mockRejectedValue(error);

      const options: AnalyticsOptions = {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['123'],
        date_range: {
          start_date: '2023-01-01',
          end_date: '2023-01-07',
        },
      };

      await expect(analyticsModule.getAnalytics('account123', options)).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle empty entity_ids array', async () => {
      const options: AnalyticsOptions = {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: [],
        date_range: {
          start_date: '2023-01-01',
          end_date: '2023-01-07',
        },
      };

      await analyticsModule.getAnalytics('account123', options);

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: [],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: ['ENGAGEMENT', 'BILLING'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should handle invalid date range gracefully', async () => {
      const options: AnalyticsOptions = {
        entity_type: EntityType.CAMPAIGN,
        entity_ids: ['123'],
        date_range: {
          start_date: 'invalid-date',
          end_date: 'invalid-end-date',
        },
      };

      await analyticsModule.getAnalytics('account123', options);

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['123'],
        start_time: 'invalid-date',
        end_time: 'invalid-end-date',
        granularity: Granularity.TOTAL,
        metric_groups: ['ENGAGEMENT', 'BILLING'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });
  });

  describe('integration with all entity types', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should work with ACCOUNT entity type', async () => {
      await analyticsModule.getEngagementAnalytics(
        'account123',
        EntityType.ACCOUNT,
        ['account123'],
        dateRange
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.ACCOUNT,
        entity_ids: ['account123'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: ['ENGAGEMENT'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should work with CAMPAIGN entity type', async () => {
      await analyticsModule.getBillingAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: ['BILLING'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should work with LINE_ITEM entity type', async () => {
      await analyticsModule.getVideoAnalytics(
        'account123',
        EntityType.LINE_ITEM,
        ['lineitem1'],
        dateRange
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.LINE_ITEM,
        entity_ids: ['lineitem1'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: ['VIDEO'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should work with PROMOTED_TWEET entity type', async () => {
      await analyticsModule.getComprehensiveAnalytics(
        'account123',
        EntityType.PROMOTED_TWEET,
        ['tweet1'],
        dateRange
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.PROMOTED_TWEET,
        entity_ids: ['tweet1'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: Object.keys(METRIC_GROUPS),
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });
  });

  describe('integration with all granularities', () => {
    const dateRange: DateRange = {
      start_date: '2023-01-01',
      end_date: '2023-01-07',
    };

    it('should work with HOUR granularity', async () => {
      await analyticsModule.getEngagementAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange,
        Granularity.HOUR
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.HOUR,
        metric_groups: ['ENGAGEMENT'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should work with DAY granularity', async () => {
      await analyticsModule.getBillingAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange,
        Granularity.DAY
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.DAY,
        metric_groups: ['BILLING'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });

    it('should work with TOTAL granularity', async () => {
      await analyticsModule.getVideoAnalytics(
        'account123',
        EntityType.CAMPAIGN,
        ['campaign1'],
        dateRange,
        Granularity.TOTAL
      );

      expect(mockClient.get).toHaveBeenCalledWith('/stats/accounts/account123', {
        entity: EntityType.CAMPAIGN,
        entity_ids: ['campaign1'],
        start_time: '2023-01-01',
        end_time: '2023-01-07',
        granularity: Granularity.TOTAL,
        metric_groups: ['VIDEO'],
        placement: undefined,
        segmentation_type: undefined,
        country: undefined,
        platform: undefined,
      });
    });
  });
});
