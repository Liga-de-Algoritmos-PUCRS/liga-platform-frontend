# CreateProblemDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | Problem title | [default to undefined]
**description** | **string** | Problem description | [default to undefined]
**difficulty** | **string** | Problem difficulty | [default to undefined]
**answer** | **string** | Problem answer | [default to undefined]
**input** | **string** | Problem input | [default to undefined]
**points** | **number** | Current value of the problem: how many points the next solver earns. Optional — defaults to &#x60;initialPoints&#x60;. When sent, it is clamped to [floorPoints, initialPoints]. | [optional] [default to undefined]
**initialPoints** | **number** | Value the problem starts at, and the ceiling of the current value. | [optional] [default to undefined]
**floorPoints** | **number** | Floor of the current value: once it is reached, solving no longer lowers the problem. Must be less than or equal to &#x60;initialPoints&#x60;. | [optional] [default to undefined]
**decrement** | **number** | How much the current value drops for each distinct student who solves it. | [optional] [default to undefined]
**bannerUrl** | **string** | Problem banner URL | [default to undefined]
**archived** | **boolean** | Problem archived | [optional] [default to undefined]
**fixed** | **boolean** | Problem fixed | [optional] [default to undefined]

## Example

```typescript
import { CreateProblemDTO } from './api';

const instance: CreateProblemDTO = {
    title,
    description,
    difficulty,
    answer,
    input,
    points,
    initialPoints,
    floorPoints,
    decrement,
    bannerUrl,
    archived,
    fixed,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
