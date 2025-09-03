/**
 * Creatives resource for X Ads API
 */

import type { RequestOptions } from '../types/auth.js';
import type {
  AccountMediaListResponse,
  AccountMediaResponse,
  CardResponse,
  CardsFetchOptions,
  CardsFetchResponse,
  CardsResponse,
  CreateAccountMediaOptions,
  CreateCardOptions,
  CreateCarouselCardOptions,
  CreateDraftTweetOptions,
  CreateScheduledTweetOptions,
  DraftTweetResponse,
  DraftTweetsResponse,
  MediaUploadOptions,
  ScheduledTweetResponse,
  ScheduledTweetsResponse,
  UpdateCardOptions,
  UpdateDraftTweetOptions,
  UpdateScheduledTweetOptions,
} from '../types/creatives.js';
import { BaseResource } from './base.js';

/**
 * Creatives resource class
 */
export class Creatives extends BaseResource {
  // Account Media Management

  /**
   * Get all account media for an account
   */
  async getAccountMedia(
    accountId: string,
    options?: {
      media_ids?: string[];
      media_types?: string[];
      media_categories?: string[];
      tweeted?: boolean;
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
    },
    requestOptions?: RequestOptions
  ): Promise<AccountMediaListResponse> {
    const params: Record<string, string> = {};

    if (options?.media_ids) {
      params.media_ids = options.media_ids.join(',');
    }
    if (options?.media_types) {
      params.media_types = options.media_types.join(',');
    }
    if (options?.media_categories) {
      params.media_categories = options.media_categories.join(',');
    }
    if (options?.tweeted !== undefined) {
      params.tweeted = options.tweeted.toString();
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/account_media`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<AccountMediaListResponse>(requestConfig);
  }

  /**
   * Get a specific account media
   */
  async getAccountMediaById(
    accountId: string,
    mediaId: string,
    requestOptions?: RequestOptions
  ): Promise<AccountMediaResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/account_media/${mediaId}`,
      ...requestOptions,
    };

    return this.httpClient.request<AccountMediaResponse>(requestConfig);
  }

