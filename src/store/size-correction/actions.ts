import { ISizeCorrectionState } from './reducer';

export enum ActionType {
  SIZE_CORRECTION_DEFAULT = '[Size Correction] Size Correction Default',
  TEMPORAL_SET_VALUE_TO_VALIDATE = '[Size Correction] temporal set a value to validate step into true',
  LOAD_SIZE_CORRECTION_PARAMETERS_FROM_TEMPORAL = '[Size Correction] Load Size Corrections Parameters From Temporal.',
}

// Action Creators Types
export type SizeCorrectionDefault = { type: typeof ActionType.SIZE_CORRECTION_DEFAULT };
export type LoadSizeCorrectionParametersFromTemporal = {
  type: typeof ActionType.LOAD_SIZE_CORRECTION_PARAMETERS_FROM_TEMPORAL;
  payload: ISizeCorrectionState;
};
export type TemporalSetValueToValidate = { type: typeof ActionType.TEMPORAL_SET_VALUE_TO_VALIDATE; payload: string };

// Actions
export function SizeCorrectionDefault(): SizeCorrectionDefault {
  return { type: ActionType.SIZE_CORRECTION_DEFAULT };
}
export function loadSizeCorrectionParametersFromTemporal(
  payload: ISizeCorrectionState,
): LoadSizeCorrectionParametersFromTemporal {
  return {
    type: ActionType.LOAD_SIZE_CORRECTION_PARAMETERS_FROM_TEMPORAL,
    payload,
  };
}
export function TemporalSetValueToValidate(payload: string): TemporalSetValueToValidate {
  return { type: ActionType.TEMPORAL_SET_VALUE_TO_VALIDATE, payload };
}

export function hasCompleted(state: ISizeCorrectionState): boolean {
  const { temporal } = state.data;
  return temporal !== '' ? true : false;
}

export type Actions = SizeCorrectionDefault | TemporalSetValueToValidate | LoadSizeCorrectionParametersFromTemporal;
