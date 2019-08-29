import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { Route, Switch, Router, Redirect } from 'react-router-dom';

import './App.scss';
import history from '../helpers/history';
import AppRouterGuard from './AppRouterGuard';
import LoginPageContainer from '../containers/LoginPage/LoginPage';

import { ERouterPath } from '../types/index';
import { resolvePath } from '../helpers/path';
import MainTemplateContainer from '../containers/MainTemplate/MainTemplateContainer';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact={true} path={resolvePath(ERouterPath.login)} component={LoginPageContainer} />
            <AppRouterGuard>
              <MainTemplateContainer />
            </AppRouterGuard>
            <Redirect from="/" to={resolvePath(ERouterPath.login)} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
