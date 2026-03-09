# FileReponseDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier for the file | [default to undefined]
**name** | **string** | Name of the file | [default to undefined]
**size** | **number** | Size of the file in bytes | [default to undefined]
**type** | **string** | MIME type of the file | [default to undefined]
**fileUrl** | **string** | URL where the file is stored | [default to undefined]
**authorId** | **string** | Unique identifier for the author of the file | [default to undefined]
**createdAt** | **string** | Timestamp when the file was created | [default to undefined]
**deleted** | **boolean** | Indicates whether the file has been deleted | [default to undefined]
**deletedAt** | **string** | Timestamp when the file was deleted | [optional] [default to undefined]

## Example

```typescript
import { FileReponseDTO } from './api';

const instance: FileReponseDTO = {
    id,
    name,
    size,
    type,
    fileUrl,
    authorId,
    createdAt,
    deleted,
    deletedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
