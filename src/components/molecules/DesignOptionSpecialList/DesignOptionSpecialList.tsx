import React from 'react';

import styles from './DesignOptionSpecialList.module.scss';

import * as fromDesignSelectionPage from '../../../store/design-selection';
import { IDesignSelection } from '../../../types/option';
import DesignOptionListItem from '../DesignOptionListItem/DesignOptionListItem';
import { filterListItems } from '../../../helpers/option-filter';

interface IProps {
  designSelection: IDesignSelection;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSelectOptionType: typeof fromDesignSelectionPage.selectOptionType;
}

const DesignOptionSpecialList: React.FC<IProps> = (props: IProps) => {
  const { availableOptions, selectingOption, sidebarParts } = props.designSelection;
  const { partsIndex } = selectingOption;
  const selectingSidebarPart = sidebarParts.find(v => v.index === partsIndex);
  if (!selectingSidebarPart) {
    return null;
  }

  const selectingParts = availableOptions.find(v => v.partsNumber === selectingSidebarPart.number);
  if (!selectingParts) {
    return null;
  }

  const specialOptions = filterListItems(props.designSelection, selectingParts, partsIndex, true);
  return (
    <React.Fragment>
      <div className={styles.list}>
        {specialOptions.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <DesignOptionListItem
                designSelection={props.designSelection}
                partsIndex={partsIndex}
                partsNumber={selectingSidebarPart.number}
                optionNumber={item.optionNumber}
                optionName={item.optionName}
                isSpecialOption={true}
                // selectbox
                selectBoxState={item.selectBoxState}
                // paper
                paperState={item.paperState}
                // action
                onSelectOption={props.onSelectOption}
                onSelectOptionType={props.onSelectOptionType}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default DesignOptionSpecialList;
