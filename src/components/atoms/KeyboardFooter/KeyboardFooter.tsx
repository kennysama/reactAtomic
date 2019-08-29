import React from 'react';

import styles from './KeyboardFooter.module.scss';

import NumericKeyboard from '../NumericKeyboard/NumericKeyboard';

interface IProps {
  display: boolean;
  onLeave?: () => void;
  onKeyPress: (key: string) => void;
  displayValue?: string;
}

const KeyboardFooter: React.FC<IProps> = props => {
  let KeyboardComponent;

  if (!props.display) {
    KeyboardComponent = null;
  } else {
    KeyboardComponent = (
      <React.Fragment>
        <div className={styles.header} onClick={props.onLeave} />
        <div tabIndex={0} className={styles.footer}>
          <NumericKeyboard onLeave={props.onLeave} onKeyPress={props.onKeyPress} displayValue={props.displayValue} />
        </div>
      </React.Fragment>
    );
  }
  return <div className={styles.keyboardFooter}>{KeyboardComponent}</div>;
};

export default KeyboardFooter;
