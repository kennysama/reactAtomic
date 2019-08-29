import React from 'react';

import styles from './ClothSelectionContent.module.scss';
import InputText from '../../atoms/InputText/InputText';
import * as fromClothSelection from '../../../store/clothSelection';
import { IClothSelection } from '../../../types/cloth-selection';
import SelectBox from '../../atoms/SelectBox/SelectBox';
import { ILookupItem, TLookup } from '../../../types/lookup';
import Label from '../../atoms/Label/Label';
import { TOrderItemCode } from '../../../types/order-items';
import Button from '../../atoms/Button/Button';
import InputKeyboard from '../../molecules/InputKeyboard/InputKeyboard';

interface IProps {
  brandLookup: TLookup;
  modelLookup: TLookup;
  data: IClothSelection;
  brandChangeHandler: (value: ILookupItem) => void;
  modelChangeHandler: (value: ILookupItem) => void;
  openIllustrationDialog: () => void;
  optionChangeHandler: typeof fromClothSelection.optionSuccess;
  fabricCodeChangeHandler: typeof fromClothSelection.fabricCodeSuccess;
  deliveryDateChangeHandler: typeof fromClothSelection.deliveryDateSuccess;
  itemClothRequest: typeof fromClothSelection.loadProductDetails;
  itemCode: TOrderItemCode;
  isIllustrationBtnVisible: boolean;
}

const translate = 'ClothSelectionContent.';

const ClothSelectionContent: React.FC<IProps> = props => {
  const { data, modelLookup, modelChangeHandler, brandLookup } = props;

  return (
    <div className={styles.clothSelectionContent}>
      <div className={styles.row}>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'fabricCode'} styles={['large']} />
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.inputItem1}>
              <p className={styles.textItem}>{data.seasonCode}</p>
            </div>
            <div className={styles.inputItem2}>
              <InputKeyboard
                onInputChange={onFabricCodeChangeHandler}
                value={data.fabricCode}
                maxValue={9999}
                allowNegative={false}
                decimalScale={0}
              />
            </div>
          </div>
        </div>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'option'} styles={['large', 'disabled']} />
            {/* inputがdisabledの時は、labelもdisabledでお願いします。↑例 */}
          </div>

          <InputText disabled={true} onValueChanged={onOptionChangeHandler} value={data.option} />
        </div>
        <div className={styles.columnSize2}>
          <div className={styles.label}>
            <Label text={translate + 'deliveryDate'} styles={['large']} />
          </div>
          <p className={styles.textItem}>{data.deliveryDate}</p>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'brand'} styles={['large']} />
          </div>

          <SelectBox data={brandLookup} selectedOption={data.brand.id} onValueChanged={props.brandChangeHandler} />
        </div>
        <div className={styles.columnSize1}>
          <div className={styles.label}>
            <Label text={translate + 'model'} styles={['large']} />
          </div>

          <SelectBox data={modelLookup} selectedOption={data.model.id} onValueChanged={modelChangeHandler} />
        </div>
        <div className={styles.column}> {showIllustrationButton(props.isIllustrationBtnVisible)}</div>
      </div>
    </div>
  );

  function showIllustrationButton(visible: boolean) {
    return visible ? <Button onClick={props.openIllustrationDialog}>{translate + 'illustration'}</Button> : null;
  }

  function onFabricCodeChangeHandler(newValue: string) {
    props.fabricCodeChangeHandler(newValue);

    if (newValue.length === 4 && newValue !== props.data.fabricCode) {
      props.itemClothRequest(props.data.seasonCode, newValue);
    }
  }

  function onOptionChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    props.optionChangeHandler(value);
  }
};

export default ClothSelectionContent;
