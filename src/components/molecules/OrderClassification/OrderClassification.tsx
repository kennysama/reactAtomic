import React from 'react';

import styles from './OrderClassification.module.scss';
import RadioGroup from '../../atoms/RadioGroup/RadioGroup';
import LinkButton from '../LinkButton/LinkButton';
import { ERouterPath } from '../../../types';
import { getOrderClassification } from '../../../types/radio-group';
import I18TextContainer from '../../../containers/I18Text/I18Text';

const translate = 'Home.';
const OrderClassification: React.FC = props => {
  return (
    <React.Fragment>
      <div className={styles.leftBlock}>
        <div className={styles.classification}>
          <p className={styles.title}>
            <I18TextContainer textKey={translate + 'classification'} />
          </p>
          <RadioGroup groupName="ordersClassification" handleChange={handleChange} data={getOrderClassification()} />
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.btn}>
          <LinkButton styles={['search']} to={ERouterPath.ordersSearch} label={translate + 'orderSearch'} />
        </div>
        <div className={styles.btn}>
          <LinkButton styles={['search']} to={ERouterPath.inventorySearch} label={translate + 'fabricDelivery'} />
        </div>
      </div>
    </React.Fragment>
  );

  function handleChange(newValue: string) {
    console.log(newValue);
  }
};
export default OrderClassification;
