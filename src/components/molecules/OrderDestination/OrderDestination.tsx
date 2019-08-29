import React, { Component } from 'react';

import styles from './OrderDestination.module.scss';
import Title from '../../atoms/Title/Title';
import InputText from '../../atoms/InputText/InputText';
import Button from '../../atoms/Button/Button';
import Label from '../../atoms/Label/Label';
import { IOrderDestination, IConfirmButton, getConfirmButton } from '../../../types/order';
import DesignatedAddressDialog from '../DesignatedAddressDialog/DesignatedAddressDialog';
import { TOrderDestination } from '../../../types/designated-address';
import * as fromAddress from '../../../store/address';
interface IState {
  orderDestination: IOrderDestination;
  addressDialogOpen: boolean;
}

interface IProps {
  confirmed: boolean;
  orderDestination: IOrderDestination;
  itemId: number;
  onSwitch: (itemCode: number) => void;
  setOrderDestination: typeof fromAddress.setOrderDestination;
}

class OrderDestination extends Component<IProps, IState> {
  private translate = 'OrderDestination.';

  constructor(props: any) {
    super(props);
    this.state = {
      orderDestination: this.props.orderDestination,
      addressDialogOpen: false,
    };
  }

  render() {
    return (
      <div className={styles.orderDestination}>
        <div className={styles.title}>
          <Title styles={['lineLightBrown']} title={this.translate + 'title'} />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.subTitle}>
              <Title styles={['gray', 'medium']} title="ご住所" />
              <Button
                styles={['black', 'size-s']}
                disabled={this.props.confirmed}
                onClick={this.handleAddressDialogOpen}
              >
                {this.translate + 'orderDestinationDialog'}
              </Button>
            </div>

            <div className={styles.row}>
              <div className={styles.columnSize1}>
                <Label text={this.translate + 'shippingPostalCode'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem1}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onZipCodePrefixChangeHandler}
                      value={this.state.orderDestination.shippingPostalCodeLeft}
                    />
                  </div>
                  <div className={styles.inputItemBridge}>-</div>
                  <div className={styles.inputItem2}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onZipCodeChangeHandler}
                      value={this.state.orderDestination.shippingPostalCodeRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnSize2}>
                <Label text={this.translate + 'shippingCity'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem3}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onPrefectureChangeHandler}
                      value={this.state.orderDestination.shippingCity}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.columnSize3}>
                <Label text={this.translate + 'shippingState'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem3}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onCityChangeHandler}
                      value={this.state.orderDestination.shippingState}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnSize1}>
                <Label text={this.translate + 'shippingResidence'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem3}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onAdressChangeHandler}
                      value={this.state.orderDestination.shippingResidence}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnSize1}>
                <Label text="お名前（フリガナ）" />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem4}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onNameChangeHandler}
                      value={this.state.orderDestination.name}
                    />
                  </div>
                  <div className={styles.inputItem5}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onNameChangeHandler}
                      value={this.state.orderDestination.name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnSize1}>
                <Label text={this.translate + 'name'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem4}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onNameChangeHandler}
                      value={this.state.orderDestination.name}
                    />
                  </div>
                  <div className={styles.inputItem5}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onNameChangeHandler}
                      value={this.state.orderDestination.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.subTitle}>
              <Title styles={['gray', 'medium']} title={this.translate + 'contactInfo'} />
            </div>
            <div className={styles.row}>
              <div className={styles.columnSize4}>
                <Label text={this.translate + 'phoneOne'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem3}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onPhoneOneOneChangeHandler}
                      value={this.state.orderDestination.shippingPhoneNumberPartOne}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.columnSize4}>
                <Label text={this.translate + 'email'} />
                <div className={styles.inputWrap}>
                  <div className={styles.inputItem6}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onEmailPartOneChangeHandler}
                      value={this.state.orderDestination.emailPartOne}
                    />
                  </div>
                  <div className={styles.inputItemMail}>@</div>
                  <div className={styles.inputItem6}>
                    <InputText
                      disabled={this.props.confirmed}
                      onValueChanged={this.onEmailPartTwoChangeHandler}
                      value={this.state.orderDestination.emailPartTwo}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DesignatedAddressDialog
              onSave={this.handleAddressDialogSave}
              onCancel={this.handleAddressDialogCancel}
              open={this.state.addressDialogOpen}
            />
          </div>
        </div>
      </div>
    );
  }

  handleAddressDialogOpen = () => {
    this.setState({ addressDialogOpen: true });
  };

  handleAddressDialogCancel = () => {
    this.setState({ addressDialogOpen: false });
  };

  handleAddressDialogSave = (obj: TOrderDestination) => {
    console.log(obj);
    this.setState({ addressDialogOpen: false, orderDestination: { ...obj } });
  };

  onZipCodePrefixChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPostalCodeLeft: value } });
  };

  onZipCodeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPostalCodeRight: value } });
  };

  onPrefectureChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingCity: value } });
  };

  onAdressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingResidence: value } });
  };

  onCityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingState: value } });
  };

  onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, name: value } });
  };

  onPhoneOneOneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPhoneNumberPartOne: value } });
  };

  onPhoneOneTwoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPhoneNumberPartTwo: value } });
  };

  onPhoneOneThreeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPhoneNumberPartThree: value } });
  };

  onPhoneTwoOneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPhoneNumberTwoPartOne: value } });
  };

  onPhoneTwoTwoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPhoneNumberTwoPartTwo: value } });
  };

  onPhoneTwoThreePrefixChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, shippingPhoneNumberTwoPartThree: value } });
  };

  onEmailPartOneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, emailPartOne: value } });
  };

  onEmailPartTwoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderDestination: { ...this.state.orderDestination, emailPartTwo: value } });
  };

  onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.setOrderDestination(this.state.orderDestination, this.props.itemId);
    this.props.onSwitch(this.props.itemId);
  };

  getConfirmedButton(confirmed: boolean) {
    const ButtonIcon: IConfirmButton = getConfirmButton(confirmed);
    return <Button onClick={this.onClickHandler}>{this.translate + ButtonIcon.lockText}</Button>;
  }
}

export default OrderDestination;
