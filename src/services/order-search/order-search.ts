import config from '../../configuration/config';
import { fetcher, parseSearchParams } from '../../helpers/api';
import { IOrderDigestsSearchRes, IOrderDigestsSearchReq } from '../../types/order-search-api';
import MOCK_UP_JSON from '../../mockups/jsonServer/mockup.json';
import { toCamelCaseObject } from '../../helpers/convertions';

export const API_URL = `${config.api}/orders-digests`;
export const API_URL_MOCK = `${config.api}/order-digests`;

export function searchOrderDigests(params: IOrderDigestsSearchReq): Promise<IOrderDigestsSearchRes[]> {
  // TODO :filter params is working But waiting the API configuration
  // this gets the results of the params from API
  // fetches temperoral mock data response
  const urlTemperoralMockAnswer = `${API_URL_MOCK}?${parseSearchParams(params)}`;

  return config.isDev
    ? new Promise(resolve => {
        setTimeout(() => {
          resolve(fetcher(urlTemperoralMockAnswer, 'GET'));
        }, 1000);
      })
    : getSearchDigestsSuccessData();
}
async function getSearchDigestsSuccessData(): Promise<IOrderDigestsSearchRes[]> {
  const success = MOCK_UP_JSON['order-digests'];
  return toCamelCaseObject(success!) as IOrderDigestsSearchRes[];
}
