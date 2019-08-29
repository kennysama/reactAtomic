import React from 'react';

import styles from './SizeAdjustSection.module.scss';
import { IAdjustOption, IMeasurementListItemProps, IOption, IPartsGauge } from '../../../types/size-correction';
import { TPartsNumber } from '../../../types/order-items';
import PartsTab from '../../atoms/PartsTab/PartsTab';
import Button from '../../atoms/Button/Button';
import PartsSizeAdjustContent from '../PartsSizeAdjustContent/PartsSizeAdjustContent';

interface IProps {
  adjustOptions: IAdjustOption[];
  measurementItems: IMeasurementListItemProps[];
  histories: IOption[];
  selectedParts: TPartsNumber;
  selectedGauge: IPartsGauge;
  recommendedGauges: IPartsGauge[];
}

const SizeAdjustSection: React.FC<IProps> = (props: IProps) => {
  const { adjustOptions, measurementItems, histories, selectedParts, selectedGauge, recommendedGauges } = props;
  return (
    <div id={styles.container}>
      <div className={styles.top}>
        <div className={styles.tab}>
          <PartsTab partsGauges={recommendedGauges} selectedParts={selectedParts} />
        </div>
        <div className={styles.button}>
          <Button styles={['size-m']}>サイズチャート</Button>
        </div>
      </div>
      <div className={styles.container}>
        <PartsSizeAdjustContent
          baseGauge={selectedGauge}
          adjustOptions={adjustOptions}
          measurementItems={measurementItems}
          histories={histories}
        />
      </div>
    </div>
  );
};

export default SizeAdjustSection;
