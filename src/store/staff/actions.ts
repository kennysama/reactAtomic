import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as staffLogin from '../../services/staff/staff';

import Logger from '../../helpers/logger';
import { AppState } from '../index';
import { ILoginReq } from '../../types/login-api';
import { navigateAfterLogIn } from '../navigation';
import { setToken, deleteCookieStore, setLoggedInStaff } from '../../services/auth';
import { ApiError } from '../../types/api';
import { IStaff } from '../../types/staff';
import { IStaffState } from './reducer';

export enum ActionType {
  LOGIN_REQUEST = '[Staff] Login Request',
  LOGIN_FAILURE = '[Staff] Login Failure',
  LOGIN_SUCCESS = '[Staff] Login Success',
  LOGOUT = '[Staff] Logout',
  CLEAR_ERROR = '[Staff] Clear Error',
}

// Action Creators Types
export type LoginRequest = { type: typeof ActionType.LOGIN_REQUEST };
export type LoginFailure = { type: typeof ActionType.LOGIN_FAILURE; ex: ApiError };
export type LoginSuccess = { type: typeof ActionType.LOGIN_SUCCESS; payload: IStaff };
export type Logout = { type: typeof ActionType.LOGOUT };
export type ClearError = { type: typeof ActionType.CLEAR_ERROR };

// Actions auth
export function loginRequest(): LoginRequest {
  return { type: ActionType.LOGIN_REQUEST };
}
export function loginSuccess(payload: IStaff): LoginSuccess {
  return { type: ActionType.LOGIN_SUCCESS, payload };
}
export function loginFailure(ex: ApiError): LoginFailure {
  return { type: ActionType.LOGIN_FAILURE, ex };
}
export function logoutSuccess(): Logout {
  return { type: ActionType.LOGOUT };
}
export function clearErrorSuccess(): ClearError {
  return { type: ActionType.CLEAR_ERROR };
}

// Action Creators
export function login(req: ILoginReq): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] staff login');
  return (dispatch: Dispatch) => {
    dispatch(loginRequest());
    return staffLogin
      .login(req)
      .then(data => {
        setToken(data.certificationToken);
        const staff: IStaff = {
          tempoCode: req.tempoCode,
          staffCode: req.staffCode,
          managerFlag: data.managerFlag,
        };
        setLoggedInStaff(staff);
        dispatch(loginSuccess(staff));
        navigateAfterLogIn(dispatch);
      })
      .catch(err => {
        Logger.log('[Store] staff failure');
        dispatch(loginFailure(err));
      });
  };
}

export function logout(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] staff logout');
  return (dispatch: Dispatch) => {
    deleteCookieStore();
    dispatch(logoutSuccess());
  };
}

export function clearError(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] staff Clear Error');
  return (dispatch: Dispatch) => {
    dispatch(clearErrorSuccess());
  };
}

export function isManager(state: IStaffState): boolean {
  const { managerFlag } = state.loggedStaff;
  return managerFlag === 1 ? true : false;
}

export type Actions = ClearError | LoginRequest | LoginFailure | LoginSuccess | Logout;
