import { IOrderDestination, IOrderDelivery, IOrderAddress } from '../../types/order';
import { ThunkAction } from 'redux-thunk';
import Logger from '../../helpers/logger';
import { AppState } from '..';
import { Action, Dispatch } from 'redux';
import { IOrderConfirmation } from '../../types/order-confirmation';
import { IApiError } from '../../types/api';
import { updateAddressDelivery, updateAddressDestination } from '../../helpers/address';
import { ORDER_DELIVERY_INITIAL_STATE, ORDER_DESTINATION_INITIAL_STATE } from '../../lookups/address';

export enum ActionType {
  CHANGE_ADDRESS_LIST_SUCCESS = '[ADDRESS] CHANGE_ADDRESS_LIST_SUCCESS',
  CHANGE_ADDRESS_LIST_FAILURE = '[ADDRESS] CHANGE_ADDRESS_LIST_FAILURE',
}

// Action type
export type ChangeAddressListSuccess = {
  type: typeof ActionType.CHANGE_ADDRESS_LIST_SUCCESS;
  payload: IOrderAddress[];
};
export type ChangeAddressListFailure = { type: typeof ActionType.CHANGE_ADDRESS_LIST_FAILURE; ex: IApiError };

// actions
export function changeAddressListSuccess(payload: IOrderAddress[]): ChangeAddressListSuccess {
  return { type: ActionType.CHANGE_ADDRESS_LIST_SUCCESS, payload };
}
export function changeAddressListFailure(ex: IApiError): ChangeAddressListFailure {
  return { type: ActionType.CHANGE_ADDRESS_LIST_FAILURE, ex };
}

export function loadAddressList(orders: IOrderConfirmation[]): ThunkAction<void, AppState, null, Action> {
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    try {
      const currentState = getCurrentState();
      const { ordersIdList: addressList } = currentState.address.address;

      // FIXME: when changed orders
      if (addressList.length === orders.length) {
        dispatch(changeAddressListSuccess(addressList));
        return;
      }

      const newAddressList = orders.map(order => {
        const address: IOrderAddress = {
          id: order.orderConfirmationItemId,
          orderDestination: {
            ...ORDER_DESTINATION_INITIAL_STATE,
          },
          orderDelivery: {
            ...ORDER_DELIVERY_INITIAL_STATE,
          },
        };
        return address;
      });

      dispatch(changeAddressListSuccess(newAddressList));
    } catch (error) {
      // FIXME: errorhandling
      Logger.error(error);
      dispatch(changeAddressListFailure(error));
    }
  };
}

export function setOrderDestination(
  destination: IOrderDestination,
  itemId: number,
): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] set order destination');
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    try {
      const currentState = getCurrentState();
      const { ordersIdList: addressList } = currentState.address.address;
      const updatedAddressList = updateAddressDestination(addressList, destination, itemId);
      dispatch(changeAddressListSuccess(updatedAddressList));
    } catch (error) {
      // FIXME: errorhandling
      Logger.error(error);
      dispatch(changeAddressListFailure(error));
    }
  };
}

export function setOrderDelivery(delivery: IOrderDelivery, itemId: number): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] set order delivery');
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    try {
      const currentState = getCurrentState();
      const { ordersIdList: addressList } = currentState.address.address;
      const updatedAddressList = updateAddressDelivery(addressList, delivery, itemId);
      dispatch(changeAddressListSuccess(updatedAddressList));
    } catch (error) {
      // FIXME: errorhandling
      Logger.error(error);
      dispatch(changeAddressListFailure(error));
    }
  };
}

export type Actions = ChangeAddressListSuccess | ChangeAddressListFailure;
