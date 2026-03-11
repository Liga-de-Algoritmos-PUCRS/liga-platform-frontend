# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerDeleteUser**](#usercontrollerdeleteuser) | **DELETE** /user/{id} | Delete a user|
|[**userControllerGetAllUsers**](#usercontrollergetallusers) | **GET** /user | List all users|
|[**userControllerGetMe**](#usercontrollergetme) | **GET** /user/me/{id} | Get a user|
|[**userControllerGetMonthlyTopUsers**](#usercontrollergetmonthlytopusers) | **GET** /user/top/monthly | Get monthly top users|
|[**userControllerGetTopUsers**](#usercontrollergettopusers) | **GET** /user/top/all-time | Get top users|
|[**userControllerGetUserById**](#usercontrollergetuserbyid) | **GET** /user/{id} | Get a user by ID|
|[**userControllerResetUserPoints**](#usercontrollerresetuserpoints) | **POST** /user/reset-points | Reset user points|
|[**userControllerUpdateUser**](#usercontrollerupdateuser) | **PATCH** /user/{id} | Update an existing user|

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

# **userControllerGetMe**
> UserResponseDTO userControllerGetMe()

This endpoint retrieves a user by their unique ID.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerGetMe();
```

### Parameters
This endpoint does not have any parameters.


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

# **userControllerGetMonthlyTopUsers**
> Array<UserResponseDTO> userControllerGetMonthlyTopUsers()

This endpoint retrieves the top users of the month based on their performance.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerGetMonthlyTopUsers();
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
|**200** | Monthly top users retrieved successfully. |  -  |
|**404** | No monthly top users found. The system does not contain any monthly top users. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetTopUsers**
> Array<UserResponseDTO> userControllerGetTopUsers()

This endpoint retrieves the top users based on their performance.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerGetTopUsers();
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
|**200** | Top users retrieved successfully. |  -  |
|**404** | No top users found. The system does not contain any top users. |  -  |
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

# **userControllerResetUserPoints**
> userControllerResetUserPoints()

This endpoint allows you to reset the points of all users in the system.

### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.userControllerResetUserPoints();
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
|**200** | User points reset successfully. |  -  |
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

