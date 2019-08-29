import React from 'react';
import Button from '../../atoms/Button/Button';

import styles from './DesignOptionPartsPanel.module.scss';

import { IDesignSelection } from '../../../types/option';
import DesignOptionList from '../../molecules/DesignOptionList/DesignOptionList';
import * as fromDesignSelectionPage from '../../../store/design-selection';
import { TPartsNumber } from '../../../types/order-items';

interface IProps {
  designSelection: IDesignSelection;
  partsName: string;
  partsNumber: TPartsNumber;
  partsIndex: number;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSetDefaultSelectedOptions: typeof fromDesignSelectionPage.setDefaultSelectedOptions;
}

const DesignOptionPartsPanel: React.FC<IProps> = (props: IProps) => {
  const { onSetDefaultSelectedOptions, partsIndex, partsNumber } = props;

  const onRecommended = () => {
    onSetDefaultSelectedOptions(partsIndex, partsNumber);
  };

  return (
    <React.Fragment>
      <div className={styles.panel}>
        <div className={styles.title}>
          <h2>{props.partsName}</h2>
          <Button styles={['black', 'size-s']} onClick={onRecommended}>
            お勧め設定
          </Button>
        </div>
        <div className={styles.detail}>
          <DesignOptionList
            partsNumber={props.partsNumber}
            partsIndex={props.partsIndex}
            designSelection={props.designSelection}
            onSelectOption={props.onSelectOption}
            onSetDefaultSelectedOptions={props.onSetDefaultSelectedOptions}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DesignOptionPartsPanel;
