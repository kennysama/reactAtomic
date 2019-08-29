import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromNavigation from '../../store/navigation';
import * as fromHome from '../../store/home';
import * as fromOrderConfirmation from '../../store/order-confirmation';
import HomePage from '../../components/pages/HomePage/HomePage';
import { IHomeSelectedItem } from '../../types/home';
import { AppState } from '../../store';
import * as fromHeader from '../../store/header';
import { resolveHeaderTextKey } from '../../helpers/header';

interface IStateProps {
  hasTemporalOrderItem: boolean;
  hasSavedOrders: boolean;
}
interface IDispatchProps {
  homeNavBars: typeof fromNavigation.HomeRequest;
  setHomeParameters: typeof fromHome.loadHomeParameters;
  loadTemporaryOrderItem: typeof fromOrderConfirmation.editOrderConfirmationItem;

  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
}

type TProps = IStateProps & IDispatchProps;

class HomePageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.homeNavBars();
  }
  render() {
    return (
      <HomePage
        clothSelectionParameters={this.props.setHomeParameters}
        hasTemporalOrderItem={this.props.hasTemporalOrderItem}
        loadTemporaryOrderItem={this.props.loadTemporaryOrderItem}
        hasSavedOrders={this.props.hasSavedOrders}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    hasTemporalOrderItem: fromOrderConfirmation.hasTemporalOrderItem(state),
    hasSavedOrders: fromOrderConfirmation.getHasSavedOrders(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    homeNavBars: () => dispatch<any>(fromNavigation.homeNavBars()),
    setHomeParameters: (param: IHomeSelectedItem) => dispatch<any>(fromHome.loadHomeParameters(param)),
    loadTemporaryOrderItem: () => dispatch<any>(fromOrderConfirmation.editOrderConfirmationItem()),
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageContainer);
