import React, { Component } from 'react';

import InputText from '../../atoms/InputText/InputText';
import KeyboardFooter from '../../atoms/KeyboardFooter/KeyboardFooter';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

interface IProps {
  onInputChange: (newValue: string) => void;
}

interface IDefaultProps {
  value: string;
  disabled: boolean;
  maxValue: number | undefined;
  allowNegative: boolean;
  decimalScale: number;
  placeholder: string;
  showDefaultZero: boolean;
}

type IPropsWithDefaultProps = IProps & IDefaultProps;

interface IState {
  displayKeyboard: boolean;
  value: string;
  formatedValue: string;
}

export class InputKeyboard extends Component<IPropsWithDefaultProps, IState> {
  static defaultProps: IDefaultProps = {
    value: '',
    disabled: false,
    maxValue: undefined,
    allowNegative: false,
    decimalScale: 2,
    placeholder: '',
    showDefaultZero: true,
  };

  static getDerivedStateFromProps(nextProps: IPropsWithDefaultProps, prevState: IState) {
    if (prevState.displayKeyboard) {
      return null;
    }

    if (prevState.value === nextProps.value) {
      return null;
    }

    return {
      value: nextProps.value && (nextProps.value !== '0' && nextProps.showDefaultZero !== false) ? nextProps.value : '',
      formatedValue: '',
      displayKeyboard: prevState.displayKeyboard,
    };
  }
  constructor(props: IPropsWithDefaultProps) {
    super(props);
    this.state = { value: '', formatedValue: '', displayKeyboard: false };
  }

  render() {
    return (
      <React.Fragment>
        <NumberFormat
          customInput={InputText}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          readOnly={true}
          value={this.state.value}
          onValueChange={this.onSuccessValueChange}
          onClick={this.onClickHandler}
          decimalScale={this.props.decimalScale}
          decimalSeparator={'.'}
          allowNegative={this.props.allowNegative}
        />
        <KeyboardFooter
          display={this.state.displayKeyboard}
          onKeyPress={this.onKeyPressHandler}
          onLeave={this.onLeaveHandler}
          displayValue={this.state.formatedValue}
        />
      </React.Fragment>
    );
  }
  onSuccessValueChange = (value: NumberFormatValues) => {
    const newValue = value.value;
    const oldValue = this.state.formatedValue;
    if (this.hasOverMaxValue(newValue)) {
      this.setState({ value: oldValue });
    } else {
      this.setState({ formatedValue: newValue });
    }
  };

  onClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    if (this.state.displayKeyboard) {
      return;
    }
    this.setState({ displayKeyboard: true });
  };

  onLeaveHandler = () => {
    this.setState({ displayKeyboard: false });
    this.props.onInputChange(this.state.formatedValue);
  };

  onKeyPressHandler = (key: string) => {
    const currentValue = this.state.formatedValue;

    switch (key) {
      case 'clear':
        this.setState({ value: '' });
        return;
      case 'delete':
        this.setState({ value: currentValue.slice(0, -1) });
        return;
      default:
        if (this.props.decimalScale === 0 && key === '.') {
          return;
        }

        this.setState({ value: currentValue + key });
        return;
    }
  };

  hasOverMaxValue = (newFormatedValue: string): boolean => {
    if (!this.props.maxValue) {
      return false;
    }

    const nextValue = parseFloat(newFormatedValue);

    return nextValue > this.props.maxValue ? true : false;
  };
}
export default InputKeyboard;
