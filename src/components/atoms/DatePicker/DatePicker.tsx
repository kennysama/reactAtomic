import React from 'react';

import { DatePicker as DatePickerMaterial, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import Label from '../Label/Label';
import styles from './DatePicker.module.scss';

export interface IProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  labelPosition?: 'LEFT' | 'TOP';
  label?: string;
}

const DatePicker: React.FC<IProps> = ({ selectedDate, onDateChange, labelPosition = 'LEFT', label = '' }) => {
  function onDateChangeHandler(date: Date | null) {
    if (date !== null) {
      const value = date;
      onDateChange(value);
    }
  }

  return (
    <div className={styles.container}>
      <Label text={label} position={labelPosition} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePickerMaterial
          autoOk={true}
          variant="inline"
          value={selectedDate}
          onChange={onDateChangeHandler}
          format="yyyy/MM/dd"
          disableToolbar={true}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
