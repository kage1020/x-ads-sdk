import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '@/client/http-client';
import { MediaClient } from '@/resources/media';
import type { AuthenticationContext, MediaUploadData } from '@/types';

describe('Media Client Mock Tests', () => {
  let mediaClient: MediaClient;
  let mockHttpClient: HttpClient;
  let mockContext: AuthenticationContext;

  beforeEach(() => {
    // Mock HTTP client
    mockHttpClient = {
      request: vi.fn().mockResolvedValue({
        data: {
          id: 'media123',
          name: 'Test Media',
          media_category: 'TWEET_IMAGE' as const,
          file_name: 'test.jpg',
          file_size: 1024,
        },
      }),
    } as unknown as HttpClient;

    mockContext = {
      baseUrl: 'https://ads-api-sandbox.twitter.com/12',
      environment: 'sandbox',
    } as AuthenticationContext;

    mediaClient = new MediaClient(mockHttpClient, mockContext);
  });

  describe('upload method - coverage for FormData operations', () => {
    it('should throw error for string file paths - line 22-23', async () => {
      const stringPathData = {
        file: '/path/to/file.jpg',
        media_category: 'TWEET_IMAGE' as const,
      };

      await expect(
        mediaClient.upload('accountId', stringPathData as unknown as MediaUploadData)
      ).rejects.toThrow('File path uploads not supported in browser environment');
    });

    it('should create FormData and append file - lines 26-33', async () => {
      const uploadData = {
        file: new File(['test content'], 'test.jpg', { type: 'image/jpeg' }),
        media_category: 'TWEET_IMAGE' as const,
        name: 'Test Media Name',
      };

      await mediaClient.upload('accountId', uploadData);

      // Verify HTTP client was called with FormData
      expect(mockHttpClient.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: 'https://ads-api-sandbox.twitter.com/12/accounts/accountId/media_library',
          data: expect.any(FormData),
        })
      );

      // Get the FormData from the call
      const call = vi.mocked(mockHttpClient.request).mock.calls[0];
      const formData = call[0].data as FormData;

      expect(formData.get('media')).toBeInstanceOf(File);
      expect(formData.get('media_category')).toBe('TWEET_IMAGE');
      expect(formData.get('name')).toBe('Test Media Name');
    });

    it('should NOT append name when not provided - line 29 false branch', async () => {
      const uploadData = {
        file: new File(['test content'], 'test.jpg', { type: 'image/jpeg' }),
        media_category: 'TWEET_IMAGE' as const,
        // No name provided
      };

      await mediaClient.upload('accountId', uploadData);

      const call = vi.mocked(mockHttpClient.request).mock.calls[0];
      const formData = call[0].data as FormData;

      expect(formData.get('media')).toBeInstanceOf(File);
      expect(formData.get('media_category')).toBe('TWEET_IMAGE');
      expect(formData.get('name')).toBeNull(); // Name should not be present
    });

    it('should validate name length when provided - line 16-18', async () => {
      const uploadData = {
        file: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
        media_category: 'TWEET_IMAGE' as const,
        name: 'x'.repeat(281), // Exceeds 280 character limit
      };

      await expect(mediaClient.upload('accountId', uploadData)).rejects.toThrow(
        'Media name cannot exceed 280 characters'
      );
    });

    it('should NOT validate name length when not provided - line 16 false branch', async () => {
      const uploadData = {
        file: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
        media_category: 'TWEET_IMAGE' as const,
        // No name provided - line 16 if condition should be false
      };

      // Should not throw validation error
      await expect(mediaClient.upload('accountId', uploadData)).resolves.toBeDefined();
    });
  });

  describe('other methods', () => {
    it('should call list method - lines 37-39', async () => {
      await mediaClient.list('accountId');

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://ads-api-sandbox.twitter.com/12/accounts/accountId/media_library',
          params: {},
        })
      );
    });

    it('should call list method with options - lines 37-39', async () => {
      const options = { count: 10, media_category: 'TWEET_IMAGE' };
      await mediaClient.list('accountId', options);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://ads-api-sandbox.twitter.com/12/accounts/accountId/media_library',
          params: options,
        })
      );
    });

    it('should call getMedia method - line 44', async () => {
      await mediaClient.getMedia('accountId', 'mediaId');

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://ads-api-sandbox.twitter.com/12/accounts/accountId/media_library/mediaId',
        })
      );
    });

    it('should call delete method - line 49', async () => {
      await mediaClient.delete('accountId', 'mediaId');

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'DELETE',
          url: 'https://ads-api-sandbox.twitter.com/12/accounts/accountId/media_library/mediaId',
        })
      );
    });
  });
});
