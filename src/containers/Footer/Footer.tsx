import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';

import * as fromNavigation from '../../store/navigation';
import * as fromOrderConfirmation from '../../store/order-confirmation';

import Footer from '../../components/organisms/Footer/Footer';
import { IFooter } from '../../types/footer';
import { ERouterPath } from '../../types';
import { Dispatch } from 'redux';

interface IDispatchProps {
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
}
type TProps = IDispatchProps & IFooter;

class FooterContainer extends Component<TProps> {
  render() {
    return (
      <Footer
        footer={this.props.footer}
        leftBtnHandler={this.leftBtnHandler}
        prevBtnHandler={this.prevBtnHandler}
        nextBtnHandler={this.nextBtnHandler}
        rightBtnHandler={this.rightBtnHandler}
        saveHalfWayHandler={this.saveHalfWayHandler}
      />
    );
  }

  leftBtnHandler = (to: ERouterPath) => {
    switch (to) {
      case ERouterPath.home:
        this.props.clearItemSteps();
        break;
    }
  };
  prevBtnHandler = (to: ERouterPath) => {
    // remove if not needed in the future
  };

  saveHalfWayHandler = (to: ERouterPath) => {
    this.props.createNewItem();
  };

  nextBtnHandler = (to: ERouterPath) => {
    // remove if not needed in the futuere
  };

  rightBtnHandler = (to: ERouterPath) => {
    switch (to) {
      case ERouterPath.orderConfirmation:
        this.props.createNewItem();

        break;
    }
  };
}
function mapStateToProps(state: AppState): IFooter {
  return {
    footer: fromNavigation.getFooterButtons(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    createNewItem: () => dispatch<any>(fromOrderConfirmation.createNewItem()),
    clearItemSteps: () => dispatch<any>(fromOrderConfirmation.clearItemSteps()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterContainer);
