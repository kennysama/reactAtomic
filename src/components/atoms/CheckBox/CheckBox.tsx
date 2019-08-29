import React from 'react';
// import Checkbox from '@material-ui/core/Checkbox';

// import Label from '../Label/Label';
import I18TextContainer from '../../../containers/I18Text/I18Text';

import cssStyles from './CheckBox.module.scss';
interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  styles?: string[];
  disabled?: boolean;
  value?: string;
  label?: string;
}

const CheckBox: React.FC<IProps> = ({ onChange, checked, styles = [], disabled, value, label }) => {
  return (
    <React.Fragment>
      <div className={cssStyles.checkGroup}>
        <label>
          <input type="checkbox" disabled={disabled} checked={checked} value={value} onChange={onChange} />
          <span>
            <I18TextContainer textKey={label} />
          </span>
        </label>
      </div>
    </React.Fragment>
  );
};

export default CheckBox;
