import React from 'react';

import styles from './DateRangePicker.module.scss';
import DatePicker from '../../atoms/DatePicker/DatePicker';

export interface IProps {
  dateFrom: Date;
  dateTo: Date;
  onDateFromChange: (date: Date) => void;
  onDateToChange: (date: Date) => void;
}

const DateRangePicker: React.FC<IProps> = ({ onDateToChange, onDateFromChange, dateFrom, dateTo }) => {
  return (
    <div id={styles.container}>
      <DatePicker selectedDate={dateFrom} onDateChange={onDateFromChangeHandler} />
      <div className={styles.label}>〜</div>
      <DatePicker selectedDate={dateTo} onDateChange={onDateToChangeHandler} />
    </div>
  );

  function onDateFromChangeHandler(date: Date) {
    const datePickerTo = dateTo;
    const newdateFrom = date;
    if (newdateFrom <= datePickerTo) {
      onDateFromChange(newdateFrom);
    }
  }

  function onDateToChangeHandler(date: Date) {
    const datePickerFrom = dateFrom;
    const newDateTo = date;
    if (newDateTo >= datePickerFrom) {
      onDateToChange(newDateTo);
    }
  }
};

export default DateRangePicker;
