# CreateLessonRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | Title of the lesson | [default to undefined]
**description** | **string** | Description of the lesson | [optional] [default to undefined]
**type** | **string** | Type of the lesson (VIDEO or QUIZ) | [default to undefined]
**orderPosition** | **number** | Order position of the lesson | [default to undefined]
**isVisible** | **boolean** | Visibility status of the lesson | [default to undefined]
**isActive** | **boolean** | Active status of the lesson | [default to undefined]
**moduleId** | **string** | ID of the course module this lesson belongs to | [default to undefined]

## Example

```typescript
import { CreateLessonRequestDTO } from './api';

const instance: CreateLessonRequestDTO = {
    title,
    description,
    type,
    orderPosition,
    isVisible,
    isActive,
    moduleId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
