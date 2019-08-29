import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { IStaffState, staffErrorReducer, staffReducer } from './reducer';

import { AppState } from '../index';
import { IErrorState } from '../common/error';
import { isManager } from './actions';

export * from './actions';

export interface IStaffFeature {
  staff: IStaffState;
  error: IErrorState;
}

export const reducers = combineReducers({
  staff: staffReducer,
  error: staffErrorReducer,
});

const staffFeatureSelector = (state: AppState): IStaffFeature => state.staffFeature;

const getStaffState = createSelector(
  staffFeatureSelector,
  state => state.staff,
);

export const getStaff = createSelector(
  getStaffState,
  state => state.loggedStaff,
);

export const loggedIn = createSelector(
  getStaffState,
  state => state.loggedIn,
);

export const loggingIn = createSelector(
  getStaffState,
  state => state.loggingIn,
);

export const getIsManager = createSelector(
  getStaffState,
  state => isManager(state),
);

export const getApiErrors = createSelector(
  staffFeatureSelector,
  state => state.error.errors,
);

export const getErrorDialogOpen = createSelector(
  staffFeatureSelector,
  state => state.error.errorDialogOpen,
);
