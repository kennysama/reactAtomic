import React from 'react';

import styles from './GaugeSelector.module.scss';
import { IPartsGauge } from '../../../types/size-correction';
import Label from '../Label/Label';

interface IProps {
  partsGauge: IPartsGauge;
  label?: string;
  isTranslate?: boolean;
}

// FIXME: 普通のセレクターではないので、動的な部分はあとで再依頼します。
const GaugeSelector: React.FC<IProps> = (props: IProps) => {
  const { partsGauge, label, isTranslate } = props;
  const gauge = `${partsGauge.gauge.majorGauge} ${partsGauge.gauge.minorGauge}`;
  const hasLabel = label ? true : false;

  if (hasLabel) {
    return (
      <div id={styles.container}>
        <div className={styles.label}>
          <Label text={label} translate={isTranslate} />
        </div>
        <div className={styles.value}>{gauge}</div>
      </div>
    );
  }

  return (
    <div id={styles.container}>
      <div className={styles.value}>{gauge}</div>
    </div>
  );
};

export default GaugeSelector;
