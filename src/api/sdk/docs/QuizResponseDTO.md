# QuizResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier of the quiz | [default to undefined]
**lessonId** | **string** | ID of the lesson | [default to undefined]
**isActive** | **boolean** | Indicates if the quiz is active | [default to undefined]
**passingScore** | **number** | Minimum score required to pass | [default to undefined]
**questions** | [**Array&lt;QuizQuestionResponseDTO&gt;**](QuizQuestionResponseDTO.md) | List of questions | [default to undefined]

## Example

```typescript
import { QuizResponseDTO } from './api';

const instance: QuizResponseDTO = {
    id,
    lessonId,
    isActive,
    passingScore,
    questions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