  /**
   * Create account media
   */
  async createAccountMedia(
    accountId: string,
    options: CreateAccountMediaOptions,
    requestOptions?: RequestOptions
  ): Promise<AccountMediaResponse> {
    const params = {
      media_category: options.media_category,
      media_type: options.media_type,
      ...(options.media_url && { media_url: options.media_url }),
      ...(options.media_key && { media_key: options.media_key }),
      ...(options.creative_media_keys && {
        creative_media_keys: options.creative_media_keys.join(','),
      }),
      ...(options.file_name && { file_name: options.file_name }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/account_media`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<AccountMediaResponse>(requestConfig);
  }

  /**
   * Update account media
   */
  async updateAccountMedia(
    accountId: string,
    mediaId: string,
    options: Partial<CreateAccountMediaOptions>,
    requestOptions?: RequestOptions
  ): Promise<AccountMediaResponse> {
    const params: Record<string, unknown> = {};

    if (options.media_category) {
      params.media_category = options.media_category;
    }
    if (options.creative_media_keys) {
      params.creative_media_keys = options.creative_media_keys.join(',');
    }
    if (options.file_name) {
      params.file_name = options.file_name;
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/account_media/${mediaId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<AccountMediaResponse>(requestConfig);
  }

  /**
   * Delete account media
   */
  async deleteAccountMedia(
    accountId: string,
    mediaId: string,
    requestOptions?: RequestOptions
  ): Promise<AccountMediaResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/account_media/${mediaId}`,
      ...requestOptions,
    };

    return this.httpClient.request<AccountMediaResponse>(requestConfig);
  }

  // Card Management

  /**
   * Get all cards for an account
   */
  async getCards(
    accountId: string,
    options?: {
      card_ids?: string[];
      card_types?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<CardsResponse> {
    const params: Record<string, string> = {};

    if (options?.card_ids) {
      params.card_ids = options.card_ids.join(',');
    }
    if (options?.card_types) {
      params.card_types = options.card_types.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/cards`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CardsResponse>(requestConfig);
  }

  /**
   * Get a specific card
   */
  async getCard(
    accountId: string,
    cardId: string,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/cards/${cardId}`,
      ...requestOptions,
    };

    return this.httpClient.request<CardResponse>(requestConfig);
  }

  /**
   * Create a new card
   */
  async createCard(
    accountId: string,
    options: CreateCardOptions,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const params = {
      name: options.name,
      card_type: options.card_type,
      components: JSON.stringify(options.components),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/cards`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CardResponse>(requestConfig);
  }

  /**
   * Update a card
   */
  async updateCard(
    accountId: string,
    cardId: string,
    options: UpdateCardOptions,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const params: Record<string, unknown> = {};

    if (options.name) {
      params.name = options.name;
    }
    if (options.components) {
      params.components = JSON.stringify(options.components);
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/cards/${cardId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CardResponse>(requestConfig);
  }

  /**
   * Delete a card
   */
  async deleteCard(
    accountId: string,
    cardId: string,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/cards/${cardId}`,
      ...requestOptions,
    };

    return this.httpClient.request<CardResponse>(requestConfig);
  }

  /**
   * Fetch cards by URIs
   */
  async fetchCards(
    accountId: string,
    options: CardsFetchOptions,
    requestOptions?: RequestOptions
  ): Promise<CardsFetchResponse> {
    const params = {
      card_uris: options.card_uris.join(','),
    };

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/cards/all`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<CardsFetchResponse>(requestConfig);
  }

  // Draft Tweet Management

  /**
   * Get all draft tweets for an account
   */
  async getDraftTweets(
    accountId: string,
    options?: {
      draft_tweet_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at';
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<DraftTweetsResponse> {
    const params: Record<string, string> = {};

    if (options?.draft_tweet_ids) {
      params.draft_tweet_ids = options.draft_tweet_ids.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/draft_tweets`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DraftTweetsResponse>(requestConfig);
  }

  /**
   * Get a specific draft tweet
   */
  async getDraftTweet(
    accountId: string,
    draftTweetId: string,
    requestOptions?: RequestOptions
  ): Promise<DraftTweetResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/draft_tweets/${draftTweetId}`,
      ...requestOptions,
    };

    return this.httpClient.request<DraftTweetResponse>(requestConfig);
  }

  /**
   * Create a new draft tweet
   */
  async createDraftTweet(
    accountId: string,
    options: CreateDraftTweetOptions,
    requestOptions?: RequestOptions
  ): Promise<DraftTweetResponse> {
    const params = {
      text: options.text,
      ...(options.as_user_id && { as_user_id: options.as_user_id }),
      ...(options.card_uri && { card_uri: options.card_uri }),
      ...(options.media_keys && { media_keys: options.media_keys.join(',') }),
      ...(options.nullcast !== undefined && { nullcast: options.nullcast }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/draft_tweets`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DraftTweetResponse>(requestConfig);
  }

  /**
   * Update a draft tweet
   */
  async updateDraftTweet(
    accountId: string,
    draftTweetId: string,
    options: UpdateDraftTweetOptions,
    requestOptions?: RequestOptions
  ): Promise<DraftTweetResponse> {
    const params: Record<string, unknown> = {};

    if (options.text) {
      params.text = options.text;
    }
    if (options.as_user_id) {
      params.as_user_id = options.as_user_id;
    }
    if (options.card_uri) {
      params.card_uri = options.card_uri;
    }
    if (options.media_keys) {
      params.media_keys = options.media_keys.join(',');
    }
    if (options.nullcast !== undefined) {
      params.nullcast = options.nullcast;
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/draft_tweets/${draftTweetId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<DraftTweetResponse>(requestConfig);
  }

  /**
   * Delete a draft tweet
   */
  async deleteDraftTweet(
    accountId: string,
    draftTweetId: string,
    requestOptions?: RequestOptions
  ): Promise<DraftTweetResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/draft_tweets/${draftTweetId}`,
      ...requestOptions,
    };

    return this.httpClient.request<DraftTweetResponse>(requestConfig);
  }

  // Scheduled Tweet Management

  /**
   * Get all scheduled tweets for an account
   */
  async getScheduledTweets(
    accountId: string,
    options?: {
      scheduled_tweet_ids?: string[];
      count?: number;
      cursor?: string;
      sort_by?: 'created_at' | 'updated_at' | 'scheduled_at';
      with_deleted?: boolean;
    },
    requestOptions?: RequestOptions
  ): Promise<ScheduledTweetsResponse> {
    const params: Record<string, string> = {};

    if (options?.scheduled_tweet_ids) {
      params.scheduled_tweet_ids = options.scheduled_tweet_ids.join(',');
    }
    if (options?.count) {
      params.count = options.count.toString();
    }
    if (options?.cursor) {
      params.cursor = options.cursor;
    }
    if (options?.sort_by) {
      params.sort_by = options.sort_by;
    }
    if (options?.with_deleted !== undefined) {
      params.with_deleted = options.with_deleted.toString();
    }

    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/scheduled_tweets`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ScheduledTweetsResponse>(requestConfig);
  }

  /**
   * Get a specific scheduled tweet
   */
  async getScheduledTweet(
    accountId: string,
    scheduledTweetId: string,
    requestOptions?: RequestOptions
  ): Promise<ScheduledTweetResponse> {
    const requestConfig = {
      method: 'GET' as const,
      endpoint: `/12/accounts/${accountId}/scheduled_tweets/${scheduledTweetId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ScheduledTweetResponse>(requestConfig);
  }

  /**
   * Create a new scheduled tweet
   */
  async createScheduledTweet(
    accountId: string,
    options: CreateScheduledTweetOptions,
    requestOptions?: RequestOptions
  ): Promise<ScheduledTweetResponse> {
    const params = {
      text: options.text,
      scheduled_at: options.scheduled_at,
      ...(options.as_user_id && { as_user_id: options.as_user_id }),
      ...(options.card_uri && { card_uri: options.card_uri }),
      ...(options.media_keys && { media_keys: options.media_keys.join(',') }),
      ...(options.nullcast !== undefined && { nullcast: options.nullcast }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/scheduled_tweets`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ScheduledTweetResponse>(requestConfig);
  }

  /**
   * Update a scheduled tweet
   */
  async updateScheduledTweet(
    accountId: string,
    scheduledTweetId: string,
    options: UpdateScheduledTweetOptions,
    requestOptions?: RequestOptions
  ): Promise<ScheduledTweetResponse> {
    const params: Record<string, unknown> = {};

    if (options.text) {
      params.text = options.text;
    }
    if (options.scheduled_at) {
      params.scheduled_at = options.scheduled_at;
    }
    if (options.as_user_id) {
      params.as_user_id = options.as_user_id;
    }
    if (options.card_uri) {
      params.card_uri = options.card_uri;
    }
    if (options.media_keys) {
      params.media_keys = options.media_keys.join(',');
    }
    if (options.nullcast !== undefined) {
      params.nullcast = options.nullcast;
    }

    const requestConfig = {
      method: 'PUT' as const,
      endpoint: `/12/accounts/${accountId}/scheduled_tweets/${scheduledTweetId}`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<ScheduledTweetResponse>(requestConfig);
  }

  /**
   * Delete a scheduled tweet
   */
  async deleteScheduledTweet(
    accountId: string,
    scheduledTweetId: string,
    requestOptions?: RequestOptions
  ): Promise<ScheduledTweetResponse> {
    const requestConfig = {
      method: 'DELETE' as const,
      endpoint: `/12/accounts/${accountId}/scheduled_tweets/${scheduledTweetId}`,
      ...requestOptions,
    };

    return this.httpClient.request<ScheduledTweetResponse>(requestConfig);
  }

  // Convenience Methods

  /**
   * Create image website card
   */
  async createImageWebsiteCard(
    accountId: string,
    name: string,
    websiteUrl: string,
    mediaKey: string,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const components = [
      {
        type: 'MEDIA',
        data: {
          media_key: mediaKey,
        },
      },
      {
        type: 'DETAILS',
        data: {
          destination_url: websiteUrl,
        },
      },
    ];

    return this.createCard(
      accountId,
      {
        name,
        card_type: 'IMAGE_WEBSITE_CARD',
        components,
      },
      requestOptions
    );
  }

  /**
   * Create video website card
   */
  async createVideoWebsiteCard(
    accountId: string,
    name: string,
    websiteUrl: string,
    mediaKey: string,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const components = [
      {
        type: 'MEDIA',
        data: {
          media_key: mediaKey,
        },
      },
      {
        type: 'DETAILS',
        data: {
          destination_url: websiteUrl,
        },
      },
    ];

    return this.createCard(
      accountId,
      {
        name,
        card_type: 'VIDEO_WEBSITE_CARD',
        components,
      },
      requestOptions
    );
  }

  /**
   * Create carousel card
   */
  async createCarouselCard(
    accountId: string,
    options: CreateCarouselCardOptions,
    requestOptions?: RequestOptions
  ): Promise<CardResponse> {
    const components = [
      {
        type: 'DETAILS',
        data: {
          first_cta: options.first_cta,
          ...(options.second_cta && { second_cta: options.second_cta }),
          ...(options.destination_url && { destination_url: options.destination_url }),
        },
      },
      ...options.slides.map((slide) => ({
        type: 'MEDIA',
        data: {
          media_key: slide.media_key,
          ...(slide.headline && { headline: slide.headline }),
          ...(slide.description && { description: slide.description }),
          ...(slide.destination_url && { destination_url: slide.destination_url }),
        },
      })),
    ];

    return this.createCard(
      accountId,
      {
        name: options.name,
        card_type: 'IMAGE_CAROUSEL_CARD',
        components,
      },
      requestOptions
    );
  }

  /**
   * Promote draft tweet (convert to line item)
   */
  async promoteDraftTweet(
    accountId: string,
    draftTweetId: string,
    requestOptions?: RequestOptions
  ): Promise<DraftTweetResponse> {
    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/draft_tweets/${draftTweetId}/promote`,
      ...requestOptions,
    };

    return this.httpClient.request<DraftTweetResponse>(requestConfig);
  }

  /**
   * Upload media to account media library
   */
  async uploadMedia(
    accountId: string,
    options: MediaUploadOptions,
    requestOptions?: RequestOptions
  ): Promise<AccountMediaResponse> {
    const params = {
      media_data: options.media_data,
      media_type: options.media_type,
      ...(options.media_category && { media_category: options.media_category }),
      ...(options.additional_owners && { additional_owners: options.additional_owners.join(',') }),
      ...(options.creative_metadata_tags && {
        creative_metadata_tags: JSON.stringify(options.creative_metadata_tags),
      }),
    };

    const requestConfig = {
      method: 'POST' as const,
      endpoint: `/12/accounts/${accountId}/account_media`,
      ...requestOptions,
      params: { ...requestOptions?.params, ...params },
    };

    return this.httpClient.request<AccountMediaResponse>(requestConfig);
  }
}
