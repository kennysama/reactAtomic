import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import * as fromOrdersDigests from '../../../store/ordersDigestsSearch';

import OrderDigestsSearchFilter from '../../molecules/OrderDigestsSearchFilter/OrderDigestsSearchFilter';
import { IOrderDigests } from '../../../types/ordersDigests';

import styles from './OrderDigestsSearchPage.module.scss';

import LoadingInfo from '../../molecules/LoadingInfo/LoadingInfo';
import OrderDigestsReport from '../../molecules/OrderDigestsReport/OrderDigestsReport';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import { ERouterPath } from '../../../types';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';

interface IProps {
  ordersDigests: IOrderDigests[];
  getOrderDigests: typeof fromOrdersDigests.GetOrderDigests;
  loading: boolean;
}

type TProps = IProps & RouteComponentProps;

const OrderDigestsSearchPage: React.FC<TProps> = props => {
  return (
    <React.Fragment>
      <div className={styles.orderDigestsSearchPage}>
        <OrderDigestsSearchFilter onGetSearchFilters={props.getOrderDigests} />
        <OrderDigestsReport ordersDigests={props.ordersDigests} />
        <LoadingInfo isLoading={props.loading} displayType="absolute" />
      </div>

      {utility(props)}
    </React.Fragment>
  );
};
function getFooterButtons(prop: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
    },
  ];
}

function utility(prop: TProps) {
  return (
    <React.Fragment>
      {/* <LoadingInfo isLoading={prop.isLoading} displayType="absolute" /> */}
      <FunctionFooter buttons={getFooterButtons(prop)} />
    </React.Fragment>
  );
}

export default withRouter(OrderDigestsSearchPage);
