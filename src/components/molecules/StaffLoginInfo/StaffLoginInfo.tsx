import React from 'react';

import styles from './StaffLoginInfo.module.scss';

import I18TextContainer from '../../../containers/I18Text/I18Text';

import { IStaff } from '../../../types/staff';

interface IProps {
  staff: IStaff;
}
const PAGE_TITLE_KEY = 'Header';
const getTextKey = (key: string) => {
  return `${PAGE_TITLE_KEY}.${key}`;
};

const StaffInfo: React.FC<IProps> = ({staff}) => {

    const { tempoCode: shopCode, staffCode } = staff;
    return (
      <div className={styles.staffWrapper}>
        <dl>
          <dt>
            <I18TextContainer textKey={getTextKey('shopId')} />
          </dt>
          <dd>{shopCode}</dd>
        </dl>
        <dl>
          <dt>
            <I18TextContainer textKey={getTextKey('staffCode')} />
          </dt>
          <dd>{staffCode}</dd>
        </dl>
      </div>
      /*
          <Label styles={['header--bold']} text={getTextKey('shopId')} />
          <Label styles={['header']} text={shopCode} translate={false} />
          <Label styles={['header--bold']} text={getTextKey('staffCode')} />
          <Label styles={['header']} text={staffCode} translate={false} />
      */
    );
  };

export default StaffInfo;
