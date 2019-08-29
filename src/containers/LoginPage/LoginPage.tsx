import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import * as fromStaff from '../../store/staff';
import * as fromLanguage from '../../store/language';

import LoginPage from '../../components/pages/LoginPage/LoginPage';
import { IApiError } from '../../types/api';
import { ILoginReq } from '../../types/login-api';
import { ILookupItem } from '../../types/lookup';
import ErrorBoundary from '../../components/organisms/ErrorBoundary/ErrorBoundary';

interface IStateProps {
  loggingIn: boolean;
  errorDialogOpen: boolean;
  errors: IApiError[];
  selectedLanguage: ILookupItem;
}

interface IDispatchProps {
  onLogin: typeof fromStaff.login;
  errorDialogCloseHandler: typeof fromStaff.clearError;
  changeCurrentLanguage: typeof fromLanguage.loadLanguage;
}

type TProps = IStateProps & IDispatchProps;

class LoginPageContainer extends Component<TProps, {}> {
  render() {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <LoginPage
            onLogin={this.props.onLogin}
            loggingIn={this.props.loggingIn}
            errorDialogOpen={this.props.errorDialogOpen}
            errorDialogCloseHandler={this.props.errorDialogCloseHandler}
            errors={this.props.errors}
            selectedLanguage={this.props.selectedLanguage}
            onChangeCurrentLanguage={this.props.changeCurrentLanguage}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    loggingIn: fromStaff.loggingIn(state),
    errors: fromStaff.getApiErrors(state),
    errorDialogOpen: fromStaff.getErrorDialogOpen(state),
    selectedLanguage: fromLanguage.getLanguage(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    onLogin: (params: ILoginReq) => dispatch<any>(fromStaff.login(params)),
    errorDialogCloseHandler: () => dispatch<any>(fromStaff.clearError()),
    changeCurrentLanguage: (param: ILookupItem) => dispatch<any>(fromLanguage.loadLanguage(param)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageContainer);
