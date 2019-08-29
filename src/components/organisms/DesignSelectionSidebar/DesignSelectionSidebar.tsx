import React from 'react';

import styles from './DesignSelectionSidebar.module.scss';

import Button from '../../atoms/Button/Button';
import DesignOptionPartsPanel from '../../molecules/DesignOptionPartsPanel/DesignOptionPartsPanel';

import * as fromDesignSelectionPage from '../../../store/design-selection';
import { IDesignSelection } from '../../../types/option';
import { TPartsNumber } from '../../../types/order-items';
import { getPartsName } from '../../../helpers/option';

interface IProps {
  designSelection: IDesignSelection;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSetDefaultSelectedOptions: typeof fromDesignSelectionPage.setDefaultSelectedOptions;
  onAddParts: typeof fromDesignSelectionPage.addParts;
  onDeleteParts: typeof fromDesignSelectionPage.deleteParts;
}

const DesignSelectionSidebar: React.FC<IProps> = (props: IProps) => {
  const { sidebarParts } = props.designSelection;

  const renderDeleteButton = (partsNumber: TPartsNumber, partsIndex: number) => {
    const { deletableParts } = props.designSelection;
    const isDisable = deletableParts.filter(v => v === partsNumber).length < 1;
    if (isDisable) {
      return null;
    }

    // FIXME: should be transtarte.
    const buttonName = `${getPartsName(partsNumber)}を削除`;
    return (
      <div className={styles.button}>
        <Button onClick={onHandleDelete(partsNumber, partsIndex)} styles={['black', 'block', 'size-l']}>
          {buttonName}
        </Button>
      </div>
    );
  };

  const onHandleDelete = (partsNumber: TPartsNumber, partsIndex: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { onDeleteParts } = props;
    onDeleteParts(partsNumber, partsIndex);
  };

  const renderAddButtons = () => {
    const { addableParts } = props.designSelection;
    const parts = addableParts.sort();
    const buttonName = (v: TPartsNumber) => `${getPartsName(v)}を追加`;
    return (
      <div className={styles.button}>
        {parts.map((v, index) => (
          <Button key={index} onClick={onHandleAdd(v)} styles={['black', 'block', 'size-l']}>
            {`${buttonName(v)}`}
          </Button>
        ))}
      </div>
    );
  };

  const onHandleAdd = (partsNumber: TPartsNumber) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { onAddParts } = props;
    onAddParts(partsNumber);
  };

  return (
    <React.Fragment>
      <div className={styles.sidebar}>
        {sidebarParts
          .sort((a, b) => +a.number - +b.number || a.index - b.index)
          .map((sidebarPart, key) => {
            const partsName = getPartsName(sidebarPart.number);
            return (
              <React.Fragment key={key}>
                <DesignOptionPartsPanel
                  partsName={partsName}
                  partsNumber={sidebarPart.number}
                  partsIndex={sidebarPart.index}
                  designSelection={props.designSelection}
                  onSelectOption={props.onSelectOption}
                  onSetDefaultSelectedOptions={props.onSetDefaultSelectedOptions}
                />
                {renderDeleteButton(sidebarPart.number, sidebarPart.index)}
              </React.Fragment>
            );
          })}
        {renderAddButtons()}
      </div>
    </React.Fragment>
  );
};

export default DesignSelectionSidebar;
