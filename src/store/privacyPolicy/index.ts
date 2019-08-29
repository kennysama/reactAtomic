import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { IPrivacyPolicyState, privacyPolicyReducer } from './reducer';

import { AppState } from '../index';

export * from './actions';

export interface IPrivacyPolicyFeature {
  privacyPolicy: IPrivacyPolicyState;
}

export const reducers = combineReducers({
  privacyPolicy: privacyPolicyReducer,
});

const privacyPolicySelector = (state: AppState): IPrivacyPolicyFeature => state.privacyPolicy;

const getPrivacyPolicyState = createSelector(
  privacyPolicySelector,
  state => state.privacyPolicy,
);

export const getConditionOne = createSelector(
  getPrivacyPolicyState,
  state => state.conditionOne,
);
export const getConditionTwo = createSelector(
  getPrivacyPolicyState,
  state => state.conditionTwo,
);
export const getPrivacyPolicyAccepted = createSelector(
  getPrivacyPolicyState,
  state => state.privacyPolicyAccepted,
);
