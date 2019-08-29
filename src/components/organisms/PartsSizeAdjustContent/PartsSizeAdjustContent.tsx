import React from 'react';

import styles from './PartsSizeAdjustContent.module.scss';
import { IAdjustOption, IMeasurementListItemProps, IPartsGauge, IOption } from '../../../types/size-correction';
import Button from '../../atoms/Button/Button';
import Label from '../../atoms/Label/Label';
import GaugeSelector from '../../atoms/GaugeSelector/GaugeSelector';
import MeasurementList from '../../molecules/MeasurementList/MeasurementList';
import SpecialAdjustOptionList from '../../molecules/SpecialAdjustOptionList/SpecialAdjustOptionList';

interface IProps {
  baseGauge: IPartsGauge;
  adjustOptions: IAdjustOption[];
  measurementItems: IMeasurementListItemProps[];
  histories: IOption[];
}

const PartsSizeAdjustContent: React.FC<IProps> = (props: IProps) => {
  const { adjustOptions, measurementItems, baseGauge, histories } = props;

  return (
    <div id={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.button}>
            <Button styles={['size-s']}>購入履歴</Button>
            <Button styles={['size-s']}>コピー</Button>
          </div>
          <div className={styles.date}>
            <Label text={'2019.04.26'} translate={false} />
            <div className={styles.gauge}>
              <Label text={'D6 50'} translate={false} />
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.label}>
            <Label text={'ベースゲージ'} translate={false} />
          </div>
          <div className={styles.gauge}>
            <GaugeSelector partsGauge={baseGauge} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <Label text={'仕上がりサイズ'} translate={false} />
          </div>
          <div className={styles.diff}>
            <Label text={'差分'} translate={false} />
          </div>
        </div>
      </div>
      <div className={styles.measure}>
        <MeasurementList items={measurementItems} histories={histories} />
      </div>
      <div className={styles.special}>
        <SpecialAdjustOptionList options={adjustOptions} histories={histories} />
      </div>
    </div>
  );
};

export default PartsSizeAdjustContent;
