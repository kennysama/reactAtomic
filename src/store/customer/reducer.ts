import { ICustomer } from '../../types/customer';
import { Actions, ActionType } from './actions';
import { IErrorState, initialErrorState } from '../common/error';

export interface ICustomerState {
  data: ICustomer | {};
  isLoad: boolean;
  loading: boolean;
}

export const initialCustomerState: ICustomerState = {
  data: {},
  isLoad: false,
  loading: false,
};

export function clientReducer(state: ICustomerState = initialCustomerState, action: Actions): ICustomerState {
  switch (action.type) {
    case ActionType.LOAD_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionType.LOAD_CUSTOMER_FAILURE:
    case ActionType.LOGOUT:
      return {
        data: {},
        isLoad: false,
        loading: false,
      };

    case ActionType.LOAD_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoad: true,
        loading: false,
      };
  }

  return state;
}

export function staffErrorReducer(state: IErrorState = initialErrorState, action: Actions): IErrorState {
  switch (action.type) {
    case ActionType.LOAD_CUSTOMER_SUCCESS:
      return {
        ...state,
        errors: [],
      };
    case ActionType.LOAD_CUSTOMER_FAILURE:
      return { ...state, errors: action.ex.errors, errorDialogOpen: true };

    case ActionType.CLEAR_ERROR:
      return { ...state, errors: [] };
  }

  return state;
}
