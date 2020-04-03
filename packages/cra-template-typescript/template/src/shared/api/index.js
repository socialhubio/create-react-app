import { api as apiFactory, api2 as api2Factory } from 'bananasplit/services/api';

import apiRequestParams from 'bananasplit/services/api/api-request-params';

export const api = apiFactory(apiRequestParams);
export const api2 = api2Factory(apiRequestParams);
