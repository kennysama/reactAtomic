import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromNavigation from '../../store/navigation';
import * as fromHeader from '../../store/header';
import { resolveHeaderTextKey } from '../../helpers/header';
import SettlementPage from '../../components/pages/SettlementPage/SettlementPage';

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.SettlementRequest;
}

type TProps = IDispatchProps;

class SettlementPageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
  }

  render() {
    return <SettlementPage />;
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.SettlementRequest()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(SettlementPageContainer);
