import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from '../index';

import {
  dialogErrorReducer,
  dialogInformationReducer,
  IOkCancelDialogState,
  okCancelDialogReducer,
  ISelectionDialogState,
  selectionDialogReducer,
} from './reducer';
import { IErrorState } from '../common/error';
import { IInformationState } from '../common/information';

export * from './actions';

export interface IDialogFeature {
  errors: IErrorState;
  information: IInformationState;
  okCancel: IOkCancelDialogState;
  selection: ISelectionDialogState;
}

export const reducers = combineReducers({
  errors: dialogErrorReducer,
  information: dialogInformationReducer,
  okCancel: okCancelDialogReducer,
  selection: selectionDialogReducer,
});

const featureSelector = (state: AppState): IDialogFeature => state.dialog;

const getDialogState = createSelector(
  featureSelector,
  state => state,
);

export const getApiErrors = createSelector(
  getDialogState,
  state => state.errors.errors,
);
export const getErrorDialogOpen = createSelector(
  getDialogState,
  state => state.errors.errorDialogOpen,
);
export const getInformationMessage = createSelector(
  getDialogState,
  state => state.information.information,
);
export const getInformationDialogOpen = createSelector(
  getDialogState,
  state => state.information.informationDialogOpen,
);

export const getDialogImage = createSelector(
  getDialogState,
  state => state.information.image,
);

export const getOKCancelDialogData = createSelector(
  getDialogState,
  state => state.okCancel,
);

export const getSelectionDialogData = createSelector(
  getDialogState,
  state => state.selection,
);
