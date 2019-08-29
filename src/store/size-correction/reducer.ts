import { Actions, ActionType } from './actions';

export interface ISizeCorrectionState {
  loading: false;
  data: { temporal: string };
}

export const initialState: ISizeCorrectionState = {
  loading: false,
  data: { temporal: '' },
};

export function sizeCorrectionReducer(
  state: ISizeCorrectionState = initialState,
  action: Actions,
): ISizeCorrectionState {
  switch (action.type) {
    case ActionType.SIZE_CORRECTION_DEFAULT:
      return { ...initialState };
    case ActionType.LOAD_SIZE_CORRECTION_PARAMETERS_FROM_TEMPORAL:
      return { ...action.payload };
    case ActionType.TEMPORAL_SET_VALUE_TO_VALIDATE:
      return { ...state, data: { temporal: action.payload } };
  }

  return state;
}
