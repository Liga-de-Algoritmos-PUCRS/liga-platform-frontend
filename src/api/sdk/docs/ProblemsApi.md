# ProblemsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**problemControllerCreateProblem**](#problemcontrollercreateproblem) | **POST** /problems | Create a new problem|
|[**problemControllerDeleteProblem**](#problemcontrollerdeleteproblem) | **DELETE** /problems/{id} | Delete a problem|
|[**problemControllerGetAllProblems**](#problemcontrollergetallproblems) | **GET** /problems | List all problems|
|[**problemControllerGetProblemById**](#problemcontrollergetproblembyid) | **GET** /problems/{id} | Get problem by ID|
|[**problemControllerUpdateProblem**](#problemcontrollerupdateproblem) | **PATCH** /problems/{id} | Update an existing problem|

# **problemControllerCreateProblem**
> ProblemResponseDTO problemControllerCreateProblem(createProblemDTO)

This endpoint allows you to create a new problem in the system.

### Example

```typescript
import {
    ProblemsApi,
    Configuration,
    CreateProblemDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ProblemsApi(configuration);

let createProblemDTO: CreateProblemDTO; //

const { status, data } = await apiInstance.problemControllerCreateProblem(
    createProblemDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProblemDTO** | **CreateProblemDTO**|  | |


### Return type

**ProblemResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Problem created successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **problemControllerDeleteProblem**
> problemControllerDeleteProblem()

This endpoint allows you to delete a problem from the system.

### Example

```typescript
import {
    ProblemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProblemsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.problemControllerDeleteProblem(
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
|**200** | Problem deleted successfully. |  -  |
|**404** | Problem not found. The problem with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **problemControllerGetAllProblems**
> Array<ProblemResponseDTO> problemControllerGetAllProblems()

This endpoint retrieves a list of all problems in the system.

### Example

```typescript
import {
    ProblemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProblemsApi(configuration);

const { status, data } = await apiInstance.problemControllerGetAllProblems();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ProblemResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of problems retrieved successfully. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **problemControllerGetProblemById**
> ProblemResponseDTO problemControllerGetProblemById()

This endpoint retrieves a problem by its ID.

### Example

```typescript
import {
    ProblemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProblemsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.problemControllerGetProblemById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProblemResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Problem retrieved successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**404** | Problem not found. The problem with the specified ID does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **problemControllerUpdateProblem**
> ProblemResponseDTO problemControllerUpdateProblem(updateProblemDTO)

This endpoint allows you to update an existing problem in the system.

### Example

```typescript
import {
    ProblemsApi,
    Configuration,
    UpdateProblemDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ProblemsApi(configuration);

let id: string; // (default to undefined)
let updateProblemDTO: UpdateProblemDTO; //

const { status, data } = await apiInstance.problemControllerUpdateProblem(
    id,
    updateProblemDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProblemDTO** | **UpdateProblemDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProblemResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Problem updated successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**404** | Problem not found. The problem with the specified ID  does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

