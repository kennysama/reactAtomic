import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import * as fromCustomer from '../../../store/customer';
import * as fromStaff from '../../../store/staff';
import * as fromDialog from '../../../store/dialog';

import { ICustomer } from '../../../types/customer';
import { IStaff } from '../../../types/staff';

import styles from './DialogSamplePage.module.scss';
import Title from '../../atoms/Title/Title';
import LogoutDialog from '../../organisms/LogoutDialog/LogoutDialog';
import CustomerLoadDialog from '../../organisms/CustomerLoadDialog/CustomerLoadDialog';
import RemarksDialog from '../../organisms/RemarksDialog/RemarksDialog';
import InformationDialog from '../../organisms/InformationDialog/InformationDialog';
import ItemList, { IListItem } from '../../molecules/ItemList/ItemList';
import ErrorDialog from '../../organisms/ErrorDialog/ErrorDialog';
import { SAMPLE_DATA_OK_CANCEL_DIALOG, SAMPLE_DATA_SELECTION_DIALOG } from '../../../lookups/temporary-lookups';

interface IProps {
  logout: {
    customer: ICustomer;
    staff: IStaff;
  };
  customer: {
    loading: boolean;
    hasError: boolean;
    loadingErrorMessage: string;
  };
  onLoadCustomer: typeof fromCustomer.loadCustomer;
  onLogoutCustomer: typeof fromCustomer.logout;
  onLogoutStaff: typeof fromStaff.logout;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  showSelectionDialog: typeof fromDialog.showSelectionDialog;
}

interface IState {
  hasOpenLogoutDialog: boolean;
  hasOpenCustomeLoadDialog: boolean;
  hasOpenRemarksDialog: boolean;
  hasOpenInformationDialog: boolean;
  hasOpenErrorDialog: boolean;
  remarks: string;
}

class DialogSamplePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasOpenLogoutDialog: false,
      hasOpenCustomeLoadDialog: false,
      hasOpenRemarksDialog: false,
      hasOpenInformationDialog: false,
      hasOpenErrorDialog: false,
      remarks: '早大 アメフト部 出身\n太ももがかなり太い',
    };
  }

  render() {
    return (
      <div className={styles.page}>
        <Title title="モーダルサンプル" />
        <ItemList title="Dialog Samples" items={this.getSampleDisplayComponent()} />

        {/* LOGOUT DIALOG */}
        <LogoutDialog
          hasOpen={this.state.hasOpenLogoutDialog}
          onHandleClose={this.handleLogoutClose}
          onLogoutCustomer={this.props.onLogoutCustomer}
          onLogoutStaff={this.props.onLogoutStaff}
          customer={this.props.logout.customer}
          staff={this.props.logout.staff}
        />
        {/* LOAD CUSTOMER DIALOG */}
        <CustomerLoadDialog
          hasOpen={this.state.hasOpenCustomeLoadDialog}
          hasError={this.props.customer.hasError}
          loadingErrorMessage={this.props.customer.loadingErrorMessage}
          loading={this.props.customer.loading}
          onHandleLoad={this.props.onLoadCustomer}
          onHandleClose={this.handleCustomerLoadDialogClose}
        />
        <RemarksDialog
          hasOpen={this.state.hasOpenRemarksDialog}
          onHandleClose={this.handleRemarksDialogClose}
          remarks={this.state.remarks}
          isEdit={true}
          onChangedRemarks={this.handleChangeRemarks}
        />
        <InformationDialog
          hasOpen={this.state.hasOpenInformationDialog}
          onHandleClose={this.handleInformationDialogClose}
          text={information}
        />
        <ErrorDialog
          hasOpen={this.state.hasOpenErrorDialog}
          onHandleClose={this.handleErrorDialogClose}
          errors={errors}
        />
      </div>
    );
  }

  getSampleDisplayComponent(): IListItem[] {
    return [
      {
        key: 'logout',
        left: <p>Try logout Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleClickLogoutOpen}>
            Logout
          </Button>
        ),
      },
      {
        key: 'customer_load',
        left: <p>Try customer load Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleClickCustomerLoadDialogOpen}>
            Load Customer
          </Button>
        ),
      },
      {
        key: 'remarks',
        left: <p>Try remarks Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleClickRemarksDialogOpen}>
            Remarks
          </Button>
        ),
      },
      {
        key: 'remarks_content',
        left: <p>Display Input Remarks Text =></p>,
        right: <p>{this.state.remarks}</p>,
      },
      {
        key: 'information',
        left: <p>Try Information Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleClickInformationDialogOpen}>
            Information
          </Button>
        ),
      },
      {
        key: 'error',
        left: <p>Try Error Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleClickErrorDialogOpen}>
            Error
          </Button>
        ),
      },
      {
        key: 'OkCancel',
        left: <p>Try OkCancel Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleOkCancelDialogOpen}>
            OkCancel
          </Button>
        ),
      },
      {
        key: 'Selection',
        left: <p>Try Selection Dialog Sample</p>,
        right: (
          <Button variant="contained" onClick={this.handleSelectionDialogOpen}>
            Selection
          </Button>
        ),
      },
    ];
  }

  handleSelectionDialogOpen = () => {
    const data = {
      ...SAMPLE_DATA_SELECTION_DIALOG,
    };
    this.props.showSelectionDialog(data);
  };

  handleOkCancelDialogOpen = () => {
    const data = {
      ...SAMPLE_DATA_OK_CANCEL_DIALOG,
    };
    this.props.showOkCancelDialog(data);
  };

  handleClickLogoutOpen = () => {
    this.setState({ hasOpenLogoutDialog: true });
  };

  handleLogoutClose = () => {
    this.setState({ hasOpenLogoutDialog: false });
  };

  handleClickCustomerLoadDialogOpen = () => {
    this.setState({ hasOpenCustomeLoadDialog: true });
  };

  handleCustomerLoadDialogClose = () => {
    this.setState({ hasOpenCustomeLoadDialog: false });
  };

  handleClickRemarksDialogOpen = () => {
    this.setState({ hasOpenRemarksDialog: true });
  };

  handleRemarksDialogClose = () => {
    this.setState({ hasOpenRemarksDialog: false });
  };

  handleChangeRemarks = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    this.setState({ remarks: value });
  };

  handleClickInformationDialogOpen = () => {
    this.setState({ hasOpenInformationDialog: true });
  };

  handleInformationDialogClose = () => {
    this.setState({ hasOpenInformationDialog: false });
  };

  handleClickErrorDialogOpen = () => {
    this.setState({ hasOpenErrorDialog: true });
  };

  handleErrorDialogClose = () => {
    this.setState({ hasOpenErrorDialog: false });
  };
}

const info =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const information = '▼ Display the content you want to display to the user. ▼  \n' + info;

const errors = [...Array(10)].map((code, index) => {
  return {
    code: `E0000000${index + 1}`,
    message: 'API Response ERROR: ' + info,
  };
});

export default DialogSamplePage;
