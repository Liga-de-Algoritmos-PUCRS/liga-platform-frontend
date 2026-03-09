# CourseModuleResponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Id of the module | [default to undefined]
**title** | **string** | Title of the module | [default to undefined]
**imageUrl** | **string** | image URL | [optional] [default to undefined]
**orderPosition** | **number** | the position of the module in the list of modules, used to organized the view | [default to undefined]
**isVisible** | **boolean** | Define if students can view and access the module | [default to undefined]
**isActive** | **boolean** | Define if is deleted or not | [default to undefined]
**numberOfLessons** | **number** | The number of lessons in the course module. | [default to undefined]

## Example

```typescript
import { CourseModuleResponseDTO } from './api';

const instance: CourseModuleResponseDTO = {
    id,
    title,
    imageUrl,
    orderPosition,
    isVisible,
    isActive,
    numberOfLessons,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
