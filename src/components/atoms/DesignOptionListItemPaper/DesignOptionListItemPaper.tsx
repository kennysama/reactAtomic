import React from 'react';

import styles from './DesignOptionListItemPaper.module.scss';
import { IDesignSelection, IOptionPaper } from '../../../types/option';
import { Nullable } from '../../../types';

interface IProps {
  designSelection: IDesignSelection;
  paper: IOptionPaper;
  onSelect: (optionClassNumber: Nullable<string>, isFromSelectBox: boolean) => void;
}

const DesignOptionListItemPaper: React.FC<IProps> = (props: IProps) => {
  const { optionClassNumber, optionClassName, priceTaxIn, hasSelected, isDisable, isRequire } = props.paper;

  const onHandleSelect = () => {
    if (isDisable) {
      return;
    }
    props.onSelect(optionClassNumber, false);
  };

  const getPaperClassName = () => {
    const base = styles.paper;
    const classes = [base];
    if (isDisable) {
      classes.push(styles.paperDisable);
    }
    if (hasSelected) {
      classes.push(styles.paperSelected);
    }
    if (isRequire) {
      classes.push(styles.paperRequierd);
    }
    return classes.join(' ');
  };

  return (
    <React.Fragment>
      <dl className={getPaperClassName()} onClick={onHandleSelect}>
        <dt>{optionClassName}</dt>
        {/* FIXME: translate */}
        <dd>
          {`¥ ${priceTaxIn} `}
          <span className={styles.tax}>(税込)</span>
        </dd>
      </dl>
    </React.Fragment>
  );
};

export default DesignOptionListItemPaper;
