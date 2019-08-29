import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { addressReducer, IAddressState } from './reducer';

export * from './actions';

export interface IOrderFeature {
  address: IAddressState;
}
export const reducers = combineReducers({
  address: addressReducer,
});

const featureSelector = (state: AppState): IOrderFeature => state.address;

const getItemsState = createSelector(
  featureSelector,
  state => state.address,
);

export const getOrdersList = createSelector(
  getItemsState,
  state => state.ordersIdList,
);
