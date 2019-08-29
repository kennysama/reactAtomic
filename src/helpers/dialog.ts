import { IOKCancelDialog, ISelectionDialog } from '../types/dialog';

export function createOkCancelDialogData(
  contents: string,
  title?: string,
  isTextKey?: boolean,
  onOK?: () => void,
  onCancel?: () => void,
  labelOk?: string,
  labelCancel?: string,
): IOKCancelDialog {
  return {
    hasOpen: true,
    contents,
    title: title ? title : null,
    isTextKey: isTextKey ? isTextKey : false,
    onOK,
    onCancel,
    labelOk,
    labelCancel,
  };
}

export function createSelectionDialogData(
  contents: string,
  title?: string,
  isTextKey?: boolean,
  onYes?: () => void,
  onNo?: () => void,
  labelYes?: string,
  labelNo?: string,
): ISelectionDialog {
  return {
    hasOpen: true,
    contents,
    title: title ? title : null,
    isTextKey: isTextKey ? isTextKey : false,
    onYes,
    onNo,
    labelYes,
    labelNo,
  };
}
