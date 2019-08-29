import React from 'react';

import styles from './SelectionDialog.module.scss';
import { ISelectionDialog } from '../../../types/dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../atoms/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import I18TextContainer from '../../../containers/I18Text/I18Text';

interface IProps {
  onClose: () => void;
}

type TProps = IProps & ISelectionDialog;

const SelectionDialog: React.FC<TProps> = (props: TProps) => {
  const { hasOpen, title, contents, labelYes, labelNo, onYes, onClose, onNo, isTextKey } = props;

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

  const renderYes = () => {
    const label = labelYes ? labelYes : 'はい';
    const func = () => {
      if (onYes) {
        onYes();
      }
      onClose();
    };
    return <Button onClick={func}>{renderText(label)}</Button>;
  };

  const renderNo = () => {
    const label = labelNo ? labelNo : 'いいえ';
    const func = () => {
      if (onNo) {
        onNo();
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
          {renderNo()}
          {renderYes()}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

SelectionDialog.defaultProps = {
  isTextKey: false,
};

export default SelectionDialog;
