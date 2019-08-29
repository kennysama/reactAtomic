import { Actions, ActionType } from './actions';
import { IndexedObject } from '../../types';
import { IOrderConfirmation } from '../../types/order-confirmation';

import { initialState as designSelectionInitialState } from '../design-selection/reducer';
import { initialState as clothSelectionInitialState } from '../clothSelection/reducer';
import { initialState as homeInitialState } from '../home/reducer';
import { initialState as sizeCorrectionInitialState } from '../size-correction/reducer';

export interface IOrderConfirmationState {
  loading: boolean;
  isTemporal: IOrderConfirmation;
  orderConfirmationItems: IndexedObject<IOrderConfirmation>;
}

export const initialState: IOrderConfirmationState = {
  loading: false,
  isTemporal: {
    orderConfirmationItemId: 0,
    isTemporal: false,
    home: homeInitialState.home,
    clothSelection: clothSelectionInitialState.data,
    designSelection: designSelectionInitialState,
    sizeCorrection: sizeCorrectionInitialState,
  },
  orderConfirmationItems: {},
};

export function orderConfirmationReducer(
  state: IOrderConfirmationState = initialState,
  action: Actions,
): IOrderConfirmationState {
  switch (action.type) {
    case ActionType.CREATE_ITEM:
      return {
        ...state,
        orderConfirmationItems: {
          ...state.orderConfirmationItems,
          [action.id]: {
            ...action.payload,
            orderConfirmationItemId: action.id,
            home: { ...action.payload.home, orderConfirmationItemId: action.id },
          },
        },
      };

    case ActionType.SELECT_ITEM:
      return { ...state, isTemporal: state.orderConfirmationItems[action.id] };

    case ActionType.DELETE_ITEM:
      const orderConfirmationItems = { ...state.orderConfirmationItems };
      delete orderConfirmationItems[action.id];
      return { ...state, orderConfirmationItems };

    case ActionType.SAVE_TEMPORAL_ITEM:
      return {
        ...state,
        isTemporal: { ...action.payload, isTemporal: true },
      };

    case ActionType.CLEAR_TEMPORAL_ITEM:
      return {
        ...state,
        isTemporal: { ...initialState.isTemporal },
      };

    case ActionType.LOAD_TEMPORAL_ITEM_REQUEST:
      return { ...state, loading: true };

    case ActionType.LOAD_TEMPORAL_ITEM_SUCCESS:
      return { ...state, loading: false };
  }

  return state;
}
