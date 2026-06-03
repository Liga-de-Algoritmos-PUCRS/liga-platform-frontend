# RollCallApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**rollCallControllerAttend**](#rollcallcontrollerattend) | **POST** /roll-calls/attend | Registrar presença|
|[**rollCallControllerCreate**](#rollcallcontrollercreate) | **POST** /roll-calls | Criar chamada|
|[**rollCallControllerFindAll**](#rollcallcontrollerfindall) | **GET** /roll-calls | Listar chamadas|
|[**rollCallControllerFindOne**](#rollcallcontrollerfindone) | **GET** /roll-calls/{id} | Detalhes de uma chamada|
|[**rollCallControllerGenerateQrCode**](#rollcallcontrollergenerateqrcode) | **GET** /roll-calls/{id}/qr-code | Gerar QR Code|
|[**rollCallControllerGetMyAttendances**](#rollcallcontrollergetmyattendances) | **GET** /roll-calls/my-attendances | Meu histórico de presenças|
|[**rollCallControllerGetOverview**](#rollcallcontrollergetoverview) | **GET** /roll-calls/overview | Visão geral de frequência|
|[**rollCallControllerRemove**](#rollcallcontrollerremove) | **DELETE** /roll-calls/{id} | Remover chamada|
|[**rollCallControllerUpdateAttendance**](#rollcallcontrollerupdateattendance) | **PATCH** /roll-calls/{id}/attendance | Atualizar presença manualmente|

# **rollCallControllerAttend**
> rollCallControllerAttend(attendRollCallDto)

Registra a presença do usuário autenticado via QR Code.

### Example

```typescript
import {
    RollCallApi,
    Configuration,
    AttendRollCallDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let attendRollCallDto: AttendRollCallDto; //

const { status, data } = await apiInstance.rollCallControllerAttend(
    attendRollCallDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attendRollCallDto** | **AttendRollCallDto**|  | |


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
|**200** | Presença registrada com sucesso. |  -  |
|**400** | QR Code inválido ou expirado. |  -  |
|**401** | Não autenticado. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerCreate**
> rollCallControllerCreate(createRollCallDto)

Cria uma nova chamada com a data informada. Acesso restrito a administradores.

### Example

```typescript
import {
    RollCallApi,
    Configuration,
    CreateRollCallDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let createRollCallDto: CreateRollCallDto; //

const { status, data } = await apiInstance.rollCallControllerCreate(
    createRollCallDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRollCallDto** | **CreateRollCallDto**|  | |


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
|**201** | Chamada criada com sucesso. |  -  |
|**400** | Data inválida. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerFindAll**
> Array<RollCallSummaryResponseDto> rollCallControllerFindAll()

Retorna todas as chamadas com o total de presenças de cada uma. Acesso restrito a administradores.

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

**Array<RollCallSummaryResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de chamadas retornada com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerFindOne**
> rollCallControllerFindOne()

Retorna os detalhes de uma chamada específica com a lista de presença de todos os usuários. Acesso restrito a administradores.

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
|**200** | Chamada retornada com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**404** | Chamada não encontrada. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerGenerateQrCode**
> rollCallControllerGenerateQrCode()

Gera um QR Code com expiração de 15 segundos para a chamada informada. Acesso restrito a administradores.

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
|**200** | QR Code gerado com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**404** | Chamada não encontrada. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerGetMyAttendances**
> rollCallControllerGetMyAttendances()

Retorna o histórico de presenças do usuário autenticado.

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
|**200** | Histórico de presenças retornado com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerGetOverview**
> rollCallControllerGetOverview()

Retorna estatísticas de presença de todos os usuários em todas as chamadas. Acesso restrito a administradores.

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
|**200** | Visão geral retornada com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerRemove**
> rollCallControllerRemove()

Remove uma chamada e todas as presenças associadas. Acesso restrito a administradores.

### Example

```typescript
import {
    RollCallApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.rollCallControllerRemove(
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
|**200** | Chamada removida com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**404** | Chamada não encontrada. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rollCallControllerUpdateAttendance**
> rollCallControllerUpdateAttendance(updateAttendanceDto)

Permite que um administrador marque ou desmarque a presença de um usuário em uma chamada.

### Example

```typescript
import {
    RollCallApi,
    Configuration,
    UpdateAttendanceDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RollCallApi(configuration);

let id: string; // (default to undefined)
let updateAttendanceDto: UpdateAttendanceDto; //

const { status, data } = await apiInstance.rollCallControllerUpdateAttendance(
    id,
    updateAttendanceDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAttendanceDto** | **UpdateAttendanceDto**|  | |
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
|**200** | Presença atualizada com sucesso. |  -  |
|**401** | Não autenticado. |  -  |
|**403** | Acesso restrito a administradores. |  -  |
|**404** | Chamada ou usuário não encontrado. |  -  |
|**500** | Erro interno. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

