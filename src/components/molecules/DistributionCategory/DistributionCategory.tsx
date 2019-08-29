import React, { Component } from 'react';

import styles from './DistributionCategory.module.scss';
import { IOrderDistributionCategory } from '../../../types/order';
import Label from '../../atoms/Label/Label';
import InputText from '../../atoms/InputText/InputText';
import CheckBox from '../../atoms/CheckBox/CheckBox';

interface IState {
  distributionCategory: IOrderDistributionCategory;
}

interface IProps {
  checked: boolean;
  distributionCategory: IOrderDistributionCategory;
  onSwitch: (state: IOrderDistributionCategory, editable: boolean) => void;
}

class DistributionCategory extends Component<IProps, IState> {
  private translate = 'DistributionCategory.';

  constructor(props: any) {
    super(props);
    this.state = {
      distributionCategory: this.props.distributionCategory,
    };
  }

  render() {
    return (
      <div className={styles.distributionCategory}>
        <div className={styles.left}>
          <div className={styles.label}>
            <Label styles={['bold']} position="LEFT" text={this.translate + 'distributionCategory'} />
          </div>
          <CheckBox onChange={this.onChangeHandler} label={this.translate + 'salesMeeting'} />
          <InputText
            disabled={this.props.checked}
            labelPosition="LEFT"
            placeholder="customer code"
            label={this.translate + 'customerCode'}
            onValueChanged={this.onCustomerCodeChangeHandler}
            value={this.state.distributionCategory.customerCode}
          />
          <InputText
            disabled={true}
            placeholder="customercode"
            onValueChanged={this.onCustomerCodeChangeHandler}
            value={this.state.distributionCategory.customerCodeReturnValue}
          />
        </div>
      </div>
    );
  }

  onCustomerCodeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ distributionCategory: { ...this.state.distributionCategory, customerCode: value } });
  };
  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const editable = !isChecked;
    this.props.onSwitch(this.state.distributionCategory, editable);
  };
}

export default DistributionCategory;
