export interface MediaLibrary {
  id: string;
  name: string;
  file_name: string;
  media_category: 'TWEET_IMAGE' | 'TWEET_VIDEO' | 'TWEET_GIF' | 'AMPLIFY_VIDEO';
  media_url: string;
  media_key?: string;
  aspect_ratio: string;
  duration_ms?: number;
  file_size: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

export interface VideoAsset {
  video_id: string;
  aspect_ratio: string;
  duration_ms: number;
  file_size: number;
  poster_image_url?: string;
  preview_url?: string;
  variant: VideoVariant[];
}

export interface VideoVariant {
  bit_rate: number;
  content_type: string;
  url: string;
}

export interface MediaUploadData {
  file: File | Blob | string;
  media_category: MediaLibrary['media_category'];
  name?: string;
  [key: string]: unknown;
}

export interface MediaListOptions {
  count?: number;
  cursor?: string;
  media_ids?: string[];
  media_categories?: MediaLibrary['media_category'][];
  [key: string]: unknown;
}

export interface MediaResponse {
  data: MediaLibrary;
}

export interface MediaListResponse {
  data: MediaLibrary[];
  next_cursor?: string;
  request: {
    params: import('./api').QueryParams;
  };
}
