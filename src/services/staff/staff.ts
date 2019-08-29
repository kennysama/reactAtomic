import config from '../../configuration/config';
import { fetcher } from '../../helpers/api';
import { ILoginReq, ILoginRes } from '../../types/login-api';
import MOCK_UP_JSON from '../../mockups/jsonServer/mockup.json';
import { toCamelCaseObject } from '../../helpers/convertions';

export const API_URL = `${config.api}/operator/login/`;
export const API_URL_MOCKERROR = `${config.api}/operator_error`;

export function login(params: ILoginReq): Promise<ILoginRes> {
  // change GET into POST when api is working
  return config.isDev ? fetcher(`${API_URL}`, 'GET', params) : getLoginSuccessData();
  // return fetcher(`" fsfs afs af a"`, 'GET', params);
  // return fetcher(`${API_URL}`, 'POST', params);
  // return fetcher(`${API_URL_MOCKERROR}`, 'GET', params);
}

async function getLoginSuccessData(): Promise<ILoginRes> {
  const success = MOCK_UP_JSON.operator.find(v => v.id === 'login');

  return toCamelCaseObject(success!) as ILoginRes;
}
