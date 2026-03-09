# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerLogin**](#authcontrollerlogin) | **POST** /auth/login | |
|[**authControllerRefresh**](#authcontrollerrefresh) | **POST** /auth/refresh | |
|[**authControllerSignup**](#authcontrollersignup) | **POST** /auth/signup | |

# **authControllerLogin**
> AuthResponseDto authControllerLogin(loginDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginDto: LoginDto; //

const { status, data } = await apiInstance.authControllerLogin(
    loginDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginDto** | **LoginDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRefresh**
> AuthResponseDto authControllerRefresh(refreshDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    RefreshDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let refreshDto: RefreshDto; //

const { status, data } = await apiInstance.authControllerRefresh(
    refreshDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refreshDto** | **RefreshDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerSignup**
> AuthResponseDto authControllerSignup(signupDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SignupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signupDto: SignupDto; //

const { status, data } = await apiInstance.authControllerSignup(
    signupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signupDto** | **SignupDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

