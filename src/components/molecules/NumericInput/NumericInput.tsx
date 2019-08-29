import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import styles from './NumericInput.module.scss';

import InputKeyboard from '../InputKeyboard/InputKeyboard';

interface IProps {
  value: number;
  step?: number;
  max?: number;
  min?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onValueChanged: (value: number) => void;
}

const NumericInput: React.FC<IProps> = ({ value, step, max, min, onValueChanged }) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.input}>
        <InputKeyboard value={String(value)} onInputChange={onHandleValueChangedInput} />
      </div>
      <div className={styles.button}>
        <IconButton className="input-wrapper__button__add" onClick={onHandleValueChangedAdd}>
          <Icon>add</Icon>
        </IconButton>
        <IconButton className="input-wrapper__button__remove" onClick={onHandleValueChangedMinus}>
          <Icon>remove</Icon>
        </IconButton>
      </div>
    </div>
  );

  function canInput(numberInput: number): boolean {
    if (max && numberInput > max) {
      return false;
    }

    if (min && numberInput < min) {
      return false;
    }

    return true;
  }

  function getStep(): number {
    return step ? step : 1;
  }

  function onHandleValueChangedInput(numberInput: string) {
    const result = Number(numberInput);
    if (!canInput(result)) {
      return onHandleError(result);
    }
    onValueChanged(result);
  }

  function onHandleValueChangedAdd() {
    const result = value + getStep();
    if (!canInput(result)) {
      return onHandleError(result);
    }
    onValueChanged(result);
  }

  function onHandleValueChangedMinus() {
    const result = value - getStep();
    if (!canInput(result)) {
      return onHandleError(result);
    }
    onValueChanged(result);
  }

  function onHandleError(numberInput: number) {
    alert(`invalided value is ${numberInput}`);
  }
};

export default NumericInput;
