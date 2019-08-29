import React from 'react';

import * as fromOrderConfirmation from '../../../store/order-confirmation';

import styles from './OrderConfirmationDetails.module.scss';
import Button from '../../atoms/Button/Button';
import Title from '../../atoms/Title/Title';
import LinkButton from '../../molecules/LinkButton/LinkButton';
import { ERouterPath } from '../../../types';
import { IOrderConfirmation } from '../../../types/order-confirmation';
import ClothSelectionResume from '../../molecules/Resumes/ClothSelectionResume/ClothSelectionResume';
import DesignSelectionResume from '../../molecules/Resumes/DesignSelectionResume/DesignSelectionResume';
import SizeCorrectionResume from '../../molecules/Resumes/SizeCorrectionResume/SizeCorrectionResume';

interface IProps {
  orderConfirmationItems: IOrderConfirmation[];
  editOrderConfirmationItem: typeof fromOrderConfirmation.editOrderConfirmationItem;
  copyOrderConfirmationItem: typeof fromOrderConfirmation.copyOrderConfirmationItem;
  deleteOrderConfirmationItem: typeof fromOrderConfirmation.deleteOrderConfirmationItem;
}

const OrderConfirmationDetails: React.FC<IProps> = ({
  orderConfirmationItems,
  editOrderConfirmationItem,
  copyOrderConfirmationItem,
  deleteOrderConfirmationItem,
}) => (
  <div className={styles.orderConfirmationItemsDetails}>
    {orderConfirmationItems.map((item, index) => (
      <div className={styles.item} key={item.orderConfirmationItemId}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title styles={['small']} title={`Order: ${index + 1} / ${orderConfirmationItems.length}`} />
          </div>

          <Button onClick={copyOrderConfirmationItem.bind(copyOrderConfirmationItem, item)}>Copy</Button>
          <Button onClick={deleteOrderConfirmationItem.bind(deleteOrderConfirmationItem, item.orderConfirmationItemId)}>
            Delete
          </Button>
        </div>

        <div className={styles.content}>
          <br />
          <ClothSelectionResume />
          <div onClick={editOrderConfirmationItem.bind(editOrderConfirmationItem, item.orderConfirmationItemId)}>
            <LinkButton to={ERouterPath.clothSelection} label={'Load'} />
          </div>
          <hr />
          <br />
          <DesignSelectionResume />
          <div onClick={editOrderConfirmationItem.bind(editOrderConfirmationItem, item.orderConfirmationItemId)}>
            <LinkButton to={ERouterPath.designSelection} label={'Load'} />
          </div>
          <hr />
          <br />
          <SizeCorrectionResume />
          <div onClick={editOrderConfirmationItem.bind(editOrderConfirmationItem, item.orderConfirmationItemId)}>
            <LinkButton to={ERouterPath.sizeCorrection} label={'Load'} />
          </div>
          <hr />
          <br />
          <br />
          <br />
          <hr />
          if(お客様情報)? お客様情報 Resume Component : null
          <div onClick={editOrderConfirmationItem.bind(editOrderConfirmationItem, item.orderConfirmationItemId)}>
            <LinkButton to={ERouterPath.home} label={'Load'} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default OrderConfirmationDetails;
