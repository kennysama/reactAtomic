import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState } from '../store';
import * as fromStaff from '../store/staff';

import { ERouterPath } from '../types/index';
import { resolvePath } from '../helpers/path';

interface IStateProps {
  loggedIn: boolean;
}

class AppRouterGuard extends Component<IStateProps, {}> {
  render() {
    return this.props.loggedIn ? this.props.children : <Redirect to={resolvePath(ERouterPath.login)} />;
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    loggedIn: fromStaff.loggedIn(state),
  };
}

export default connect(mapStateToProps)(AppRouterGuard);
