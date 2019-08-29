import React from 'react';
import Icon from '@material-ui/core/Icon/Icon';
import Button from '@material-ui/core/Button/Button';

import styles from './NumericKeyboard.module.scss';

interface IProps {
  onLeave?: () => void;
  onKeyPress: (value: string) => void;
  displayValue?: string;
}

const NumericKeyboard: React.FC<IProps> = props => {
  const keyboardButtons = [
    { row: ['input', '@@', '@@', 'clear'] },
    { row: ['7', '8', '9', 'delete'] },
    { row: ['4', '5', '6', 'enter'] },
    { row: ['1', '2', '3', '@@'] },
    { row: ['0', '.', '-', '@@'] },
  ];

  return (
    <div className={styles.numericKeyboard}>
      <table className={styles.table}>
        <tbody>
          {keyboardButtons.map(item => (
            <tr key={item.row[0]}>{getColumns(item.row)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function getColumns(columns: string[]) {
    return columns.map(colName => {
      if (colName === '@@') {
        return null;
      }

      switch (colName) {
        case 'input':
          return (
            <td key={colName} className={styles.item} colSpan={3}>
              <span>{props.displayValue}</span>
            </td>
          );
        case 'delete':
          return (
            <td key={colName} className={styles.item} onClick={clickHandler}>
              {genericBtn(colName, 'backspace')}
            </td>
          );
        case 'enter':
          return (
            <td key={colName} className={styles.item} rowSpan={3} onClick={props.onLeave}>
              {genericBtn(colName)}
            </td>
          );
        default:
          return (
            <td key={colName} className={styles.item} onClick={clickHandler}>
              {genericBtn(colName)}
            </td>
          );
      }
    });
  }

  function genericBtn(key: string, icon?: string) {
    const buttonText = icon ? <Icon className="icon_small">{icon}</Icon> : key;
    return (
      <Button className={styles.content} value={key}>
        {buttonText}
      </Button>
    );
  }

  function clickHandler(event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
    const childrenButton: any = event.currentTarget.firstElementChild;

    if (childrenButton) {
      props.onKeyPress(childrenButton.value);
    }
  }
};

export default NumericKeyboard;
