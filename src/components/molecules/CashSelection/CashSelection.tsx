import React from 'react';

import styles from './CashSelection.module.scss';
import Label from '../../atoms/Label/Label';

interface IProps {
  cashNotes: string;
}

const CashSelection: React.FC<IProps> = ({ cashNotes }) => {
  const translate = 'CashSelection.';

  return (
    <React.Fragment>
      <Label styles={['bold', 'large', 'blue']} position="TOP" text={translate + 'cash'} />

      <div className={styles.box}>
        <div className={styles.left}>
          <Label styles={['bold', 'blue']} position="TOP" text={cashNotes} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CashSelection;
