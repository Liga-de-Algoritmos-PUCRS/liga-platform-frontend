# ResetPasswordApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**resetPasswordControllerRequestResetPassword**](#resetpasswordcontrollerrequestresetpassword) | **POST** /reset-password/request | User reset password|
|[**resetPasswordControllerResetPassword**](#resetpasswordcontrollerresetpassword) | **POST** /reset-password | Reset Password|
|[**resetPasswordControllerValidateResetPassword**](#resetpasswordcontrollervalidateresetpassword) | **POST** /reset-password/validate | Validate Reset Password|

# **resetPasswordControllerRequestResetPassword**
> ResetPasswordRequestResponseDTO resetPasswordControllerRequestResetPassword(resetPasswordRequestDTO)

This endpoint allows a user to request a password reset.

### Example

```typescript
import {
    ResetPasswordApi,
    Configuration,
    ResetPasswordRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ResetPasswordApi(configuration);

let resetPasswordRequestDTO: ResetPasswordRequestDTO; //

const { status, data } = await apiInstance.resetPasswordControllerRequestResetPassword(
    resetPasswordRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordRequestDTO** | **ResetPasswordRequestDTO**|  | |


### Return type

**ResetPasswordRequestResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Reset password token created successfully. |  -  |
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resetPasswordControllerResetPassword**
> resetPasswordControllerResetPassword(resetPasswordDTO)

This endpoint allows a user to reset password token.

### Example

```typescript
import {
    ResetPasswordApi,
    Configuration,
    ResetPasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ResetPasswordApi(configuration);

let resetPasswordDTO: ResetPasswordDTO; //

const { status, data } = await apiInstance.resetPasswordControllerResetPassword(
    resetPasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordDTO** | **ResetPasswordDTO**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resetPasswordControllerValidateResetPassword**
> resetPasswordControllerValidateResetPassword(validateResetPasswordDTO)

This endpoint allows a user to validate the reset password token.

### Example

```typescript
import {
    ResetPasswordApi,
    Configuration,
    ValidateResetPasswordDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ResetPasswordApi(configuration);

let validateResetPasswordDTO: ValidateResetPasswordDTO; //

const { status, data } = await apiInstance.resetPasswordControllerValidateResetPassword(
    validateResetPasswordDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **validateResetPasswordDTO** | **ValidateResetPasswordDTO**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

