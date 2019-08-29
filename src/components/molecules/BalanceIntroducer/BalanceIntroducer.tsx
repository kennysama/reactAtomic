import React, { Component } from 'react';

import styles from './BalanceIntroducer.module.scss';
import { IOrderBalance } from '../../../types/order';
import Label from '../../atoms/Label/Label';
import InputText from '../../atoms/InputText/InputText';
import { TRadioGroup } from '../../../types/radio-group';
import RadioGroup from '../../atoms/RadioGroup/RadioGroup';

interface IState {
  balance: IOrderBalance;
}

interface IProps {
  balance: IOrderBalance;
  selected: boolean;
  onSwitch: (state: IOrderBalance, editable: boolean) => void;
  RadioButtonsData: TRadioGroup[];
  codeReturnValue: string;
}

class BalanceIntroducer extends Component<IProps, IState> {
  private translate = 'BalanceIntroducer.';

  constructor(props: any) {
    super(props);
    this.state = {
      balance: this.props.balance,
    };
  }

  render() {
    return (
      <div className={styles.balanceIntroducer}>
        <div className={styles.left}>
          <Label position="LEFT" styles={['black']} text={this.translate + 'introducer'} />
          <RadioGroup groupName="ordersBalance" handleChange={this.handleChange} data={this.props.RadioButtonsData} />
          <InputText
            disabled={this.props.selected}
            labelPosition="LEFT"
            placeholder="referre code"
            label={this.translate + 'referreCode'}
            onValueChanged={this.onReferreCodeChangeHandler}
            value={this.state.balance.referrerCode}
          />
          <InputText
            disabled={true}
            placeholder="referre code"
            onValueChanged={this.onReferreCodeChangeHandler}
            value={this.props.codeReturnValue}
          />
        </div>
      </div>
    );
  }

  onReferreCodeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ balance: { ...this.state.balance, referrerCode: value } });
  };

  handleChange = (newValue: string) => {
    const editable = newValue === 'none' ? true : false;
    this.props.onSwitch(this.state.balance, editable);
  };
}

export default BalanceIntroducer;
