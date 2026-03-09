# UpdateUserDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | User name | [optional] [default to undefined]
**bannerUrl** | **string** | User banner URL | [optional] [default to undefined]
**avatarUrl** | **string** | User avatar URL | [optional] [default to undefined]
**course** | **string** | Course the user is enrolled in | [optional] [default to undefined]
**semester** | **string** | Current semester of the user | [optional] [default to undefined]

## Example

```typescript
import { UpdateUserDTO } from './api';

const instance: UpdateUserDTO = {
    name,
    bannerUrl,
    avatarUrl,
    course,
    semester,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
