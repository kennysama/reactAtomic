import React from 'react';

import I18TextContainer from '../../../containers/I18Text/I18Text';

import styles from './Logo.module.scss';

const Logo: React.FC<{}> = ({ children }) => {
  return (
    <React.Fragment>
      <h1 className={styles.logo}>
        <I18TextContainer textKey={String(children)} />
      </h1>
    </React.Fragment>
  );
};

export default Logo;
