import React from 'react';

import styles from './ErrorDialog.module.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Icon from '@material-ui/core/Icon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Button from '../../atoms/Button/Button';
import I18TextContainer from '../../../containers/I18Text/I18Text';
import { IBaseDialogProps } from '../../../types/dialog';
import { IApiError } from '../../../types/api';

interface IErrorDialog extends IBaseDialogProps {
  errors: IApiError[];
}

const ErrorDialog: React.FC<IErrorDialog> = props => {
  return (
    <React.Fragment>
      <Dialog className={`dialog ${styles.errorDialog}`} open={props.hasOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <I18TextContainer textKey={getTextKey('title')} />
        </DialogTitle>
        <DialogContent className={styles.dialogContents}>{renderErrors()}</DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button onClick={onClose}>{getTextKey('closeButtonLabel')}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  function renderErrors() {
    return props.errors.map((error, index) => {
      return (
        <ExpansionPanel key={error.code} className={styles.errorPanel} defaultExpanded={index === 0 ? true : false}>
          <ExpansionPanelSummary expandIcon={renderIcon()} className={styles.title}>
            <h4>{`code: ${error.code}`}</h4>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="error-panel__detail">
            <p>{error.message}</p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  }
  function renderIcon() {
    return <Icon>expand_more_icon</Icon>;
  }

  function onClose(event: React.MouseEvent<HTMLButtonElement>): void {
    props.onHandleClose();
  }

  function getTextKey(key: string) {
    return `DialogError.${key}`;
  }
};

export default ErrorDialog;
