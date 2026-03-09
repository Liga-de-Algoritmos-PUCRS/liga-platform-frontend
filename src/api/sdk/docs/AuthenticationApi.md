# AuthenticationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**loginControllerLogin**](#logincontrollerlogin) | **POST** /auth/login | User login|
|[**loginControllerLogout**](#logincontrollerlogout) | **POST** /auth/logout | User logout|
|[**loginControllerRefreshTokens**](#logincontrollerrefreshtokens) | **POST** /auth/refresh | Refresh access token|

# **loginControllerLogin**
> LoginResponseDTO loginControllerLogin(loginRequestDTO)

This endpoint allows a user to log in to the system.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    LoginRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let loginRequestDTO: LoginRequestDTO; //

const { status, data } = await apiInstance.loginControllerLogin(
    loginRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDTO** | **LoginRequestDTO**|  | |


### Return type

**LoginResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User logged in successfully. |  -  |
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **loginControllerLogout**
> loginControllerLogout()

This endpoint allows a user to log out from the system.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.loginControllerLogout();
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
|**401** | Unauthorized. The user is not authenticated. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **loginControllerRefreshTokens**
> loginControllerRefreshTokens()

This endpoint allows a user to refresh their access token using a valid refresh token.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.loginControllerRefreshTokens();
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
|**401** | Unauthorized. The provided refresh token is invalid or expired. |  -  |
|**404** | User not found. The user associated with the refresh token does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

