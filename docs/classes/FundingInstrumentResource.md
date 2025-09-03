[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / FundingInstrumentResource

# Class: FundingInstrumentResource

Defined in: resources/funding-instrument.ts:24

Funding Instrument resource class for managing payment methods

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseResource`](BaseResource.md)

## Constructors

### Constructor

> **new FundingInstrumentResource**(`httpClient`): `FundingInstrumentResource`

Defined in: [resources/base.ts:9](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L9)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

#### Returns

`FundingInstrumentResource`

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

### getFundingInstruments()

> **getFundingInstruments**(`accountId`, `options?`, `requestOptions?`): `Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

Defined in: resources/funding-instrument.ts:28

Get all funding instruments for an account

#### Parameters

##### accountId

`string`

##### options?

###### funding_instrument_ids?

`string`[]

###### funding_instrument_types?

[`FundingInstrumentType`](../enumerations/FundingInstrumentType.md)[]

###### entity_statuses?

[`FundingInstrumentEntityStatus`](../enumerations/FundingInstrumentEntityStatus.md)[]

###### count?

`number`

###### cursor?

`string`

###### sort_by?

[`FundingInstrumentSortField`](../type-aliases/FundingInstrumentSortField.md)

###### with_deleted?

`boolean`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

***

### getFundingInstrument()

> **getFundingInstrument**(`accountId`, `fundingInstrumentId`, `requestOptions?`): `Promise`\<[`SingleFundingInstrumentResponse`](../interfaces/SingleFundingInstrumentResponse.md)\>

Defined in: resources/funding-instrument.ts:78

Get a specific funding instrument

#### Parameters

##### accountId

`string`

##### fundingInstrumentId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`SingleFundingInstrumentResponse`](../interfaces/SingleFundingInstrumentResponse.md)\>

***

### getActiveFundingInstruments()

> **getActiveFundingInstruments**(`accountId`, `requestOptions?`): `Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

Defined in: resources/funding-instrument.ts:97

Get all active funding instruments

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

***

### getCreditCardFundingInstruments()

> **getCreditCardFundingInstruments**(`accountId`, `requestOptions?`): `Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

Defined in: resources/funding-instrument.ts:113

Get all credit card funding instruments

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

***

### getInsertionOrderFundingInstruments()

> **getInsertionOrderFundingInstruments**(`accountId`, `requestOptions?`): `Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

Defined in: resources/funding-instrument.ts:130

Get all insertion order funding instruments

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<[`FundingInstrumentResponse`](../interfaces/FundingInstrumentResponse.md)\>

***

### getDefaultFundingInstrument()

> **getDefaultFundingInstrument**(`accountId`, `requestOptions?`): `Promise`\<`null` \| [`SingleFundingInstrumentResponse`](../interfaces/SingleFundingInstrumentResponse.md)\>

Defined in: resources/funding-instrument.ts:147

Get the default funding instrument for an account

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<`null` \| [`SingleFundingInstrumentResponse`](../interfaces/SingleFundingInstrumentResponse.md)\>

***

### hasAvailableCredit()

> **hasAvailableCredit**(`accountId`, `requestOptions?`): `Promise`\<\{ `has_credit`: `boolean`; `total_available_credit`: `number`; `funding_instruments_with_credit`: `number`; \}\>

Defined in: resources/funding-instrument.ts:169

Check if account has sufficient credit in any funding instrument

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<\{ `has_credit`: `boolean`; `total_available_credit`: `number`; `funding_instruments_with_credit`: `number`; \}\>

***

### getFundingInstrumentsSummary()

> **getFundingInstrumentsSummary**(`accountId`, `requestOptions?`): `Promise`\<\{ `total_count`: `number`; `active_count`: `number`; `paused_count`: `number`; `cancelled_count`: `number`; `credit_card_count`: `number`; `insertion_order_count`: `number`; `default_funding_instrument?`: \{ `id`: `string`; `type`: [`FundingInstrumentType`](../enumerations/FundingInstrumentType.md); `currency`: `string`; `credit_remaining?`: `number`; \}; \}\>

Defined in: resources/funding-instrument.ts:199

Get funding instruments summary

#### Parameters

##### accountId

`string`

##### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)\<`string`\>

#### Returns

`Promise`\<\{ `total_count`: `number`; `active_count`: `number`; `paused_count`: `number`; `cancelled_count`: `number`; `credit_card_count`: `number`; `insertion_order_count`: `number`; `default_funding_instrument?`: \{ `id`: `string`; `type`: [`FundingInstrumentType`](../enumerations/FundingInstrumentType.md); `currency`: `string`; `credit_remaining?`: `number`; \}; \}\>

## Properties

### httpClient

> `protected` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [resources/base.ts:7](https://github.com/kage1020/x-ads-sdk/blob/main/src/resources/base.ts#L7)

#### Inherited from

[`BaseResource`](BaseResource.md).[`httpClient`](BaseResource.md#httpclient)
