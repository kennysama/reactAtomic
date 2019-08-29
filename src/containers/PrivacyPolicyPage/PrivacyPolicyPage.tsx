import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as fromPrivacyPolicy from '../../store/privacyPolicy';
import PrivacyPolicyPage from '../../components/pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { AppState } from '../../store';
import { IPrivacyPolicyState } from '../../store/privacyPolicy/reducer';
import * as fromHeader from '../../store/header';
import { resolveHeaderTextKey } from '../../helpers/header';

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  conditionOneChangeHandler: typeof fromPrivacyPolicy.conditionOneHandler;
  conditionTwoChangeHandler: typeof fromPrivacyPolicy.conditionTwoHandler;
  acceptBtn: typeof fromPrivacyPolicy.PrivacyPolicyAccepted;
  rejectBtn: () => void;
}

type TProps = IDispatchProps & IPrivacyPolicyState;

class PrivacyPolicyContainer extends Component<TProps> {
  componentDidMount() {
    if (this.props.privacyPolicyAccepted) {
      const textKey = resolveHeaderTextKey();
      this.props.setHeaderTitleKey(textKey);
      this.props.acceptBtn();
    }
  }

  render() {
    return (
      <PrivacyPolicyPage
        conditionOne={this.props.conditionOne}
        conditionTwo={this.props.conditionTwo}
        privacyPolicyAccepted={this.props.privacyPolicyAccepted}
        conditionOneChangeHandler={this.props.conditionOneChangeHandler}
        conditionTwoChangeHandler={this.props.conditionTwoChangeHandler}
        acceptBtn={this.props.acceptBtn}
        rejectBtn={this.props.rejectBtn}
      />
    );
  }
}

function mapStateToProps(state: AppState): IPrivacyPolicyState {
  return {
    conditionOne: fromPrivacyPolicy.getConditionOne(state),
    conditionTwo: fromPrivacyPolicy.getConditionTwo(state),
    privacyPolicyAccepted: fromPrivacyPolicy.getPrivacyPolicyAccepted(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    conditionOneChangeHandler: (params: boolean) => dispatch<any>(fromPrivacyPolicy.conditionOneHandler(params)),
    conditionTwoChangeHandler: (params: boolean) => dispatch<any>(fromPrivacyPolicy.conditionTwoHandler(params)),
    acceptBtn: () => dispatch<any>(fromPrivacyPolicy.acceptBtnHandler()),
    rejectBtn: () => console.log('reject'),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivacyPolicyContainer);
