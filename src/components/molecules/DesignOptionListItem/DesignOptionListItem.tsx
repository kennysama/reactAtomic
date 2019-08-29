import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';

import styles from './DesignOptionListItem.module.scss';

import { Nullable } from '../../../types';
import { IDesignSelection, IOptionSelectingParam, IOptionListItem } from '../../../types/option';
import DesignOptionListItemPaper from '../../atoms/DesignOptionListItemPaper/DesignOptionListItemPaper';
import DesignOptionSpecialSelectBox from '../../atoms/DesignOptionSpecialSelectBox/DesignOptionSpecialSelectBox';
import * as fromDesignSelectionPage from '../../../store/design-selection';

interface IProps {
  designSelection: IDesignSelection;
  partsIndex: number;
  // action
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSelectOptionType?: typeof fromDesignSelectionPage.selectOptionType;
}

type TProps = IProps & IOptionListItem;

const DesignOptionListItem: React.FC<TProps> = (props: TProps) => {
  const { isSpecialOption, onSelectOption, onSelectOptionType } = props;
  const { selectedOptions, selectingOption } = props.designSelection;

  const handleClose = () => {
    const param: IOptionSelectingParam = {
      ...selectingOption,
      hasOpenPopup: false,
    };
    onSelectOption(selectedOptions, param);
  };

  const handleSelect = (optionClassNumber: Nullable<string>, isFromSelectBox: boolean) => {
    const { partsIndex, partsNumber, optionNumber } = props;
    const canShowPopup = isFromSelectBox ? false : isSpecialOption;

    const param: IOptionSelectingParam = {
      partsIndex,
      partsNumber,
      optionNumber,
      optionClassNumber,
      hasOpenPopup: canShowPopup,
    };

    if (onSelectOptionType && isFromSelectBox) {
      onSelectOptionType(selectedOptions, param);
    }

    onSelectOption(selectedOptions, param);
  };

  const renderItem = () => {
    return (
      <div className={styles.item}>
        <div className={styles.left}>
          <p className={styles.label}>{props.optionName}</p>
        </div>
        <div className={styles.right}>
          <DesignOptionListItemPaper
            designSelection={props.designSelection}
            paper={props.paperState}
            onSelect={handleSelect}
          />
        </div>
      </div>
    );
  };

  const renderSelector = () => {
    return (
      <div className={styles.selector}>
        <div className={styles.left}>
          <React.Fragment />
        </div>
        <div className={styles.right}>
          <DesignOptionSpecialSelectBox
            designSelection={props.designSelection}
            selectBoxState={props.selectBoxState}
            onClose={handleClose}
            onSelect={handleSelect}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderItem()}
      {renderSelector()}
    </div>
  );
};

export default DesignOptionListItem;
