import { Dispatch, Action } from 'redux';

import Logger from '../../helpers/logger';

import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { IApiResponseError } from '../../types/api';
import { IOKCancelDialog, ISelectionDialog } from '../../types/dialog';

export enum ActionType {
  ERROR_SUCCESS = '[DIALOG]  Error success',
  CLEAR_ERROR_SUCCESS = '[Dialog]   Clear Error',
  INFORMATION_SUCCESS = '[DIALOG]  information success',
  CLEAR_INFORMATION_SUCCESS = '[Dialog]   Clear information',
  DIALOG_ILLUSTRATION_SUCCESS = '[Dialog]   get Illustration Dialog',
  SHOW_OK_CANCEL_DIALOG_SUCCESS = '[Dialog] SHOW_OK_CANCEL_DIALOG_SUCCESS',
  CLEAR_OK_CANCEL_DIALOG_SUCCESS = '[Dialog] CLEAR_OK_CANCEL_DIALOG_SUCCESS',
  SHOW_SELECTION_DIALOG_SUCCESS = '[Dialog] SHOW_SELECTION_DIALOG_SUCCESS',
  CLEAR_SELECTION_DIALOG_SUCCESS = '[Dialog] CLEAR_SELECTION_DIALOG_SUCCESS',
}

export type ErrorSuccess = { type: typeof ActionType.ERROR_SUCCESS; payload: IApiResponseError };
export type ClearErrorSuccess = { type: typeof ActionType.CLEAR_ERROR_SUCCESS };
export type InformationSuccess = { type: typeof ActionType.INFORMATION_SUCCESS; payload: string };
export type IllustrationSuccess = { type: typeof ActionType.DIALOG_ILLUSTRATION_SUCCESS; payload: string };
export type ClearInformationSuccess = { type: typeof ActionType.CLEAR_INFORMATION_SUCCESS };
export type ShowOkCancelDialogSuccess = {
  type: typeof ActionType.SHOW_OK_CANCEL_DIALOG_SUCCESS;
  payload: IOKCancelDialog;
};
export type ClearOkCancelDialogSuccess = { type: typeof ActionType.CLEAR_OK_CANCEL_DIALOG_SUCCESS };
export type ShowSelectionDialogSuccess = {
  type: typeof ActionType.SHOW_SELECTION_DIALOG_SUCCESS;
  payload: ISelectionDialog;
};
export type ClearSelectionDialogSuccess = { type: typeof ActionType.CLEAR_SELECTION_DIALOG_SUCCESS };

// actions
export function errorSuccess(payload: IApiResponseError): ErrorSuccess {
  return { type: ActionType.ERROR_SUCCESS, payload };
}
export function clearErrorSuccess(): ClearErrorSuccess {
  return { type: ActionType.CLEAR_ERROR_SUCCESS };
}
export function informationSuccess(payload: string): InformationSuccess {
  return { type: ActionType.INFORMATION_SUCCESS, payload };
}
export function illustrationSuccess(payload: string): IllustrationSuccess {
  return { type: ActionType.DIALOG_ILLUSTRATION_SUCCESS, payload };
}
export function clearInformationSuccess(): ClearInformationSuccess {
  return { type: ActionType.CLEAR_INFORMATION_SUCCESS };
}
export function showOkCancelDialogSuccess(payload: IOKCancelDialog): ShowOkCancelDialogSuccess {
  return { type: ActionType.SHOW_OK_CANCEL_DIALOG_SUCCESS, payload };
}
export function clearOkCancelDialogSuccess(): ClearOkCancelDialogSuccess {
  return { type: ActionType.CLEAR_OK_CANCEL_DIALOG_SUCCESS };
}
export function showSelectionDialogSuccess(payload: ISelectionDialog): ShowSelectionDialogSuccess {
  return { type: ActionType.SHOW_SELECTION_DIALOG_SUCCESS, payload };
}
export function clearSelectionDialogSuccess(): ClearSelectionDialogSuccess {
  return { type: ActionType.CLEAR_SELECTION_DIALOG_SUCCESS };
}

// action creators
export function clearError(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] dialog Clear Error');
  return (dispatch: Dispatch) => {
    dispatch(clearErrorSuccess());
  };
}

export function clearInformation(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] dialog Clear Information');
  return (dispatch: Dispatch) => {
    dispatch(clearInformationSuccess());
  };
}

export function showOkCancelDialog(dialog: IOKCancelDialog): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] show OkCancelDialog', dialog);
  return (dispatch: Dispatch) => {
    dispatch(showOkCancelDialogSuccess(dialog));
  };
}

export function clearOkCancelDialog(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] clear OkCancelDialog');
  return (dispatch: Dispatch) => {
    dispatch(clearOkCancelDialogSuccess());
  };
}

export function showSelectionDialog(dialog: ISelectionDialog): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] show SelectionDialog', dialog);
  return (dispatch: Dispatch) => {
    dispatch(showSelectionDialogSuccess(dialog));
  };
}

export function clearSelectionDialog(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] clear SelectionDialog');
  return (dispatch: Dispatch) => {
    dispatch(clearSelectionDialogSuccess());
  };
}

export type Actions =
  | ErrorSuccess
  | ClearErrorSuccess
  | ClearInformationSuccess
  | InformationSuccess
  | IllustrationSuccess
  | ShowOkCancelDialogSuccess
  | ClearOkCancelDialogSuccess
  | ShowSelectionDialogSuccess
  | ClearSelectionDialogSuccess;
