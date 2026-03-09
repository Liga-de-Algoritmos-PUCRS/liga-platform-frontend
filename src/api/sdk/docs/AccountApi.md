# AccountApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**accountControllerDeleteAccount**](#accountcontrollerdeleteaccount) | **DELETE** /account/{id} | Delete account by ID|
|[**accountControllerGetAccountById**](#accountcontrollergetaccountbyid) | **GET** /account/{id} | Get account by ID|
|[**accountControllerGetAllAccounts**](#accountcontrollergetallaccounts) | **GET** /account | List all accounts|

# **accountControllerDeleteAccount**
> accountControllerDeleteAccount()

This endpoint deletes an account by its ID.

### Example

```typescript
import {
    AccountApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccountApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.accountControllerDeleteAccount(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** | Account deleted successfully. |  -  |
|**404** | Account not found. The account with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accountControllerGetAccountById**
> AccountResponseDTO accountControllerGetAccountById()

This endpoint retrieves account details by its ID.

### Example

```typescript
import {
    AccountApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccountApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.accountControllerGetAccountById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**AccountResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Account retrieved successfully. |  -  |
|**404** | Account not found. The account with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **accountControllerGetAllAccounts**
> AccountResponseDTO accountControllerGetAllAccounts()

This endpoint retrieves a list of all accounts in the system.

### Example

```typescript
import {
    AccountApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccountApi(configuration);

const { status, data } = await apiInstance.accountControllerGetAllAccounts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AccountResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Accounts retrieved successfully. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

