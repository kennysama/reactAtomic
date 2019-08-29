import { Actions, ActionType } from './actions';
import { IErrorState, initialErrorState } from '../common/error';
import { IInformationState, initialInformationState } from '../common/information';
import { IOKCancelDialog, ISelectionDialog } from '../../types/dialog';
import {
  INITIAL_OK_CANCEL_DIALOG_STATE as initialOkCancelDialogState,
  INITIAL_SELECTION_DIALOG_STATE as initialSelectionDialogState,
} from '../../lookups/dialog';

export function dialogErrorReducer(state: IErrorState = initialErrorState, action: Actions): IErrorState {
  switch (action.type) {
    case ActionType.ERROR_SUCCESS:
      return { ...state, errors: action.payload.errors, errorDialogOpen: true };
    case ActionType.CLEAR_ERROR_SUCCESS:
      return { ...initialErrorState };
  }

  return state;
}

export function dialogInformationReducer(
  state: IInformationState = initialInformationState,
  action: Actions,
): IInformationState {
  switch (action.type) {
    case ActionType.INFORMATION_SUCCESS:
      return { ...state, information: action.payload, informationDialogOpen: true };
    case ActionType.DIALOG_ILLUSTRATION_SUCCESS:
      return { ...state, image: action.payload, informationDialogOpen: true };
    case ActionType.CLEAR_INFORMATION_SUCCESS:
      return { ...initialInformationState };
  }

  return state;
}

export type IOkCancelDialogState = IOKCancelDialog;

export function okCancelDialogReducer(
  state: IOkCancelDialogState = initialOkCancelDialogState,
  action: Actions,
): IOkCancelDialogState {
  switch (action.type) {
    case ActionType.SHOW_OK_CANCEL_DIALOG_SUCCESS:
      return { ...action.payload, hasOpen: true };

    case ActionType.CLEAR_OK_CANCEL_DIALOG_SUCCESS:
      return { ...initialOkCancelDialogState, hasOpen: false };
  }

  return state;
}

export type ISelectionDialogState = ISelectionDialog;

export function selectionDialogReducer(
  state: ISelectionDialogState = initialSelectionDialogState,
  action: Actions,
): ISelectionDialogState {
  switch (action.type) {
    case ActionType.SHOW_SELECTION_DIALOG_SUCCESS:
      return { ...action.payload, hasOpen: true };

    case ActionType.CLEAR_SELECTION_DIALOG_SUCCESS:
      return { ...initialOkCancelDialogState, hasOpen: false };
  }

  return state;
}
