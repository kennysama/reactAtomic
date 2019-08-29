import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromNavigation from '../../store/navigation';
import * as fromOrderConfirmation from '../../store/order-confirmation';
import * as fromHeader from '../../store/header';

import { resolveHeaderTextKey } from '../../helpers/header';
// tslint:disable-next-line:max-line-length
import OrderConfirmationPage from '../../components/pages/OrderConfirmationPage/OrderConfirmationPage';
import { AppState } from '../../store';
import { IOrderConfirmation } from '../../types/order-confirmation';

interface IStateProps {
  orderConfirmationItems: IOrderConfirmation[];
}

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.OrderContentConfirmation;
  editOrderConfirmationItem: typeof fromOrderConfirmation.editOrderConfirmationItem;
  copyOrderConfirmationItem: typeof fromOrderConfirmation.copyOrderConfirmationItem;
  deleteOrderConfirmationItem: typeof fromOrderConfirmation.deleteOrderConfirmationItem;
}

type TProps = IDispatchProps & IStateProps;

class OrderConfirmationPageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
  }

  render() {
    return (
      <OrderConfirmationPage
        orderConfirmationItems={this.props.orderConfirmationItems}
        editOrderConfirmationItem={this.props.editOrderConfirmationItem}
        copyOrderConfirmationItem={this.props.copyOrderConfirmationItem}
        deleteOrderConfirmationItem={this.props.deleteOrderConfirmationItem}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    orderConfirmationItems: fromOrderConfirmation.getOrderItems(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.OrderContentConfirmation()),
    editOrderConfirmationItem: id => dispatch<any>(fromOrderConfirmation.editOrderConfirmationItem(id)),
    copyOrderConfirmationItem: item => dispatch<any>(fromOrderConfirmation.copyOrderConfirmationItem(item)),
    deleteOrderConfirmationItem: item => dispatch<any>(fromOrderConfirmation.deleteOrderConfirmationItem(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderConfirmationPageContainer);
