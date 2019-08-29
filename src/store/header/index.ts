import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { headerReducer, IHeaderState } from './reducer';

export * from './actions';

export interface IHeaderFeature {
  header: IHeaderState;
}

export const reducers = combineReducers({
  header: headerReducer,
});

const featureSelector = (state: AppState): IHeaderFeature => state.header;

const getHeaderState = createSelector(
  featureSelector,
  state => state,
);

export const getHeaderTextKey = createSelector(
  getHeaderState,
  state => state.header.textKey,
);
