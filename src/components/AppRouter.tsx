import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ERouterPath } from '../types/index';
import { resolvePath } from '../helpers/path';

import MainPageContainer from '../containers/MainPage/MainPage';
import DialogSamplePage from '../containers/DialogSamplePage/DialogSamplePage';
import OrderDigestsSearchPageContainer from '../containers/OrderDigestsSearchPage/OrderDigestsSearchPage';

import HomePageContainer from '../containers/HomePage/HomePage';
import TestPie from '../components/pages/testPie/testPie';
import ItemContentPageContainer from '../containers/ItemContentPage/ItemContentPage';
import OrderContentPageContainer from '../containers/OrderContentPage/OrderContentPage';
import InventorySearchPageContainer from '../containers/InventorySearchPage/InventorySearchPage';
// tslint:disable-next-line:max-line-length
import OrderConfirmationPageContainer from '../containers/OrderConfirmationPage/OrderConfirmationPage';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path={resolvePath(ERouterPath.samples)} component={MainPageContainer} />
        <Route exact={true} path={resolvePath(ERouterPath.dialog)} component={DialogSamplePage} />
        <Route exact={true} path={resolvePath(ERouterPath.ordersSearch)} component={OrderDigestsSearchPageContainer} />
        <Route exact={true} path={resolvePath(ERouterPath.pieChart)} component={TestPie} />
        <Route exact={true} path={resolvePath(ERouterPath.home)} component={HomePageContainer} />

        <Route
          exact={false}
          path={resolvePath(ERouterPath.orderConfirmation)}
          component={OrderConfirmationPageContainer}
        />
        <Route exact={false} path={resolvePath(ERouterPath.itemContentPage)} component={ItemContentPageContainer} />
        <Route exact={false} path={resolvePath(ERouterPath.orderContentPage)} component={OrderContentPageContainer} />
        <Route exact={true} path={resolvePath(ERouterPath.inventorySearch)} component={InventorySearchPageContainer} />

        <Redirect from="/" to={resolvePath(ERouterPath.samples)} />
      </Switch>
    );
  }
}

export default AppRouter;
