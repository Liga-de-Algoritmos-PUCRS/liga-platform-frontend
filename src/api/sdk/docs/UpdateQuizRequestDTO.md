# UpdateQuizRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**isActive** | **boolean** | Indicates if the quiz is active | [optional] [default to undefined]
**passingScore** | **number** | Minimum score required to pass the quiz | [optional] [default to undefined]
**questions** | [**Array&lt;UpdateQuizQuestionDTO&gt;**](UpdateQuizQuestionDTO.md) | List of questions to update/replace | [optional] [default to undefined]

## Example

```typescript
import { UpdateQuizRequestDTO } from './api';

const instance: UpdateQuizRequestDTO = {
    isActive,
    passingScore,
    questions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
