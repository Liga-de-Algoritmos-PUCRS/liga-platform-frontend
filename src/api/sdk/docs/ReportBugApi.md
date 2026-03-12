# ReportBugApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**reportBugControllerReportBug**](#reportbugcontrollerreportbug) | **POST** /report-bug | Report a bug|

# **reportBugControllerReportBug**
> reportBugControllerReportBug(reportBugServiceDTO)

This endpoint allows users to report a bug in the system.

### Example

```typescript
import {
    ReportBugApi,
    Configuration,
    ReportBugServiceDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportBugApi(configuration);

let reportBugServiceDTO: ReportBugServiceDTO; //

const { status, data } = await apiInstance.reportBugControllerReportBug(
    reportBugServiceDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportBugServiceDTO** | **ReportBugServiceDTO**|  | |


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
|**200** | Bug reported successfully. |  -  |
|**400** | Bad request. The input data is invalid or missing. |  -  |
|**500** | Internal server error. An unexpected error occurred while processing the request. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

