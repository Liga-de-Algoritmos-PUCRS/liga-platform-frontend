# ValidateResetPasswordDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** | User email | [optional] [default to undefined]
**tokenId** | **string** | Token id. Deprecated: kept only for backwards compatibility, prefer email. | [optional] [default to undefined]
**token** | **string** | Indicates if the token has 6 digits | [default to undefined]

## Example

```typescript
import { ValidateResetPasswordDTO } from './api';

const instance: ValidateResetPasswordDTO = {
    email,
    tokenId,
    token,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
