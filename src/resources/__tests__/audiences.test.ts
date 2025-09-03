/**
 * Audiences resource tests
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  AudiencePermissionsResponse,
  AudienceTargetedResponse,
  CustomAudienceResponse,
  CustomAudiencesResponse,
  DoNotReachListResponse,
  DoNotReachListsResponse,
  KeywordInsightsResponse,
} from '../../types/audiences.js';
import { Audiences } from '../audiences.js';

describe('Audiences', () => {
  let audiences: Audiences;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn(),
    } as unknown as HttpClient;
    audiences = new Audiences(mockHttpClient);
  });

  describe('getCustomAudiences', () => {
    it('should get all custom audiences for an account', async () => {
      const mockResponse: CustomAudiencesResponse = {
        data: [
          {
            id: 'audience_123',
            id_str: 'audience_123',
            name: 'Test Audience',
            audience_type: 'CRM',
            audience_size: 1000,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
            is_owner: true,
            permission_level: 'WRITE',
            targetable: true,
            targetable_types: ['CAMPAIGN'],
            list_type: 'CRM',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await audiences.getCustomAudiences('account_123');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/custom_audiences',
        params: {},
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get custom audiences with filters', async () => {
      const mockResponse: CustomAudiencesResponse = {
        data: [],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        custom_audience_ids: ['audience_123', 'audience_456'],
        count: 50,
        cursor: 'cursor_123',
        sort_by: 'created_at' as const,
      };

      await audiences.getCustomAudiences('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/custom_audiences',
        params: {
          custom_audience_ids: 'audience_123,audience_456',
          count: '50',
          cursor: 'cursor_123',
          sort_by: 'created_at',
        },
      });
    });
  });

  describe('getCustomAudience', () => {
    it('should get a specific custom audience', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_123',
          id_str: 'audience_123',
          name: 'Test Audience',
          audience_type: 'CRM',
          audience_size: 1000,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
          is_owner: true,
          permission_level: 'WRITE',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await audiences.getCustomAudience('account_123', 'audience_123');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/custom_audiences/audience_123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createCustomAudience', () => {
    it('should create a new custom audience', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_new',
          id_str: 'audience_new',
          name: 'New Test Audience',
          audience_type: 'CRM',
          audience_size: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
          is_owner: true,
          permission_level: 'WRITE',
          list_type: 'CRM',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        name: 'New Test Audience',
        audience_type: 'CRM' as const,
        list_type: 'CRM' as const,
      };

      const result = await audiences.createCustomAudience('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/custom_audiences',
        params: {
          name: 'New Test Audience',
          audience_type: 'CRM',
          list_type: 'CRM',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create custom audience without optional list_type', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_new',
          id_str: 'audience_new',
          name: 'Video Audience',
          audience_type: 'VIDEO_VIEW',
          audience_size: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
          is_owner: true,
          permission_level: 'WRITE',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        name: 'Video Audience',
        audience_type: 'VIDEO_VIEW' as const,
      };

      const result = await audiences.createCustomAudience('account_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/custom_audiences',
        params: {
          name: 'Video Audience',
          audience_type: 'VIDEO_VIEW',
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateCustomAudience', () => {
    it('should update a custom audience', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_123',
          id_str: 'audience_123',
          name: 'Updated Audience Name',
          audience_type: 'CRM',
          audience_size: 1500,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: false,
          is_owner: true,
          permission_level: 'WRITE',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        name: 'Updated Audience Name',
        operation_type: 'UPDATE' as const,
        users: [
          {
            data_type: 'EMAIL' as const,
            data: ['test@example.com'],
          },
        ],
      };

      const result = await audiences.updateCustomAudience('account_123', 'audience_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/custom_audiences/audience_123',
        params: {
          name: 'Updated Audience Name',
          operation_type: 'UPDATE',
          users: [
            {
              data_type: 'EMAIL',
              data: ['test@example.com'],
            },
          ],
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteCustomAudience', () => {
    it('should delete a custom audience', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_123',
          id_str: 'audience_123',
          name: 'Deleted Audience',
          audience_type: 'CRM',
          audience_size: 1000,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: true,
          is_owner: true,
          permission_level: 'WRITE',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await audiences.deleteCustomAudience('account_123', 'audience_123');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: '/12/accounts/account_123/custom_audiences/audience_123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addUsersToAudience', () => {
    it('should add users to a custom audience', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_123',
          id_str: 'audience_123',
          name: 'Test Audience',
          audience_type: 'CRM',
          audience_size: 1100,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: false,
          is_owner: true,
          permission_level: 'WRITE',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        users: [
          {
            data_type: 'EMAIL' as const,
            data: ['newuser@example.com', 'another@example.com'],
          },
        ],
        operation_type: 'UPDATE' as const,
      };

      const result = await audiences.addUsersToAudience('account_123', 'audience_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/custom_audiences/audience_123/users',
        params: {
          users: [
            {
              data_type: 'EMAIL',
              data: ['newuser@example.com', 'another@example.com'],
            },
          ],
          operation_type: 'UPDATE',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should add users with default operation type', async () => {
      const mockResponse: CustomAudienceResponse = {
        data: {
          id: 'audience_123',
          id_str: 'audience_123',
          name: 'Test Audience',
          audience_type: 'CRM',
          audience_size: 1100,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: false,
          is_owner: true,
          permission_level: 'WRITE',
        },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        users: [
          {
            data_type: 'PHONE_NUMBER' as const,
            data: ['+1234567890'],
          },
        ],
      };

      await audiences.addUsersToAudience('account_123', 'audience_123', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/custom_audiences/audience_123/users',
        params: {
          users: [
            {
              data_type: 'PHONE_NUMBER',
              data: ['+1234567890'],
            },
          ],
          operation_type: 'UPDATE',
        },
      });
    });
  });

  describe('isCustomAudienceTargeted', () => {
    it('should check if custom audience is targeted', async () => {
      const mockResponse: AudienceTargetedResponse = {
        data: { targeted: true },
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const result = await audiences.isCustomAudienceTargeted('account_123', 'audience_123');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/custom_audiences/audience_123/targeted',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Custom Audience Permissions', () => {
    describe('getCustomAudiencePermissions', () => {
      it('should get custom audience permissions', async () => {
        const mockResponse: AudiencePermissionsResponse = {
          data: [
            {
              id: 'permission_123',
              id_str: 'permission_123',
              account_id: 'account_123',
              granted_account_id: 'account_456',
              permission_level: 'READ',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              deleted: false,
            },
          ],
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await audiences.getCustomAudiencePermissions('account_123', 'audience_123');

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/custom_audiences/audience_123/permissions',
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createCustomAudiencePermission', () => {
      it('should create custom audience permission', async () => {
        const mockResponse: CustomAudienceResponse = {
          data: {
            id: 'audience_123',
            id_str: 'audience_123',
            name: 'Shared Audience',
            audience_type: 'CRM',
            audience_size: 1000,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
            is_owner: true,
            permission_level: 'WRITE',
          },
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const options = {
          granted_account_id: 'account_456',
          permission_level: 'READ' as const,
        };

        const result = await audiences.createCustomAudiencePermission(
          'account_123',
          'audience_123',
          options
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/custom_audiences/audience_123/permissions',
          params: {
            granted_account_id: 'account_456',
            permission_level: 'READ',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteCustomAudiencePermission', () => {
      it('should delete custom audience permission', async () => {
        const mockResponse: CustomAudienceResponse = {
          data: {
            id: 'audience_123',
            id_str: 'audience_123',
            name: 'Audience',
            audience_type: 'CRM',
            audience_size: 1000,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
            is_owner: true,
            permission_level: 'WRITE',
          },
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await audiences.deleteCustomAudiencePermission(
          'account_123',
          'audience_123',
          'permission_123'
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint:
            '/12/accounts/account_123/custom_audiences/audience_123/permissions/permission_123',
        });
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Do Not Reach Lists', () => {
    describe('getDoNotReachLists', () => {
      it('should get all do not reach lists', async () => {
        const mockResponse: DoNotReachListsResponse = {
          data: [
            {
              id: 'dnr_123',
              id_str: 'dnr_123',
              name: 'Do Not Reach List',
              list_type: 'CRM',
              audience_size: 500,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
              deleted: false,
            },
          ],
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const result = await audiences.getDoNotReachLists('account_123');

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/do_not_reach_lists',
          params: {},
        });
        expect(result).toEqual(mockResponse);
      });

      it('should get do not reach lists with pagination', async () => {
        const mockResponse: DoNotReachListsResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const options = {
          count: 20,
          cursor: 'cursor_abc',
        };

        await audiences.getDoNotReachLists('account_123', options);

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/do_not_reach_lists',
          params: {
            count: '20',
            cursor: 'cursor_abc',
          },
        });
      });
    });

    describe('createDoNotReachList', () => {
      it('should create a do not reach list', async () => {
        const mockResponse: DoNotReachListResponse = {
          data: {
            id: 'dnr_new',
            id_str: 'dnr_new',
            name: 'New DNR List',
            list_type: 'CRM',
            audience_size: 0,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
          },
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const options = {
          name: 'New DNR List',
          list_type: 'CRM' as const,
        };

        const result = await audiences.createDoNotReachList('account_123', options);

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/do_not_reach_lists',
          params: {
            name: 'New DNR List',
            list_type: 'CRM',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('searchKeywordInsights', () => {
    it('should search for keyword insights', async () => {
      const mockResponse: KeywordInsightsResponse = {
        data: [
          {
            keyword: 'test keyword',
            volume: 1000,
            competition: 'MEDIUM',
          },
          {
            keyword: 'another keyword',
            volume: 500,
            competition: 'LOW',
          },
        ],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        keywords: ['test keyword', 'another keyword'],
        country_code: 'US',
        language: 'en',
      };

      const result = await audiences.searchKeywordInsights(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/insights/keywords/search',
        params: {
          keywords: 'test keyword,another keyword',
          country_code: 'US',
          language: 'en',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should search for keyword insights without optional parameters', async () => {
      const mockResponse: KeywordInsightsResponse = {
        data: [{ keyword: 'single keyword' }],
        request: { params: {} },
      };

      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

      const options = {
        keywords: ['single keyword'],
      };

      await audiences.searchKeywordInsights(options);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/insights/keywords/search',
        params: {
          keywords: 'single keyword',
        },
      });
    });
  });

  describe('Convenience Methods', () => {
    describe('createEmailAudience', () => {
      it('should create email audience and add users', async () => {
        const mockCreateResponse: CustomAudienceResponse = {
          data: {
            id: 'email_audience_123',
            id_str: 'email_audience_123',
            name: 'Email Audience',
            audience_type: 'CRM',
            audience_size: 0,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
            is_owner: true,
            permission_level: 'WRITE',
            list_type: 'CRM',
          },
          request: { params: {} },
        };

        const mockAddResponse: CustomAudienceResponse = {
          ...mockCreateResponse,
          data: {
            ...mockCreateResponse.data,
            audience_size: 100,
          },
        };

        vi.mocked(mockHttpClient.request)
          .mockResolvedValueOnce(mockCreateResponse) // createCustomAudience
          .mockResolvedValueOnce(mockAddResponse); // addUsersToAudience

        const emails = ['user1@example.com', 'user2@example.com'];
        const result = await audiences.createEmailAudience('account_123', 'Email Audience', emails);

        expect(mockHttpClient.request).toHaveBeenNthCalledWith(1, {
          method: 'POST',
          endpoint: '/12/accounts/account_123/custom_audiences',
          params: {
            name: 'Email Audience',
            audience_type: 'CRM',
            list_type: 'CRM',
          },
        });

        expect(mockHttpClient.request).toHaveBeenNthCalledWith(2, {
          method: 'POST',
          endpoint: '/12/accounts/account_123/custom_audiences/email_audience_123/users',
          params: {
            users: [
              {
                data_type: 'EMAIL',
                data: emails,
              },
            ],
            operation_type: 'UPDATE',
          },
        });

        expect(result).toEqual(mockCreateResponse);
      });

      it('should create email audience without users', async () => {
        const mockCreateResponse: CustomAudienceResponse = {
          data: {
            id: 'email_audience_123',
            id_str: 'email_audience_123',
            name: 'Empty Email Audience',
            audience_type: 'CRM',
            audience_size: 0,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
            is_owner: true,
            permission_level: 'WRITE',
            list_type: 'CRM',
          },
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValueOnce(mockCreateResponse);

        const result = await audiences.createEmailAudience(
          'account_123',
          'Empty Email Audience',
          []
        );

        expect(mockHttpClient.request).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCreateResponse);
      });
    });

    describe('removeUsersFromAudience', () => {
      it('should remove users from audience', async () => {
        const mockResponse: CustomAudienceResponse = {
          data: {
            id: 'audience_123',
            id_str: 'audience_123',
            name: 'Test Audience',
            audience_type: 'CRM',
            audience_size: 900,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-02T00:00:00Z',
            deleted: false,
            is_owner: true,
            permission_level: 'WRITE',
          },
          request: { params: {} },
        };

        vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);

        const options = {
          users: [
            {
              data_type: 'EMAIL' as const,
              data: ['remove@example.com'],
            },
          ],
        };

        const result = await audiences.removeUsersFromAudience(
          'account_123',
          'audience_123',
          options
        );

        expect(mockHttpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/custom_audiences/audience_123/users',
          params: {
            users: [
              {
                data_type: 'EMAIL',
                data: ['remove@example.com'],
              },
            ],
            operation_type: 'DELETE',
          },
        });
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
