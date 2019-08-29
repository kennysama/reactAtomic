import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import Logger from '../../helpers/logger';
import { AppState } from '../index';

import { PrivacyPolicySuccess } from '../navigation/actions';

export enum ActionType {
  PRIVACY_POLICY_DEFAULT = '[PrivacyPolicy] Privacy Policy Default',
  PRIVACY_POLICY_REJECTED = '[PrivacyPolicy] Privacy Policy Rejected',
  PRIVACY_POLICY_ACCEPTED = '[PrivacyPolicy] Privacy Policy Accepted',
  CONDITION_ONE_REJECTED = '[PrivacyPolicy] Condition One Rejected',
  CONDITION_ONE_ACCEPTED = '[PrivacyPolicy] Condition One Accepted',
  CONDITION_TWO_REJECTED = '[PrivacyPolicy] Condition Two Rejected',
  CONDITION_TWO_ACCEPTED = '[PrivacyPolicy] Condition Two Accepted',
}

// Action Creators Types
export type PrivacyPolicyDefault = { type: typeof ActionType.PRIVACY_POLICY_DEFAULT };
export type PrivacyPolicyRejected = { type: typeof ActionType.PRIVACY_POLICY_REJECTED };
export type PrivacyPolicyAccepted = { type: typeof ActionType.PRIVACY_POLICY_ACCEPTED };
export type ConditionOneRejected = { type: typeof ActionType.CONDITION_ONE_REJECTED };
export type ConditionOneAccepted = { type: typeof ActionType.CONDITION_ONE_ACCEPTED };
export type ConditionTwoRejected = { type: typeof ActionType.CONDITION_TWO_REJECTED };
export type ConditionTwoAccepted = { type: typeof ActionType.CONDITION_TWO_ACCEPTED };

// Actions auth
export function PrivacyPolicyRequest(): PrivacyPolicyDefault {
  return { type: ActionType.PRIVACY_POLICY_DEFAULT };
}
export function ConditionOneAccepted(): ConditionOneAccepted {
  return { type: ActionType.CONDITION_ONE_ACCEPTED };
}
export function ConditionTwoAccepted(): ConditionTwoAccepted {
  return { type: ActionType.CONDITION_TWO_ACCEPTED };
}
export function PrivacyPolicyRejected(): PrivacyPolicyRejected {
  return { type: ActionType.PRIVACY_POLICY_REJECTED };
}
export function PrivacyPolicyAccepted(): PrivacyPolicyAccepted {
  return { type: ActionType.PRIVACY_POLICY_ACCEPTED };
}
export function ConditionOneRejected(): ConditionOneRejected {
  return { type: ActionType.CONDITION_ONE_REJECTED };
}
export function ConditionTwoRejected(): ConditionTwoRejected {
  return { type: ActionType.CONDITION_TWO_REJECTED };
}

// Action Creators
export function conditionOneHandler(current: boolean): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] condition One Handler');
  return (dispatch: Dispatch) => {
    current ? dispatch(ConditionOneAccepted()) : dispatch(ConditionOneRejected());
  };
}
export function conditionTwoHandler(current: boolean): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] condition Two Handler');
  return (dispatch: Dispatch) => {
    current ? dispatch(ConditionTwoAccepted()) : dispatch(ConditionTwoRejected());
  };
}

export function acceptBtnHandler(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] Privacy Policy accepted');
  return (dispatch: Dispatch) => {
    dispatch(PrivacyPolicyAccepted());
    dispatch(PrivacyPolicySuccess());
  };
}

export type Actions =
  | PrivacyPolicyDefault
  | PrivacyPolicyRejected
  | PrivacyPolicyAccepted
  | ConditionOneRejected
  | ConditionOneAccepted
  | ConditionTwoRejected
  | ConditionTwoAccepted;
