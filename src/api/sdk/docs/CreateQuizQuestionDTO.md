# CreateQuizQuestionDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**questionText** | **string** | Text of the question | [default to undefined]
**points** | **number** | Points awarded for correctly answering this question | [default to undefined]
**orderPosition** | **number** | Order position of the question within the quiz | [default to undefined]
**_options** | [**Array&lt;CreateQuizOptionDTO&gt;**](CreateQuizOptionDTO.md) | List of options for the question | [default to undefined]

## Example

```typescript
import { CreateQuizQuestionDTO } from './api';

const instance: CreateQuizQuestionDTO = {
    questionText,
    points,
    orderPosition,
    _options,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
