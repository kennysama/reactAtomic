import { Actions, ActionType } from './actions';

export interface IPrivacyPolicyState {
  conditionOne: boolean;
  conditionTwo: boolean;
  privacyPolicyAccepted: boolean;
}

export const initialState: IPrivacyPolicyState = {
  conditionOne: false,
  conditionTwo: false,
  privacyPolicyAccepted: false,
};

export function privacyPolicyReducer(state: IPrivacyPolicyState = initialState, action: Actions): IPrivacyPolicyState {
  switch (action.type) {
    case ActionType.PRIVACY_POLICY_DEFAULT:
      return {
        ...state,
        conditionOne: false,
        conditionTwo: false,
        privacyPolicyAccepted: false,
      };

    case ActionType.CONDITION_ONE_REJECTED:
      return {
        ...state,
        conditionOne: false,
        privacyPolicyAccepted: false,
      };
    case ActionType.CONDITION_ONE_ACCEPTED:
      return {
        ...state,
        conditionOne: true,
      };
    case ActionType.CONDITION_TWO_REJECTED:
      return {
        ...state,
        conditionTwo: false,
        privacyPolicyAccepted: false,
      };
    case ActionType.CONDITION_TWO_ACCEPTED:
      return {
        ...state,
        conditionTwo: true,
      };
    case ActionType.PRIVACY_POLICY_REJECTED:
      return {
        ...state,
        privacyPolicyAccepted: false,
      };
    case ActionType.PRIVACY_POLICY_ACCEPTED:
      return {
        ...state,
        privacyPolicyAccepted: true,
      };
  }

  return state;
}
