import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import styles from './AmountPage.module.scss';
import {
  IOrderPoints,
  getPointUsage,
  getCampaignPoints,
  IOrderCampaign,
  getOrderNote,
  getDistributionCategory,
  IOrderDistributionCategory,
  IOrderBalance,
  getOrderBalance,
} from '../../../types/order';
import PointUsage from '../../molecules/PointUsage/PointUsage';
import PointCampaign from '../../molecules/PointCampaign/PointCamaign';
import NoteContent from '../../molecules/NoteContent/NoteContent';
import DistributionCategory from '../../molecules/DistributionCategory/DistributionCategory';
import BalanceIntroducer from '../../molecules/BalanceIntroducer/BalanceIntroducer';
import Balance from '../../molecules/Balance/Balance';
import OrderWithoutPayment from '../../molecules/OrderWithoutPayment/OrderWithoutPayment';
import { getBalance } from '../../../types/radio-group';
import * as fromNavigation from '../../../store/navigation';
import Logger from '../../../helpers/logger';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import { ERouterPath } from '../../../types';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';

interface IProps {
  dispatchSucess: typeof fromNavigation.AmountSuccess;
  dispatchDefault: typeof fromNavigation.AmountRequest;
}

interface IState {
  orderPointsEditable: boolean;
  orderCampaignEditable: boolean;
  orderDistributionEditable: boolean;
  orderBalanceEditable: boolean;
}

type TProps = IProps & RouteComponentProps;

class AmountPage extends Component<TProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      orderPointsEditable: false,
      orderCampaignEditable: false,
      orderDistributionEditable: false,
      orderBalanceEditable: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.amountPage}>
          <div className={styles.left}>
            <PointUsage
              confirmed={this.state.orderPointsEditable}
              onSwitch={this.onOrderPointsHandler}
              orderPoints={getPointUsage()}
            />
            <PointCampaign
              orderCampain={getCampaignPoints()}
              confirmed={this.state.orderCampaignEditable}
              onSwitch={this.onOrderCampaignsHandler}
            />
            <NoteContent noteContent={getOrderNote()} />
          </div>
          <div className={styles.right}>
            <Balance balance="¥ 94,000" />
            <BalanceIntroducer
              codeReturnValue="default"
              RadioButtonsData={getBalance()}
              selected={this.state.orderBalanceEditable}
              onSwitch={this.onOrderBalanceHandler}
              balance={getOrderBalance()}
            />
            <DistributionCategory
              checked={this.state.orderDistributionEditable}
              onSwitch={this.onOrderDistributionHandler}
              distributionCategory={getDistributionCategory()}
            />
            <OrderWithoutPayment onPaymentChangeHandler={this.onPaymentChangeHandler} checked={false} />
          </div>
        </div>
        {utility(this.props)}
      </React.Fragment>
    );
  }

  onOrderPointsHandler = (state: IOrderPoints, confirmed: boolean): void => {
    console.log(confirmed);
    console.log(state);

    this.setState({ orderPointsEditable: confirmed }, this.amountHandler);
  };

  onOrderCampaignsHandler = (state: IOrderCampaign, confirmed: boolean): void => {
    console.log(confirmed);
    console.log(state);

    this.setState({ orderCampaignEditable: confirmed }, this.amountHandler);
  };

  onOrderDistributionHandler = (state: IOrderDistributionCategory, checked: boolean): void => {
    console.log(checked);
    console.log(state);
    this.setState({ orderDistributionEditable: checked });
  };

  onOrderBalanceHandler = (state: IOrderBalance, selected: boolean): void => {
    console.log(selected);
    console.log(state);
    this.setState({ orderBalanceEditable: selected });
  };

  onPaymentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    Logger.log('checked is' + event.target.checked);
  };

  amountHandler = () => {
    if (this.state.orderPointsEditable === true && this.state.orderCampaignEditable === true) {
      this.props.dispatchSucess();
    } else {
      this.props.dispatchDefault();
    }
  };
}

function getFooterButtons(props: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
    },
    {
      type: 'back',
      path: ERouterPath.address,
    },
    {
      type: 'next',
      path: ERouterPath.privacyPolicy,
    },
    {
      type: 'confirm',
      textKey: 'pp・日時へ',
      path: ERouterPath.privacyPolicy,
      isDisabled: true,
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

export default withRouter(AmountPage);
