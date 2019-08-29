import React from 'react';

import styles from './RemarksDialog.module.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '../../atoms/Button/Button';
import TextArea from '../../atoms/textArea/textArea';
import { IBaseDialogProps } from '../../../types/dialog';
import I18TextContainer from '../../../containers/I18Text/I18Text';

export interface IRemarksDialogProps extends IBaseDialogProps {
  remarks: string;
  isEdit: boolean;
  onChangedRemarks: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RemarksDialog: React.FC<IRemarksDialogProps> = props => {

    return (
      <React.Fragment>
        <Dialog className="dialog " open={props.hasOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <I18TextContainer textKey={getTextKey('title')} />
          </DialogTitle>
          <DialogContent >
            <div className={styles.remarks}>
              <TextArea
                text={props.remarks}
                disabled={!props.isEdit}
                placeHolder="input remarks"
                onValueChanged={props.onChangedRemarks}
              />
            </div>
          </DialogContent>
          <DialogActions className="dialog__actions">
            <Button onClick={onClose}>{getTextKey('closeButtonLabel')}</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
    function onClose(event: React.MouseEvent<HTMLButtonElement>): void {
      props.onHandleClose();
    }

    function getTextKey(key: string) {
      return `DialogRemarks.${key}`;
    }
  };

export default RemarksDialog;
