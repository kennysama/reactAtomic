import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { IOrderDigestsState, orderDigestsReducer } from './reducer';

export * from './actions';

export interface ILookupFeature {
  order: IOrderDigestsState;
}

export const reducers = combineReducers({
  order: orderDigestsReducer,
});

const featureSelector = (state: AppState): ILookupFeature => state.ordersDigests;

const getOrdersDigestsState = createSelector(
  featureSelector,
  state => state.order,
);

export const getOrdersDigestsReport = createSelector(
  getOrdersDigestsState,
  state => state.data,
);
export const loading = createSelector(
  getOrdersDigestsState,
  state => state.loading,
);
