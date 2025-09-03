[**X Ads SDK v1.0.4**](../README.md)

***

[X Ads SDK](../globals.md) / Audiences

# Class: Audiences

Defined in: [resources/audiences.ts:27](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L27)

Audiences resource class

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new Audiences**(`httpClient`): `Audiences`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`Audiences`

#### Inherited from

[`BaseResource`](BaseResource.md).[`constructor`](BaseResource.md#constructor)

## Methods

### getCustomAudiences()

> **getCustomAudiences**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`CustomAudiencesResponse`](../interfaces/CustomAudiencesResponse.md)\>

Defined in: [resources/audiences.ts:33](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L33)

Get all custom audiences for an account

#### Parameters

##### accountId

`string`

##### options?

###### custom_audience_ids?

`string`[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

`"created_at"` \| `"updated_at"`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudiencesResponse`](../interfaces/CustomAudiencesResponse.md)\>

***

### getCustomAudience()

> **getCustomAudience**(`accountId`, `customAudienceId`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:71](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L71)

Get a specific custom audience

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### createCustomAudience()

> **createCustomAudience**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:88](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L88)

Create a new custom audience

#### Parameters

##### accountId

`string`

##### options

[`CreateCustomAudienceOptions`](../interfaces/CreateCustomAudienceOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### updateCustomAudience()

> **updateCustomAudience**(`accountId`, `customAudienceId`, `options`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:112](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L112)

Update a custom audience

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### options

[`UpdateCustomAudienceOptions`](../interfaces/UpdateCustomAudienceOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### deleteCustomAudience()

> **deleteCustomAudience**(`accountId`, `customAudienceId`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:143](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L143)

Delete a custom audience

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### addUsersToAudience()

> **addUsersToAudience**(`accountId`, `customAudienceId`, `options`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:160](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L160)

Add users to a custom audience

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### options

[`AddUsersToAudienceOptions`](../interfaces/AddUsersToAudienceOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### isCustomAudienceTargeted()

> **isCustomAudienceTargeted**(`accountId`, `customAudienceId`, `requestOptions?`): `Promise`\<[`AudienceTargetedResponse`](../interfaces/AudienceTargetedResponse.md)\>

Defined in: [resources/audiences.ts:184](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L184)

Check if a custom audience is being targeted

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AudienceTargetedResponse`](../interfaces/AudienceTargetedResponse.md)\>

***

### getCustomAudiencePermissions()

> **getCustomAudiencePermissions**(`accountId`, `customAudienceId`, `requestOptions?`): `Promise`\<[`AudiencePermissionsResponse`](../interfaces/AudiencePermissionsResponse.md)\>

Defined in: [resources/audiences.ts:203](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L203)

Get custom audience permissions

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AudiencePermissionsResponse`](../interfaces/AudiencePermissionsResponse.md)\>

***

### createCustomAudiencePermission()

> **createCustomAudiencePermission**(`accountId`, `customAudienceId`, `options`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:220](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L220)

Create custom audience permission

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### options

[`CreateAudiencePermissionOptions`](../interfaces/CreateAudiencePermissionOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### deleteCustomAudiencePermission()

> **deleteCustomAudiencePermission**(`accountId`, `customAudienceId`, `permissionId`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:244](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L244)

Delete custom audience permission

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### permissionId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### getTailoredAudiencePermissions()

> **getTailoredAudiencePermissions**(`accountId`, `tailoredAudienceId`, `requestOptions?`): `Promise`\<[`AudiencePermissionsResponse`](../interfaces/AudiencePermissionsResponse.md)\>

Defined in: [resources/audiences.ts:264](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L264)

Get tailored audience permissions

#### Parameters

##### accountId

`string`

##### tailoredAudienceId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`AudiencePermissionsResponse`](../interfaces/AudiencePermissionsResponse.md)\>

***

### createTailoredAudiencePermission()

> **createTailoredAudiencePermission**(`accountId`, `tailoredAudienceId`, `options`, `requestOptions?`): `Promise`\<[`TailoredAudienceResponse`](../interfaces/TailoredAudienceResponse.md)\>

Defined in: [resources/audiences.ts:281](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L281)

Create tailored audience permission

#### Parameters

##### accountId

`string`

##### tailoredAudienceId

`string`

##### options

[`CreateAudiencePermissionOptions`](../interfaces/CreateAudiencePermissionOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`TailoredAudienceResponse`](../interfaces/TailoredAudienceResponse.md)\>

***

### deleteTailoredAudiencePermission()

> **deleteTailoredAudiencePermission**(`accountId`, `tailoredAudienceId`, `permissionId`, `requestOptions?`): `Promise`\<[`TailoredAudienceResponse`](../interfaces/TailoredAudienceResponse.md)\>

Defined in: [resources/audiences.ts:305](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L305)

Delete tailored audience permission

#### Parameters

##### accountId

`string`

##### tailoredAudienceId

`string`

##### permissionId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`TailoredAudienceResponse`](../interfaces/TailoredAudienceResponse.md)\>

***

### getDoNotReachLists()

> **getDoNotReachLists**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`DoNotReachListsResponse`](../interfaces/DoNotReachListsResponse.md)\>

Defined in: [resources/audiences.ts:325](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L325)

Get all do not reach lists

#### Parameters

##### accountId

`string`

##### options?

###### count?

`number`

###### cursor?

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DoNotReachListsResponse`](../interfaces/DoNotReachListsResponse.md)\>

