# FileApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**fileControllerCreate**](#filecontrollercreate) | **POST** /file | Upload a new files|
|[**fileControllerDeleteFile**](#filecontrollerdeletefile) | **DELETE** /file/{id} | Delete file by ID|
|[**fileControllerGetFileById**](#filecontrollergetfilebyid) | **GET** /file/{id} | Get file by ID|
|[**fileControllerGetFilesByAuthorId**](#filecontrollergetfilesbyauthorid) | **GET** /file/user/{userId} | List all files by one user|
|[**fileControllerUpdateFile**](#filecontrollerupdatefile) | **PATCH** /file | Update file by ID|

# **fileControllerCreate**
> Array<FileReponseDTO> fileControllerCreate()

This endpoint allows you to upload a new files in the system and atributes to a user.        Limits: Up to 10 files per upload, and each file can have up to 100 MB.

### Example

```typescript
import {
    FileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FileApi(configuration);

let files: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.fileControllerCreate(
    files
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **files** | [**File**] |  | (optional) defaults to undefined|


### Return type

**Array<FileReponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Files successfully uploaded. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**413** | File size exceeds the maximum size allowed or the quantity of files to be uploaded exceeded: Maximum file sie: 100 | Allowed files quantity: 10 |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **fileControllerDeleteFile**
> fileControllerDeleteFile()

This endpoint allows you to delete a file by its ID.

### Example

```typescript
import {
    FileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FileApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.fileControllerDeleteFile(
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
|**200** | File deleted successfully. |  -  |
|**403** | Forbidden. You cannot delete files for another user. |  -  |
|**404** | File not found. The specified file does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **fileControllerGetFileById**
> FileReponseDTO fileControllerGetFileById()

This endpoint allows you to retrieve a file by its ID.

### Example

```typescript
import {
    FileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FileApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.fileControllerGetFileById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**FileReponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | File updated successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**404** | File not found. The specified file does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **fileControllerGetFilesByAuthorId**
> Array<FileReponseDTO> fileControllerGetFilesByAuthorId()

This endpoint retrieves a list of all files for a user.

### Example

```typescript
import {
    FileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FileApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.fileControllerGetFilesByAuthorId(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**Array<FileReponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of files retrieved successfully. |  -  |
|**404** | No files found. The system does not contain any files. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **fileControllerUpdateFile**
> FileReponseDTO fileControllerUpdateFile(updateFileDTO)

This endpoint allows you to update a file by its ID.

### Example

```typescript
import {
    FileApi,
    Configuration,
    UpdateFileDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new FileApi(configuration);

let updateFileDTO: UpdateFileDTO; //

const { status, data } = await apiInstance.fileControllerUpdateFile(
    updateFileDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateFileDTO** | **UpdateFileDTO**|  | |


### Return type

**FileReponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | File updated successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**404** | File not found. The specified file does not exist. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

