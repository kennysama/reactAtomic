import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { clothSelectionReducer, IClothSelectionState } from './reducer';
import { hasCompleted, getModelsLookup, getBrandsLookup, areDetailsDisabled } from './actions';

export * from './actions';

export interface ILookupFeature {
  clothSelection: IClothSelectionState;
}

export const reducers = combineReducers({
  clothSelection: clothSelectionReducer,
});

const featureSelector = (state: AppState): ILookupFeature => state.clothSelection;

const getClothSelectionState = createSelector(
  featureSelector,
  state => state.clothSelection,
);

export const getBrandLookup = createSelector(
  getClothSelectionState,
  state => getBrandsLookup(state),
);
export const getFabricDetails = createSelector(
  getClothSelectionState,
  state => state.data,
);
export const getModelLookup = createSelector(
  getClothSelectionState,
  state => getModelsLookup(state),
);
export const getData = createSelector(
  getClothSelectionState,
  state => state.data,
);

export const illsturationBtnVisible = createSelector(
  featureSelector,
  state => state.clothSelection.illustrationBtnvisible,
);
export const getCurrentClothSelection = createSelector(
  featureSelector,
  state => state.clothSelection.data,
);

export const getHasCompleted = createSelector(
  featureSelector,
  state => hasCompleted(state.clothSelection),
);

export const getDetailsDisabled = createSelector(
  featureSelector,
  state => areDetailsDisabled(state.clothSelection),
);
