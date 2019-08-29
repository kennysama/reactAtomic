import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromNavigation from '../../store/navigation';
import * as fromHeader from '../../store/header';
import * as fromOrderConfirmation from '../../store/order-confirmation';
import * as fromSizeCorrection from '../../store/size-correction';
import * as fromDialog from '../../store/dialog';

import { resolveHeaderTextKey } from '../../helpers/header';

import SizeCorrectionPage from '../../components/pages/SizeCorrectionPage/SizeCorrectionPage';
import { AppState } from '../../store';
import { IOKCancelDialog } from '../../types/dialog';

interface IStateProps {
  hasCompleted: boolean;
  hasCompletedFullOrder: boolean;
  isLoading: boolean;
}

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.SizeCorrectionDefault;
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  //
  temporalCompleteStep: () => void;
}

type TProps = IDispatchProps & IStateProps;

class SizeCorrectionPageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
  }

  render() {
    const {
      createNewItem,
      clearItemSteps,
      isLoading,
      hasCompleted,
      hasCompletedFullOrder,
      temporalCompleteStep,
      showOkCancelDialog,
    } = this.props;
    return (
      <SizeCorrectionPage
        createNewItem={createNewItem}
        clearItemSteps={clearItemSteps}
        isLoading={isLoading}
        hasCompleted={hasCompleted}
        hasCompletedFullOrder={hasCompletedFullOrder}
        showOkCancelDialog={showOkCancelDialog}
        temporalCompleteStep={temporalCompleteStep}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    hasCompleted: fromSizeCorrection.getHasCompleted(state),
    hasCompletedFullOrder: fromOrderConfirmation.getHasCompletedFullOrder(state),
    isLoading: fromSizeCorrection.getLoading(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.SizeCorrectionDefault()),
    createNewItem: () => dispatch<any>(fromOrderConfirmation.createNewItem()),
    clearItemSteps: () => dispatch<any>(fromOrderConfirmation.clearItemSteps()),
    showOkCancelDialog: (params: IOKCancelDialog) => dispatch<any>(fromDialog.showOkCancelDialog(params)),
    //
    temporalCompleteStep: () => dispatch<any>(fromSizeCorrection.TemporalSetValueToValidate('Complete the step')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SizeCorrectionPageContainer);
