# ValidateVerifyPhoneResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Token id | [default to undefined]
**phone** | **string** | Indicates phone number to verify | [default to undefined]
**expiresAt** | **string** | Verification date | [default to undefined]
**isRevoked** | **boolean** | Indicates if the token is revoked | [default to undefined]

## Example

```typescript
import { ValidateVerifyPhoneResponseDTO } from './api';

const instance: ValidateVerifyPhoneResponseDTO = {
    id,
    phone,
    expiresAt,
    isRevoked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
