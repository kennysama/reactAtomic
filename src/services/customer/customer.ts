import {} from '../../types/customer';
import config from '../../configuration/config';
import { ILoadReq, ILoadRes } from '../../types/customer-api';
import { fetcher, parseSearchParams } from '../../helpers/api';

import MOCK_UP_JSON from '../../mockups/jsonServer/mockup.json';
import { toCamelCaseObject } from '../../helpers/convertions';

export const API_URL = `${config.api}/customer/`;

export function getCustomer(req: ILoadReq): Promise<ILoadRes> {
  return config.isDev ? fetcher(`${API_URL}?${parseSearchParams(req)}`, 'GET') : getLoginSuccessData();
}

async function getLoginSuccessData(): Promise<ILoadRes> {
  const success = MOCK_UP_JSON.customer;
  return toCamelCaseObject(success!) as ILoadRes;
}
