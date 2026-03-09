# SignupRequestResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Signup Token ID | [default to undefined]
**expiresAt** | **string** | Token expiration date and time | [default to undefined]
**isRevoked** | **boolean** | Indicates whether the token has been revoked | [default to undefined]

## Example

```typescript
import { SignupRequestResponseDTO } from './api';

const instance: SignupRequestResponseDTO = {
    id,
    expiresAt,
    isRevoked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
