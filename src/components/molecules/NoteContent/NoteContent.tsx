import React from 'react';

import styles from './NoteContent.module.scss';
import Title from '../../atoms/Title/Title';
import { IOrderNote } from '../../../types/order';
import Label from '../../atoms/Label/Label';

interface IProps {
  noteContent: IOrderNote;
}

const NoteContent: React.FC<IProps> = ({ noteContent }) => {
  const translate = 'NoteContent.';

  return (
    <div className={styles.noteContent}>
      <div className={styles.title}>
        <Title title={translate + 'title'} />
      </div>
      <div className={styles.left}>
        <Label position="TOP" text={translate + 'productTotal'} />
        <Label position="TOP" text={translate + 'shippingFee'} />
        <Label position="TOP" text={translate + 'paymentFee'} />
        <Label position="TOP" text={translate + 'usagePoints'} />
        <Label position="TOP" styles={['bold']} text={translate + 'total'} />
      </div>
      <div className={styles.left}>
        <Label position="TOP" text={noteContent.productsTotal} />
        <Label position="TOP" text={noteContent.shippingFee} />
        <Label position="TOP" text={noteContent.paymentFee} />
        <Label position="TOP" text={noteContent.usagepoints} />
        <Label position="TOP" styles={['bold']} text={noteContent.total} />
      </div>
    </div>
  );
};

export default NoteContent;
