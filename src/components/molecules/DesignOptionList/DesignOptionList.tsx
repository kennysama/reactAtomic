import React from 'react';

import styles from './DesignOptionList.module.scss';

import * as fromDesignSelectionPage from '../../../store/design-selection';
import { IDesignSelection } from '../../../types/option';
import DesignOptionListItem from '../DesignOptionListItem/DesignOptionListItem';
import { filterListItems, filterSpecialListItem } from '../../../helpers/option-filter';
import { TPartsNumber } from '../../../types/order-items';

interface IProps {
  designSelection: IDesignSelection;
  partsNumber: TPartsNumber;
  partsIndex: number;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSetDefaultSelectedOptions: typeof fromDesignSelectionPage.setDefaultSelectedOptions;
}

const DesignOptionList: React.FC<IProps> = (props: IProps) => {
  const { designSelection, partsNumber, partsIndex } = props;
  const { availableOptions } = designSelection;

  const parts = availableOptions.find(v => v.partsNumber === partsNumber);
  if (!parts) {
    return null;
  }

  // FIXME: move to called more top component?
  const normalOptionListItems = filterListItems(designSelection, parts, partsIndex);
  const specialOptionListItem = filterSpecialListItem(designSelection, parts, partsIndex);
  const optionListItems = [...normalOptionListItems, specialOptionListItem];

  return (
    <React.Fragment>
      <div className={styles.list}>
        {optionListItems.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <DesignOptionListItem
                designSelection={props.designSelection}
                partsIndex={props.partsIndex}
                partsNumber={props.partsNumber}
                optionNumber={item.optionNumber}
                optionName={item.optionName}
                isSpecialOption={false}
                // selectbox
                selectBoxState={item.selectBoxState}
                // paper
                paperState={item.paperState}
                // action
                onSelectOption={props.onSelectOption}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default DesignOptionList;
