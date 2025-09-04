import { beforeEach, describe, expect, it } from 'vitest';
import { XAdsClient } from '@/index';
import type { SDKConfig } from '@/types/auth';
import type { MediaLibrary, MediaListOptions, MediaUploadData } from '@/types/media';

describe('Media Contract Tests', () => {
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

  describe('Media Upload', () => {
    it.skip('should upload a media file successfully (FormData MSW issue)', async () => {
      // TODO: Fix MSW FormData handling issue
      const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });

      const uploadData: MediaUploadData = {
        file: testFile,
        media_category: 'TWEET_IMAGE',
        name: 'Test Image Upload',
      };

      const response = await client.media.upload(testAccountId, uploadData);

      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'Test Image Upload');
      expect(response.data).toHaveProperty('media_category', 'TWEET_IMAGE');
      expect(response.data).toHaveProperty('account_id', testAccountId);
      expect(response.data).toHaveProperty('file_name', 'test.jpg');
      expect(response.data).toHaveProperty('media_url');
      expect(response.data).toHaveProperty('created_at');
      expect(response.data).toHaveProperty('updated_at');
    });

    it.skip('should upload a video file successfully (FormData MSW issue)', async () => {
      // TODO: Fix MSW FormData handling issue
      const testFile = new File(['test video content'], 'test.mp4', { type: 'video/mp4' });

      const uploadData: MediaUploadData = {
        file: testFile,
        media_category: 'TWEET_VIDEO',
      };

      const response = await client.media.upload(testAccountId, uploadData);

      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('media_category', 'TWEET_VIDEO');
      expect(response.data).toHaveProperty('file_name', 'test.mp4');
    });

    it('should handle upload validation errors', async () => {
      const uploadData: MediaUploadData = {
        file: null as unknown as File,
        media_category: 'TWEET_IMAGE',
      };

      await expect(client.media.upload(testAccountId, uploadData)).rejects.toThrow();
    });

    it('should reject file path uploads in browser environment', async () => {
      const uploadData: MediaUploadData = {
        file: '/path/to/file.jpg' as unknown as File,
        media_category: 'TWEET_IMAGE',
      };

      await expect(client.media.upload(testAccountId, uploadData)).rejects.toThrow(
        'File path uploads not supported in browser environment'
      );
    });

    it('should validate required parameters', async () => {
      const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });

      // Missing media_category
      const invalidData = {
        file: testFile,
      } as MediaUploadData;

      await expect(client.media.upload(testAccountId, invalidData)).rejects.toThrow();
    });

    it('should handle long media names', async () => {
      const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const longName = 'a'.repeat(300); // Very long name

      const uploadData: MediaUploadData = {
        file: testFile,
        media_category: 'TWEET_IMAGE',
        name: longName,
      };

      await expect(client.media.upload(testAccountId, uploadData)).rejects.toThrow();
    });
  });

  describe('Media List', () => {
    it('should list all media files', async () => {
      const response = await client.media.list(testAccountId);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data[0]).toHaveProperty('id');
      expect(response.data[0]).toHaveProperty('name');
      expect(response.data[0]).toHaveProperty('media_category');
      expect(response.data[0]).toHaveProperty('account_id', testAccountId);
      expect(response.request).toHaveProperty('params');
    });

    it('should list media files with filtering options', async () => {
      const options: MediaListOptions = {
        media_category: 'TWEET_VIDEO',
        count: 10,
        cursor: 'test-cursor',
      };

      const response = await client.media.list(testAccountId, options);

      expect(response.data).toBeInstanceOf(Array);
      expect(response.data[0]).toHaveProperty('media_category', 'TWEET_VIDEO');
      expect(response.request.params).toHaveProperty('media_category', 'TWEET_VIDEO');
    });

    it('should handle empty media list', async () => {
      const response = await client.media.list('empty-account');

      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('Get Single Media', () => {
    it('should retrieve a specific media file', async () => {
      const mediaId = 'media123';
      const response = await client.media.getMedia(testAccountId, mediaId);

      expect(response.data).toHaveProperty('id', mediaId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('media_category');
      expect(response.data).toHaveProperty('account_id', testAccountId);
      expect(response.data).toHaveProperty('file_name');
      expect(response.data).toHaveProperty('file_size');
      expect(response.data).toHaveProperty('media_url');
    });

    it('should handle non-existent media', async () => {
      await expect(client.media.getMedia(testAccountId, 'non-existent')).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      await expect(client.media.getMedia('', 'media123')).rejects.toThrow();

      await expect(client.media.getMedia(testAccountId, '')).rejects.toThrow();
    });
  });

  describe('Delete Media', () => {
    it('should delete a media file successfully', async () => {
      const mediaId = 'media123';
      const response = await client.media.delete(testAccountId, mediaId);

      expect(response.data).toHaveProperty('id', mediaId);
      expect(response.data).toHaveProperty('deleted', true);
      expect(response.data).toHaveProperty('account_id', testAccountId);
    });

    it('should handle non-existent media deletion', async () => {
      await expect(client.media.delete(testAccountId, 'non-existent')).rejects.toThrow();
    });

    it('should validate required parameters for deletion', async () => {
      await expect(client.media.delete('', 'media123')).rejects.toThrow();

      await expect(client.media.delete(testAccountId, '')).rejects.toThrow();
    });
  });

  describe('Media Client Integration', () => {
    it('should have media client available on main client', () => {
      expect(client.media).toBeDefined();
      expect(typeof client.media.upload).toBe('function');
      expect(typeof client.media.list).toBe('function');
      expect(typeof client.media.getMedia).toBe('function');
      expect(typeof client.media.delete).toBe('function');
    });

    it.skip('should handle different media categories (FormData MSW issue)', async () => {
      // TODO: Fix MSW FormData handling issue
      const categories: Array<MediaLibrary['media_category']> = [
        'TWEET_IMAGE',
        'TWEET_VIDEO',
        'TWEET_GIF',
        'AMPLIFY_VIDEO',
      ];

      for (const category of categories) {
        const testFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
        const uploadData: MediaUploadData = {
          file: testFile,
          media_category: category,
        };

        const response = await client.media.upload(testAccountId, uploadData);
        expect(response.data).toHaveProperty('media_category', category);
      }
    });

    it('should handle concurrent media operations without upload', async () => {
      // Test concurrent operations that don't involve FormData uploads
      const operations = [
        client.media.list(testAccountId),
        client.media.getMedia(testAccountId, 'media123'),
        client.media.list(testAccountId, { media_category: 'TWEET_IMAGE' }),
      ];

      const results = await Promise.all(operations);

      expect(results).toHaveLength(3);
      expect(results[0].data).toBeInstanceOf(Array); // list
      expect(results[1].data).toHaveProperty('id'); // get
      expect(results[2].data).toBeInstanceOf(Array); // filtered list
    });
  });
});
