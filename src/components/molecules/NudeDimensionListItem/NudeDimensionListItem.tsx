import React from 'react';

import styles from './NudeDimensionListItem.module.scss';
import Label from '../../atoms/Label/Label';
import InputKeyboard from '../InputKeyboard/InputKeyboard';
import { INudeDemension } from '../../../types/size-correction';

interface IProps {
  nudeDimension: INudeDemension;
  onFunc?: () => void;
}

const NudeDimensionListItem: React.FC<IProps> = (props: IProps) => {
  const { name, code } = props.nudeDimension;

  const onInputChange = (value: string) => {
    if (props.onFunc) {
      props.onFunc();
    }
    console.log(`selected value is ${value}`);
  };

  return (
    <div id={styles.container}>
      <div className={styles.row}>
        <div className={styles.label}>
          <Label text={name} translate={false} />
        </div>
        <div className={styles.value}>
          <InputKeyboard onInputChange={onInputChange} value={(+code * 0.08).toFixed(0)} />
        </div>
      </div>
    </div>
  );
};

export default NudeDimensionListItem;
