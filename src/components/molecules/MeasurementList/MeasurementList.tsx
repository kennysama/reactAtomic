import React from 'react';

import styles from './MeasurementList.module.scss';

import { IMeasurementListItemProps, IOption } from '../../../types/size-correction';
import MeasurementListItem from '../MeasurementListItem/MeasurementListItem';
import { getSizeAdjustHistory } from '../../../helpers/size-correction';

interface IProps {
  items: IMeasurementListItemProps[];
  histories: IOption[];
}

const MeasurementList: React.FC<IProps> = (props: IProps) => {
  const { items, histories } = props;
  return (
    <div id={styles.container}>
      {items.map((item, i) => {
        const { measurementNumber } = item.measurementItem;
        const history = getSizeAdjustHistory(measurementNumber, histories);
        return <MeasurementListItem key={i} item={item} history={history} />;
      })}
    </div>
  );
};

export default MeasurementList;
