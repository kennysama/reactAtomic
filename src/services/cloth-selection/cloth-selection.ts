import config from '../../configuration/config';
import { fetcher, parseSearchParams } from '../../helpers/api';

import MOCK_UP_JSON from '../../mockups/jsonServer/mockup.json';
import { IBrand, IModelParam, IModel, IBrandParams } from '../../types/cloth-selection-api';
import { IProductsResponse } from '../../types/cloth-selection';
import { toCamelCaseObject } from '../../helpers/convertions';

export const API_URL_BRAND = `${config.api}/brands`;
export const API_URL_FABRIC_DETAILS = `${config.api}/fabric-details`;
export const API_URL__BRAND_MOCK = `${config.api}/brands`;
export const API_URL_MODEL = `${config.api}/models`;
export const API_URL__MODEL_MOCK = `${config.api}/models`;

export function searchClothSelectionBrand(params: IBrandParams): Promise<IBrand[]> {
  // TODO :filter params is working But waiting the API configuration
  console.log('these are the params sent to the API', params);
  // this gets the results of the params from API
  // fetches temperoral mock data response
  const urlTemperoralMockAnswer = `${API_URL__BRAND_MOCK}?${parseSearchParams(params)}`;
  return config.isDev ? fetcher(urlTemperoralMockAnswer, 'GET') : getClothSelectionSuccessBrandData();
}

export function searchClothSelectionModel(params: IModelParam): Promise<IModel[]> {
  // TODO :filter params is working But waiting the API configuration
  console.log('these are the params sent to the API', params);
  // this gets the results of the params from API
  // fetches temperoral mock data response
  const urlTemperoralMockAnswer = `${API_URL__MODEL_MOCK}?${parseSearchParams(params)}`;
  return config.isDev ? fetcher(urlTemperoralMockAnswer, 'GET') : getclothSelectionSuccessModelData();
}

export function searchProduct(seasonCode: string, fabricCode: string): Promise<IProductsResponse[]> {
  return getProductDetails();
}

async function getProductDetails(): Promise<IProductsResponse[]> {
  const success = MOCK_UP_JSON.products;
  return toCamelCaseObject(success!) as IProductsResponse[];
}
async function getClothSelectionSuccessBrandData(): Promise<IBrand[]> {
  const success = MOCK_UP_JSON.brands;
  return toCamelCaseObject(success!) as IBrand[];
}
async function getclothSelectionSuccessModelData(): Promise<IModel[]> {
  const success = MOCK_UP_JSON.models;
  return toCamelCaseObject(success!) as IModel[];
}
