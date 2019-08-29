import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import { ILanguageState, languageReducer } from './reducer';

export * from './actions';

export interface ILookupFeature {
  language: ILanguageState;
}

export const reducers = combineReducers({
  language: languageReducer,
});

const featureSelector = (state: AppState): ILookupFeature => state.language;

const getLanguageState = createSelector(
  featureSelector,
  state => state.language,
);

export const getLanguage = createSelector(
  getLanguageState,
  state => state.language,
);

export const getLanguageResource = createSelector(
  getLanguageState,
  state => state.resource,
);
