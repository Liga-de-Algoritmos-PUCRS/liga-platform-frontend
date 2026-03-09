# ResetPasswordRequestResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Reset Password Token ID | [default to undefined]
**expiresAt** | **string** | Token expiration date and time | [default to undefined]
**isRevoked** | **boolean** | Indicates whether the token has been revoked | [default to undefined]

## Example

```typescript
import { ResetPasswordRequestResponseDTO } from './api';

const instance: ResetPasswordRequestResponseDTO = {
    id,
    expiresAt,
    isRevoked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
