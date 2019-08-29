import React from 'react';

import styles from './CreditCard.module.scss';
import Label from '../../atoms/Label/Label';

const CreditCard: React.FC<{}> = () => {
 const translate = 'CreditSelection.';
 return (
      <div >
        <Label styles={['bold', 'large', 'blue']} position="TOP" text={translate + 'credit'} />
        <div className={styles.image}>
          <img alt={'tmp'} src="/images/order/credit.png" width="100%" height="200%" />
        </div>
      </div>
    );
  };

export default CreditCard;
