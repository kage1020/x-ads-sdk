import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { HttpClient } from '../../client/base.js';
import type {
  AccountMediaListResponse,
  AccountMediaResponse,
  CardResponse,
  CardsFetchResponse,
  CardsResponse,
  DraftTweetResponse,
  DraftTweetsResponse,
  ScheduledTweetResponse,
  ScheduledTweetsResponse,
} from '../../types/creatives.js';
import { Creatives } from '../creatives.js';

describe('Creatives', () => {
  let httpClient: HttpClient;
  let creatives: Creatives;

  beforeEach(() => {
    httpClient = {
      request: vi.fn(),
    } as unknown as HttpClient;

    creatives = new Creatives(httpClient);
  });

  describe('Account Media Management', () => {
    const mockAccountMediaResponse: AccountMediaResponse = {
      data: {
        id: 'media_123',
        id_str: 'media_123',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        media_url: 'https://example.com/media.jpg',
        media_key: 'key_123',
        media_type: 'IMAGE',
        media_category: 'TWEET_IMAGE',
        tweeted: false,
        file_name: 'image.jpg',
        file_size: 1024,
      },
      request: { params: {} },
    };

    const mockAccountMediaListResponse: AccountMediaListResponse = {
      data: [mockAccountMediaResponse.data],
      request: { params: {} },
    };

    describe('getAccountMedia', () => {
      it('should get account media with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaListResponse);

        const result = await creatives.getAccountMedia('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/account_media',
          params: {},
        });
        expect(result).toEqual(mockAccountMediaListResponse);
      });

      it('should get account media with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaListResponse);

        const options = {
          media_ids: ['media_1', 'media_2'],
          media_types: ['IMAGE'],
          media_categories: ['TWEET_IMAGE'],
          tweeted: false,
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
        };

        await creatives.getAccountMedia('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            media_ids: 'media_1,media_2',
            media_types: 'IMAGE',
            media_categories: 'TWEET_IMAGE',
            tweeted: 'false',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
          },
        });
      });

      it('should handle requestOptions.params', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaListResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        await creatives.getAccountMedia('account_123', undefined, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/account_media',
          params: { custom_param: 'custom_value' },
        });
      });
    });

    describe('getAccountMediaById', () => {
      it('should get specific account media', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaResponse);

        const result = await creatives.getAccountMediaById('account_123', 'media_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/account_media/media_123',
        });
        expect(result).toEqual(mockAccountMediaResponse);
      });
    });

    describe('createAccountMedia', () => {
      it('should create account media with required fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaResponse);

        const options = {
          media_category: 'TWEET_IMAGE' as const,
          media_type: 'IMAGE' as const,
        };

        const result = await creatives.createAccountMedia('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            media_category: 'TWEET_IMAGE',
            media_type: 'IMAGE',
          },
        });
        expect(result).toEqual(mockAccountMediaResponse);
      });

      it('should create account media with all fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaResponse);

        const options = {
          media_category: 'TWEET_IMAGE' as const,
          media_type: 'IMAGE' as const,
          media_url: 'https://example.com/image.jpg',
          media_key: 'key_123',
          creative_media_keys: ['key_1', 'key_2'],
          file_name: 'image.jpg',
        };

        await creatives.createAccountMedia('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            media_category: 'TWEET_IMAGE',
            media_type: 'IMAGE',
            media_url: 'https://example.com/image.jpg',
            media_key: 'key_123',
            creative_media_keys: 'key_1,key_2',
            file_name: 'image.jpg',
          },
        });
      });
    });

    describe('updateAccountMedia', () => {
      it('should update account media', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaResponse);

        const options = {
          media_category: 'TWEET_IMAGE' as const,
          creative_media_keys: ['key_1', 'key_2'],
          file_name: 'updated.jpg',
        };

        const result = await creatives.updateAccountMedia('account_123', 'media_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/account_media/media_123',
          params: {
            media_category: 'TWEET_IMAGE',
            creative_media_keys: 'key_1,key_2',
            file_name: 'updated.jpg',
          },
        });
        expect(result).toEqual(mockAccountMediaResponse);
      });
    });

    describe('deleteAccountMedia', () => {
      it('should delete account media', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaResponse);

        const result = await creatives.deleteAccountMedia('account_123', 'media_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint: '/12/accounts/account_123/account_media/media_123',
        });
        expect(result).toEqual(mockAccountMediaResponse);
      });
    });
  });

  describe('Card Management', () => {
    const mockCardResponse: CardResponse = {
      data: {
        id: 'card_123',
        id_str: 'card_123',
        name: 'Test Card',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        card_type: 'IMAGE_WEBSITE_CARD',
        card_uri: 'card://123',
        preview_url: 'https://example.com/preview',
        components: [],
      },
      request: { params: {} },
    };

    const mockCardsResponse: CardsResponse = {
      data: [mockCardResponse.data],
      request: { params: {} },
    };

    describe('getCards', () => {
      it('should get cards with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockCardsResponse);

        const result = await creatives.getCards('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/cards',
          params: {},
        });
        expect(result).toEqual(mockCardsResponse);
      });

      it('should get cards with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockCardsResponse);

        const options = {
          card_ids: ['card_1', 'card_2'],
          card_types: ['IMAGE_WEBSITE_CARD'],
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
          with_deleted: true,
        };

        await creatives.getCards('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            card_ids: 'card_1,card_2',
            card_types: 'IMAGE_WEBSITE_CARD',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
            with_deleted: 'true',
          },
        });
      });
    });

    describe('getCard', () => {
      it('should get specific card', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const result = await creatives.getCard('account_123', 'card_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/cards/card_123',
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('createCard', () => {
      it('should create card', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const options = {
          name: 'Test Card',
          card_type: 'IMAGE_WEBSITE_CARD' as const,
          components: [
            {
              type: 'MEDIA',
              data: { media_key: 'key_123' },
            },
          ],
        };

        const result = await creatives.createCard('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            name: 'Test Card',
            card_type: 'IMAGE_WEBSITE_CARD',
            components: JSON.stringify(options.components),
          },
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('updateCard', () => {
      it('should update card', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const options = {
          name: 'Updated Card',
          components: [
            {
              type: 'MEDIA',
              data: { media_key: 'key_456' },
            },
          ],
        };

        const result = await creatives.updateCard('account_123', 'card_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/cards/card_123',
          params: {
            name: 'Updated Card',
            components: JSON.stringify(options.components),
          },
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('deleteCard', () => {
      it('should delete card', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const result = await creatives.deleteCard('account_123', 'card_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'DELETE',
          endpoint: '/12/accounts/account_123/cards/card_123',
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('fetchCards', () => {
      it('should fetch cards by URIs', async () => {
        const mockCardsFetchResponse: CardsFetchResponse = {
          data: [mockCardResponse.data],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockCardsFetchResponse);

        const options = {
          card_uris: ['card://123', 'card://456'],
        };

        const result = await creatives.fetchCards('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/cards/all',
          params: {
            card_uris: 'card://123,card://456',
          },
        });
        expect(result).toEqual(mockCardsFetchResponse);
      });
    });
  });

  describe('Draft Tweet Management', () => {
    const mockDraftTweetResponse: DraftTweetResponse = {
      data: {
        id: 'draft_123',
        id_str: 'draft_123',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        tweet_type: 'DRAFT',
        text: 'Test draft tweet',
        nullcast: false,
      },
      request: { params: {} },
    };

    const mockDraftTweetsResponse: DraftTweetsResponse = {
      data: [mockDraftTweetResponse.data],
      request: { params: {} },
    };

    describe('getDraftTweets', () => {
      it('should get draft tweets with default parameters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockDraftTweetsResponse);

        const result = await creatives.getDraftTweets('account_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/draft_tweets',
          params: {},
        });
        expect(result).toEqual(mockDraftTweetsResponse);
      });

      it('should get draft tweets with filters', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockDraftTweetsResponse);

        const options = {
          draft_tweet_ids: ['draft_1', 'draft_2'],
          count: 10,
          cursor: 'cursor_123',
          sort_by: 'created_at' as const,
          with_deleted: true,
        };

        await creatives.getDraftTweets('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/draft_tweets',
          params: {
            draft_tweet_ids: 'draft_1,draft_2',
            count: '10',
            cursor: 'cursor_123',
            sort_by: 'created_at',
            with_deleted: 'true',
          },
        });
      });
    });

    describe('createDraftTweet', () => {
      it('should create draft tweet with required fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockDraftTweetResponse);

        const options = {
          text: 'Test draft tweet',
        };

        const result = await creatives.createDraftTweet('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/draft_tweets',
          params: {
            text: 'Test draft tweet',
          },
        });
        expect(result).toEqual(mockDraftTweetResponse);
      });

      it('should create draft tweet with all fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockDraftTweetResponse);

        const options = {
          text: 'Test draft tweet',
          as_user_id: 'user_123',
          card_uri: 'card://123',
          media_keys: ['media_1', 'media_2'],
          nullcast: true,
        };

        await creatives.createDraftTweet('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/draft_tweets',
          params: {
            text: 'Test draft tweet',
            as_user_id: 'user_123',
            card_uri: 'card://123',
            media_keys: 'media_1,media_2',
            nullcast: true,
          },
        });
      });
    });
  });

  describe('Scheduled Tweet Management', () => {
    const mockScheduledTweetResponse: ScheduledTweetResponse = {
      data: {
        id: 'scheduled_123',
        id_str: 'scheduled_123',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        deleted: false,
        scheduled_at: '2023-01-02T00:00:00Z',
        text: 'Test scheduled tweet',
        nullcast: false,
      },
      request: { params: {} },
    };

    describe('createScheduledTweet', () => {
      it('should create scheduled tweet with required fields', async () => {
        vi.mocked(httpClient.request).mockResolvedValue(mockScheduledTweetResponse);

        const options = {
          text: 'Test scheduled tweet',
          scheduled_at: '2023-01-02T00:00:00Z',
        };

        const result = await creatives.createScheduledTweet('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/scheduled_tweets',
          params: {
            text: 'Test scheduled tweet',
            scheduled_at: '2023-01-02T00:00:00Z',
          },
        });
        expect(result).toEqual(mockScheduledTweetResponse);
      });
    });
  });

  describe('Convenience Methods', () => {
    describe('createImageWebsiteCard', () => {
      it('should create image website card', async () => {
        const mockCardResponse: CardResponse = {
          data: {
            id: 'card_123',
            id_str: 'card_123',
            name: 'Image Website Card',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            card_type: 'IMAGE_WEBSITE_CARD',
            card_uri: 'card://123',
            components: [],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const result = await creatives.createImageWebsiteCard(
          'account_123',
          'Image Website Card',
          'https://example.com',
          'media_key_123'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            name: 'Image Website Card',
            card_type: 'IMAGE_WEBSITE_CARD',
            components: JSON.stringify([
              {
                type: 'MEDIA',
                data: {
                  media_key: 'media_key_123',
                },
              },
              {
                type: 'DETAILS',
                data: {
                  destination_url: 'https://example.com',
                },
              },
            ]),
          },
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('createVideoWebsiteCard', () => {
      it('should create video website card', async () => {
        const mockCardResponse: CardResponse = {
          data: {
            id: 'card_123',
            id_str: 'card_123',
            name: 'Video Website Card',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            card_type: 'VIDEO_WEBSITE_CARD',
            card_uri: 'card://123',
            components: [],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const result = await creatives.createVideoWebsiteCard(
          'account_123',
          'Video Website Card',
          'https://example.com',
          'media_key_123'
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            name: 'Video Website Card',
            card_type: 'VIDEO_WEBSITE_CARD',
            components: JSON.stringify([
              {
                type: 'MEDIA',
                data: {
                  media_key: 'media_key_123',
                },
              },
              {
                type: 'DETAILS',
                data: {
                  destination_url: 'https://example.com',
                },
              },
            ]),
          },
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('createCarouselCard', () => {
      it('should create carousel card', async () => {
        const mockCardResponse: CardResponse = {
          data: {
            id: 'card_123',
            id_str: 'card_123',
            name: 'Carousel Card',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            card_type: 'IMAGE_CAROUSEL_CARD',
            card_uri: 'card://123',
            components: [],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockCardResponse);

        const options = {
          name: 'Carousel Card',
          first_cta: 'Learn More',
          second_cta: 'Shop Now',
          destination_url: 'https://example.com',
          slides: [
            {
              media_key: 'media_1',
              headline: 'First Slide',
              description: 'First slide description',
              destination_url: 'https://example.com/1',
            },
            {
              media_key: 'media_2',
              headline: 'Second Slide',
              description: 'Second slide description',
            },
          ],
        };

        const result = await creatives.createCarouselCard('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            name: 'Carousel Card',
            card_type: 'IMAGE_CAROUSEL_CARD',
            components: JSON.stringify([
              {
                type: 'DETAILS',
                data: {
                  first_cta: 'Learn More',
                  second_cta: 'Shop Now',
                  destination_url: 'https://example.com',
                },
              },
              {
                type: 'MEDIA',
                data: {
                  media_key: 'media_1',
                  headline: 'First Slide',
                  description: 'First slide description',
                  destination_url: 'https://example.com/1',
                },
              },
              {
                type: 'MEDIA',
                data: {
                  media_key: 'media_2',
                  headline: 'Second Slide',
                  description: 'Second slide description',
                },
              },
            ]),
          },
        });
        expect(result).toEqual(mockCardResponse);
      });
    });

    describe('promoteDraftTweet', () => {
      it('should promote draft tweet', async () => {
        const mockDraftTweetResponse: DraftTweetResponse = {
          data: {
            id: 'draft_123',
            id_str: 'draft_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            tweet_type: 'PUBLISHED',
            text: 'Promoted tweet',
            nullcast: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockDraftTweetResponse);

        const result = await creatives.promoteDraftTweet('account_123', 'draft_123');

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/draft_tweets/draft_123/promote',
        });
        expect(result).toEqual(mockDraftTweetResponse);
      });
    });

    describe('uploadMedia', () => {
      it('should upload media', async () => {
        const mockAccountMediaResponse: AccountMediaResponse = {
          data: {
            id: 'media_123',
            id_str: 'media_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            media_url: 'https://example.com/uploaded.jpg',
            media_key: 'uploaded_key',
            media_type: 'IMAGE',
            media_category: 'TWEET_IMAGE',
            tweeted: false,
            file_name: 'uploaded.jpg',
            file_size: 2048,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockAccountMediaResponse);

        const options = {
          media_data: 'base64_encoded_data',
          media_type: 'IMAGE' as const,
          media_category: 'TWEET_IMAGE' as const,
          additional_owners: ['owner1', 'owner2'],
          creative_metadata_tags: [
            { key: 'campaign', value: 'summer' },
            { key: 'product', value: 'shoes' },
          ],
        };

        const result = await creatives.uploadMedia('account_123', options);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            media_data: 'base64_encoded_data',
            media_type: 'IMAGE',
            media_category: 'TWEET_IMAGE',
            additional_owners: 'owner1,owner2',
            creative_metadata_tags: JSON.stringify(options.creative_metadata_tags),
          },
        });
        expect(result).toEqual(mockAccountMediaResponse);
      });
    });
  });

  describe('Branch Coverage Tests', () => {
    describe('getAccountMedia with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: AccountMediaListResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          media_ids: ['media_1'],
          count: 5,
        };

        await creatives.getAccountMedia('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            custom_param: 'custom_value',
            media_ids: 'media_1',
            count: '5',
          },
        });
      });
    });

    describe('createAccountMedia with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: AccountMediaResponse = {
          data: {
            id: 'media_123',
            id_str: 'media_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            media_url: 'https://example.com/media.jpg',
            media_key: 'key_123',
            media_type: 'IMAGE',
            media_category: 'TWEET_IMAGE',
            tweeted: false,
            file_name: 'image.jpg',
            file_size: 1024,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          media_category: 'TWEET_IMAGE' as const,
          media_type: 'IMAGE' as const,
        };

        await creatives.createAccountMedia('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            custom_param: 'custom_value',
            media_category: 'TWEET_IMAGE',
            media_type: 'IMAGE',
          },
        });
      });
    });

    describe('updateAccountMedia with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: AccountMediaResponse = {
          data: {
            id: 'media_123',
            id_str: 'media_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            media_url: 'https://example.com/media.jpg',
            media_key: 'key_123',
            media_type: 'IMAGE',
            media_category: 'TWEET_IMAGE',
            tweeted: false,
            file_name: 'image.jpg',
            file_size: 1024,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          media_category: 'TWEET_IMAGE' as const,
        };

        await creatives.updateAccountMedia('account_123', 'media_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/account_media/media_123',
          params: {
            custom_param: 'custom_value',
            media_category: 'TWEET_IMAGE',
          },
        });
      });
    });

    describe('getCards with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: CardsResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          card_ids: ['card_1'],
          count: 5,
        };

        await creatives.getCards('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            custom_param: 'custom_value',
            card_ids: 'card_1',
            count: '5',
          },
        });
      });
    });

    describe('createCard with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: CardResponse = {
          data: {
            id: 'card_123',
            id_str: 'card_123',
            name: 'Test Card',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            card_type: 'IMAGE_WEBSITE_CARD',
            card_uri: 'card://123',
            components: [],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          name: 'Test Card',
          card_type: 'IMAGE_WEBSITE_CARD' as const,
          components: [],
        };

        await creatives.createCard('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/cards',
          params: {
            custom_param: 'custom_value',
            name: 'Test Card',
            card_type: 'IMAGE_WEBSITE_CARD',
            components: JSON.stringify([]),
          },
        });
      });
    });

    describe('updateCard with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: CardResponse = {
          data: {
            id: 'card_123',
            id_str: 'card_123',
            name: 'Updated Card',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            card_type: 'IMAGE_WEBSITE_CARD',
            card_uri: 'card://123',
            components: [],
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          name: 'Updated Card',
        };

        await creatives.updateCard('account_123', 'card_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/cards/card_123',
          params: {
            custom_param: 'custom_value',
            name: 'Updated Card',
          },
        });
      });
    });

    describe('fetchCards with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: CardsFetchResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          card_uris: ['card://123'],
        };

        await creatives.fetchCards('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/cards/all',
          params: {
            custom_param: 'custom_value',
            card_uris: 'card://123',
          },
        });
      });
    });

    describe('getDraftTweets with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: DraftTweetsResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          draft_tweet_ids: ['draft_1'],
          count: 5,
        };

        await creatives.getDraftTweets('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/draft_tweets',
          params: {
            custom_param: 'custom_value',
            draft_tweet_ids: 'draft_1',
            count: '5',
          },
        });
      });
    });

    describe('createDraftTweet with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: DraftTweetResponse = {
          data: {
            id: 'draft_123',
            id_str: 'draft_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            tweet_type: 'DRAFT',
            text: 'Test draft',
            nullcast: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          text: 'Test draft',
        };

        await creatives.createDraftTweet('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/draft_tweets',
          params: {
            custom_param: 'custom_value',
            text: 'Test draft',
          },
        });
      });
    });

    describe('updateDraftTweet with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: DraftTweetResponse = {
          data: {
            id: 'draft_123',
            id_str: 'draft_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            tweet_type: 'DRAFT',
            text: 'Updated draft',
            nullcast: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          text: 'Updated draft',
        };

        await creatives.updateDraftTweet('account_123', 'draft_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/draft_tweets/draft_123',
          params: {
            custom_param: 'custom_value',
            text: 'Updated draft',
          },
        });
      });
    });

    describe('getScheduledTweets with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: ScheduledTweetsResponse = {
          data: [],
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          scheduled_tweet_ids: ['scheduled_1'],
          count: 5,
        };

        await creatives.getScheduledTweets('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'GET',
          endpoint: '/12/accounts/account_123/scheduled_tweets',
          params: {
            custom_param: 'custom_value',
            scheduled_tweet_ids: 'scheduled_1',
            count: '5',
          },
        });
      });
    });

    describe('createScheduledTweet with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: ScheduledTweetResponse = {
          data: {
            id: 'scheduled_123',
            id_str: 'scheduled_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            scheduled_at: '2023-01-02T00:00:00Z',
            text: 'Test scheduled',
            nullcast: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          text: 'Test scheduled',
          scheduled_at: '2023-01-02T00:00:00Z',
        };

        await creatives.createScheduledTweet('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/scheduled_tweets',
          params: {
            custom_param: 'custom_value',
            text: 'Test scheduled',
            scheduled_at: '2023-01-02T00:00:00Z',
          },
        });
      });
    });

    describe('updateScheduledTweet with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: ScheduledTweetResponse = {
          data: {
            id: 'scheduled_123',
            id_str: 'scheduled_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            scheduled_at: '2023-01-02T00:00:00Z',
            text: 'Updated scheduled',
            nullcast: false,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          text: 'Updated scheduled',
        };

        await creatives.updateScheduledTweet(
          'account_123',
          'scheduled_123',
          options,
          requestOptions
        );

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'PUT',
          endpoint: '/12/accounts/account_123/scheduled_tweets/scheduled_123',
          params: {
            custom_param: 'custom_value',
            text: 'Updated scheduled',
          },
        });
      });
    });

    describe('uploadMedia with requestOptions.params', () => {
      it('should handle requestOptions with params', async () => {
        const mockResponse: AccountMediaResponse = {
          data: {
            id: 'media_123',
            id_str: 'media_123',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: '2023-01-01T00:00:00Z',
            deleted: false,
            media_url: 'https://example.com/uploaded.jpg',
            media_key: 'uploaded_key',
            media_type: 'IMAGE',
            media_category: 'TWEET_IMAGE',
            tweeted: false,
            file_name: 'uploaded.jpg',
            file_size: 2048,
          },
          request: { params: {} },
        };

        vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

        const requestOptions = {
          params: { custom_param: 'custom_value' },
        };

        const options = {
          media_data: 'base64_data',
          media_type: 'IMAGE' as const,
        };

        await creatives.uploadMedia('account_123', options, requestOptions);

        expect(httpClient.request).toHaveBeenCalledWith({
          method: 'POST',
          endpoint: '/12/accounts/account_123/account_media',
          params: {
            custom_param: 'custom_value',
            media_data: 'base64_data',
            media_type: 'IMAGE',
          },
        });
      });
    });
  });

  describe('updateScheduledTweet', () => {
    it('should update scheduled tweet with all optional parameters', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Updated scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T12:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const updateOptions = {
        text: 'Updated scheduled tweet',
        scheduled_at: '2023-02-01T10:00:00Z',
        card_uri: 'card://123',
        media_keys: ['media_1', 'media_2'],
        nullcast: true,
      };

      const result = await creatives.updateScheduledTweet(
        'account_123',
        'tweet_123',
        updateOptions
      );

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'PUT',
        endpoint: '/12/accounts/account_123/scheduled_tweets/tweet_123',
        params: {
          text: 'Updated scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          card_uri: 'card://123',
          media_keys: 'media_1,media_2',
          nullcast: true,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getScheduledTweet', () => {
    it('should get specific scheduled tweet', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Test scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await creatives.getScheduledTweet('account_123', 'tweet_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        endpoint: '/12/accounts/account_123/scheduled_tweets/tweet_123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createScheduledTweet with optional parameters', () => {
    it('should create scheduled tweet with as_user_id only', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await creatives.createScheduledTweet('account_123', {
        text: 'Scheduled tweet',
        scheduled_at: '2023-02-01T10:00:00Z',
        as_user_id: 'user_123',
      });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/scheduled_tweets',
        params: {
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          as_user_id: 'user_123',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create scheduled tweet with card_uri only', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await creatives.createScheduledTweet('account_123', {
        text: 'Scheduled tweet',
        scheduled_at: '2023-02-01T10:00:00Z',
        card_uri: 'card://123',
      });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/scheduled_tweets',
        params: {
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          card_uri: 'card://123',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create scheduled tweet with media_keys only', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await creatives.createScheduledTweet('account_123', {
        text: 'Scheduled tweet',
        scheduled_at: '2023-02-01T10:00:00Z',
        media_keys: ['media_1', 'media_2'],
      });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/scheduled_tweets',
        params: {
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          media_keys: 'media_1,media_2',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should create scheduled tweet with nullcast set to undefined (false branch)', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          deleted: false,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await creatives.createScheduledTweet('account_123', {
        text: 'Scheduled tweet',
        scheduled_at: '2023-02-01T10:00:00Z',
        nullcast: false,
      });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        endpoint: '/12/accounts/account_123/scheduled_tweets',
        params: {
          text: 'Scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          nullcast: false,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteScheduledTweet', () => {
    it('should delete scheduled tweet', async () => {
      const mockResponse: ScheduledTweetResponse = {
        data: {
          id: 'tweet_123',
          id_str: 'tweet_123',
          text: 'Deleted scheduled tweet',
          scheduled_at: '2023-02-01T10:00:00Z',
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T12:00:00Z',
          deleted: true,
        },
        request: { params: {} },
      };

      vi.mocked(httpClient.request).mockResolvedValue(mockResponse);

      const result = await creatives.deleteScheduledTweet('account_123', 'tweet_123');

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        endpoint: '/12/accounts/account_123/scheduled_tweets/tweet_123',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP client errors', async () => {
      const error = new Error('Network error') as unknown as { captureStackTrace?: unknown };
      vi.mocked(httpClient.request).mockRejectedValue(error);

      await expect(creatives.getAccountMedia('account_123')).rejects.toThrow('Network error');
    });

    it('should handle empty response', async () => {
      vi.mocked(httpClient.request).mockResolvedValue(null);

      const result = await creatives.getAccountMedia('account_123');
      expect(result).toBeNull();
    });
  });
});
