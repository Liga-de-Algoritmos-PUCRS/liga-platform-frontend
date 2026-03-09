# VerifyPhoneApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**verifyPhoneControllerValidateVerifyPhone**](#verifyphonecontrollervalidateverifyphone) | **POST** /verify-phone/validate | Validate phone verification|
|[**verifyPhoneControllerVerifyPhone**](#verifyphonecontrollerverifyphone) | **POST** /verify-phone | User phone verification|

# **verifyPhoneControllerValidateVerifyPhone**
> verifyPhoneControllerValidateVerifyPhone(validateVerifyPhoneDTO)

This endpoint allows a user to validate the phone verification token.

### Example

```typescript
import {
    VerifyPhoneApi,
    Configuration,
    ValidateVerifyPhoneDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new VerifyPhoneApi(configuration);

let validateVerifyPhoneDTO: ValidateVerifyPhoneDTO; //

const { status, data } = await apiInstance.verifyPhoneControllerValidateVerifyPhone(
    validateVerifyPhoneDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **validateVerifyPhoneDTO** | **ValidateVerifyPhoneDTO**|  | |


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

# **verifyPhoneControllerVerifyPhone**
> ValidateVerifyPhoneResponseDTO verifyPhoneControllerVerifyPhone(verifyPhoneRequestDTO)

This endpoint allows a user to verify their phone number.

### Example

```typescript
import {
    VerifyPhoneApi,
    Configuration,
    VerifyPhoneRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new VerifyPhoneApi(configuration);

let verifyPhoneRequestDTO: VerifyPhoneRequestDTO; //

const { status, data } = await apiInstance.verifyPhoneControllerVerifyPhone(
    verifyPhoneRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyPhoneRequestDTO** | **VerifyPhoneRequestDTO**|  | |


### Return type

**ValidateVerifyPhoneResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Phone verification token created successfully. |  -  |
|**401** | Unauthorized. The provided credentials are invalid. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

