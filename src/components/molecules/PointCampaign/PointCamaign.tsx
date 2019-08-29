import React, { Component } from 'react';

import styles from './PointCampaign.module.scss';
import Title from '../../atoms/Title/Title';
import InputText from '../../atoms/InputText/InputText';
import Button from '../../atoms/Button/Button';

import Label from '../../atoms/Label/Label';
import { getConfirmButton, IConfirmButton, IOrderCampaign } from '../../../types/order';

interface IState {
  orderCampain: IOrderCampaign;
}

interface IProps {
  confirmed: boolean;
  orderCampain: IOrderCampaign;
  onSwitch: (state: IOrderCampaign, editable: boolean) => void;
}

class PointCampaign extends Component<IProps, IState> {
  private translate = 'PointCampaign.';

  constructor(props: any) {
    super(props);
    this.state = {
      orderCampain: this.props.orderCampain,
    };
  }

  render() {
    return (
      <div className={styles.pointCampaign}>
        <div className={styles.title}>
          <Title title={this.translate + 'title'} />
        </div>
        <div className={styles.left}>
          <div className={styles.label}>
            <Label position="TOP" text={this.translate + 'campaignCoupon'} />
          </div>
          <InputText
            placeholder="points not used"
            disabled={this.props.confirmed}
            onValueChanged={this.onAvailablePointsChangeHandler}
            value={this.state.orderCampain.pointsNotUsed}
          />
        </div>
        <div className={styles.left}>
          <div className={styles.button}>{this.getConfirmedButton(this.props.confirmed)}</div>
        </div>
      </div>
    );
  }

  onAvailablePointsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderCampain: { ...this.state.orderCampain, pointsNotUsed: value } });
  };

  onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const editable = !this.props.confirmed;
    this.props.onSwitch(this.state.orderCampain, editable);
  };

  getConfirmedButton(confirmed: boolean) {
    const ButtonIcon: IConfirmButton = getConfirmButton(confirmed);
    return (
      <Button icon={ButtonIcon.icon} onClick={this.onClickHandler}>
        {this.translate + ButtonIcon.lockText}
      </Button>
    );
  }
}

export default PointCampaign;
