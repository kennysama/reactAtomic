import React from 'react';

import styles from './NudeDimensionList.module.scss';
import { INudeDemension } from '../../../types/size-correction';
import NudeDimensionListItem from '../NudeDimensionListItem/NudeDimensionListItem';

interface IProps {
  nudeDimensions: INudeDemension[];
}

const NudeDimensionList: React.FC<IProps> = (props: IProps) => {
  const { nudeDimensions } = props;
  return (
    <div id={styles.container}>
      {nudeDimensions.map((nudeDimension, i) => {
        return <NudeDimensionListItem key={i} nudeDimension={nudeDimension} />;
      })}
    </div>
  );
};

export default NudeDimensionList;
