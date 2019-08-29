import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { ICustomerState, staffErrorReducer, clientReducer } from './reducer';

import { AppState } from '../index';
import { IErrorState } from '../common/error';

export * from './actions';

export interface ICustomerFeature {
  customer: ICustomerState;
  error: IErrorState;
}

export const reducers = combineReducers({
  customer: clientReducer,
  error: staffErrorReducer,
});

const customerFeatureSelector = (state: AppState): ICustomerFeature => state.customerFeature;

const getCustomerState = createSelector(
  customerFeatureSelector,
  state => state.customer,
);

export const getCustomer = createSelector(
  getCustomerState,
  state => state.data,
);

export const getLoaded = createSelector(
  getCustomerState,
  state => state.isLoad,
);

export const getLoading = createSelector(
  getCustomerState,
  state => state.loading,
);

export const getApiErrors = createSelector(
  customerFeatureSelector,
  state => state.error.errors,
);

export const getLoadingError = createSelector(
  customerFeatureSelector,
  state => state.error.errors.length > 0,
);

export const getLoadingErrorMessage = () => {
  // FIXME: Replace with the message obtained from i18n => store
  const lang = 'en';
  const message =
    lang !== 'en'
      ? 'お客様情報がありません。会員番号を入力してください。'
      : 'Not found customer data. Please input correct customerNo.';

  return message;
};
