# StockApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**stockControllerCreateProduct**](#stockcontrollercreateproduct) | **POST** /stock | Creates a new product|
|[**stockControllerGetAllProducts**](#stockcontrollergetallproducts) | **GET** /stock/get/all | Get all products|
|[**stockControllerGetProductByName**](#stockcontrollergetproductbyname) | **GET** /stock/get/{name} | Get product by name|

# **stockControllerCreateProduct**
> stockControllerCreateProduct(createProductDTO)

This endpoint creates a new product, based on the name, in the Stock

### Example

```typescript
import {
    StockApi,
    Configuration,
    CreateProductDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new StockApi(configuration);

let createProductDTO: CreateProductDTO; //

const { status, data } = await apiInstance.stockControllerCreateProduct(
    createProductDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProductDTO** | **CreateProductDTO**|  | |


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
|**200** | Product created successfully |  -  |
|**400** | A product with this name already exists |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stockControllerGetAllProducts**
> stockControllerGetAllProducts()

This endpoint return all products from the Stock

### Example

```typescript
import {
    StockApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StockApi(configuration);

const { status, data } = await apiInstance.stockControllerGetAllProducts();
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
|**200** | Products found successfully |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stockControllerGetProductByName**
> stockControllerGetProductByName()

This endpoint return a product based on the name

### Example

```typescript
import {
    StockApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StockApi(configuration);

let name: string; // (default to undefined)

const { status, data } = await apiInstance.stockControllerGetProductByName(
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|


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
|**200** | Product found successfully |  -  |
|**400** | Product not found |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

