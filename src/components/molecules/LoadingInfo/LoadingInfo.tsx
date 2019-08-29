import React from 'react';

import styles from './LoadingInfo.module.scss';
import Spinner from '../../../components/atoms/Spinner/Spinner';
import I18TextContainer from '../../../containers/I18Text/I18Text';

type TDisplay = 'block' | 'absolute';

interface IProps {
  isLoading?: boolean;
  messageKey?: string;
  displayType?: TDisplay;
}

const LoadingInfo: React.FC<IProps> = ({ isLoading = false, messageKey = '', displayType = 'block', children }) => {
  const message = messageKey ? <I18TextContainer textKey={messageKey} /> : children;

  return (
    <div className={getClassName()}>
      <div>
        {message}
        <Spinner isLoading={isLoading} />
      </div>
    </div>
  );

  function getClassName(): string {
    const classes: string[] = [];
    classes.push(styles.info);

    if (isLoading) {
      classes.push(styles.isLoading);

    }

    if (displayType && displayType === 'absolute') {
      classes.push(styles.absolute);
    }

    return classes.join(' ');
  }
};

export default LoadingInfo;
