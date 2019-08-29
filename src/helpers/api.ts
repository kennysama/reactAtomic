import { IApiResponseError, ApiError } from '../types/api';

import { getToken, deleteCookieStore, resetCookie } from '../services/auth';
import { IndexedObject } from '../types';
import { toSnakeCase, toSnakeCaseObject, toCamelCaseObject } from './convertions';

function parseResponse(response: Response): Promise<any> | undefined {
  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    deleteCookieStore();
  }
  // TODO error array in response 400
  //
  return new Promise((resolve, reject) => {
    response
      .json()
      .then((res: IApiResponseError) => {
        if (Array.isArray(res.errors)) {
          const msg = res.errors.map(e => e).join('\n');
          reject(new Error(msg));
        } else {
          reject(new Error(response.statusText));
        }
      })
      .catch(ex => reject(ex));
  });
}

export function fetcher<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params?: { [x: string]: any },
): Promise<T> {
  const token = getToken();
  if (token !== '') {
    // reset expired
    resetCookie();
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `${token}`,
    },
  };

  if (method === 'POST' || method === 'PUT') {
    // TODO Test post and put methods with snake case
    options.body = JSON.stringify(toSnakeCaseObject(params!));
  }

  return new Promise((resolve, reject) => {
    fetch(endpoint, options)
      .then(parseResponse)
      .then((res: any) => toCamelCaseObject(res))
      .then((res: any) => {
        // temporal untill we have an api to have error status 400.

        hasControlledErrors(res) ? reject(new ApiError(res.errors)) : resolve(res);
      })
      .catch((ex: Error) => {
        reject(new ApiError(ex.message));
      });
  });
}

function hasControlledErrors(res: any) {
  return res.hasOwnProperty('errors');
}

export function parseSearchParams(params: IndexedObject): string {
  const usp = new URLSearchParams();
  Object.keys(params).forEach(param => {
    const value = params[param];
    if (value !== null) {
      usp.append(toSnakeCase(param), value);
    }
  });
  return usp.toString();
}
