/**
 * X Ads Creatives API types
 * @see https://docs.x.com/x-ads-api/creatives
 */

/**
 * Media types supported by X Ads
 */
export type MediaType = 'VIDEO' | 'IMAGE' | 'GIF';

/**
 * Media categories for account media library
 */
export type MediaCategory =
  | 'AMPLIFY_VIDEO'
  | 'GIF'
  | 'IMAGE'
  | 'TWEET_GIF'
  | 'TWEET_IMAGE'
  | 'TWEET_VIDEO'
  | 'VIDEO';

/**
 * Card types supported by X Ads
 */
export type CardType =
  | 'IMAGE_APP_DOWNLOAD_CARD'
  | 'VIDEO_APP_DOWNLOAD_CARD'
  | 'IMAGE_WEBSITE_CARD'
  | 'VIDEO_WEBSITE_CARD'
  | 'CONVERSATION_CARD'
  | 'IMAGE_CAROUSEL_CARD'
  | 'VIDEO_CAROUSEL_CARD'
  | 'POLL2_CHOICE_CARD'
  | 'POLL3_CHOICE_CARD'
  | 'POLL4_CHOICE_CARD';

/**
 * Tweet type for draft tweets
 */
export type TweetType = 'PUBLISHED' | 'DRAFT' | 'SCHEDULED';

/**
 * Creative asset status
 */
export type CreativeAssetStatus = 'ACTIVE' | 'DELETED' | 'PAUSED';

/**
 * Account media entity
 */
export interface AccountMedia {
  id: string;
  id_str: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  media_url: string;
  media_key: string;
  media_type: MediaType;
  media_category: MediaCategory;
  tweeted: boolean;
  file_name: string;
  file_size: number;
  creative_media_keys?: string[];
}

/**
 * Card component for cards
 */
export interface CardComponent {
  type: string;
  data: Record<string, unknown>;
}

/**
 * Card entity
 */
export interface Card {
  id: string;
  id_str: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  card_type: CardType;
  card_uri: string;
  preview_url?: string;
  components: CardComponent[];
}

/**
 * Draft tweet entity
 */
export interface DraftTweet {
  id: string;
  id_str: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  tweet_type: TweetType;
  text: string;
  as_user_id?: string;
  card_uri?: string;
  media_keys?: string[];
  nullcast?: boolean;
  scheduled_at?: string;
}

/**
 * Scheduled tweet entity
 */
export interface ScheduledTweet {
  id: string;
  id_str: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  scheduled_at: string;
  text: string;
  as_user_id?: string;
  card_uri?: string;
  media_keys?: string[];
  nullcast?: boolean;
  completed_at?: string;
  user_id?: string;
}

/**
 * Carousel card slide
 */
export interface CarouselSlide {
  media_key: string;
  headline?: string;
  description?: string;
  destination_url?: string;
}

/**
 * Creative metadata tag
 */
export interface CreativeMetadataTag {
  key: string;
  value: string;
}

/**
 * Account media response
 */
export interface AccountMediaResponse {
  data: AccountMedia;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Account media list response
 */
export interface AccountMediaListResponse {
  data: AccountMedia[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Card response
 */
export interface CardResponse {
  data: Card;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Cards list response
 */
export interface CardsResponse {
  data: Card[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Draft tweet response
 */
export interface DraftTweetResponse {
  data: DraftTweet;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Draft tweets list response
 */
export interface DraftTweetsResponse {
  data: DraftTweet[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Scheduled tweet response
 */
export interface ScheduledTweetResponse {
  data: ScheduledTweet;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Scheduled tweets list response
 */
export interface ScheduledTweetsResponse {
  data: ScheduledTweet[];
  next_cursor?: string;
  request: {
    params: Record<string, unknown>;
  };
}

/**
 * Account media creation options
 */
export interface CreateAccountMediaOptions {
  media_category: MediaCategory;
  media_type: MediaType;
  media_url?: string;
  media_key?: string;
  creative_media_keys?: string[];
  file_name?: string;
}

/**
 * Card creation options
 */
export interface CreateCardOptions {
  name: string;
  card_type: CardType;
  components: CardComponent[];
}

/**
 * Card update options
 */
export interface UpdateCardOptions {
  name?: string;
  components?: CardComponent[];
}

/**
 * Draft tweet creation options
 */
export interface CreateDraftTweetOptions {
  text: string;
  as_user_id?: string;
  card_uri?: string;
  media_keys?: string[];
  nullcast?: boolean;
}

/**
 * Draft tweet update options
 */
export interface UpdateDraftTweetOptions {
  text?: string;
  as_user_id?: string;
  card_uri?: string;
  media_keys?: string[];
  nullcast?: boolean;
}

/**
 * Scheduled tweet creation options
 */
export interface CreateScheduledTweetOptions {
  text: string;
  scheduled_at: string;
  as_user_id?: string;
  card_uri?: string;
  media_keys?: string[];
  nullcast?: boolean;
}

/**
 * Scheduled tweet update options
 */
export interface UpdateScheduledTweetOptions {
  text?: string;
  scheduled_at?: string;
  as_user_id?: string;
  card_uri?: string;
  media_keys?: string[];
  nullcast?: boolean;
}

/**
 * Carousel card creation options
 */
export interface CreateCarouselCardOptions {
  name: string;
  first_cta: string;
  second_cta?: string;
  destination_url?: string;
  slides: CarouselSlide[];
}

/**
 * Media upload options
 */
export interface MediaUploadOptions {
  media_data: string;
  media_type: MediaType;
  media_category?: MediaCategory;
  additional_owners?: string[];
  creative_metadata_tags?: CreativeMetadataTag[];
}

/**
 * Cards fetch options
 */
export interface CardsFetchOptions {
  card_uris: string[];
}

/**
 * Cards fetch response
 */
export interface CardsFetchResponse {
  data: Card[];
  request: {
    params: Record<string, unknown>;
  };
}
