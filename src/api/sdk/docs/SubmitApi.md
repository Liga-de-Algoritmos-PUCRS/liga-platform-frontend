# SubmitApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**submitControllerCreateSubmit**](#submitcontrollercreatesubmit) | **POST** /submit | Create Submit|
|[**submitControllerDeleteSubmit**](#submitcontrollerdeletesubmit) | **DELETE** /submit/{id} | Delete Submit|
|[**submitControllerGetAllSubmits**](#submitcontrollergetallsubmits) | **GET** /submit | Get All Submits|
|[**submitControllerGetSubmitByProblemId**](#submitcontrollergetsubmitbyproblemid) | **GET** /submit/{problemId} | Get Submit by Problem ID|
|[**submitControllerGetSubmitByUserId**](#submitcontrollergetsubmitbyuserid) | **GET** /submit/user/{userId} | Get Submit by User ID|

# **submitControllerCreateSubmit**
> SubmitResponseDTO submitControllerCreateSubmit(createSubmitDTO)

This endpoint allows you to create a new submit

### Example

```typescript
import {
    SubmitApi,
    Configuration,
    CreateSubmitDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SubmitApi(configuration);

let createSubmitDTO: CreateSubmitDTO; //

const { status, data } = await apiInstance.submitControllerCreateSubmit(
    createSubmitDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSubmitDTO** | **CreateSubmitDTO**|  | |


### Return type

**SubmitResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Submit created successfully |  -  |
|**400** | Bad Request. The input data is invalid or missing. |  -  |
|**500** | Internal Server Error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **submitControllerDeleteSubmit**
> submitControllerDeleteSubmit()

This endpoint allows you to delete a submit

### Example

```typescript
import {
    SubmitApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubmitApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.submitControllerDeleteSubmit(
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
|**200** | Submit deleted successfully |  -  |
|**400** | Bad Request. The input data is invalid or missing. |  -  |
|**404** | Submit not found. The submit with the specified ID does not exist. |  -  |
|**500** | Internal Server Error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **submitControllerGetAllSubmits**
> SubmitResponseDTO submitControllerGetAllSubmits()

This endpoint allows you to get all submits

### Example

```typescript
import {
    SubmitApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubmitApi(configuration);

const { status, data } = await apiInstance.submitControllerGetAllSubmits();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SubmitResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Submits retrieved successfully |  -  |
|**400** | Bad Request. The input data is invalid or missing. |  -  |
|**500** | Internal Server Error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **submitControllerGetSubmitByProblemId**
> SubmitResponseDTO submitControllerGetSubmitByProblemId()

This endpoint allows you to get a submit by its problem ID

### Example

```typescript
import {
    SubmitApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubmitApi(configuration);

let problemId: string; // (default to undefined)

const { status, data } = await apiInstance.submitControllerGetSubmitByProblemId(
    problemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **problemId** | [**string**] |  | defaults to undefined|


### Return type

**SubmitResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Submit retrieved successfully |  -  |
|**400** | Bad Request. The input data is invalid or missing. |  -  |
|**404** | Submit not found. The submit with the specified ID does not exist. |  -  |
|**500** | Internal Server Error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **submitControllerGetSubmitByUserId**
> Array<SubmitResponseDTO> submitControllerGetSubmitByUserId()

This endpoint allows you to get a submit by its user ID

### Example

```typescript
import {
    SubmitApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubmitApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.submitControllerGetSubmitByUserId(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**Array<SubmitResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Submit retrieved successfully |  -  |
|**400** | Bad Request. The input data is invalid or missing. |  -  |
|**404** | Submit not found. The submit with the specified ID does not exist. |  -  |
|**500** | Internal Server Error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

