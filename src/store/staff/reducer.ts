import { Actions, ActionType } from './actions';
import { IErrorState, initialErrorState } from '../common/error';
import { IStaff } from '../../types/staff';
import { isLoggedIn, getLoggedInStaff } from '../../services/auth';
import { INITIAL_LOGGED_IN_STAFF } from '../../lookups/staff';

export interface IStaffState {
  loggedStaff: IStaff;
  loggedIn: boolean;
  loggingIn: boolean;
}

export const initialStaffState: IStaffState = {
  loggedStaff: getLoggedInStaff(),
  loggedIn: isLoggedIn(),
  loggingIn: false,
};

export function staffReducer(state: IStaffState = initialStaffState, action: Actions): IStaffState {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };

    case ActionType.LOGIN_FAILURE:
    case ActionType.LOGOUT:
      return {
        loggedStaff: INITIAL_LOGGED_IN_STAFF,
        loggedIn: false,
        loggingIn: false,
      };

    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedStaff: action.payload,
        loggedIn: true,
        loggingIn: false,
      };
  }

  return state;
}

export function staffErrorReducer(state: IErrorState = initialErrorState, action: Actions): IErrorState {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return { ...initialErrorState };
    case ActionType.LOGIN_FAILURE:
      return { ...state, errors: action.ex.errors, errorDialogOpen: true };
    case ActionType.CLEAR_ERROR:
      return { ...initialErrorState };
  }

  return state;
}
