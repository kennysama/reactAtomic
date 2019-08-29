import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { INavigationState, navigationReducer } from './reducer';

export * from './actions';

export interface INavigationFeature {
  navigation: INavigationState;
}

export const reducers = combineReducers({
  navigation: navigationReducer,
});

const featureSelector = (state: AppState): INavigationFeature => state.navigation;

const getNavigationState = createSelector(
  featureSelector,
  state => state,
);

// header getters
export const getCurrentPage = createSelector(
  getNavigationState,
  state => state.navigation.header.currentPage,
);

export const getSidebar = createSelector(
  getNavigationState,
  state => state.navigation.sidebar,
);

export const getFooterButtons = createSelector(
  getNavigationState,
  state => state.navigation.footer,
);
