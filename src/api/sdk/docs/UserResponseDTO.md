# UserResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | User ID | [default to undefined]
**name** | **string** | User name | [default to undefined]
**email** | **string** | User email | [default to undefined]
**createdAt** | **string** | User creation date | [default to undefined]
**role** | **string** | User role | [default to undefined]
**avatarUrl** | **string** | User avatar URL | [optional] [default to undefined]
**bannerUrl** | **string** | User banner URL | [optional] [default to undefined]
**course** | **string** | User course | [optional] [default to undefined]
**semester** | **string** | User semester | [optional] [default to undefined]
**historycalSubmissions** | **number** | User\&#39;s historical submissions | [optional] [default to undefined]
**monthlyPoints** | **number** | User\&#39;s monthly points | [optional] [default to undefined]
**allTimePoints** | **number** | User\&#39;s all-time points | [optional] [default to undefined]
**submissions** | **number** | User\&#39;s all-time submission | [optional] [default to undefined]
**problemsResolved** | **number** | Problems resolve by an user | [optional] [default to undefined]

## Example

```typescript
import { UserResponseDTO } from './api';

const instance: UserResponseDTO = {
    id,
    name,
    email,
    createdAt,
    role,
    avatarUrl,
    bannerUrl,
    course,
    semester,
    historycalSubmissions,
    monthlyPoints,
    allTimePoints,
    submissions,
    problemsResolved,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
