# UpdateCourseModuleRequestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | Title of the module | [optional] [default to undefined]
**imageFile** | **File** | Image binary file (png, jpg, etc) | [optional] [default to undefined]
**orderPosition** | **number** | The position of the module in the list of modules, used to organized the view | [optional] [default to undefined]
**isVisible** | **boolean** | Define if the module is visible for students | [optional] [default to undefined]
**isActive** | **boolean** | Define if the module is active (soft deleted), false equals deleted | [optional] [default to undefined]

## Example

```typescript
import { UpdateCourseModuleRequestDTO } from './api';

const instance: UpdateCourseModuleRequestDTO = {
    title,
    imageFile,
    orderPosition,
    isVisible,
    isActive,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
