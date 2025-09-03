[**X Ads SDK v1.0.3**](../README.md)

***

[X Ads SDK](../globals.md) / ConversionEventRequest

# Interface: ConversionEventRequest

Defined in: types/conversion-tracking.ts:123

## Properties

### conversion\_tag\_id

> **conversion\_tag\_id**: `string`

Defined in: types/conversion-tracking.ts:125

Conversion tag ID

***

### event\_time

> **event\_time**: `string`

Defined in: types/conversion-tracking.ts:127

Event timestamp (ISO 8601)

***

### conversion\_value\_local\_micro?

> `optional` **conversion\_value\_local\_micro**: `number`

Defined in: types/conversion-tracking.ts:129

Conversion value in micros

***

### currency?

> `optional` **currency**: `string`

Defined in: types/conversion-tracking.ts:131

Currency code

***

### event\_identifier?

> `optional` **event\_identifier**: `string`

Defined in: types/conversion-tracking.ts:133

Event identifier

***

### user\_identifiers?

> `optional` **user\_identifiers**: `object`

Defined in: types/conversion-tracking.ts:135

User identifier hashes

#### hashed\_email?

> `optional` **hashed\_email**: `string`

#### hashed\_phone\_number?

> `optional` **hashed\_phone\_number**: `string`
