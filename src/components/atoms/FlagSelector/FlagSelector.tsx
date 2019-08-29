import React from 'react';

import { ILookupItem, TLookup } from '../../../types/lookup';
import styles from './FlagSelector.module.scss';
import { Nullable } from '../../../types';
import { isInputChecked } from '../../../helpers';

export interface IProps {
  name: string;
  data: TLookup;
  checkedValue: Nullable<string | number>;
  onValueChanged: (value: ILookupItem) => void;
}

const FlagSelector: React.FC<IProps> = ({ name, data, checkedValue, onValueChanged }) => {
  return (
    <React.Fragment>
      <div className={styles.flagSelector}>
        {data.map((item, idx) => (
          <label className={styles.button} key={idx}>
            <input
              type="radio"
              className={styles.input}
              name={name}
              value={item.id}
              checked={isInputChecked(String(checkedValue), item)}
              onChange={onChangeHandler}
            />
            <span className={styles.text} style={{ backgroundImage: `url(${item.url})` }} />
          </label>
        ))}
      </div>
    </React.Fragment>
  );
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const selectedItem = data.find((item: ILookupItem) => item.id === Number(value));
    if (selectedItem) {
      onValueChanged(selectedItem);
    }
  }
};

export default FlagSelector;
