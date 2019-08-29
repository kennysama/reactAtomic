import React, { Component } from 'react';

// dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Form
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import './LogoutDialog.scss';
import I18TextContainer from '../../../containers/I18Text/I18Text';
import { IBaseDialogProps } from '../../../types/dialog';
import { ICustomer } from '../../../types/customer';

import Button from '../../atoms/Button/Button';
import { IStaff } from '../../../types/staff';

interface ILogoutDialogProps extends IBaseDialogProps {
  customer?: ICustomer | {};
  staff: IStaff;
  onLogoutCustomer: () => void;
  onLogoutStaff: () => void;
}

interface IState {
  isCustomer: boolean;
  isStaff: boolean;
}

class LogoutDialog extends Component<ILogoutDialogProps, IState> {
  // TODO: Replace with the message obtained from i18n
  constructor(props: ILogoutDialogProps) {
    super(props);
    this.state = {
      isCustomer: false,
      isStaff: false,
    };
  }

  render() {
    return (
      <div>
        <Dialog className="dialog logout-dialog" open={this.props.hasOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <I18TextContainer textKey={this.getTextKey('title')} />
          </DialogTitle>
          <DialogContent className="dialog__contents">
            <div className="content-wrapper">
              <DialogContentText className="dialog__contents__text">
                <I18TextContainer textKey={this.getTextKey('contentText')} />
              </DialogContentText>
              {this.renderFormGroup()}
            </div>
          </DialogContent>
          <DialogActions className="dialog__actions">
            <Button onClick={this.onClose}>{this.getTextKey('cancelButtonLabel')}</Button>
            <Button onClick={this.onLogout}>{this.getTextKey('logoutButtonLabel')}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  renderFormGroup() {
    return (
      <React.Fragment>
        <FormControl>
          {/* <FormLabel>{this.state.contentText}</FormLabel> */}
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isCustomer}
                  onChange={this.handleChange('isCustomer')}
                  value="isCustomer"
                />
              }
              label={this.customerCheckboxLabel}
            />
            <FormControlLabel
              control={
                <Checkbox checked={this.state.isStaff} onChange={this.handleChange('isStaff')} value="isStaff" />
              }
              label={this.staffCheckboxLabel}
            />
          </FormGroup>
        </FormControl>
      </React.Fragment>
    );
  }

  onClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.props.onHandleClose();
  };

  onLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (this.state.isCustomer) {
      this.props.onLogoutCustomer();
      alert(`お客様 ${this.customerName} ログアウトしました！`);
    }

    if (this.state.isStaff) {
      this.props.onLogoutStaff();
      alert(`担当者 ${this.staffName} ログアウトしました！`);
    }

    this.props.onHandleClose();
  };

  handleChange = (name: string) => (event: { target: { checked: boolean } }) => {
    if (name === 'isStaff') {
      this.setState({ isStaff: event.target.checked });
    } else {
      this.setState({ isCustomer: event.target.checked });
    }
  };

  getTextKey(key: string) {
    return `DialogCustomerLoad.${key}`;
  }

  get staffCheckboxLabel() {
    return (
      <React.Fragment>
        <I18TextContainer textKey={this.getTextKey('staffCheckBoxLabel')} />
        {this.staffName}
      </React.Fragment>
    );
  }

  get customerCheckboxLabel() {
    return (
      <React.Fragment>
        <I18TextContainer textKey={this.getTextKey('customerCheckBoxLabel')} />
        {this.customerName}
      </React.Fragment>
    );
  }

  get customerName() {
    const customer = this.props.customer as ICustomer;
    if (!customer.customerCode) {
      return '';
    }

    const name = customer.customerCode;
    return name;
  }

  get staffName() {
    if (!this.props.staff.staffCode) {
      return '';
    }

    return this.props.staff.staffCode;
  }
}

export default LogoutDialog;
