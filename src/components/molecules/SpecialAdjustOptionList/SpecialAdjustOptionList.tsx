import React from 'react';

import styles from './SpecialAdjustOptionList.module.scss';
import { IOption, IAdjustOption } from '../../../types/size-correction';
import { getSizeAdjustHistory } from '../../../helpers/size-correction';
import SpecialAdjustOptionListItem from '../SpecialAdjustOptionListItem/SpecialAdjustOptionListItem';

interface IProps {
  options: IAdjustOption[];
  histories: IOption[];
}

const SpecialAdjustOptionList: React.FC<IProps> = (props: IProps) => {
  const { options, histories } = props;
  return (
    <div id={styles.container}>
      {options.map((option, i) => {
        const history = getSizeAdjustHistory(option.optionNumber, histories);
        return <SpecialAdjustOptionListItem key={i} option={option} history={history} />;
      })}
    </div>
  );
};

export default SpecialAdjustOptionList;
