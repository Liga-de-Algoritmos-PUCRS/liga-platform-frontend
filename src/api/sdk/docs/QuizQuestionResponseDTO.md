# QuizQuestionResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier of the question | [default to undefined]
**questionText** | **string** | Text of the question | [default to undefined]
**points** | **number** | Points awarded | [default to undefined]
**orderPosition** | **number** | Order position | [default to undefined]
**_options** | [**Array&lt;QuizOptionResponseDTO&gt;**](QuizOptionResponseDTO.md) | List of options | [default to undefined]

## Example

```typescript
import { QuizQuestionResponseDTO } from './api';

const instance: QuizQuestionResponseDTO = {
    id,
    questionText,
    points,
    orderPosition,
    _options,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
