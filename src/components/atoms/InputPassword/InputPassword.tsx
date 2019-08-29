import React from 'react';
import Label from '../Label/Label';
import styles from './InputPassword.module.scss';

export interface IProps {
  label?: string;
  placeholder?: string;
  onValueChanged?: (value: any) => void;
  onEnterPressed?: (value: any) => void;
}

const InputPassword: React.FC<IProps> = ({ label, placeholder, onEnterPressed, onValueChanged }) => {
  return (
    <div className={styles.inputPassword}>
      <Label text={label} />
      <input
        className={styles.input}
        type="password"
        placeholder={placeholder}
        onChange={onValueChanged}
        onKeyUp={onKeyUp}
      />
    </div>
  );
  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      if (onEnterPressed) {
        onEnterPressed(event.currentTarget.value);
      }
    }
  }
};

export default InputPassword;
