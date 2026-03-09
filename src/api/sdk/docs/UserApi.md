# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerCreateUser**](#usercontrollercreateuser) | **POST** /user | Create a new user|
|[**userControllerDeleteUser**](#usercontrollerdeleteuser) | **DELETE** /user/{id} | Delete a user|
|[**userControllerDeleteUserPhone**](#usercontrollerdeleteuserphone) | **POST** /user/phone | Delete a user phone|
|[**userControllerGetAllUsers**](#usercontrollergetallusers) | **GET** /user | List all users|
|[**userControllerGetUserById**](#usercontrollergetuserbyid) | **GET** /user/{id} | Get a user by ID|
|[**userControllerGetUserWithAccount**](#usercontrollergetuserwithaccount) | **GET** /user/account/{id} | Get a user with account information by ID|
|[**userControllerUpdateUser**](#usercontrollerupdateuser) | **PATCH** /user/{id} | Update an existing user|

# **userControllerCreateUser**
> UserResponseDTO userControllerCreateUser(createUserDTO)

This endpoint allows you to create a new user in the system.

### Example

```typescript
import {
    UserApi,
    Configuration,
    CreateUserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let createUserDTO: CreateUserDTO; //

const { status, data } = await apiInstance.userControllerCreateUser(
    createUserDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createUserDTO** | **CreateUserDTO**|  | |


### Return type

**UserResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | User created successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerDeleteUser**
> userControllerDeleteUser(deleteUserDTO)

This endpoint allows you to delete a user from the system.

### Example

```typescript
import {
    UserApi,
    Configuration,
    DeleteUserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)
let deleteUserDTO: DeleteUserDTO; //

const { status, data } = await apiInstance.userControllerDeleteUser(
    id,
    deleteUserDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deleteUserDTO** | **DeleteUserDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User deleted successfully. |  -  |
|**401** | Unauthorized. Invalid authentication credentials provided. |  -  |
|**403** | Forbidden. You do not have permission to delete this user. |  -  |
|**404** | User not found. The user with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerDeleteUserPhone**
> userControllerDeleteUserPhone()

This endpoint allows you to delete a user phone from the system.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerDeleteUserPhone();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User phone deleted successfully. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetAllUsers**
> Array<UserResponseDTO> userControllerGetAllUsers()

This endpoint retrieves a list of all users in the system.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerGetAllUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of users retrieved successfully. |  -  |
|**404** | No users found. The system does not contain any users. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUserById**
> UserResponseDTO userControllerGetUserById()

This endpoint retrieves a user by their unique ID.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.userControllerGetUserById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User retrieved successfully. |  -  |
|**404** | User not found. The user with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUserWithAccount**
> CreateUserWithAccountResponseDTO userControllerGetUserWithAccount()

This endpoint retrieves a user along with their account information by their unique ID.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.userControllerGetUserWithAccount(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CreateUserWithAccountResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User with account information retrieved successfully. |  -  |
|**404** | User not found. The user with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerUpdateUser**
> UserResponseDTO userControllerUpdateUser(updateUserDTO)

This endpoint allows you to update an existing user in the system.

### Example

```typescript
import {
    UserApi,
    Configuration,
    UpdateUserDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)
let updateUserDTO: UpdateUserDTO; //

const { status, data } = await apiInstance.userControllerUpdateUser(
    id,
    updateUserDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserDTO** | **UpdateUserDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**UserResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User updated successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**404** | User not found. The user with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

