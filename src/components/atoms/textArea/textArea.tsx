import React from 'react';
import styles from './textArea.module.scss';

export interface IProps {
  placeHolder?: string;
  text?: string;
  disabled: boolean;
  onValueChanged?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<IProps> = ({ placeHolder, text, disabled, onValueChanged }) => {
  return (
    <React.Fragment>
      <textarea
        className={styles.textArea}
        placeholder={placeHolder}
        disabled={disabled}
        value={text}
        onChange={onValueChanged}
      />
    </React.Fragment>
  );
};

export default TextArea;
