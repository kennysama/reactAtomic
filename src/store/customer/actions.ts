import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// import history from '../../helpers/history';
import Logger from '../../helpers/logger';
import { AppState } from '../index';
import { ILoadReq } from '../../types/customer-api';
import { ICustomer } from '../../types/customer';
// FIXME: sample

import { ApiError } from '../../types/api';
import { getCustomer } from '../../services/customer/customer';
import { errorSuccess } from '../dialog/actions';

export enum ActionType {
  LOAD_CUSTOMER_REQUEST = '[Customer] Load Customer Request',
  LOAD_CUSTOMER_FAILURE = '[Customer] Load Customer Failure',
  LOAD_CUSTOMER_SUCCESS = '[Customer] Load Customer Success',
  LOGOUT = '[Customer] Logout',
  CLEAR_ERROR = '[Customer] Clear Error',
}

// Action Creators Types
export type LoadCustomerRequest = { type: typeof ActionType.LOAD_CUSTOMER_REQUEST };
export type LoadCustomerFailure = { type: typeof ActionType.LOAD_CUSTOMER_FAILURE; ex: ApiError };
export type LoadCustomerSuccess = { type: typeof ActionType.LOAD_CUSTOMER_SUCCESS; payload: ICustomer };
export type Logout = { type: typeof ActionType.LOGOUT };
export type ClearError = { type: typeof ActionType.CLEAR_ERROR };

// Actions auth
export function loadCustomerRequest(): LoadCustomerRequest {
  return { type: ActionType.LOAD_CUSTOMER_REQUEST };
}
export function loadCustomerSuccess(payload: ICustomer): LoadCustomerSuccess {
  return { type: ActionType.LOAD_CUSTOMER_SUCCESS, payload };
}
export function loadCustomerFailure(ex: ApiError): LoadCustomerFailure {
  return { type: ActionType.LOAD_CUSTOMER_FAILURE, ex };
}
export function logoutSuccess(): Logout {
  return { type: ActionType.LOGOUT };
}
export function clearErrorSuccess(): ClearError {
  return { type: ActionType.CLEAR_ERROR };
}

// Action Creators
export function loadCustomer(memberscardNumber: string, next: () => void): ThunkAction<void, AppState, null, Action> {
  const req: ILoadReq = {
    memberscardNumber,
  };

  Logger.log('[Store] Customer Load');
  return (dispatch: Dispatch) => {
    dispatch(loadCustomerRequest());
    return getCustomer(req)
      .then(data => {
        dispatch(loadCustomerSuccess(data));
        next();
      })
      .catch(err => {
        // TODO if error 400 when api working
        // dispatch(loadCustomerFailure(err));

        // dispatch uncontrolled error (generic error created in mainTemplateContainer.tsx)
        dispatch(errorSuccess(err));
      });
  };
}

export function logout(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] Customer logout');
  return (dispatch: Dispatch) => {
    dispatch(logoutSuccess());
  };
}

export function clearError(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] Customer Clear Error');
  return (dispatch: Dispatch) => {
    dispatch(clearErrorSuccess());
  };
}

export type Actions = ClearError | LoadCustomerRequest | LoadCustomerFailure | LoadCustomerSuccess | Logout;
