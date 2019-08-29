import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import styles from './AddressPage.module.scss';
import OrderDestination from '../../molecules/OrderDestination/OrderDestination';
import * as fromNavigation from '../../../store/navigation';

import { IOrderAddress } from '../../../types/order';
import OrderDelivery from '../../molecules/DeliveryDate/DeliveryDate';
import { IOrderConfirmation } from '../../../types/order-confirmation';
import Title from '../../atoms/Title/Title';
import * as fromAddress from '../../../store/address';

import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';
import { ERouterPath } from '../../../types';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';

interface IProps {
  dispatchSucess: typeof fromNavigation.AddressSuccess;
  dispatchDefault: typeof fromNavigation.AddressRequest;
  orderConfirmationItems: IOrderConfirmation[];
  setOrderDestination: typeof fromAddress.setOrderDestination;
  setOrderDelivery: typeof fromAddress.setOrderDelivery;
  ordersIdList: IOrderAddress[];
}

interface IState {
  destinationDisableItems: number[];
  deliveryDisableItems: number[];
}

const initialState: IState = {
  destinationDisableItems: [],
  deliveryDisableItems: [],
};

type TProps = IProps & RouteComponentProps;

class AddressPage extends Component<TProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.addressPage}>
          <div className={styles.addressPageContent}>
            {this.props.ordersIdList
              .sort((a, b) => +a.id - +b.id)
              .map((item, index) => (
                <div key={item.id}>
                  <div className={styles.header}>
                    <Title
                      styles={['bgBrightBrown']}
                      title={`オーダー ${index + 1} / ${this.props.orderConfirmationItems.length}`}
                    />
                  </div>
                  <OrderDestination
                    setOrderDestination={this.props.setOrderDestination}
                    orderDestination={item.orderDestination}
                    confirmed={this.isConfirmedDestination(item.id)}
                    onSwitch={this.onDestinationSaveHandler}
                    itemId={item.id}
                  />
                  <OrderDelivery
                    setOrderDelivery={this.props.setOrderDelivery}
                    orderDelivery={item.orderDelivery}
                    confirmed={this.isConfirmedDelivery(item.id)}
                    onSwitch={this.onDeliverySaveHandler}
                    itemId={item.id}
                  />
                </div>
              ))}
          </div>
        </div>
        {utility(this.props)}
      </React.Fragment>
    );
  }

  isConfirmedDestination = (itemId: number): boolean => {
    const { destinationDisableItems } = this.state;
    if (destinationDisableItems.find(v => v === itemId)) {
      return true;
    }
    return false;
  };

  onDestinationSaveHandler = (itemId: number): void => {
    const { destinationDisableItems } = this.state;
    if (!this.isConfirmedDestination(itemId)) {
      this.setState({
        ...this.state,
        destinationDisableItems: [...destinationDisableItems, itemId],
      });
      return;
    }

    this.setState({
      ...this.state,
      destinationDisableItems: destinationDisableItems.filter(v => v !== itemId),
    });
  };

  isConfirmedDelivery = (itemId: number): boolean => {
    const { deliveryDisableItems } = this.state;
    if (deliveryDisableItems.find(v => v === itemId)) {
      return true;
    }
    return false;
  };

  onDeliverySaveHandler = (itemId: number): void => {
    const { deliveryDisableItems } = this.state;
    if (!this.isConfirmedDelivery(itemId)) {
      this.setState({
        ...this.state,
        deliveryDisableItems: [...deliveryDisableItems, itemId],
      });
      return;
    }

    this.setState({
      ...this.state,
      deliveryDisableItems: deliveryDisableItems.filter(v => v !== itemId),
    });
  };

  addressHandler = (itemId: number) => {
    if (!this.isConfirmedDelivery) {
      this.props.dispatchDefault();
      return;
    }

    if (!this.isConfirmedDestination) {
      this.props.dispatchDefault();
      return;
    }

    this.props.dispatchSucess();
  };
}

function getFooterButtons(props: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
      textKey: '商品追加',
    },
    {
      type: 'back',
      path: ERouterPath.orderConfirmation,
    },
    {
      type: 'next',
      path: ERouterPath.amount,
    },
    {
      type: 'confirm',
      textKey: 'point・日時へ',
      isDisabled: true,
      path: ERouterPath.amount,
    },
  ];
}

function utility(props: TProps) {
  return (
    <React.Fragment>
      {/* <LoadingInfo isLoading={prop.isLoading} displayType="absolute" /> */}
      <FunctionFooter buttons={getFooterButtons(props)} />
    </React.Fragment>
  );
}

export default withRouter(AddressPage);
