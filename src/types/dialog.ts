import { Nullable } from './index';

export interface IBaseDialogProps {
  hasOpen: boolean;
  onHandleClose: () => void;
}

export interface IOKCancelDialog {
  hasOpen: boolean;
  title: Nullable<string>;
  contents: string;
  labelOk?: Nullable<string>;
  labelCancel?: Nullable<string>;
  isTextKey?: boolean;
  onOK?: () => void;
  onCancel?: () => void;
}

export interface ISelectionDialog {
  hasOpen: boolean;
  title: Nullable<string>;
  contents: string;
  labelYes?: Nullable<string>;
  labelNo?: Nullable<string>;
  isTextKey?: boolean;
  onYes?: () => void;
  onNo?: () => void;
}
