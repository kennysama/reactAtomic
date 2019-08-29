import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';

import { IndexedObject } from '../../types';
import I18Text from '../../components/atoms/I18Text/I18Text';
import * as fromLanguage from '../../store/language';
import { I18Children } from '../../helpers/i18n';

interface IStateProps {
  currentLanguage: IndexedObject;
}

interface IProps {
  textKey?: string;
  currentLanguage: IndexedObject;

  translateChildren?: I18Children;
}

type TProps = IStateProps & IProps;

class I18TextContainer extends Component<TProps> {
  render() {
    return (
      <I18Text
        textKey={this.props.textKey}
        currentLanguage={this.props.currentLanguage}
        translateChildren={this.props.translateChildren}
      />
    );
  }
}
function mapStateToProps(state: AppState): IStateProps {
  return {
    currentLanguage: fromLanguage.getLanguageResource(state),
  };
}

export default connect(mapStateToProps)(I18TextContainer);
