import React from 'react';
import { Route } from 'react-router-dom';

import { ERouterPath } from '../types';
import { resolvePath } from '../helpers/path';

import AddressPageContainer from '../containers/AddressPage/AddressPage';
import AmountPageContainer from '../containers/AmountPage/AmountPage';
import SettlementPageContainer from '../containers/SettlementPage/SettlementPage';
import PrivacyPolicyContainer from '../containers/PrivacyPolicyPage/PrivacyPolicyPage';

const OrderSubRouter: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Route exact={true} path={resolvePath(ERouterPath.address)} component={AddressPageContainer} />
      <Route exact={true} path={resolvePath(ERouterPath.amount)} component={AmountPageContainer} />
      <Route exact={true} path={resolvePath(ERouterPath.privacyPolicy)} component={PrivacyPolicyContainer} />
      <Route exact={true} path={resolvePath(ERouterPath.settlement)} component={SettlementPageContainer} />
    </React.Fragment>
  );
};

export default OrderSubRouter;
