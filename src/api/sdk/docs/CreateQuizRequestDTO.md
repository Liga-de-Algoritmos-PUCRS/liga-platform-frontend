# CreateQuizRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**lessonId** | **string** | ID of the lesson this quiz belongs to | [default to undefined]
**isActive** | **boolean** | Indicates if the quiz is active | [default to undefined]
**passingScore** | **number** | Minimum score required to pass the quiz | [default to undefined]
**questions** | [**Array&lt;CreateQuizQuestionDTO&gt;**](CreateQuizQuestionDTO.md) | List of questions for the quiz | [default to undefined]

## Example

```typescript
import { CreateQuizRequestDTO } from './api';

const instance: CreateQuizRequestDTO = {
    lessonId,
    isActive,
    passingScore,
    questions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