***

### createDoNotReachList()

> **createDoNotReachList**(`accountId`, `options`, `requestOptions?`): `Promise`\<[`DoNotReachListResponse`](../interfaces/DoNotReachListResponse.md)\>

Defined in: [resources/audiences.ts:355](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L355)

Create a do not reach list

#### Parameters

##### accountId

`string`

##### options

[`CreateDoNotReachListOptions`](../interfaces/CreateDoNotReachListOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DoNotReachListResponse`](../interfaces/DoNotReachListResponse.md)\>

***

### addUsersToDoNotReachList()

> **addUsersToDoNotReachList**(`accountId`, `doNotReachListId`, `options`, `requestOptions?`): `Promise`\<[`DoNotReachListResponse`](../interfaces/DoNotReachListResponse.md)\>

Defined in: [resources/audiences.ts:378](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L378)

Add users to do not reach list

#### Parameters

##### accountId

`string`

##### doNotReachListId

`string`

##### options

[`AddUsersToAudienceOptions`](../interfaces/AddUsersToAudienceOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DoNotReachListResponse`](../interfaces/DoNotReachListResponse.md)\>

***

### deleteDoNotReachList()

> **deleteDoNotReachList**(`accountId`, `doNotReachListId`, `requestOptions?`): `Promise`\<[`DoNotReachListResponse`](../interfaces/DoNotReachListResponse.md)\>

Defined in: [resources/audiences.ts:402](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L402)

Delete a do not reach list

#### Parameters

##### accountId

`string`

##### doNotReachListId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`DoNotReachListResponse`](../interfaces/DoNotReachListResponse.md)\>

***

### searchKeywordInsights()

> **searchKeywordInsights**(`options`, `requestOptions?`): `Promise`\<[`KeywordInsightsResponse`](../interfaces/KeywordInsightsResponse.md)\>

Defined in: [resources/audiences.ts:421](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L421)

Search for keyword insights

#### Parameters

##### options

[`KeywordInsightsOptions`](../interfaces/KeywordInsightsOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`KeywordInsightsResponse`](../interfaces/KeywordInsightsResponse.md)\>

***

### createEmailAudience()

> **createEmailAudience**(`accountId`, `name`, `emails`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:446](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L446)

Create CRM custom audience with email list

#### Parameters

##### accountId

`string`

##### name

`string`

##### emails

`string`[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### createMobileIdAudience()

> **createMobileIdAudience**(`accountId`, `name`, `mobileIds`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:486](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L486)

Create mobile advertising ID audience

#### Parameters

##### accountId

`string`

##### name

`string`

##### mobileIds

`string`[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### createXUserIdAudience()

> **createXUserIdAudience**(`accountId`, `name`, `userIds`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:526](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L526)

Create X User ID audience

#### Parameters

##### accountId

`string`

##### name

`string`

##### userIds

`string`[]

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

### removeUsersFromAudience()

> **removeUsersFromAudience**(`accountId`, `customAudienceId`, `options`, `requestOptions?`): `Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

Defined in: [resources/audiences.ts:566](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/audiences.ts#L566)

Remove users from audience (opt-out)

#### Parameters

##### accountId

`string`

##### customAudienceId

`string`

##### options

[`AddUsersToAudienceOptions`](../interfaces/AddUsersToAudienceOptions.md)

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`CustomAudienceResponse`](../interfaces/CustomAudienceResponse.md)\>

***

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

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
