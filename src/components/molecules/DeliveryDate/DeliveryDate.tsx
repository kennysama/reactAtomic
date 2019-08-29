import React, { Component } from 'react';

import styles from './DeliveryDate.module.scss';
import Title from '../../atoms/Title/Title';
import InputText from '../../atoms/InputText/InputText';
import Button from '../../atoms/Button/Button';
import * as fromAddress from '../../../store/address';
import Label from '../../atoms/Label/Label';
// import SelectBox from '../../atoms/SelectBox/SelectBox';
import { IOrderDelivery, getConfirmButton, IConfirmButton } from '../../../types/order';
import SelectBox from '../../atoms/SelectBox/SelectBox';
import {
  ORDER_DELIVERY_METHOD_LIST,
  ORDER_DELIVERY_TIME_LIST,
  ORDER_DELIVERY_DATE_LIST,
} from '../../../lookups/address';
import { ILookupItem } from '../../../types/lookup';

interface IState {
  orderDelivery: IOrderDelivery;
}

interface IProps {
  confirmed: boolean;
  orderDelivery: IOrderDelivery;
  itemId: number;
  setOrderDelivery: typeof fromAddress.setOrderDelivery;
  onSwitch: (itemId: number) => void;
}

class OrderDelivery extends Component<IProps, IState> {
  private translate = 'OrderDelivery.';

  constructor(props: any) {
    super(props);
    this.state = {
      orderDelivery: this.props.orderDelivery,
    };
  }

  render() {
    return (
      <div className={styles.delivery}>
        <div className={styles.title}>
          <Title styles={['lineLightBrown']} title={this.translate + 'title'} />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.columnSize1}>
              <Label text="お渡し方法" />
              <div className={styles.inputWrap}>
                <div className={styles.inputItem1}>
                  <SelectBox
                    disabled={this.props.confirmed}
                    data={[...ORDER_DELIVERY_METHOD_LIST]}
                    selectedOption={this.state.orderDelivery.method.id}
                    onValueChanged={this.handleMethod}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnSize1}>
              <Label text={this.translate + 'dayTime'} />
              <div className={styles.inputWrap}>
                <div className={styles.inputItem2}>
                  <SelectBox
                    disabled={this.props.confirmed}
                    data={[...ORDER_DELIVERY_DATE_LIST]}
                    selectedOption={this.state.orderDelivery.date.id}
                    onValueChanged={this.handleDate}
                  />{' '}
                </div>
                <div className={styles.inputItem2}>
                  <SelectBox
                    disabled={this.props.confirmed}
                    data={[...ORDER_DELIVERY_TIME_LIST]}
                    selectedOption={this.state.orderDelivery.time.id}
                    onValueChanged={this.handleTime}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnSize1}>
              <Label text={this.translate + 'deliveryFee'} />
              <div className={styles.inputWrap}>
                <div className={styles.inputItem1}>
                  <InputText
                    placeholder="¥0"
                    disabled={this.props.confirmed}
                    onValueChanged={this.handleFee}
                    value={this.state.orderDelivery.fee}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleDate = (date: ILookupItem) => {
    this.setState({ orderDelivery: { ...this.state.orderDelivery, date } });
  };

  handleTime = (time: ILookupItem) => {
    this.setState({ orderDelivery: { ...this.state.orderDelivery, time } });
  };

  handleMethod = (method: ILookupItem) => {
    this.setState({ orderDelivery: { ...this.state.orderDelivery, method } });
  };

  handleFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDelivery: { ...this.state.orderDelivery, fee: value } });
  };

  onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.setOrderDelivery(this.state.orderDelivery, this.props.itemId);
    this.props.onSwitch(this.props.itemId);
  };

  getConfirmedButton(confirmed: boolean) {
    const ButtonIcon: IConfirmButton = getConfirmButton(confirmed);
    return <Button onClick={this.onClickHandler}>{this.translate + ButtonIcon.lockText}</Button>;
  }
}

export default OrderDelivery;
