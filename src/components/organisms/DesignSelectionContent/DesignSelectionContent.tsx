import React from 'react';

import styles from './DesignSelectionContent.module.scss';

import * as fromDesignSelectionPage from '../../../store/design-selection';
import { Nullable } from '../../../types';
import { IDesignSelection, IOptionPattern } from '../../../types/option';
import DesignOptionGridSelector from '../../atoms/DesignOptionGridSelector/DesignOptionGridSelector';
import DesignOptionSpecialSelector from '../../organisms/DesignOptionSpecialSelector/DesignOptionSpecialSelector';
// import I18TextContainer from '../../../containers/I18Text/I18Text';

interface IProps {
  designSelection: IDesignSelection;
  title: string;
  isSpecial: boolean;
  optionPattern: Nullable<IOptionPattern>;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSelectOptionType: typeof fromDesignSelectionPage.selectOptionType;
  // types ~
  // onChangeOption
}

const DesignSelectionContent: React.FC<IProps> = (props: IProps) => {
  const { optionPattern, isSpecial, title } = props;
  const contentTitle = isSpecial ? '特殊オプション' : title;

  const renderSelector = () => {
    if (!optionPattern) {
      return null;
    }

    if (isSpecial) {
      return (
        <DesignOptionSpecialSelector
          designSelection={props.designSelection}
          onSelectOption={props.onSelectOption}
          onSelectOptionType={props.onSelectOptionType}
        />
      );
    }

    return (
      <DesignOptionGridSelector
        optionTypes={optionPattern.optionTypes}
        designSelection={props.designSelection}
        onSelectOptionType={props.onSelectOptionType}
      />
    );
  };

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{contentTitle}</h3>
      <div className={styles.selector}>{renderSelector()}</div>
    </div>
  );
};

export default DesignSelectionContent;
