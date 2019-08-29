import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as fromOrderConfirmation from '../../store/order-confirmation';
import * as fromNavigation from '../../store/navigation';
import * as fromHeader from '../../store/header';
import * as fromAddress from '../../store/address';
import { resolveHeaderTextKey } from '../../helpers/header';
import AddressPage from '../../components/pages/AddressPage/AddressPage';
import { IOrderConfirmation } from '../../types/order-confirmation';
import { AppState } from '../../store';
import { IOrderDestination, IOrderAddress, IOrderDelivery } from '../../types/order';

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.AddressRequest;

  dispatchSucess: typeof fromNavigation.AddressSuccess;
  dispatchDefault: typeof fromNavigation.AddressRequest;

  setOrderDestination: typeof fromAddress.setOrderDestination;
  setOrderDelivery: typeof fromAddress.setOrderDelivery;

  loadAddressList: typeof fromAddress.loadAddressList;
}

interface IStateProps {
  orderConfirmationItems: IOrderConfirmation[];
  orderIdList: IOrderAddress[];
}

type TProps = IDispatchProps & IStateProps;

class AddressPageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    const orderList = this.props.orderConfirmationItems;
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
    this.props.loadAddressList(orderList);
  }

  render() {
    return (
      <AddressPage
        ordersIdList={this.props.orderIdList}
        setOrderDestination={this.props.setOrderDestination}
        setOrderDelivery={this.props.setOrderDelivery}
        orderConfirmationItems={this.props.orderConfirmationItems}
        dispatchDefault={this.props.dispatchDefault}
        dispatchSucess={this.props.dispatchSucess}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    orderIdList: fromAddress.getOrdersList(state),
    orderConfirmationItems: fromOrderConfirmation.getOrderItems(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setOrderDelivery: (params: IOrderDelivery, itemId: number) =>
      dispatch<any>(fromAddress.setOrderDelivery(params, itemId)),
    setOrderDestination: (params: IOrderDestination, itemId: number) =>
      dispatch<any>(fromAddress.setOrderDestination(params, itemId)),
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.AddressRequest()),
    dispatchSucess: () => dispatch<any>(fromNavigation.AddressSuccess()),
    dispatchDefault: () => dispatch<any>(fromNavigation.AddressRequest()),
    loadAddressList: (orders: IOrderConfirmation[]) => dispatch<any>(fromAddress.loadAddressList(orders)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressPageContainer);
