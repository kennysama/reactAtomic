import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './CustomerLoadDialog.module.scss';
import config from '../../../configuration/config';
import LoadingInfo from '../../../components/molecules/LoadingInfo/LoadingInfo';
import { IBaseDialogProps } from '../../../types/dialog';

export interface ICustomerDialogProps extends IBaseDialogProps {
  loading: boolean;
  hasError: boolean;
  loadingErrorMessage: string;
  onHandleLoad: (param: string, action: () => void) => void;
}

class CustomerLoadDialog extends Component<ICustomerDialogProps> {
  // TODO: Replace with the message obtained from i18n
  state = {
    title: config.language !== 'en' ? 'お客様情報ロード' : 'Load Customer Data',
    contentText:
      config.language !== 'en'
        ? 'ログアウトするアカウントにチェックを入れてください'
        : 'Please select your logout account',
    label: {
      loadButton: config.language !== 'en' ? '読み込む' : 'Load',
      inputCustomerNo: config.language !== 'en' ? '会員コード（カード番号）' : 'Customer Code(Card No)',
    },
    loadingMessage: config.language !== 'en' ? 'お客様情報読み込み中です・・・' : 'Loading Customer Data・・・',
    loadedErrorMessage:
      config.language !== 'en'
        ? 'お客様情報がありません。会員番号を入力してください。'
        : 'Not found customer data. Please input correct customerNo.',
    customerNo: '',
  };

  render() {
    return (
      <div>
        <Dialog
          className={`dialog ${styles.customerLoadDialog}`}
          open={this.props.hasOpen}
          onClose={this.onClose}
          maxWidth="sm"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <div>
              {// Error Message
              this.renderErrorMessage(this.props.hasError)}
              {// input
              this.renderInput(this.props.loading)}
              {// Loading
              this.renderLoading()}
            </div>
          </DialogContent>
          <DialogActions className={styles.dialogActions}>
            <Button variant="contained" onClick={this.onLoad}>
              {this.state.label.loadButton}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleChange = (name: string) => (event: { target: { value: string } }) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderErrorMessage(hasError: boolean) {
    return (
      <React.Fragment>
        <DialogContentText className={hasError ? styles.isError : styles.text}>
          {this.props.loadingErrorMessage}
        </DialogContentText>
      </React.Fragment>
    );
  }

  renderInput(isLoading: boolean) {
    return (
      <React.Fragment>
        <div className={styles.inputWrapper}>
          <TextField
            autoFocus={true}
            fullWidth={true}
            id="customer-no"
            className={isLoading ? styles.isLoadingInput : styles.input}
            label={this.state.label.inputCustomerNo}
            value={this.state.customerNo}
            onChange={this.onChangedCustomerCode}
            type="text"
          />
        </div>
      </React.Fragment>
    );
  }

  renderLoading() {
    const { loading } = this.props;
    const { loadingMessage } = this.state;

    return (
      <React.Fragment>
        <LoadingInfo isLoading={loading}>
          <p>{loadingMessage}</p>
        </LoadingInfo>
      </React.Fragment>
    );
  }

  onChangedCustomerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState({ customerNo: value });
  };

  onClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.props.onHandleClose();
  };

  onLoad = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const param = this.state.customerNo;
    this.props.onHandleLoad(param, this.props.onHandleClose);
  };
}

export default CustomerLoadDialog;
