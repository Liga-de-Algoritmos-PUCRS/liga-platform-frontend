# ModuleApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**courseModuleControllerCreateCourseModule**](#coursemodulecontrollercreatecoursemodule) | **POST** /module | Create a new course module|
|[**courseModuleControllerGetActiveCourseModules**](#coursemodulecontrollergetactivecoursemodules) | **GET** /module | Return active course modules.|
|[**courseModuleControllerGetActiveVisibleCourseModules**](#coursemodulecontrollergetactivevisiblecoursemodules) | **GET** /module/active-visible | Return active course modules.|
|[**courseModuleControllerGetAllCourseModules**](#coursemodulecontrollergetallcoursemodules) | **GET** /module/all | Return all course modules.|
|[**courseModuleControllerSoftDeleteCourseModule**](#coursemodulecontrollersoftdeletecoursemodule) | **DELETE** /module/{id} | Soft delete a module|
|[**courseModuleControllerUpdateCourseModule**](#coursemodulecontrollerupdatecoursemodule) | **PATCH** /module/{id} | Update a module|
|[**courseModuleControllerUpdateCourseModulesOrder**](#coursemodulecontrollerupdatecoursemodulesorder) | **POST** /module/update/order | Update the order of modules|

# **courseModuleControllerCreateCourseModule**
> CourseModuleResponseDTO courseModuleControllerCreateCourseModule()

This endpoint allows an admin to create a new course module in the system.

### Example

```typescript
import {
    ModuleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

let title: string; //Title of the module (default to undefined)
let imageFile: File; //Image binary file (png, jpg, etc) (default to undefined)
let orderPosition: number; //The position of the module in the list of modules, used to organize the view (default to undefined)

const { status, data } = await apiInstance.courseModuleControllerCreateCourseModule(
    title,
    imageFile,
    orderPosition
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **title** | [**string**] | Title of the module | defaults to undefined|
| **imageFile** | [**File**] | Image binary file (png, jpg, etc) | defaults to undefined|
| **orderPosition** | [**number**] | The position of the module in the list of modules, used to organize the view | defaults to undefined|


### Return type

**CourseModuleResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Course module created successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**401** | Unauthorized. Invalid authentication credentials provided. |  -  |
|**403** | Forbidden. You do not have permission to create course modules. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courseModuleControllerGetActiveCourseModules**
> courseModuleControllerGetActiveCourseModules()

This endpoint returns only active course modules.

### Example

```typescript
import {
    ModuleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

const { status, data } = await apiInstance.courseModuleControllerGetActiveCourseModules();
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
|**200** | Return the data |  -  |
|**404** | No active course modules found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courseModuleControllerGetActiveVisibleCourseModules**
> courseModuleControllerGetActiveVisibleCourseModules()

This endpoint returns only active course modules.

### Example

```typescript
import {
    ModuleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

const { status, data } = await apiInstance.courseModuleControllerGetActiveVisibleCourseModules();
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
|**200** | Return the data |  -  |
|**404** | No active course modules found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courseModuleControllerGetAllCourseModules**
> courseModuleControllerGetAllCourseModules()

This endpoint returns all course modules (active and inactive).

### Example

```typescript
import {
    ModuleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

const { status, data } = await apiInstance.courseModuleControllerGetAllCourseModules();
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
|**200** | Return the data |  -  |
|**404** | No course modules finded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courseModuleControllerSoftDeleteCourseModule**
> courseModuleControllerSoftDeleteCourseModule()

Soft delete a module by setting isActive to false and orderPosition to 0

### Example

```typescript
import {
    ModuleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.courseModuleControllerSoftDeleteCourseModule(
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
|**200** | Course module soft deleted successfully |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**401** | Unauthorized. Invalid authentication credentials provided. |  -  |
|**403** | Forbidden. You do not have permission to delete course modules. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courseModuleControllerUpdateCourseModule**
> CourseModuleResponseDTO courseModuleControllerUpdateCourseModule(updateCourseModuleRequestDTO)

Update the data of a module

### Example

```typescript
import {
    ModuleApi,
    Configuration,
    UpdateCourseModuleRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

let id: string; // (default to undefined)
let updateCourseModuleRequestDTO: UpdateCourseModuleRequestDTO; //

const { status, data } = await apiInstance.courseModuleControllerUpdateCourseModule(
    id,
    updateCourseModuleRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCourseModuleRequestDTO** | **UpdateCourseModuleRequestDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CourseModuleResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Course module updated successfully |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**401** | Unauthorized. Invalid authentication credentials provided. |  -  |
|**403** | Forbidden. You do not have permission to update course modules. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courseModuleControllerUpdateCourseModulesOrder**
> Array<object> courseModuleControllerUpdateCourseModulesOrder(updateCourseModulesOrderRequestDTO)

Update the order of modules to display the correct order in frontend

### Example

```typescript
import {
    ModuleApi,
    Configuration,
    UpdateCourseModulesOrderRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ModuleApi(configuration);

let updateCourseModulesOrderRequestDTO: UpdateCourseModulesOrderRequestDTO; //

const { status, data } = await apiInstance.courseModuleControllerUpdateCourseModulesOrder(
    updateCourseModulesOrderRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCourseModulesOrderRequestDTO** | **UpdateCourseModulesOrderRequestDTO**|  | |


### Return type

**Array<object>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Course Modules order updated successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**401** | Unauthorized. Invalid authentication credentials provided. |  -  |
|**403** | Forbidden. You do not have permission to update course modules. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

