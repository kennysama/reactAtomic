import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';

import * as fromOrdersDigests from '../../store/ordersDigestsSearch';
import * as fromNavigation from '../../store/navigation';
import * as fromHeader from '../../store/header';

import { resolveHeaderTextKey } from '../../helpers/header';
import { IOrderDigests } from '../../types/ordersDigests';
import { Dispatch } from 'redux';
import { IOrderDigestsSearchReq } from '../../types/order-search-api';
import OrderDigestsSearchPage from '../../components/pages/OrderDigestsSearchPage/OrderDigestsSearchPage';

interface IStateProps {
  ordersDigests: IOrderDigests[];
  loading: boolean;
}

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.OrdersDigestsRequest;
  getOrderDigests: typeof fromOrdersDigests.GetOrderDigests;
}

type TProps = IStateProps & IDispatchProps;

class OrderDigestsSearchPageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
  }

  render() {
    return (
      <OrderDigestsSearchPage
        loading={this.props.loading}
        getOrderDigests={this.props.getOrderDigests}
        ordersDigests={this.props.ordersDigests}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    ordersDigests: fromOrdersDigests.getOrdersDigestsReport(state),
    loading: fromOrdersDigests.loading(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.OrdersDigestsRequest()),
    getOrderDigests: (param: IOrderDigestsSearchReq) => dispatch<any>(fromOrdersDigests.GetOrderDigests(param)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDigestsSearchPageContainer);
