import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';
import { IDesignSelectionState, designSelectionReducer } from './reducer';
import { getItemCode, hasCompleted } from './actions';
export * from './actions';

export interface IDesignSelectionPage {
  page: IDesignSelectionState;
}

export const reducers = combineReducers({
  page: designSelectionReducer,
});

const featureSelector = (state: AppState): IDesignSelectionPage => state.designSelection;

export const getDesignSelectionPageState = createSelector(
  featureSelector,
  state => state.page,
);

export const getDesignSelection = createSelector(
  getDesignSelectionPageState,
  state => state.designSelection,
);

export const getLoading = createSelector(
  getDesignSelectionPageState,
  state => state.loading,
);

export const getHasCompleted = createSelector(
  getDesignSelectionPageState,
  state => hasCompleted(state),
);

export const getRequestParameter = createSelector(
  getDesignSelectionPageState,
  state => state.currentRequestParam,
);

export const getCurrentItemCode = createSelector(
  getDesignSelectionPageState,
  state => getItemCode(state),
);
