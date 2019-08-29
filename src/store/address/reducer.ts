import { Actions, ActionType } from './actions';
import { IOrderAddress } from '../../types/order';

export interface IAddressState {
  ordersIdList: IOrderAddress[];
}

export const initialState: IAddressState = {
  ordersIdList: [],
};

export function addressReducer(state: IAddressState = initialState, action: Actions): IAddressState {
  switch (action.type) {
    case ActionType.CHANGE_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        ordersIdList: action.payload,
      };
  }
  return state;
}
