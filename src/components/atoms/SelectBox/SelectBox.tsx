import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import cssStyles from './SelectBox.module.scss';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import Label from '../Label/Label';
import { TLookup, ILookupItem } from '../../../types/lookup';
import { Optional } from '../../../types';

type TEventSelect = React.ChangeEvent<{
  name?: string | undefined;
  value: any;
}>;

interface IProps {
  styles?: string[];
  label?: string;
  data: TLookup;
  selectedOption?: Optional<string | number>;
  onValueChanged: (value: ILookupItem) => void;
  disabled?: boolean;
}
const getClassName = (base: string, styles: string[]): string => {
  const classNames = [base];

  // if condition to pass the style
  // if (styles.find(v => v === 'styleName')) {
  //   classNames.push(cssStyles.styleName);
  // }

  return classNames.join(' ');
};

const SelectBox: React.FC<IProps> = ({ styles = [], label, data, selectedOption, onValueChanged, disabled }) => {
  return (
    <div>
      <Label text={label} />
      <Select
        disabled={disabled}
        className={getClassName(cssStyles.selectBox, styles)}
        value={selectedOption}
        onChange={onChangeHandler}
        displayEmpty={true}
      >
        {showSearchDefaultMessage()}

        {data.map((item: ILookupItem) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              <I18TextContainer textKey={item.value} />
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );

  function onChangeHandler(event: TEventSelect) {
    const value = event.target.value;
    const selected = data.find(x => x.id === value) as ILookupItem;
    if (value !== '') {
      onValueChanged(selected);
    }
  }

  function showSearchDefaultMessage() {
    if (selectedOption === '' && disabled !== true) {
      return (
        <MenuItem value="">
          <em>
            <Label text="Selectbox.defaultMessage" />
          </em>
        </MenuItem>
      );
    }
  }
};

export default SelectBox;
