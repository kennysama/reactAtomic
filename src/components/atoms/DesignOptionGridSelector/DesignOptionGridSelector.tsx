import React from 'react';

import styles from './DesignOptionGridSelector.module.scss';
import * as fromDesignSelectionPage from '../../../store/design-selection';
import { IDesignSelection, IOptionType, IOptionSelectingParam } from '../../../types/option';
import { isSameSelectedOptionParam } from '../../../helpers/option';

interface IProps {
  optionTypes: IOptionType[];
  designSelection: IDesignSelection;
  onSelectOptionType: typeof fromDesignSelectionPage.selectOptionType;
}

const DesignOptionGridSelector: React.FC<IProps> = (props: IProps) => {
  const { onSelectOptionType } = props;
  const { selectedOptions, selectingOption } = props.designSelection;

  const onSelect = (type: IOptionType) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const param: IOptionSelectingParam = {
      ...selectingOption,
      optionClassNumber: type.optionClassNumber,
    };
    onSelectOptionType(selectedOptions, param);
  };

  const hasSelected = (optionClassNumber: string): boolean => {
    const selectedOptionType = selectedOptions.find(v => isSameSelectedOptionParam(v, selectingOption));
    if (!selectedOptionType) {
      return false;
    }
    if (selectedOptionType.optionClassNumber !== optionClassNumber) {
      return false;
    }
    return true;
  };

  const getCardClassName = (type: IOptionType) => {
    if (hasSelected(type.optionClassNumber)) {
      return styles.cardSelected;
    }
    return styles.card;
  };

  const renderCard = (optionType: IOptionType, key: number) => {
    return (
      <div key={key} className={styles.item}>
        <div className={getCardClassName(optionType)} onClick={onSelect(optionType)}>
          <div className={styles.image} title={optionType.optionClassName}>
            <img src={optionType.imagePath} alt={optionType.optionClassName} />
          </div>
          <div className={styles.text}>
            <p>{optionType.optionClassName}</p>
          </div>
        </div>
      </div>
    );
  };

  return <div className={styles.content}>{props.optionTypes.map((type, index) => renderCard(type, index))}</div>;
};

export default DesignOptionGridSelector;
