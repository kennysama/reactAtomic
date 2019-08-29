import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ICustomer } from '../../types/customer';
import { IStaff } from '../../types/staff';

import * as fromCustomer from '../../store/customer';
import * as fromStaff from '../../store/staff';
import { AppState } from '../../store';
import DialogSamplePage from '../../components/pages/DialogSamplePage/DialogSamplePage';
import * as fromDialog from '../../store/dialog';
import { IOKCancelDialog, ISelectionDialog } from '../../types/dialog';

interface IStateProps {
  logout: {
    customer: ICustomer;
    staff: IStaff;
  };
  customer: {
    loading: boolean;
    hasError: boolean;
    loadingErrorMessage: string;
  };
}

interface IDispatchProps {
  onLoadCustomer: typeof fromCustomer.loadCustomer;
  onLogoutCustomer: typeof fromCustomer.logout;
  onLogoutStaff: typeof fromStaff.logout;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  showSelectionDialog: typeof fromDialog.showSelectionDialog;
}

type TProps = IStateProps & IDispatchProps;

class DialogSamplePageContainer extends Component<TProps, {}> {
  render() {
    return <DialogSamplePage {...this.props} />;
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    logout: {
      customer: fromCustomer.getCustomer(state) as ICustomer,
      staff: fromStaff.getStaff(state) as IStaff,
    },
    customer: {
      loading: fromCustomer.getLoading(state),
      hasError: false,
      loadingErrorMessage: fromCustomer.getLoadingErrorMessage(),
    },
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    onLoadCustomer: (param: string, action: () => void) => dispatch<any>(fromCustomer.loadCustomer(param, action)),
    onLogoutCustomer: () => dispatch<any>(fromCustomer.logout()),
    onLogoutStaff: () => dispatch<any>(fromStaff.logout()),
    showOkCancelDialog: (data: IOKCancelDialog) => dispatch<any>(fromDialog.showOkCancelDialog(data)),
    showSelectionDialog: (data: ISelectionDialog) => dispatch<any>(fromDialog.showSelectionDialog(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogSamplePageContainer);
