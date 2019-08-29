import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { resolveHeaderTextKey } from '../../helpers/header';
import * as fromHeader from '../../store/header';
import * as fromNavigation from '../../store/navigation';
import AmountPage from '../../components/pages/AmountPage/AmountPage';

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.AmountRequest;
  dispatchSucess: typeof fromNavigation.AmountSuccess;
  dispatchDefault: typeof fromNavigation.AmountRequest;
}

type TProps = IDispatchProps;

class AmountPageContainer extends Component<TProps> {
  componentDidMount() {
    this.props.getNavBars();
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
  }

  render() {
    return <AmountPage dispatchDefault={this.props.dispatchDefault} dispatchSucess={this.props.dispatchSucess} />;
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.AmountRequest()),
    dispatchSucess: () => dispatch<any>(fromNavigation.AmountSuccess()),
    dispatchDefault: () => dispatch<any>(fromNavigation.AmountRequest()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(AmountPageContainer);
