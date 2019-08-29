import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { Action, Dispatch } from 'redux';
import Logger from '../../helpers/logger';
import { getSubCategoryPieces, getOrderItem } from '../../helpers/order-items';
import { errorSuccess } from '../dialog/actions';
import { ApiError } from '../../types/api';
import { IHomeParams, IHomeSelectedItem } from '../../types/home';
import { startCurrent } from '../order-confirmation/actions';
import { getClientMessage } from '../../helpers/message';

export enum ActionType {
  HOME_DEFAULT = '[Home]  Home Default',
  LOAD_HOME_PARAMETERS_SUCCESS = '[Home]  Home select item success',
  LOAD_HOME_PARAMETERS_FROM_TEMPORAL = '[Home]  Load home parameters from temporal',
}

export type HomeDefault = {
  type: typeof ActionType.HOME_DEFAULT;
};

export type LoadHomeParametersSuccess = {
  type: typeof ActionType.LOAD_HOME_PARAMETERS_SUCCESS;
  payload: IHomeParams;
};
export type LoadHomeParametersFromTemporal = {
  type: typeof ActionType.LOAD_HOME_PARAMETERS_FROM_TEMPORAL;
  payload: IHomeParams;
};
// actions
export function HomeDefault(): HomeDefault {
  return { type: ActionType.HOME_DEFAULT };
}
export function LoadHomeParametersSuccess(payload: IHomeParams): LoadHomeParametersSuccess {
  return { type: ActionType.LOAD_HOME_PARAMETERS_SUCCESS, payload };
}
export function loadHomeParametersFromTemporal(payload: IHomeParams): LoadHomeParametersFromTemporal {
  return { type: ActionType.LOAD_HOME_PARAMETERS_FROM_TEMPORAL, payload };
}

// Action Creators

export function loadHomeParameters(payload: IHomeSelectedItem): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] loadHomeParameters');
  return (dispatch: Dispatch, currentState: () => AppState) => {
    const pieces = getSubCategoryPieces(payload.subCategory);
    const itemCode = getOrderItem(payload.category, pieces);

    if (itemCode) {
      const orderConfirmationItemId = currentState().home.home.home.orderConfirmationItemId;
      const convertedPayload = {
        orderConfirmationItemId,
        category: payload.category,
        itemCode,
        pieces,
        subCategory: payload.subCategory,
      };
      dispatch(LoadHomeParametersSuccess(convertedPayload));
      dispatch(startCurrent(convertedPayload));
    } else {
      Logger.log('[Store] load home parameters failure');
      const message = getClientMessage('err', '0001', [payload.category, payload.subCategory, `${pieces.join(',')}`]);
      dispatch(errorSuccess(new ApiError([message])));
    }
  };
}

export type Actions = HomeDefault | LoadHomeParametersSuccess | LoadHomeParametersFromTemporal;
