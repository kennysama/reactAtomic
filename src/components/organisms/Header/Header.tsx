import React, { Component } from 'react';
import Button from '../../atoms/Button/Button';

import styles from './Header.module.scss';

import LogoutDialog from '../../organisms/LogoutDialog/LogoutDialog';
import Logo from '../../atoms/Logo/Logo';
import StaffLoginInfo from '../../molecules/StaffLoginInfo/StaffLoginInfo';
import CustomerLoadInfo from '../CustomerLoadInfo/CustomerLoadInfo';

import { ICustomer } from '../../../types/customer';

import * as fromCustomer from '../../../store/customer';
import * as fromStaff from '../../../store/staff';

import { IStaff } from '../../../types/staff';

interface IProps {
  titleTextKey: string;
  currentPage: string;
  staff: IStaff;
  customerInfo: {
    customer: ICustomer;
    isLoaded: boolean;
    isLoading: boolean;
    hasError: boolean;
    loadingErrorMessage: string;
  };
  onLoadCustomer: typeof fromCustomer.loadCustomer;
  onLogoutCustomer: typeof fromCustomer.logout;
  onLogoutStaff: typeof fromStaff.logout;
}

interface IState {
  hasOpenLogoutDialog: boolean;
}

class Header extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasOpenLogoutDialog: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <header className={styles.header}>
          <div className={styles.leftBlock}>
            <Logo>{this.props.titleTextKey}</Logo>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.staff}>
              <StaffLoginInfo staff={this.props.staff} />
            </div>
            <div className={styles.customer}>
              <CustomerLoadInfo info={this.props.customerInfo} onLoadCustomer={this.props.onLoadCustomer} />
            </div>
            <div className={styles.logout}>
              <Button styles={['black', 'logout']} onClick={this.handleLogoutOpen}>
                ログアウト
              </Button>
            </div>
          </div>
        </header>

        {/* LOGOUT DIALOG */}
        <LogoutDialog
          hasOpen={this.state.hasOpenLogoutDialog}
          onHandleClose={this.handleLogoutClose}
          onLogoutCustomer={this.props.onLogoutCustomer}
          onLogoutStaff={this.props.onLogoutStaff}
          customer={this.props.customerInfo.customer}
          staff={this.props.staff}
        />
      </React.Fragment>
    );
  }

  handleLogoutOpen = () => {
    this.setState({ hasOpenLogoutDialog: true });
  };

  handleLogoutClose = () => {
    this.setState({ hasOpenLogoutDialog: false });
  };
}

export default Header;
