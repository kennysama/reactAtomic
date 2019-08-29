import React from 'react';

import I18TextContainer from '../../../containers/I18Text/I18Text';

import styles from './OrderDigestsReport.module.scss';
import { IOrderDigests } from '../../../types/ordersDigests';
import Button from '../../atoms/Button/Button';
// import Title from '../../atoms/Title/Title';

export interface IProps {
  ordersDigests: IOrderDigests[];
}
const translate = 'OrderDigestsReport.';
const OrderDigestsReport: React.FC<IProps> = props => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <p className={styles.title}>
          <I18TextContainer textKey={translate + 'title'} />：<span>{props.ordersDigests.length}件</span>
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.thead}>
          <div className={styles.row}>
            <div className={styles.col1}>ID</div>
            <div className={styles.col2}>氏名(カナ)</div>
            <div className={styles.col3}>氏名(漢字)</div>
            <div className={styles.col4}>カテゴリー</div>
            <div className={styles.col5}>生地</div>
            <div className={styles.col6}>
              注文日時/
              <br />
              更新日時
            </div>
            <div className={styles.col7}>備考欄</div>
            <div className={styles.col8}>
              担当コード/
              <br />
              担当者
            </div>
            <div className={styles.col9}>アクション</div>
          </div>
        </div>
        <div className={styles.tbody}>
          {props.ordersDigests.map(order => (
            <div className={styles.row} key={order.id}>
              <div className={styles.col1}>{order.id}</div>
              <div className={styles.col2}>{order.nameKana}</div>
              <div className={styles.col3}>{order.name}</div>
              <div className={styles.col4}>{order.category}</div>
              <div className={styles.col5}>{order.textile}</div>
              <div className={styles.col6}>
                <p>{order.orderDate}</p>
                <p>更新日時</p>
              </div>
              <div className={styles.col7}>
                {order.memo}
                <Button styles={['block', 'pink', 'size-xs']}>有リ</Button>
              </div>
              <div className={styles.col8}>
                <p>{order.order}</p>
                <p>{order.customer}</p>
              </div>
              <div className={styles.col9}>
                <p>
                  <Button styles={['block', 'black', 'size-xs']}>流用</Button>
                </p>
                <p>
                  <Button styles={['block', 'white', 'size-xs']}>確認/修正</Button>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

/*
備考欄の結果のボタンのパターン
<Button styles={['block', 'pink', 'size-xs']}>有リ</Button>
<Button styles={['block', 'white', 'size-xs']}>入力</Button>
*/

export default OrderDigestsReport;
