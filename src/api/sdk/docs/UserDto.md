# UserDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | User id | [default to undefined]
**name** | **string** | User name | [default to undefined]
**email** | **string** | User email | [default to undefined]
**cpf** | **object** | User CPF | [optional] [default to undefined]
**phone** | **object** | User phone | [optional] [default to undefined]
**role** | **string** | User role | [default to undefined]
**status** | **string** | User status | [default to undefined]
**tier** | **string** | User tier | [default to undefined]
**createdAt** | **string** | User creation date | [default to undefined]

## Example

```typescript
import { UserDTO } from './api';

const instance: UserDTO = {
    id,
    name,
    email,
    cpf,
    phone,
    role,
    status,
    tier,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
