import React from 'react';

import styles from './OrderWithoutPayment.module.scss';
import CheckBox from '../../atoms/CheckBox/CheckBox';

interface IProps {
  checked: boolean;
  onPaymentChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderWithoutPayment: React.FC<IProps> = ({ onPaymentChangeHandler }) => {
  const translate = 'OrderWithoutPayment.';

  return (
    <div className={styles.orderWithoutPayment}>
      <CheckBox
        styles={['black', 'large']}
        onChange={onPaymentChangeHandler}
        label={translate + 'orderWithoutPayment'}
      />
    </div>
  );
};

export default OrderWithoutPayment;
