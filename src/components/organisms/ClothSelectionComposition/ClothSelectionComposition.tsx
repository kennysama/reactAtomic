import React from 'react';

import * as fromClothSelection from '../../../store/clothSelection';

import styles from './ClothSelectionComposition.module.scss';

import Label from '../../atoms/Label/Label';
import SelectBox from '../../atoms/SelectBox/SelectBox';

import { ILookupItem, TLookup } from '../../../types/lookup';
import { IClothSelection } from '../../../types/cloth-selection';
import {
  filterSelectedCompositions,
  isCompositionPercentDisable,
  compositionAsArray,
} from '../../../helpers/composition';
import { InputKeyboard } from '../../molecules/InputKeyboard/InputKeyboard';
import { TCompositionIndex, ICompositionItem } from '../../../types/composition';
import { getShirtColorsLookup } from '../../../helpers/cloth-selection';
import { TSubCategory } from '../../../types/order-items';

interface IProps {
  partitionLookup: TLookup;
  data: IClothSelection;
  compositionChangeHandler: typeof fromClothSelection.compositionChangeHandler;
  compositionPercentChangeHandler: typeof fromClothSelection.compositionPercentChangeHandler;
  disabled: boolean;
  partitionChangeHandler: typeof fromClothSelection.partitionSuccess;
  colorChangeHandler: typeof fromClothSelection.colorSuccess;
  designChangeHandler: typeof fromClothSelection.designSuccess;
  subCategory: TSubCategory;
}

const translate = 'ClothSelectionComposition.';

const ClothSelectionComposition: React.FC<IProps> = props => {
  const { data, disabled, partitionLookup } = props;

  return (
    <div className={styles.clothSelectionComposition}>
      <div className={styles.row}>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'handle'} styles={['medium', 'disabled']} />
            {/* inputがdisabledの時は、labelもdisabledでお願いします。↑例 */}
          </div>
          <SelectBox
            disabled={disabled}
            data={getShirtColorsLookup(props.subCategory)}
            selectedOption={props.data.color.id}
            onValueChanged={props.colorChangeHandler}
          />
        </div>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'color'} styles={['medium']} />
          </div>
          <SelectBox
            disabled={disabled}
            data={getShirtColorsLookup(props.subCategory)}
            selectedOption={props.data.color.id}
            onValueChanged={props.colorChangeHandler}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.columnSize2}>
          <div className={styles.label}>
            <Label text={translate + 'clothComposition'} styles={['medium']} />
          </div>
          <div className={styles.inputWrap}>
            {compositionAsArray(props.data.composition).map((item, index) => (
              <div className={styles.inputSet} key={index}>
                <div className={styles.inputItem1}>
                  <SelectBox
                    disabled={disabled}
                    data={filterSelectedCompositions(props.data.composition, index as TCompositionIndex)}
                    selectedOption={item.id}
                    onValueChanged={onCompositionChangeHandler.bind(
                      onCompositionChangeHandler,
                      index as TCompositionIndex,
                      item,
                    )}
                  />
                </div>
                <div className={styles.inputItem2}>
                  <InputKeyboard
                    maxValue={100}
                    disabled={isCompositionPercentDisable(disabled, item.id)}
                    value={item.percent}
                    onInputChange={onCompositionPercentInputChange.bind(
                      onCompositionPercentInputChange,
                      index as TCompositionIndex,
                      item,
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'partition'} styles={['medium']} />
          </div>
          <SelectBox
            disabled={disabled}
            data={partitionLookup}
            selectedOption={data.partition.id}
            onValueChanged={props.partitionChangeHandler}
          />
        </div>
      </div>
    </div>
  );

  function onCompositionPercentInputChange(index: TCompositionIndex, item: ICompositionItem, newValue: string) {
    const composition = { ...item };
    composition.percent = newValue;
    props.compositionPercentChangeHandler(index, composition);
  }

  function onCompositionChangeHandler(index: TCompositionIndex, item: ICompositionItem, newValue: ILookupItem) {
    const composition = { ...item };
    composition.id = String(newValue.id);
    composition.value = newValue.value;

    newValue.id === '-0'
      ? onCompositionPercentInputChange(index, composition, '0')
      : props.compositionChangeHandler(index, composition);
  }
};

export default ClothSelectionComposition;
