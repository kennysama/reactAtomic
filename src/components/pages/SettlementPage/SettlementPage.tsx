import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import styles from './SettlementPage.module.scss';

import CheckOutStatus from '../../molecules/CheckOutStatus/CheckOutStatus';
import CashSelection from '../../molecules/CashSelection/CashSelection';
import CreditCard from '../../molecules/CreditCard/CreditCard';
import Balance from '../../molecules/Balance/Balance';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import { ERouterPath } from '../../../types';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';

type TProps = {} & RouteComponentProps;

const SettlementPage: React.FC<TProps> = props => {
  return (
    <React.Fragment>
      <div className={styles.settlementPage}>
        <div className={styles.left}>
          <CheckOutStatus status="CONNECTING..." onclick={onClickStatusHandler} />
          <CreditCard />
        </div>
        <div className={styles.right}>
          <Balance balance="¥94,000" />
          <CashSelection cashNotes="説明情報、注意事項をか" />
        </div>
      </div>
      {utility(props)}
    </React.Fragment>
  );
  function onClickStatusHandler(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
    console.log('I am clickable');
  }
};

function getFooterButtons(prop: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
    },
    {
      type: 'back',
      path: ERouterPath.privacyPolicy,
    },
    {
      type: 'next',
      isDisabled: true,
    },
    {
      type: 'confirm',
      textKey: 'お届け先・日時へ',
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

export default withRouter(SettlementPage);
