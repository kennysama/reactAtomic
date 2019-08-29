import React from 'react';

import styles from './NudeDimensionSection.module.scss';
import Label from '../../atoms/Label/Label';
import Title from '../../atoms/Title/Title';
import { INudeDemension, IPartsGauge } from '../../../types/size-correction';
import Button from '../../atoms/Button/Button';
import NudeDimensionList from '../../molecules/NudeDimensionList/NudeDimensionList';
import RecommendedGaugeList from '../../molecules/RecommendedGaugeList/RecommendedGaugeList';

interface IProps {
  nudeDimensions: INudeDemension[];
  gauges: IPartsGauge[];
}

const NudeDimensionSection: React.FC<IProps> = (props: IProps) => {
  const { nudeDimensions, gauges } = props;

  return (
    <div id={styles.container}>
      <div className={styles.title}>
        <Title title={'ヌード採寸'} />
      </div>
      <div className={styles.measure}>
        <div className={styles.left}>
          <div className={styles.label}>
            <Label text={'採寸日'} translate={false} />
          </div>
          <div className={styles.date}>
            <Label text={'2019.04.26'} translate={false} />
          </div>
          <Button styles={['size-s']}>更新</Button>
        </div>
        <div className={styles.right}>
          <NudeDimensionList nudeDimensions={nudeDimensions} />
        </div>
      </div>
      <div className={styles.gauge}>
        <div className={styles.label}>
          <Label text={'推奨ゲージ'} translate={false} />
        </div>
        <div className={styles.list}>
          <RecommendedGaugeList gauges={gauges} />
        </div>
      </div>
    </div>
  );
};

export default NudeDimensionSection;
