import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import * as fromDialog from '../../store/dialog';
// FIXME: Temporarily
import * as fromNavigation from '../../store/header';

import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import { IApiError } from '../../types/api';
import { IOKCancelDialog, ISelectionDialog } from '../../types/dialog';

interface IStateProps {
  errors: IApiError[];
  errorDialogOpen: boolean;
  information: string;
  informationDialogOpen: boolean;
  image: string;
  okCancelDialogData: IOKCancelDialog;
  selectionDialogData: ISelectionDialog;
  // FIXME: Temporarily
  currentPath: string;
}

interface IDispatchProps {
  clearErrors: typeof fromDialog.clearError;
  clearInformation: typeof fromDialog.clearInformation;
  clearOkCancelDialog: typeof fromDialog.clearOkCancelDialog;
  clearSelectionDialog: typeof fromDialog.clearSelectionDialog;
}

type TProps = IDispatchProps & IStateProps;

class MainTemplateContainer extends Component<TProps> {
  render() {
    return <MainTemplate {...this.props} />;
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    image: fromDialog.getDialogImage(state),
    errors: fromDialog.getApiErrors(state),
    errorDialogOpen: fromDialog.getErrorDialogOpen(state),
    information: fromDialog.getInformationMessage(state),
    informationDialogOpen: fromDialog.getInformationDialogOpen(state),
    okCancelDialogData: fromDialog.getOKCancelDialogData(state),
    selectionDialogData: fromDialog.getSelectionDialogData(state),
    // FIXME: Temporarily
    currentPath: fromNavigation.getCurrentPath(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    clearErrors: () => dispatch<any>(fromDialog.clearError()),
    clearInformation: () => dispatch<any>(fromDialog.clearInformation()),
    clearOkCancelDialog: () => dispatch<any>(fromDialog.clearOkCancelDialog()),
    clearSelectionDialog: () => dispatch<any>(fromDialog.clearSelectionDialog()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTemplateContainer);
