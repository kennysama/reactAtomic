import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { sizeCorrectionReducer, ISizeCorrectionState } from './reducer';

import { AppState } from '../index';
import { hasCompleted } from './actions';

export * from './actions';

export interface ISizeCorrectionFeature {
  sizeCorrection: ISizeCorrectionState;
}

export const reducers = combineReducers({
  sizeCorrection: sizeCorrectionReducer,
});

const sizeCorrectionSelector = (state: AppState): ISizeCorrectionFeature => state.sizeCorrection;

const getSizeCorrection = createSelector(
  sizeCorrectionSelector,
  state => state.sizeCorrection,
);

export const getLoading = createSelector(
  getSizeCorrection,
  state => state.loading,
);

export const getHasCompleted = createSelector(
  getSizeCorrection,
  state => hasCompleted(state),
);
