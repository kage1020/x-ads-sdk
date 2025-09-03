import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  ConversionEventRequest,
  ConversionTagResponse,
  CreateConversionTagRequest,
  SingleConversionTagResponse,
  UpdateConversionTagRequest,
} from '../../types/conversion-tracking.js';
import {
  AttributionWindow,
  ConversionAttribution,
  ConversionTrackingTagState,
  ConversionTrackingTagType,
} from '../../types/conversion-tracking.js';
import { ConversionTrackingResource } from '../conversion-tracking.js';

describe('ConversionTrackingResource', () => {
  let httpClient: HttpClient;
  let conversionTracking: ConversionTrackingResource;

  beforeEach(() => {
    httpClient = {
      request: vi.fn(),
    } as unknown as HttpClient;

    conversionTracking = new ConversionTrackingResource(httpClient);
  });

  describe('getConversionTags', () => {
    const mockConversionTagsResponse: ConversionTagResponse = {
      data: [
        {
          id: 'ct_123',
          name: 'Purchase Conversion',
          tag_type: ConversionTrackingTagType.WEB,
          state: ConversionTrackingTagState.ACTIVE,
          click_attribution_window: AttributionWindow.THIRTY_DAYS,
          view_attribution_window: AttributionWindow.ONE_DAY,
          attribution_model: ConversionAttribution.LAST_TOUCH,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          pixel_code: '<script>...</script>',
          deleted: false,
        },
        {
          id: 'ct_456',
          name: 'App Install Conversion',
          tag_type: ConversionTrackingTagType.MOBILE_APP,
          state: ConversionTrackingTagState.ACTIVE,
          click_attribution_window: AttributionWindow.SEVEN_DAYS,
          view_attribution_window: AttributionWindow.ONE_DAY,
          attribution_model: ConversionAttribution.FIRST_TOUCH,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          app_event_provider: 'APPSFLYER',
          app_event_name: 'install',
          deleted: false,
        },
      ],
      request: { params: {} },
      total_count: 2,
    };

    it('should get conversion tags with default parameters', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockConversionTagsResponse);

      const result = await conversionTracking.getConversionTags('account_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/conversion_tags',
        params: {},
      });
      expect(result).toEqual(mockConversionTagsResponse);
    });

    it('should get conversion tags with filters', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockConversionTagsResponse);

      const options = {
        conversion_tag_ids: ['ct_123', 'ct_456'],
        tag_types: [ConversionTrackingTagType.WEB],
        states: [ConversionTrackingTagState.ACTIVE],
        count: 10,
        cursor: 'cursor_123',
        sort_by: 'created_at' as const,
        with_deleted: false,
      };

      await conversionTracking.getConversionTags('account_123', options);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/conversion_tags',
        params: {
          conversion_tag_ids: 'ct_123,ct_456',
          tag_types: 'WEB',
          states: 'ACTIVE',
          count: '10',
          cursor: 'cursor_123',
          sort_by: 'created_at',
          with_deleted: 'false',
        },
      });
    });
  });

  describe('getConversionTag', () => {
    const mockSingleConversionTagResponse: SingleConversionTagResponse = {
      data: {
        id: 'ct_123',
        name: 'Purchase Conversion',
        tag_type: ConversionTrackingTagType.WEB,
        state: ConversionTrackingTagState.ACTIVE,
        click_attribution_window: AttributionWindow.THIRTY_DAYS,
        view_attribution_window: AttributionWindow.ONE_DAY,
        attribution_model: ConversionAttribution.LAST_TOUCH,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        pixel_code: '<script>...</script>',
        deleted: false,
      },
      request: { params: {} },
    };

    it('should get specific conversion tag', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockSingleConversionTagResponse);

      const result = await conversionTracking.getConversionTag('account_123', 'ct_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/conversion_tags/ct_123',
      });
      expect(result).toEqual(mockSingleConversionTagResponse);
    });
  });

  describe('createConversionTag', () => {
    const mockCreateResponse: SingleConversionTagResponse = {
      data: {
        id: 'ct_new',
        name: 'New Conversion Tag',
        tag_type: ConversionTrackingTagType.WEB,
        state: ConversionTrackingTagState.ACTIVE,
        click_attribution_window: AttributionWindow.THIRTY_DAYS,
        view_attribution_window: AttributionWindow.ONE_DAY,
        attribution_model: ConversionAttribution.LAST_TOUCH,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
      },
      request: { params: {} },
    };

    it('should create a new conversion tag', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockCreateResponse);

      const tagData: CreateConversionTagRequest = {
        name: 'New Conversion Tag',
        tag_type: ConversionTrackingTagType.WEB,
        click_attribution_window: AttributionWindow.THIRTY_DAYS,
      };

      const result = await conversionTracking.createConversionTag('account_123', tagData);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/conversion_tags',
        data: tagData,
      });
      expect(result).toEqual(mockCreateResponse);
    });
  });

  describe('updateConversionTag', () => {
    const mockUpdateResponse: SingleConversionTagResponse = {
      data: {
        id: 'ct_123',
        name: 'Updated Conversion Tag',
        tag_type: ConversionTrackingTagType.WEB,
        state: ConversionTrackingTagState.PAUSED,
        click_attribution_window: AttributionWindow.THIRTY_DAYS,
        view_attribution_window: AttributionWindow.ONE_DAY,
        attribution_model: ConversionAttribution.LAST_TOUCH,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z',
        deleted: false,
      },
      request: { params: {} },
    };

    it('should update a conversion tag', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockUpdateResponse);

      const updates: UpdateConversionTagRequest = {
        name: 'Updated Conversion Tag',
        state: ConversionTrackingTagState.PAUSED,
      };

      const result = await conversionTracking.updateConversionTag('account_123', 'ct_123', updates);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/conversion_tags/ct_123',
        data: updates,
      });
      expect(result).toEqual(mockUpdateResponse);
    });
  });

  describe('deleteConversionTag', () => {
    const mockDeleteResponse: SingleConversionTagResponse = {
      data: {
        id: 'ct_123',
        name: 'Deleted Conversion Tag',
        tag_type: ConversionTrackingTagType.WEB,
        state: ConversionTrackingTagState.PAUSED,
        click_attribution_window: AttributionWindow.THIRTY_DAYS,
        view_attribution_window: AttributionWindow.ONE_DAY,
        attribution_model: ConversionAttribution.LAST_TOUCH,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z',
        deleted: true,
      },
      request: { params: {} },
    };

    it('should delete a conversion tag', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockDeleteResponse);

      const result = await conversionTracking.deleteConversionTag('account_123', 'ct_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: '/12/accounts/account_123/conversion_tags/ct_123',
      });
      expect(result).toEqual(mockDeleteResponse);
    });
  });

  describe('submitConversionEvent', () => {
    const mockEventResponse = {
      success: true,
      event_id: 'event_123',
    };

    it('should submit a conversion event', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockEventResponse);

      const eventData: ConversionEventRequest = {
        conversion_tag_id: 'ct_123',
        event_time: '2023-01-01T12:00:00Z',
        conversion_value_local_micro: 1000000, // $1 in micros
        currency: 'USD',
        event_identifier: 'purchase_123',
      };

      const result = await conversionTracking.submitConversionEvent('account_123', eventData);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/conversion_events',
        data: eventData,
      });
      expect(result).toEqual(mockEventResponse);
    });
  });

  describe('submitConversionEventsBatch', () => {
    const mockBatchResponse = {
      success: true,
      processed_events: 2,
      failed_events: 0,
      event_ids: ['event_1', 'event_2'],
    };

    it('should submit multiple conversion events', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(mockBatchResponse);

      const events: ConversionEventRequest[] = [
        {
          conversion_tag_id: 'ct_123',
          event_time: '2023-01-01T12:00:00Z',
          conversion_value_local_micro: 1000000,
          currency: 'USD',
        },
        {
          conversion_tag_id: 'ct_456',
          event_time: '2023-01-01T12:05:00Z',
          conversion_value_local_micro: 2000000,
          currency: 'USD',
        },
      ];

      const result = await conversionTracking.submitConversionEventsBatch('account_123', events);

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/conversion_events/batch',
        data: { events },
      });
      expect(result).toEqual(mockBatchResponse);
    });
  });

  describe('Convenience Methods', () => {
    const mockWebTagsResponse: ConversionTagResponse = {
      data: [
        {
          id: 'ct_123',
          name: 'Purchase Conversion',
          tag_type: ConversionTrackingTagType.WEB,
          state: ConversionTrackingTagState.ACTIVE,
          click_attribution_window: AttributionWindow.THIRTY_DAYS,
          view_attribution_window: AttributionWindow.ONE_DAY,
          attribution_model: ConversionAttribution.LAST_TOUCH,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
      ],
      request: { params: {} },
    };

    const mockMobileTagsResponse: ConversionTagResponse = {
      data: [
        {
          id: 'ct_456',
          name: 'App Install Conversion',
          tag_type: ConversionTrackingTagType.MOBILE_APP,
          state: ConversionTrackingTagState.ACTIVE,
          click_attribution_window: AttributionWindow.SEVEN_DAYS,
          view_attribution_window: AttributionWindow.ONE_DAY,
          attribution_model: ConversionAttribution.FIRST_TOUCH,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          app_event_provider: 'APPSFLYER',
          app_event_name: 'install',
          deleted: false,
        },
      ],
      request: { params: {} },
    };

    describe('getWebConversionTags', () => {
      it('should get only web conversion tags', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockWebTagsResponse);

        const result = await conversionTracking.getWebConversionTags('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/conversion_tags',
          params: {
            tag_types: 'WEB',
            states: 'ACTIVE',
          },
        });
        expect(result).toEqual(mockWebTagsResponse);
      });
    });

    describe('getMobileAppConversionTags', () => {
      it('should get only mobile app conversion tags', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockMobileTagsResponse);

        const result = await conversionTracking.getMobileAppConversionTags('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/conversion_tags',
          params: {
            tag_types: 'MOBILE_APP',
            states: 'ACTIVE',
          },
        });
        expect(result).toEqual(mockMobileTagsResponse);
      });
    });

    describe('getActiveConversionTags', () => {
      it('should get only active conversion tags', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockWebTagsResponse);

        const result = await conversionTracking.getActiveConversionTags('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/conversion_tags',
          params: {
            states: 'ACTIVE',
          },
        });
        expect(result).toEqual(mockWebTagsResponse);
      });
    });

    describe('pauseConversionTag', () => {
      it('should pause a conversion tag', async () => {
        const mockPausedResponse: SingleConversionTagResponse = {
          data: {
            id: 'ct_123',
            name: 'Paused Tag',
            tag_type: ConversionTrackingTagType.WEB,
            state: ConversionTrackingTagState.PAUSED,
            click_attribution_window: AttributionWindow.THIRTY_DAYS,
            view_attribution_window: AttributionWindow.ONE_DAY,
            attribution_model: ConversionAttribution.LAST_TOUCH,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-02T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockPausedResponse);

        const result = await conversionTracking.pauseConversionTag('account_123', 'ct_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/conversion_tags/ct_123',
          data: {
            state: ConversionTrackingTagState.PAUSED,
          },
        });
        expect(result).toEqual(mockPausedResponse);
      });
    });

    describe('resumeConversionTag', () => {
      it('should resume a conversion tag', async () => {
        const mockActiveResponse: SingleConversionTagResponse = {
          data: {
            id: 'ct_123',
            name: 'Active Tag',
            tag_type: ConversionTrackingTagType.WEB,
            state: ConversionTrackingTagState.ACTIVE,
            click_attribution_window: AttributionWindow.THIRTY_DAYS,
            view_attribution_window: AttributionWindow.ONE_DAY,
            attribution_model: ConversionAttribution.LAST_TOUCH,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-02T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockActiveResponse);

        const result = await conversionTracking.resumeConversionTag('account_123', 'ct_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/conversion_tags/ct_123',
          data: {
            state: ConversionTrackingTagState.ACTIVE,
          },
        });
        expect(result).toEqual(mockActiveResponse);
      });
    });

    describe('createWebConversionTag', () => {
      it('should create a web conversion tag', async () => {
        const mockCreateResponse: SingleConversionTagResponse = {
          data: {
            id: 'ct_web',
            name: 'Web Purchase Tag',
            tag_type: ConversionTrackingTagType.WEB,
            state: ConversionTrackingTagState.ACTIVE,
            click_attribution_window: AttributionWindow.FOURTEEN_DAYS,
            view_attribution_window: AttributionWindow.ONE_DAY,
            attribution_model: ConversionAttribution.LAST_TOUCH,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockCreateResponse);

        const result = await conversionTracking.createWebConversionTag(
          'account_123',
          'Web Purchase Tag',
          {
            click_attribution_window: AttributionWindow.FOURTEEN_DAYS,
          }
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/conversion_tags',
          data: {
            name: 'Web Purchase Tag',
            tag_type: ConversionTrackingTagType.WEB,
            click_attribution_window: AttributionWindow.FOURTEEN_DAYS,
          },
        });
        expect(result).toEqual(mockCreateResponse);
      });
    });

    describe('createMobileAppConversionTag', () => {
      it('should create a mobile app conversion tag', async () => {
        const mockCreateResponse: SingleConversionTagResponse = {
          data: {
            id: 'ct_mobile',
            name: 'App Install Tag',
            tag_type: ConversionTrackingTagType.MOBILE_APP,
            state: ConversionTrackingTagState.ACTIVE,
            click_attribution_window: AttributionWindow.SEVEN_DAYS,
            view_attribution_window: AttributionWindow.ONE_DAY,
            attribution_model: ConversionAttribution.LAST_TOUCH,
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            app_event_provider: 'APPSFLYER',
            app_event_name: 'install',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockCreateResponse);

        const result = await conversionTracking.createMobileAppConversionTag(
          'account_123',
          'App Install Tag',
          'APPSFLYER',
          'install',
          {
            click_attribution_window: AttributionWindow.SEVEN_DAYS,
          }
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/conversion_tags',
          data: {
            name: 'App Install Tag',
            tag_type: ConversionTrackingTagType.MOBILE_APP,
            app_event_provider: 'APPSFLYER',
            app_event_name: 'install',
            click_attribution_window: AttributionWindow.SEVEN_DAYS,
          },
        });
        expect(result).toEqual(mockCreateResponse);
      });
    });

    describe('getConversionTagsSummary', () => {
      it('should get conversion tags summary', async () => {
        const mockMixedTagsResponse: ConversionTagResponse = {
          data: [
            {
              id: 'ct_1',
              name: 'Web Tag 1',
              tag_type: ConversionTrackingTagType.WEB,
              state: ConversionTrackingTagState.ACTIVE,
              click_attribution_window: AttributionWindow.THIRTY_DAYS,
              view_attribution_window: AttributionWindow.ONE_DAY,
              attribution_model: ConversionAttribution.LAST_TOUCH,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
            },
            {
              id: 'ct_2',
              name: 'Web Tag 2',
              tag_type: ConversionTrackingTagType.WEB,
              state: ConversionTrackingTagState.PAUSED,
              click_attribution_window: AttributionWindow.THIRTY_DAYS,
              view_attribution_window: AttributionWindow.ONE_DAY,
              attribution_model: ConversionAttribution.LAST_TOUCH,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              deleted: false,
            },
            {
              id: 'ct_3',
              name: 'Mobile Tag 1',
              tag_type: ConversionTrackingTagType.MOBILE_APP,
              state: ConversionTrackingTagState.ACTIVE,
              click_attribution_window: AttributionWindow.SEVEN_DAYS,
              view_attribution_window: AttributionWindow.ONE_DAY,
              attribution_model: ConversionAttribution.FIRST_TOUCH,
              created_at: '2023-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
              app_event_provider: 'APPSFLYER',
              app_event_name: 'install',
              deleted: false,
            },
          ],
          request: { params: {} },
          total_count: 3,
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockMixedTagsResponse);

        const result = await conversionTracking.getConversionTagsSummary('account_123');

        expect(result).toEqual({
          total_count: 3,
          active_count: 2,
          paused_count: 1,
          web_tags_count: 2,
          mobile_app_tags_count: 1,
        });
      });
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP client errors', async () => {
      const error = new Error('Network error');
      vi.mocked(httpClient.request).mockRejectedValue(error);

      await expect(conversionTracking.getConversionTags('account_123')).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle empty response', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(null);

      const result = await conversionTracking.getConversionTags('account_123');
      expect(result).toBeNull();
    });
  });
});
