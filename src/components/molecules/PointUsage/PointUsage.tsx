import React, { Component } from 'react';

import styles from './PointUsage.module.scss';
import Title from '../../atoms/Title/Title';
import InputText from '../../atoms/InputText/InputText';
import Button from '../../atoms/Button/Button';

import Label from '../../atoms/Label/Label';
import { getConfirmButton, IConfirmButton, IOrderPoints } from '../../../types/order';

interface IState {
  orderPoints: IOrderPoints;
}

interface IProps {
  confirmed: boolean;
  orderPoints: IOrderPoints;
  onSwitch: (state: IOrderPoints, editable: boolean) => void;
}

class PointUsage extends Component<IProps, IState> {
  private translate = 'PointUsage.';

  constructor(props: any) {
    super(props);
    this.state = {
      orderPoints: this.props.orderPoints,
    };
  }

  render() {
    return (
      <div className={styles.points}>
        <div className={styles.title}>
          <Title title={this.translate + 'title'} />
        </div>

        <div className={styles.left}>
          <div className={styles.label}>
            <Label position="TOP" text={this.translate + 'points'} />
          </div>
          <div className={styles.label}>
            <InputText
              placeholder="opt(available points:2,200pt)"
              disabled={this.props.confirmed}
              onValueChanged={this.onAvailablePointsChangeHandler}
              value={this.state.orderPoints.availablePoints}
            />
          </div>
          <div className={styles.label}>
            <Label position="TOP" text={this.translate + 'currentPoints'} />
          </div>
          <InputText
            placeholder="0¥"
            disabled={this.props.confirmed}
            onValueChanged={this.onCurrentPointsChangeHandler}
            value={this.state.orderPoints.currentPoints}
          />
        </div>
        <div className={styles.left}>
          <div className={styles.left}>{this.getConfirmedButton(this.props.confirmed)}</div>
        </div>
      </div>
    );
  }

  onAvailablePointsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderPoints: { ...this.state.orderPoints, availablePoints: value } });
  };

  onCurrentPointsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ orderPoints: { ...this.state.orderPoints, currentPoints: value } });
  };

  onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const editable = !this.props.confirmed;
    this.props.onSwitch(this.state.orderPoints, editable);
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

export default PointUsage;
