import React from 'react';

import styles from './MeasurementListItem.module.scss';

import Label from '../../atoms/Label/Label';
import InputText from '../../atoms/InputText/InputText';
import NumericInput from '../NumericInput/NumericInput';
import { IMeasurementListItemProps, IOption } from '../../../types/size-correction';

interface IProps {
  item: IMeasurementListItemProps;
  history: IOption;
}

const MeasurementListItem: React.FC<IProps> = (props: IProps) => {
  const { item, history } = props;
  const { measurementItem, standardSize, selectedSize } = item;
  const onChangeMeasurement = (value: number) => {
    console.log(`selected: ${value}`);
  };

  return (
    <div id={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.item}>
            <div className={styles.label}>
              <Label text={measurementItem.measurementName} translate={false} />
            </div>
            <div className={styles.value}>
              <InputText value={history.optionClassName} disabled={true} />
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div>
            <InputText value={String(standardSize.measurementValue)} disabled={true} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.item}>
            <div className={styles.label}>
              <Label text={measurementItem.measurementName} translate={false} />
            </div>
            <div className={styles.value}>
              <NumericInput
                value={selectedSize}
                step={measurementItem.measurementPitch}
                max={standardSize.measurementValue + measurementItem.adjustmentUpperLimit}
                min={standardSize.measurementValue - measurementItem.adjustmentLowerLimit}
                onValueChanged={onChangeMeasurement}
              />
            </div>
          </div>
          <div className={styles.diff}>
            <Label text={String(standardSize.measurementValue - selectedSize)} translate={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementListItem;
