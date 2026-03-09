# LessonApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**lessonControllerCreateLesson**](#lessoncontrollercreatelesson) | **POST** /lessons | Create a new lesson|
|[**lessonControllerFindActiveLessonsByCourseModuleId**](#lessoncontrollerfindactivelessonsbycoursemoduleid) | **GET** /lessons/by-module/{courseModuleId}/active | Get active lessons by course module|
|[**lessonControllerFindAllLessonsByCourseModuleId**](#lessoncontrollerfindalllessonsbycoursemoduleid) | **GET** /lessons/by-module/{courseModuleId} | Get all lessons by course module|
|[**lessonControllerFindLessonById**](#lessoncontrollerfindlessonbyid) | **GET** /lessons/{id} | Get lesson by ID|
|[**lessonControllerFindVisibleActiveLessonsByCourseModuleId**](#lessoncontrollerfindvisibleactivelessonsbycoursemoduleid) | **GET** /lessons/by-module/{courseModuleId}/active-visible | Get visible and active lessons by course module|
|[**lessonControllerUpdateLesson**](#lessoncontrollerupdatelesson) | **PUT** /lessons/{id} | Update a lesson|
|[**lessonControllerUpdateLessonsOrder**](#lessoncontrollerupdatelessonsorder) | **PUT** /lessons/order/update-order | Update lessons order|

# **lessonControllerCreateLesson**
> LessonResponseDTO lessonControllerCreateLesson(createLessonRequestDTO)

This endpoint allows an admin to create a new lesson in a course module.

### Example

```typescript
import {
    LessonApi,
    Configuration,
    CreateLessonRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let createLessonRequestDTO: CreateLessonRequestDTO; //

const { status, data } = await apiInstance.lessonControllerCreateLesson(
    createLessonRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLessonRequestDTO** | **CreateLessonRequestDTO**|  | |


### Return type

**LessonResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Lesson created successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**401** | Unauthorized. Invalid authentication credentials provided. |  -  |
|**403** | Forbidden. You do not have permission to create lessons. |  -  |
|**500** | Internal server error. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lessonControllerFindActiveLessonsByCourseModuleId**
> Array<LessonResponseDTO> lessonControllerFindActiveLessonsByCourseModuleId()

Return all active lessons belonging to a specific course module.

### Example

```typescript
import {
    LessonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let courseModuleId: string; // (default to undefined)

const { status, data } = await apiInstance.lessonControllerFindActiveLessonsByCourseModuleId(
    courseModuleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseModuleId** | [**string**] |  | defaults to undefined|


### Return type

**Array<LessonResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Return the lessons list. |  -  |
|**404** | Course module not found or no lessons found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lessonControllerFindAllLessonsByCourseModuleId**
> Array<LessonResponseDTO> lessonControllerFindAllLessonsByCourseModuleId()

Return all lessons belonging to a specific course module.

### Example

```typescript
import {
    LessonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let courseModuleId: string; // (default to undefined)

const { status, data } = await apiInstance.lessonControllerFindAllLessonsByCourseModuleId(
    courseModuleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseModuleId** | [**string**] |  | defaults to undefined|


### Return type

**Array<LessonResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Return the lessons list. |  -  |
|**404** | Course module not found or no lessons found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lessonControllerFindLessonById**
> LessonResponseDTO lessonControllerFindLessonById()

Return details of a specific lesson.

### Example

```typescript
import {
    LessonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.lessonControllerFindLessonById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LessonResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Return the lesson data. |  -  |
|**404** | Lesson not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lessonControllerFindVisibleActiveLessonsByCourseModuleId**
> Array<LessonResponseDTO> lessonControllerFindVisibleActiveLessonsByCourseModuleId()

Return lessons that are active and visible for a specific course module.

### Example

```typescript
import {
    LessonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let courseModuleId: string; // (default to undefined)

const { status, data } = await apiInstance.lessonControllerFindVisibleActiveLessonsByCourseModuleId(
    courseModuleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **courseModuleId** | [**string**] |  | defaults to undefined|


### Return type

**Array<LessonResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Return the lessons list. |  -  |
|**404** | Course module not found or no lessons found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lessonControllerUpdateLesson**
> LessonResponseDTO lessonControllerUpdateLesson(updateLessonRequestDTO)

Update the data of a specific lesson.

### Example

```typescript
import {
    LessonApi,
    Configuration,
    UpdateLessonRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let id: string; // (default to undefined)
let updateLessonRequestDTO: UpdateLessonRequestDTO; //

const { status, data } = await apiInstance.lessonControllerUpdateLesson(
    id,
    updateLessonRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateLessonRequestDTO** | **UpdateLessonRequestDTO**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LessonResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lesson updated successfully. |  -  |
|**400** | Bad request. |  -  |
|**404** | Lesson not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **lessonControllerUpdateLessonsOrder**
> Array<UpdateLessonOrderResponseDTO> lessonControllerUpdateLessonsOrder(updateLessonOrderRequestDTO)

Update the display order of lessons.

### Example

```typescript
import {
    LessonApi,
    Configuration,
    UpdateLessonOrderRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new LessonApi(configuration);

let updateLessonOrderRequestDTO: UpdateLessonOrderRequestDTO; //

const { status, data } = await apiInstance.lessonControllerUpdateLessonsOrder(
    updateLessonOrderRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateLessonOrderRequestDTO** | **UpdateLessonOrderRequestDTO**|  | |


### Return type

**Array<UpdateLessonOrderResponseDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lessons order updated successfully. |  -  |
|**400** | Bad request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

