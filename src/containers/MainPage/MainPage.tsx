import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import MainPage from '../../components/pages/MainPage/MainPage';

import * as fromNavigation from '../../store/navigation';

interface IDispatchProps {
  getNavBars: typeof fromNavigation.HomeRequest;
}

class MainPageContainer extends Component<IDispatchProps> {
  componentDidMount() {
    this.props.getNavBars();
  }
  render() {
    return <MainPage />;
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    getNavBars: () => dispatch<any>(fromNavigation.HomeRequest()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(MainPageContainer);
