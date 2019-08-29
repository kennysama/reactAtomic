import React from 'react';

import styles from './DesignOptionSpecialSelector.module.scss';
import * as fromDesignSelectionPage from '../../../store/design-selection';
import { IDesignSelection } from '../../../types/option';
import DesignOptionSpecialList from '../../molecules/DesignOptionSpecialList/DesignOptionSpecialList';

interface IProps {
  designSelection: IDesignSelection;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSelectOptionType: typeof fromDesignSelectionPage.selectOptionType;
}

const DesignOptionSpecialSelector: React.FC<IProps> = (props: IProps) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        {/* 仮 */}
        <DesignOptionSpecialList {...props} />
      </div>
    </React.Fragment>
  );
};

export default DesignOptionSpecialSelector;
