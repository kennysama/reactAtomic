import React from 'react';

import styles from './OKCancelDialog.module.scss';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../atoms/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import I18TextContainer from '../../../containers/I18Text/I18Text';
import { IOKCancelDialog } from '../../../types/dialog';

interface IProps {
  onClose: () => void;
}

type TProps = IProps & IOKCancelDialog;

const OKCancelDialog: React.FC<TProps> = (props: TProps) => {
  const { hasOpen, title, labelOk, labelCancel, contents, onOK, onCancel, onClose, isTextKey } = props;

  const renderText = (key: string) => {
    if (!isTextKey) {
      return key;
    }
    return <I18TextContainer textKey={key} />;
  };

  const renderTitle = () => {
    if (!title) {
      return null;
    }
    return <DialogTitle id="form-dialog-title">{renderText(title)}</DialogTitle>;
  };

  const renderOK = () => {
    const label = labelOk ? labelOk : 'OK';
    const func = () => {
      if (onOK) {
        onOK();
      }
      onClose();
    };
    return <Button onClick={func}>{renderText(label)}</Button>;
  };

  const renderCancel = () => {
    const label = labelCancel ? labelCancel : 'キャンセル';
    const func = () => {
      if (onCancel) {
        onCancel();
      }
      onClose();
    };
    return <Button onClick={func}>{renderText(label)}</Button>;
  };

  return (
    <React.Fragment>
      <Dialog
        id={styles.container}
        className="dialog"
        open={hasOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        {renderTitle()}
        <DialogContent className={styles.contents}>
          <p className={styles.text}>{renderText(contents)}</p>
        </DialogContent>
        <DialogActions className="dialog__actions">
          {renderCancel()}
          {renderOK()}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

OKCancelDialog.defaultProps = {
  isTextKey: false,
};

export default OKCancelDialog;
