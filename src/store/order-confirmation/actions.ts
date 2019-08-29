import { IHomeParams } from '../../types/home';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { Action, Dispatch } from 'redux';
import Logger from '../../helpers/logger';

import { HomeDefault, loadHomeParametersFromTemporal } from '../home';
import {
  clothSelectionDefault,
  loadClothSelectionParametersFromTemporal,
  hasCompleted as hasCompletedCloth,
} from '../clothSelection/actions';

import {
  DesignSelectionDefault,
  loadDesignSelectionParametersFromTemporal,
  hasCompleted as hasCompletedDesign,
} from '../design-selection/actions';
import { IOrderConfirmation } from '../../types/order-confirmation';
import { IndexedObject } from '../../types';
import {
  hasCompleted as hasCompletedSize,
  SizeCorrectionDefault,
  loadSizeCorrectionParametersFromTemporal,
} from '../size-correction/actions';
import { IOrderConfirmationState } from './reducer';

export enum ActionType {
  START_CURRENT = '[OrderConfirmation]  OrderConfirmation Start Current',
  CREATE_ITEM = '[OrderConfirmation]  OrderConfirmation Create Item',
  SELECT_ITEM = '[OrderConfirmation]   OrderConfirmation Select',
  DELETE_ITEM = '[OrderConfirmation]  OrderConfirmation Delete Item',
  SAVE_TEMPORAL_ITEM = '[OrderConfirmation]  OrderConfirmation Save Temporal Item',
  CLEAR_TEMPORAL_ITEM = '[OrderConfirmation]  OrderConfirmation Clear Temporal Item',
  CONFIRM_ORDER = '[OrderConfirmation]  Confirm Order',
  LOAD_TEMPORAL_ITEM_REQUEST = '[OrderConfirmation]   Load Temporal Item Request',
  LOAD_TEMPORAL_ITEM_SUCCESS = '[OrderConfirmation]   Load Temporal Item Success',
}

// generic
export type StartCurrent = { type: typeof ActionType.START_CURRENT; payload: IHomeParams };

export type CreateItem = { type: typeof ActionType.CREATE_ITEM; id: number; payload: IOrderConfirmation };
export type SelectItem = { type: typeof ActionType.SELECT_ITEM; id: number };
export type DeleteItem = { type: typeof ActionType.DELETE_ITEM; id: number };

export type SaveTemporalItem = { type: typeof ActionType.SAVE_TEMPORAL_ITEM; payload: IOrderConfirmation };
export type ClearTemporalItem = { type: typeof ActionType.CLEAR_TEMPORAL_ITEM };
export type LoadTemporalItemRequest = { type: typeof ActionType.LOAD_TEMPORAL_ITEM_REQUEST };
export type LoadTemporalItemSuccess = { type: typeof ActionType.LOAD_TEMPORAL_ITEM_SUCCESS };

// actions

export function startCurrent(payload: IHomeParams): StartCurrent {
  return { type: ActionType.START_CURRENT, payload };
}

export function createItem(id: number, payload: IOrderConfirmation): CreateItem {
  return { type: ActionType.CREATE_ITEM, id, payload };
}
export function selectItem(id: number): SelectItem {
  return { type: ActionType.SELECT_ITEM, id };
}
export function deleteItem(id: number): DeleteItem {
  return { type: ActionType.DELETE_ITEM, id };
}

export function saveTemporalItem(payload: IOrderConfirmation): SaveTemporalItem {
  return { type: ActionType.SAVE_TEMPORAL_ITEM, payload };
}
export function clearTemporalItem(): ClearTemporalItem {
  return { type: ActionType.CLEAR_TEMPORAL_ITEM };
}

export function loadTemporalItemRequest(): LoadTemporalItemRequest {
  return { type: ActionType.LOAD_TEMPORAL_ITEM_REQUEST };
}
export function loadTemporalItemSuccess(): LoadTemporalItemSuccess {
  return { type: ActionType.LOAD_TEMPORAL_ITEM_SUCCESS };
}

// action creators

