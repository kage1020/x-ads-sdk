[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / Creatives

# Class: Creatives

Defined in: [resources/creatives.ts:32](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L32)

Creatives resource class

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new Creatives**(`httpClient`): `Creatives`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`Creatives`

#### Inherited from

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### getApiVersionPath()

> `protected` **getApiVersionPath**(): `string`

Defined in: [resources/base.ts:17](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L17)

Get the current API version path from the HTTP client

#### Returns

`string`

API version path (e.g., '/12')

#### Inherited from

[`BaseResource`](BaseResource.md).[`getApiVersionPath`](BaseResource.md#getapiversionpath)

***

### buildEndpoint()

> `protected` **buildEndpoint**(`path`): `string`

Defined in: [resources/base.ts:26](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L26)

Build endpoint with current API version

#### Parameters

##### path

`string`

API path without version

#### Returns

`string`

Complete endpoint with API version

#### Inherited from

[`BaseResource`](BaseResource.md).[`buildEndpoint`](BaseResource.md#buildendpoint)

***

### getAccountMedia()

> **getAccountMedia**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`AccountMediaListResponse`](../interfaces/AccountMediaListResponse.md)\>

Defined in: [resources/creatives.ts:38](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L38)

Get all account media for an account

#### Parameters

##### accountId

`string`

##### options?

###### media_ids?

`string`[]

###### media_types?

`string`[]

###### media_categories?

`string`[]

###### tweeted?

`boolean`

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AccountMediaListResponse`](../interfaces/AccountMediaListResponse.md)\>

***

### getAccountMediaById()

> **getAccountMediaById**(`accountId`, `mediaId`, `requestOptions?`): `Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

Defined in: [resources/creatives.ts:88](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L88)

Get a specific account media

#### Parameters

##### accountId

`string`

##### mediaId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

***

### createAccountMedia()

> **createAccountMedia**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

Defined in: [resources/creatives.ts:105](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L105)

Create account media

#### Parameters

##### accountId

`string`

##### options

[`CreateAccountMediaOptions`](../interfaces/CreateAccountMediaOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

***

### updateAccountMedia()

> **updateAccountMedia**(`accountId`, `mediaId`, `options`, `requestOptions?`): `Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

Defined in: [resources/creatives.ts:134](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L134)

Update account media

#### Parameters

##### accountId

`string`

##### mediaId

`string`

##### options

`Partial`\<[`CreateAccountMediaOptions`](../interfaces/CreateAccountMediaOptions.md)\>

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

***

### deleteAccountMedia()

> **deleteAccountMedia**(`accountId`, `mediaId`, `requestOptions?`): `Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

Defined in: [resources/creatives.ts:165](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L165)

Delete account media

#### Parameters

##### accountId

`string`

##### mediaId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

***

### getCards()

> **getCards**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`CardsResponse`](../interfaces/CardsResponse.md)\>

Defined in: [resources/creatives.ts:184](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L184)

Get all cards for an account

#### Parameters

##### accountId

`string`

##### options?

###### card_ids?

`string`[]

###### card_types?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardsResponse`](../interfaces/CardsResponse.md)\>

***

### getCard()

> **getCard**(`accountId`, `cardId`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:230](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L230)

Get a specific card

#### Parameters

##### accountId

`string`

##### cardId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### createCard()

> **createCard**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:247](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L247)

Create a new card

#### Parameters

##### accountId

`string`

##### options

[`CreateCardOptions`](../interfaces/CreateCardOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### updateCard()

> **updateCard**(`accountId`, `cardId`, `options`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:271](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L271)

Update a card

#### Parameters

##### accountId

`string`

##### cardId

`string`

##### options

[`UpdateCardOptions`](../interfaces/UpdateCardOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### deleteCard()

> **deleteCard**(`accountId`, `cardId`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:299](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L299)

Delete a card

#### Parameters

##### accountId

`string`

##### cardId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### fetchCards()

> **fetchCards**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`CardsFetchResponse`](../interfaces/CardsFetchResponse.md)\>

Defined in: [resources/creatives.ts:316](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L316)

Fetch cards by URIs

#### Parameters

##### accountId

`string`

##### options

[`CardsFetchOptions`](../interfaces/CardsFetchOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardsFetchResponse`](../interfaces/CardsFetchResponse.md)\>

***

### getDraftTweets()

> **getDraftTweets**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`DraftTweetsResponse`](../interfaces/DraftTweetsResponse.md)\>

Defined in: [resources/creatives.ts:340](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L340)

Get all draft tweets for an account

#### Parameters

##### accountId

`string`

##### options?

###### draft_tweet_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DraftTweetsResponse`](../interfaces/DraftTweetsResponse.md)\>

***

### getDraftTweet()

> **getDraftTweet**(`accountId`, `draftTweetId`, `requestOptions?`): `Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

Defined in: [resources/creatives.ts:382](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L382)

Get a specific draft tweet

#### Parameters

##### accountId

`string`

##### draftTweetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

***

### createDraftTweet()

> **createDraftTweet**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

Defined in: [resources/creatives.ts:399](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L399)

Create a new draft tweet

#### Parameters

##### accountId

`string`

##### options

[`CreateDraftTweetOptions`](../interfaces/CreateDraftTweetOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

***

### updateDraftTweet()

> **updateDraftTweet**(`accountId`, `draftTweetId`, `options`, `requestOptions?`): `Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

Defined in: [resources/creatives.ts:425](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L425)

Update a draft tweet

#### Parameters

##### accountId

`string`

##### draftTweetId

`string`

##### options

[`UpdateDraftTweetOptions`](../interfaces/UpdateDraftTweetOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

***

### deleteDraftTweet()

> **deleteDraftTweet**(`accountId`, `draftTweetId`, `requestOptions?`): `Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

Defined in: [resources/creatives.ts:462](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L462)

Delete a draft tweet

#### Parameters

##### accountId

`string`

##### draftTweetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

***

### getScheduledTweets()

> **getScheduledTweets**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`ScheduledTweetsResponse`](../interfaces/ScheduledTweetsResponse.md)\>

Defined in: [resources/creatives.ts:481](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L481)

Get all scheduled tweets for an account

#### Parameters

##### accountId

`string`

##### options?

###### scheduled_tweet_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"` \| `"scheduled_at"`

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ScheduledTweetsResponse`](../interfaces/ScheduledTweetsResponse.md)\>

***

### getScheduledTweet()

> **getScheduledTweet**(`accountId`, `scheduledTweetId`, `requestOptions?`): `Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

Defined in: [resources/creatives.ts:523](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L523)

Get a specific scheduled tweet

#### Parameters

##### accountId

`string`

##### scheduledTweetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

***

### createScheduledTweet()

> **createScheduledTweet**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

Defined in: [resources/creatives.ts:540](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L540)

Create a new scheduled tweet

#### Parameters

##### accountId

`string`

##### options

[`CreateScheduledTweetOptions`](../interfaces/CreateScheduledTweetOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

***

### updateScheduledTweet()

> **updateScheduledTweet**(`accountId`, `scheduledTweetId`, `options`, `requestOptions?`): `Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

Defined in: [resources/creatives.ts:567](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L567)

Update a scheduled tweet

#### Parameters

##### accountId

`string`

##### scheduledTweetId

`string`

##### options

[`UpdateScheduledTweetOptions`](../interfaces/UpdateScheduledTweetOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

***

### deleteScheduledTweet()

> **deleteScheduledTweet**(`accountId`, `scheduledTweetId`, `requestOptions?`): `Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

Defined in: [resources/creatives.ts:607](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L607)

Delete a scheduled tweet

#### Parameters

##### accountId

`string`

##### scheduledTweetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`ScheduledTweetResponse`](../interfaces/ScheduledTweetResponse.md)\>

***

### createImageWebsiteCard()

> **createImageWebsiteCard**(`accountId`, `name`, `websiteUrl`, `mediaKey`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:626](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L626)

Create image website card

#### Parameters

##### accountId

`string`

##### name

`string`

##### websiteUrl

`string`

##### mediaKey

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### createVideoWebsiteCard()

> **createVideoWebsiteCard**(`accountId`, `name`, `websiteUrl`, `mediaKey`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:662](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L662)

Create video website card

#### Parameters

##### accountId

`string`

##### name

`string`

##### websiteUrl

`string`

##### mediaKey

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### createCarouselCard()

> **createCarouselCard**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

Defined in: [resources/creatives.ts:698](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L698)

Create carousel card

#### Parameters

##### accountId

`string`

##### options

[`CreateCarouselCardOptions`](../interfaces/CreateCarouselCardOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CardResponse`](../interfaces/CardResponse.md)\>

***

### promoteDraftTweet()

> **promoteDraftTweet**(`accountId`, `draftTweetId`, `requestOptions?`): `Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

Defined in: [resources/creatives.ts:737](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L737)

Promote draft tweet (convert to line item)

#### Parameters

##### accountId

`string`

##### draftTweetId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DraftTweetResponse`](../interfaces/DraftTweetResponse.md)\>

***

### uploadMedia()

> **uploadMedia**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

Defined in: [resources/creatives.ts:754](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/creatives.ts#L754)

Upload media to account media library

#### Parameters

##### accountId

`string`

##### options

[`MediaUploadOptions`](../interfaces/MediaUploadOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AccountMediaResponse`](../interfaces/AccountMediaResponse.md)\>

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
