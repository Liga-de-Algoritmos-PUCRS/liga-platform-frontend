# RollCallApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**rollCallControllerAttend**](#rollcallcontrollerattend) | **POST** /roll-calls/attend | |
|[**rollCallControllerCreate**](#rollcallcontrollercreate) | **POST** /roll-calls | |
|[**rollCallControllerFindAll**](#rollcallcontrollerfindall) | **GET** /roll-calls | |
|[**rollCallControllerFindOne**](#rollcallcontrollerfindone) | **GET** /roll-calls/{id} | |
|[**rollCallControllerGenerateQrCode**](#rollcallcontrollergenerateqrcode) | **GET** /roll-calls/{id}/qr-code | |
|[**rollCallControllerGetMyAttendances**](#rollcallcontrollergetmyattendances) | **GET** /roll-calls/my-attendances | |
|[**rollCallControllerGetOverview**](#rollcallcontrollergetoverview) | **GET** /roll-calls/overview | |
|[**rollCallControllerUpdateAttendance**](#rollcallcontrollerupdateattendance) | **PATCH** /roll-calls/{id}/attendance | |

# **rollCallControllerAttend**
> rollCallControllerAttend(body)


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let body: object; //

const { status, data } = await apiInstance.rollCallControllerAttend(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerCreate**
> rollCallControllerCreate(body)


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let body: object; //

const { status, data } = await apiInstance.rollCallControllerCreate(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerFindAll**
> rollCallControllerFindAll()


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

const { status, data } = await apiInstance.rollCallControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerFindOne**
> rollCallControllerFindOne()


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.rollCallControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerGenerateQrCode**
> rollCallControllerGenerateQrCode()


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.rollCallControllerGenerateQrCode(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerGetMyAttendances**
> rollCallControllerGetMyAttendances()


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

const { status, data } = await apiInstance.rollCallControllerGetMyAttendances();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerGetOverview**
> rollCallControllerGetOverview()


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

const { status, data } = await apiInstance.rollCallControllerGetOverview();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerUpdateAttendance**
> rollCallControllerUpdateAttendance(body)


### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let id: string; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.rollCallControllerUpdateAttendance(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

