import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { orderConfirmationReducer, IOrderConfirmationState } from './reducer';
import { hasCompleted, hasSavedOrders, loadOrderItems } from './actions';

export * from './actions';

export interface IOrderFeature {
  orderConfirmation: IOrderConfirmationState;
}

export const reducers = combineReducers({
  orderConfirmation: orderConfirmationReducer,
});

const featureSelector = (state: AppState): IOrderFeature => state.orderConfirmation;

const getItemsState = createSelector(
  featureSelector,
  state => state,
);

export const getOrderItems = createSelector(
  getItemsState,
  state => loadOrderItems(state.orderConfirmation),
);

export const hasTemporalOrderItem = createSelector(
  getItemsState,
  state => state.orderConfirmation.isTemporal.isTemporal,
);

export const getHasSavedOrders = createSelector(
  getItemsState,
  state => hasSavedOrders(state.orderConfirmation),
);

const globalStateSelector = (state: AppState): AppState => state;
const getGlobalStateSelector = createSelector(
  globalStateSelector,
  state => state,
);
export const getHasCompletedFullOrder = createSelector(
  getGlobalStateSelector,
  state => hasCompleted(state),
);
