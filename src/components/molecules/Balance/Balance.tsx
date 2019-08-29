import React from 'react';

import styles from './Balance.module.scss';
import Label from '../../atoms/Label/Label';

interface IProps {
  balance: string;
}

const Balance: React.FC<IProps> = ({ balance }) => {
  const translate = 'Balance.';

  return (
    <div className={styles.balance}>
      <div className="balance__left">
        <Label styles={['red', 'bold', 'large']} position="TOP" text={translate + 'balance'} />
      </div>
      <div className={styles.left}>
        <Label styles={['red', 'bold', 'large']} position="TOP" text={balance} />
      </div>
    </div>
  );
};

export default Balance;
