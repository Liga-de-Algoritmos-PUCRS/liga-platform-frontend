# SignupApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**signupControllerValidateSignup**](#signupcontrollervalidatesignup) | **POST** /signup | User signup|
|[**signupControllerValidateToken**](#signupcontrollervalidatetoken) | **POST** /signup/validate | Validate signup|

# **signupControllerValidateSignup**
> SignupRequestResponseDTO signupControllerValidateSignup(signupRequestDTO)

This endpoint allows a user to sign in to the system.

### Example

```typescript
import {
    SignupApi,
    Configuration,
    SignupRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SignupApi(configuration);

let signupRequestDTO: SignupRequestDTO; //

const { status, data } = await apiInstance.signupControllerValidateSignup(
    signupRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signupRequestDTO** | **SignupRequestDTO**|  | |


### Return type

**SignupRequestResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User signed up successfully. |  -  |
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signupControllerValidateToken**
> ValidateSignupResponse signupControllerValidateToken(validateSignupDTO)

This endpoint allows a user to validate the signup token.

### Example

```typescript
import {
    SignupApi,
    Configuration,
    ValidateSignupDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SignupApi(configuration);

let validateSignupDTO: ValidateSignupDTO; //

const { status, data } = await apiInstance.signupControllerValidateToken(
    validateSignupDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **validateSignupDTO** | **ValidateSignupDTO**|  | |


### Return type

**ValidateSignupResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Signup token validated successfully. |  -  |
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

