import React from 'react';

import styles from './SpecialAdjustOptionListItem.module.scss';
import { IAdjustOption, IOption } from '../../../types/size-correction';
import SelectBox from '../../atoms/SelectBox/SelectBox';
import { toSizeAdjustOptionLookups } from '../../../helpers/size-correction';
import { ILookupItem } from '../../../types/lookup';
import Label from '../../atoms/Label/Label';

interface IProps {
  option: IAdjustOption;
  history: IOption;
}

const SpecialAdjustOptionListItem: React.FC<IProps> = (props: IProps) => {
  const { option, history } = props;

  const onChangeSizeAdjust = (value: ILookupItem) => {
    console.log(`selected: ${value.value}`);
  };

  return (
    <div id={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.none}>Not Display Element</div>
          <div className={styles.value}>
            <SelectBox
              data={toSizeAdjustOptionLookups(option.optionClasses)}
              selectedOption={history.optionClassNumber}
              onValueChanged={onChangeSizeAdjust}
              disabled={true}
            />
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.none}>Not Display Element</div>
        </div>
        <div className={styles.right}>
          <div className={styles.item}>
            <div className={styles.label}>
              <Label text={option.optionName} translate={false} />
            </div>
            <div className={styles.value}>
              <SelectBox
                data={toSizeAdjustOptionLookups(option.optionClasses)}
                selectedOption={history.optionClassNumber}
                onValueChanged={onChangeSizeAdjust}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialAdjustOptionListItem;
