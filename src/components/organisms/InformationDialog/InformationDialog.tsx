import React from 'react';

import './InformationDialog.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '../../atoms/Button/Button';
import { IBaseDialogProps } from '../../../types/dialog';
import Label from '../../atoms/Label/Label';
import Title from '../../atoms/Title/Title';

interface IInformationDialog extends IBaseDialogProps {
  text: string;
  title?: string;
  image?: string;
}

const InformationDialog: React.FC<IInformationDialog> = ({ hasOpen, onHandleClose, text, title = '', image = '' }) => {
  return (
    <Dialog className="dialog information-dialog" open={hasOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      {renderTitle(title)}
      <DialogContent className="dialog__contents">
        <div className="dialog__contents__space" />
        {parseText()}
      </DialogContent>
      <img src={image} alt="" />
      <DialogActions className="dialog__actions">
        <Button onClick={onClose}>{getTextKey('closeButtonLabel')}</Button>
      </DialogActions>
    </Dialog>
  );
  function onClose(event: React.MouseEvent<HTMLButtonElement>): void {
    onHandleClose();
  }

  function getTextKey(key: string) {
    return `DialogInformation.${key}`;
  }

  function parseText() {
    return text.split('\n').map((value, index) => {
      return (
        <DialogContentText key={index}>
          <Label text={String(value)} />
        </DialogContentText>
      );
    });
  }
  function renderTitle(titleValue: string) {
    return <Title title={titleValue} />;
  }
};

export default InformationDialog;
