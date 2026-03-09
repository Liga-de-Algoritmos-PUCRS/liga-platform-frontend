# QuizzesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**quizControllerCreateQuiz**](#quizcontrollercreatequiz) | **POST** /quizzes | Create a new quiz for a lesson|
|[**quizControllerDeleteQuiz**](#quizcontrollerdeletequiz) | **DELETE** /quizzes/{id} | Delete a quiz|
|[**quizControllerGetQuizByLessonId**](#quizcontrollergetquizbylessonid) | **GET** /quizzes/{lessonId} | Get quiz by lesson ID|
|[**quizControllerUpdateQuiz**](#quizcontrollerupdatequiz) | **PUT** /quizzes/{id} | Update a quiz|

# **quizControllerCreateQuiz**
> QuizResponseDTO quizControllerCreateQuiz(createQuizRequestDTO)


### Example

```typescript
import {
    QuizzesApi,
    Configuration,
    CreateQuizRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let createQuizRequestDTO: CreateQuizRequestDTO; //

const { status, data } = await apiInstance.quizControllerCreateQuiz(
    createQuizRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createQuizRequestDTO** | **CreateQuizRequestDTO**|  | |


### Return type

**QuizResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | The quiz has been successfully created. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizControllerDeleteQuiz**
> boolean quizControllerDeleteQuiz()


### Example

```typescript
import {
    QuizzesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let id: string; //ID of the quiz (default to undefined)

const { status, data } = await apiInstance.quizControllerDeleteQuiz(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID of the quiz | defaults to undefined|


### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The quiz has been successfully deleted. |  -  |
|**404** | Quiz not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizControllerGetQuizByLessonId**
> QuizResponseDTO quizControllerGetQuizByLessonId()


### Example

```typescript
import {
    QuizzesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let lessonId: string; //ID of the lesson (default to undefined)

const { status, data } = await apiInstance.quizControllerGetQuizByLessonId(
    lessonId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lessonId** | [**string**] | ID of the lesson | defaults to undefined|


### Return type

**QuizResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Return the quiz associated with the lesson. |  -  |
|**404** | Quiz not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizControllerUpdateQuiz**
> QuizResponseDTO quizControllerUpdateQuiz(updateQuizRequestDTO)


### Example

```typescript
import {
    QuizzesApi,
    Configuration,
    UpdateQuizRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let id: string; //ID of the quiz (default to undefined)
let updateQuizRequestDTO: UpdateQuizRequestDTO; //

const { status, data } = await apiInstance.quizControllerUpdateQuiz(
    id,
    updateQuizRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateQuizRequestDTO** | **UpdateQuizRequestDTO**|  | |
| **id** | [**string**] | ID of the quiz | defaults to undefined|


### Return type

**QuizResponseDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The quiz has been successfully updated. |  -  |
|**404** | Quiz not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

