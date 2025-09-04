import { BaseClient } from '../client/base-client';
import type {
  MediaLibrary,
  MediaListOptions,
  MediaListResponse,
  MediaResponse,
  MediaUploadData,
} from '../types';
import { sanitizeParams, validateRequired, validateStringLength } from '../utils/validation';

export class MediaClient extends BaseClient {
  public async upload(accountId: string, data: MediaUploadData): Promise<MediaResponse> {
    validateRequired({ accountId }, ['accountId']);
    validateRequired(data, ['file', 'media_category']);

    if (data.name) {
      validateStringLength(data.name, 'Media name');
    }

    const formData = new FormData();

    if (typeof data.file === 'string') {
      throw new Error('File path uploads not supported in browser environment');
    }

    formData.append('media', data.file);
    formData.append('media_category', data.media_category);

    if (data.name) {
      formData.append('name', data.name);
    }

    return this.post<MediaLibrary>(`/accounts/${accountId}/media_library`, formData);
  }

  public async list(accountId: string, options?: MediaListOptions): Promise<MediaListResponse> {
    validateRequired({ accountId }, ['accountId']);
    const params = options ? sanitizeParams(options) : {};
    return this.getList<MediaLibrary>(`/accounts/${accountId}/media_library`, params);
  }

  public async getMedia(accountId: string, mediaId: string): Promise<MediaResponse> {
    validateRequired({ accountId, mediaId }, ['accountId', 'mediaId']);
    return this.get<MediaLibrary>(`/accounts/${accountId}/media_library/${mediaId}`);
  }

  public async delete(accountId: string, mediaId: string): Promise<MediaResponse> {
    validateRequired({ accountId, mediaId }, ['accountId', 'mediaId']);
    return this.deleteRequest<MediaLibrary>(`/accounts/${accountId}/media_library/${mediaId}`);
  }
}
