import React from 'react';

import styles from './RecommendedGaugeList.module.scss';
import { IPartsGauge } from '../../../types/size-correction';
import { getPartsName } from '../../../helpers/option';
import GaugeSelector from '../../atoms/GaugeSelector/GaugeSelector';

interface IProps {
  gauges: IPartsGauge[];
}

const RecommendedGaugeList: React.FC<IProps> = (props: IProps) => {
  const { gauges } = props;
  return (
    <div id={styles.container}>
      {gauges.map((v, i) => {
        return <GaugeSelector key={i} partsGauge={v} label={getPartsName(v.partsNumber)} />;
      })}
    </div>
  );
};

export default RecommendedGaugeList;
