import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './DesignOptionSpecialSelectBox.module.scss';

import { NO_SELECT_OPTION_CLASS_NUMBER } from '../../../lookups/option';
import { Nullable } from '../../../types';
import { IDesignSelection, IOptionSelectBox } from '../../../types/option';
import { toSpecialOptionLookups } from '../../../helpers/option';

interface IProps {
  designSelection: IDesignSelection;
  selectBoxState: IOptionSelectBox;
  onOpen?: () => void;
  onClose?: () => void;
  onSelect?: (optionClassNumber: Nullable<string>, isFromSelectBox: boolean) => void;
}

type TEvent = React.ChangeEvent<{
  name?: string | undefined;
  value: any;
}>;

const DesignOptionSpecialSelectBox: React.FC<IProps> = (props: IProps) => {
  const { onOpen, onClose, onSelect } = props;
  const { hasOpen, selectedOptionClassNumber, optionTypes } = props.selectBoxState;
  const displayValue = selectedOptionClassNumber ? selectedOptionClassNumber : NO_SELECT_OPTION_CLASS_NUMBER;
  const selectItems = toSpecialOptionLookups(optionTypes);

  const handleOpen = () => {
    if (!onOpen) {
      return;
    }
    onOpen();
  };

  const handleClose = () => {
    if (!onClose) {
      return;
    }
    onClose();
  };

  const handleSelect = (event: TEvent) => {
    if (!onSelect) {
      return;
    }

    const changedValue = event.target.value !== '' ? String(event.target.value) : '';
    const isChange = selectedOptionClassNumber !== changedValue;
    if (!isChange) {
      return;
    }
    onSelect(changedValue, true);
  };

  return (
    <FormControl className={styles.control}>
      <Select
        className={styles.select}
        value={displayValue}
        open={hasOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleSelect}
        displayEmpty={true}
      >
        {[...selectItems].map((item, index) => (
          <MenuItem value={item.id} key={index}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DesignOptionSpecialSelectBox;