export function createNewItem(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] OrderConfirmation Create');
  return (dispatch: Dispatch, currentState: () => AppState) => {
    const state = currentState();
    const { home } = state.home;
    const { orderConfirmationItems } = state.orderConfirmation.orderConfirmation;

    if (home.home.orderConfirmationItemId === 0) {
      // when enter from home gallery button.
      home.home.orderConfirmationItemId = getNewObjectId(orderConfirmationItems);
    }

    const currentOrderConfirmationItem = getCurrentOrderConfirmation(state);

    if (hasCompleted(state)) {
      dispatch(createItem(currentOrderConfirmationItem.orderConfirmationItemId, currentOrderConfirmationItem));
    } else {
      currentOrderConfirmationItem.orderConfirmationItemId = 0;
      currentOrderConfirmationItem.home.orderConfirmationItemId = 0;
      dispatch(saveTemporalItem(currentOrderConfirmationItem));
    }

    clearSteps(dispatch);
  };
}

function getCurrentOrderConfirmation(state: AppState): IOrderConfirmation {
  const { home } = state.home.home;
  const { clothSelection } = state.clothSelection;
  const { page } = state.designSelection;
  const { sizeCorrection } = state.sizeCorrection;

  return {
    orderConfirmationItemId: home.orderConfirmationItemId,
    isTemporal: false,
    home: { ...home },
    clothSelection: clothSelection.data,
    designSelection: page,
    sizeCorrection,
  };
}

export function hasCompleted(state: AppState) {
  const isCompleteCloth = hasCompletedCloth(state.clothSelection.clothSelection);
  const isCompleteDesign = hasCompletedDesign(state.designSelection.page);
  const isCompleteSize = hasCompletedSize(state.sizeCorrection.sizeCorrection);
  return isCompleteCloth && isCompleteDesign && isCompleteSize ? true : false;
}

export function hasSavedOrders(state: IOrderConfirmationState) {
  const { orderConfirmationItems } = state;
  return Object.keys(orderConfirmationItems).length > 0 ? true : false;
}

export function clearItemSteps(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store]  OrderConfirmation clear Steps');
  return (dispatch: Dispatch) => {
    dispatch(clearTemporalItem());

    clearSteps(dispatch);
  };
}

function clearSteps(dispatch: Dispatch) {
  dispatch(HomeDefault());
  dispatch(clothSelectionDefault());
  dispatch(DesignSelectionDefault());
  dispatch(SizeCorrectionDefault());
}

export function editOrderConfirmationItem(hasId: number = 0): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store]  load temporary orderConfirmation item');
  return (dispatch: Dispatch, currentState: () => AppState) => {
    if (hasId !== 0) {
      dispatch(selectItem(hasId));
    }

    dispatch(loadTemporalItemRequest());

    const { isTemporal } = currentState().orderConfirmation.orderConfirmation;
    dispatch(loadHomeParametersFromTemporal(isTemporal.home));
    dispatch(loadClothSelectionParametersFromTemporal(isTemporal.clothSelection));
    dispatch(loadDesignSelectionParametersFromTemporal(isTemporal.designSelection));
    dispatch(loadSizeCorrectionParametersFromTemporal(isTemporal.sizeCorrection));
    dispatch(loadTemporalItemSuccess());
  };
}

function getNewObjectId(orderConfirmationItems: IndexedObject<IOrderConfirmation>): number {
  const sortedKeys = Object.keys(orderConfirmationItems)
    .sort()
    .map(x => Number(x));
  return sortedKeys.length ? orderConfirmationItems[Math.max(...sortedKeys)].orderConfirmationItemId + 1 : 1;
}

export function copyOrderConfirmationItem(item: IOrderConfirmation): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] orderConfirmation copy orderConfirmation item');
  return (dispatch: Dispatch, currentState: () => AppState) => {
    const newOrderConfirmationItem = { ...item };
    const { orderConfirmationItems } = currentState().orderConfirmation.orderConfirmation;
    const newItemId = getNewObjectId(orderConfirmationItems);
    dispatch(createItem(newItemId, newOrderConfirmationItem));
  };
}

export function deleteOrderConfirmationItem(
  orderConfirmationItemId: number,
): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] orderConfirmation delete orderConfirmation item');
  return (dispatch: Dispatch, currentState: () => AppState) => {
    dispatch(deleteItem(orderConfirmationItemId));
  };
}

export function loadOrderItems(state: IOrderConfirmationState) {
  return Object.keys(state.orderConfirmationItems).map(id => state.orderConfirmationItems[id]);
}

export type Actions =
  | StartCurrent
  | SaveTemporalItem
  | ClearTemporalItem
  | SelectItem
  | CreateItem
  | DeleteItem
  | LoadTemporalItemRequest
  | LoadTemporalItemSuccess;
