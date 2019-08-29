import React from 'react';

import Label from '../../atoms/Label/Label';
import Title from '../../atoms/Title/Title';
import styles from './TotalPayementDetails.module.scss';

import { IOrderConfirmation } from '../../../types/order-confirmation';
import { calcOptionTotal } from '../../../helpers/option';
import { getTotalOrdersPayment, getOrderTotal } from '../../../helpers/order-confirmation';

interface IProps {
  orderConfirmationItems: IOrderConfirmation[];
}

const TotalPayementDetails: React.FC<IProps> = ({ orderConfirmationItems }) => {
  const translate = 'TotalPaymentDetails.';
  const date = '2019.05.31';
  return (
    <div className={styles.payementDetails}>
      <div className={styles.content}>
        <div className={styles.row}>
          <Label styles={['red', 'bold', 'medium']} position="TOP" text={translate + 'mainLabel'} />
          <Label
            styles={['medium', 'bold']}
            position="TOP"
            text={`¥ ${getTotalOrdersPayment(orderConfirmationItems)}(税込)`}
          />
        </div>
      </div>
      <br />
      <br />
      <div className={styles.content}>
        {orderConfirmationItems.map((item, index) => (
          <div key={item.orderConfirmationItemId}>
            <div className={styles.row}>
              <Title styles={['red', 'bold', 'medium']} title={translate + 'order'} />
              <span>{`${index + 1} / ${orderConfirmationItems.length}`}</span>
            </div>
            <div className={styles.row}>
              <Label styles={['bold']} position="TOP" text={translate + 'basePrice'} />
              <Label styles={['bold']} position="TOP" text={`¥ ${item.clothSelection.retailPriceTaxin} (税込)`} />
            </div>
            <div className={styles.row}>
              <Label styles={['bold']} position="TOP" text={translate + 'optionPrice'} />
              <Label
                styles={['bold']}
                position="TOP"
                text={`¥ ${calcOptionTotal(
                  item.designSelection.designSelection.availableOptions,
                  item.designSelection.designSelection.selectedOptions,
                )} (税込)`}
              />
            </div>
            <div className={styles.row}>
              <Label styles={['bold']} position="TOP" text={translate + 'productTotal'} />
              <Label styles={['bold']} position="TOP" text={`¥ ${getOrderTotal(item)} (税込)`} />
            </div>
            <br />
            <hr />
            <div className={styles.row}>
              <Label styles={['red', 'bold', 'medium']} position="TOP" text={translate + 'deliveryDate'} />
              <span>{date}</span>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <br />
      </div>
    </div>
  );
};

export default TotalPayementDetails;
