import React from 'react';

import styles from './PartsTab.module.scss';
import Label from '../Label/Label';
import { getPartsName } from '../../../helpers/option';
import { TPartsNumber } from '../../../types/order-items';
import { IPartsGauge } from '../../../types/size-correction';

interface IProps {
  partsGauges: IPartsGauge[];
  selectedParts: TPartsNumber;
}

const PartsTab: React.FC<IProps> = (props: IProps) => {
  const { partsGauges, selectedParts } = props;

  const getClassName = (partsNumber: TPartsNumber) => {
    const baseClasses = [styles.tab];
    if (selectedParts === partsNumber) {
      baseClasses.push(styles.tabActive);
    }
    return baseClasses.join(' ');
  };

  return (
    <div id={styles.container}>
      {partsGauges.map(v => {
        return (
          <div key={v.partsNumber} className={getClassName(v.partsNumber)}>
            <div className={styles.parts}>
              <Label text={getPartsName(v.partsNumber)} translate={false} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartsTab;
