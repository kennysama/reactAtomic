import { combineReducers } from 'redux';

import { homeReducer, IHomeState } from './reducer';
import { createSelector } from 'reselect';
import { AppState } from '..';

export * from './actions';

export interface IHomeFeature {
  home: IHomeState;
}

export const reducers = combineReducers({
  home: homeReducer,
});
const featureSelector = (state: AppState): IHomeFeature => state.home;

const getHomeSelectionState = createSelector(
  featureSelector,
  state => state.home,
);

export const getCategory = createSelector(
  getHomeSelectionState,
  state => state.home.category,
);

export const getItemCode = createSelector(
  getHomeSelectionState,
  state => state.home.itemCode,
);

export const getPieces = createSelector(
  getHomeSelectionState,
  state => state.home.pieces,
);

export const getSubCategory = createSelector(
  getHomeSelectionState,
  state => state.home.subCategory,
);
