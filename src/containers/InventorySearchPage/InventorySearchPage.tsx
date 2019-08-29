import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromHeader from '../../store/header';
import * as fromNavigation from '../../store/navigation';
import InventorySearchPage from '../../components/pages/InventorySearchPage/InventorySearchPage';
import { resolveHeaderTextKey } from '../../helpers/header';

interface IDispatchProps {
  getNavBars: typeof fromNavigation.InventorySearchDefault;
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
}

type TProps = IDispatchProps;

class InventorySearchPageContainer extends Component<TProps> {
  componentDidMount() {
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
  }

  render() {
    return <InventorySearchPage />;
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    getNavBars: () => dispatch<any>(fromNavigation.InventorySearchDefault()),
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(InventorySearchPageContainer);
