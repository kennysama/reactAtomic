import React from 'react';

import { IndexedObject } from '../../../types';
import { getMessage, I18Children } from '../../../helpers/i18n';

interface IProps {
  textKey?: string;
  currentLanguage: IndexedObject;
  translateChildren?: I18Children;
}

const I18Text: React.FC<IProps> = ({ textKey, currentLanguage, translateChildren }) => {
  return (
    <React.Fragment>
      {textKey ? getMessage(textKey, currentLanguage) : null}

      {translateChildren
        ? translateChildren.childrenComponent(getMessage(translateChildren.key, currentLanguage))
        : null}
    </React.Fragment>
  );
};

export default I18Text;
