import React from 'react';

import styles from './CheckOutStatus.module.scss';
import Label from '../../atoms/Label/Label';

interface IProps {
  status: string;
  onclick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
}

const CheckOutStatus: React.FC<IProps> = ({ status, onclick }) => {
  const translate = 'CheckOutStatus.';

  return (
    <div className={styles.checkOutStatus}>
      <div className={styles.left}>
        <Label styles={['black', 'large']} position="TOP" text={translate + 'status'} />
      </div>
      <div className={styles.left}>
        <Label styles={['black', 'bold', 'large']} position="TOP" text={status} onClick={onclick} />
      </div>
    </div>
  );
};

export default CheckOutStatus;
