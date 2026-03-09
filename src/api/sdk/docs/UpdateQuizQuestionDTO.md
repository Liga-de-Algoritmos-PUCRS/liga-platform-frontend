# UpdateQuizQuestionDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | ID of the question (if updating existing) | [optional] [default to undefined]
**questionText** | **string** | Text of the question | [default to undefined]
**points** | **number** | Points awarded for correctly answering this question | [default to undefined]
**orderPosition** | **number** | Order position of the question within the quiz | [default to undefined]
**_options** | [**Array&lt;UpdateQuizOptionDTO&gt;**](UpdateQuizOptionDTO.md) | List of options for the question | [default to undefined]

## Example

```typescript
import { UpdateQuizQuestionDTO } from './api';

const instance: UpdateQuizQuestionDTO = {
    id,
    questionText,
    points,
    orderPosition,
    _options,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
