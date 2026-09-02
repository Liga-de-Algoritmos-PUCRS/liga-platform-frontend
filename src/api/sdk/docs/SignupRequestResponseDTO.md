# SignupRequestResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Public confirmation message. Identical whether the email already has an account or not. | [default to undefined]
**expiresInSeconds** | **number** | How long the code is valid for, in seconds. | [default to undefined]

## Example

```typescript
import { SignupRequestResponseDTO } from './api';

const instance: SignupRequestResponseDTO = {
    message,
    expiresInSeconds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
