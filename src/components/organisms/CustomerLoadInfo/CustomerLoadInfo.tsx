import React, { Component } from 'react';

import styles from './CustomerLoadInfo.module.scss';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import Button from '../../atoms/Button/Button';
import CustomerLoadDialog from '../CustomerLoadDialog/CustomerLoadDialog';
import { ICustomer } from '../../../types/customer';
import * as fromCustomer from '../../../store/customer';

interface IProps {
  info: {
    customer: ICustomer;
    isLoaded: boolean;
    isLoading: boolean;
    hasError: boolean;
    loadingErrorMessage: string;
  };
  // actions
  onLoadCustomer: typeof fromCustomer.loadCustomer;
}

interface IState {
  hasOpenCustomerLoadDialog: boolean;
}

class CustomerLoginInfo extends Component<IProps, IState> {
  private translate = 'CustomerLoginInfo.';
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasOpenCustomerLoadDialog: false,
    };
  }

  render() {
    const { customer, isLoaded, isLoading, hasError, loadingErrorMessage } = this.props.info;
    const customerName = isLoaded ? customer.customerFamilyName : '';
    const customerId = isLoaded ? customer.customerCode : '';

    return (
      <React.Fragment>
        <div className={styles.customerWrapper}>
          <div className={styles.text}>
            <dl>
              <dt>
                <I18TextContainer textKey="CustomerLoginInfo.customerName" />
              </dt>
              <dd>{customerName}</dd>
            </dl>
            <dl>
              <dt>
                <I18TextContainer textKey="CustomerLoginInfo.customerId" />
              </dt>
              <dd>{customerId}</dd>
            </dl>
          </div>
          <div className={styles.button}>
            <Button onClick={this.handleCustomerLoadDialogOpen} styles={['size-s']} disabled={isLoaded}>
              {this.translate + 'customerLoadButton'}
            </Button>
          </div>
        </div>
        {/* LOAD CUSTOMER DIALOG */}
        <CustomerLoadDialog
          hasOpen={this.state.hasOpenCustomerLoadDialog}
          hasError={hasError}
          loadingErrorMessage={loadingErrorMessage}
          loading={isLoading}
          onHandleLoad={this.props.onLoadCustomer}
          onHandleClose={this.handleCustomerLoadDialogClose}
        />
      </React.Fragment>
    );
  }

  handleCustomerLoadDialogOpen = () => {
    this.setState({ hasOpenCustomerLoadDialog: true });
  };

  handleCustomerLoadDialogClose = () => {
    this.setState({ hasOpenCustomerLoadDialog: false });
  };
}

export default CustomerLoginInfo;
