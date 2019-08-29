import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';

import { ICustomer } from '../../types/customer';
import { IStaff } from '../../types/staff';

import Header from '../../components/organisms/Header/Header';
import * as fromCustomer from '../../store/customer';
import * as fromStaff from '../../store/staff';
import * as fromNavigation from '../../store/navigation';
import * as fromHeader from '../../store/header';

interface IStateProps {
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
}

interface IDispatchProps {
  onLoadCustomer: typeof fromCustomer.loadCustomer;
  onLogoutCustomer: typeof fromCustomer.logout;
  onLogoutStaff: typeof fromStaff.logout;
}

type TProps = IStateProps & IDispatchProps;

class HeaderContainer extends Component<TProps> {
  render() {
    return (
      <Header
        titleTextKey={this.props.titleTextKey}
        currentPage={this.props.currentPage}
        staff={this.props.staff}
        customerInfo={this.props.customerInfo}
        onLoadCustomer={this.props.onLoadCustomer}
        onLogoutCustomer={this.props.onLogoutCustomer}
        onLogoutStaff={this.props.onLogoutStaff}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    titleTextKey: fromHeader.getHeaderTextKey(state),
    currentPage: fromNavigation.getCurrentPage(state),
    staff: fromStaff.getStaff(state) as IStaff,
    customerInfo: {
      customer: fromCustomer.getCustomer(state) as ICustomer,
      isLoaded: fromCustomer.getLoaded(state),
      isLoading: fromCustomer.getLoading(state),
      hasError: fromCustomer.getLoadingError(state),
      loadingErrorMessage: fromCustomer.getLoadingErrorMessage(),
    },
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    onLoadCustomer: (param: string, next: () => void) => dispatch<any>(fromCustomer.loadCustomer(param, next)),
    onLogoutCustomer: () => dispatch<any>(fromCustomer.logout()),
    onLogoutStaff: () => dispatch<any>(fromStaff.logout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
