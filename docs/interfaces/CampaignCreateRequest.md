[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / CampaignCreateRequest

# Interface: CampaignCreateRequest

Defined in: types/resources/campaign.ts:39

## Properties

### name

> **name**: `string`

Defined in: types/resources/campaign.ts:41

Campaign name

***

### funding\_instrument\_id

> **funding\_instrument\_id**: `string`

Defined in: types/resources/campaign.ts:43

Associated funding instrument ID

***

### start\_time

> **start\_time**: `string`

Defined in: types/resources/campaign.ts:45

Campaign start time

***

### end\_time?

> `optional` **end\_time**: `string`

Defined in: types/resources/campaign.ts:47

Campaign end time

***

### currency

> **currency**: `string`

Defined in: types/resources/campaign.ts:49

Campaign currency

***

### daily\_budget\_amount\_local\_micro?

> `optional` **daily\_budget\_amount\_local\_micro**: `number`

Defined in: types/resources/campaign.ts:51

Daily budget amount in micros

***

### total\_budget\_amount\_local\_micro?

> `optional` **total\_budget\_amount\_local\_micro**: `number`

Defined in: types/resources/campaign.ts:53

Total budget amount in micros

***

### entity\_status?

> `optional` **entity\_status**: [`CampaignEntityStatus`](../enumerations/CampaignEntityStatus.md)

Defined in: types/resources/campaign.ts:55

Campaign entity status

***

### standard\_delivery?

> `optional` **standard\_delivery**: `boolean`

Defined in: types/resources/campaign.ts:57

Whether this is a standard delivery
