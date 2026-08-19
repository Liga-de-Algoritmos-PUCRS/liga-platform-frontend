# MyAttendancesResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalClasses** | **number** | Total de chamadas realizadas | [default to undefined]
**totalAttendances** | **number** | Total de presenças do usuário | [default to undefined]
**totalMisses** | **number** | Total de faltas do usuário | [default to undefined]
**history** | [**Array&lt;MyAttendanceHistoryItemDto&gt;**](MyAttendanceHistoryItemDto.md) | Histórico de presenças por chamada | [default to undefined]

## Example

```typescript
import { MyAttendancesResponseDto } from './api';

const instance: MyAttendancesResponseDto = {
    totalClasses,
    totalAttendances,
    totalMisses,
    history,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
