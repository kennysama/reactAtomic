import { IOKCancelDialog, ISelectionDialog } from '../types/dialog';

export const INITIAL_OK_CANCEL_DIALOG_STATE: IOKCancelDialog = {
  hasOpen: false,
  title: null,
  contents: '',
};

export const INITIAL_SELECTION_DIALOG_STATE: ISelectionDialog = {
  hasOpen: false,
  title: null,
  contents: '',
};
