import React from 'react';

import * as fromOrderConfirmation from '../../../store/order-confirmation';

import styles from './OrderConfirmationPage.module.scss';
import OrderConfirmationDetails from '../../organisms/OrderConfirmationDetails/OrderConfirmationDetails';
import TotalPayementDetails from '../../molecules/TotalPayementDetails/TotalPayementDetails';

import { IOrderConfirmation } from '../../../types/order-confirmation';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';
import { ERouterPath } from '../../../types';
import LoadingInfo from '../../molecules/LoadingInfo/LoadingInfo';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';

interface IProps {
  orderConfirmationItems: IOrderConfirmation[];
  editOrderConfirmationItem: typeof fromOrderConfirmation.editOrderConfirmationItem;
  copyOrderConfirmationItem: typeof fromOrderConfirmation.copyOrderConfirmationItem;
  deleteOrderConfirmationItem: typeof fromOrderConfirmation.deleteOrderConfirmationItem;
}

type TProps = IProps & RouteComponentProps;

const OrderConfirmationPage: React.FC<TProps> = props => (
  <div className={styles.orderConfirmation}>
    <div className={styles.left}>
      <OrderConfirmationDetails
        orderConfirmationItems={props.orderConfirmationItems}
        editOrderConfirmationItem={props.editOrderConfirmationItem}
        copyOrderConfirmationItem={props.copyOrderConfirmationItem}
        deleteOrderConfirmationItem={props.deleteOrderConfirmationItem}
      />
    </div>

    <div className={styles.right}>
      <TotalPayementDetails orderConfirmationItems={props.orderConfirmationItems} />
    </div>
    {utility(props)}
  </div>
);

function getFooterButtons(props: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
    },
    {
      type: 'confirm',
      textKey: 'お届け先・日時へ',
      path: ERouterPath.address,
      isDisabled: props.orderConfirmationItems.length === 0,
    },
  ];
}

function utility(props: TProps) {
  return (
    <React.Fragment>
      <LoadingInfo isLoading={false} displayType="absolute" />
      <FunctionFooter buttons={getFooterButtons(props)} />
    </React.Fragment>
  );
}

export default withRouter(OrderConfirmationPage);
