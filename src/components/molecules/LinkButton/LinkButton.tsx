import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Button/Button';

import cssStyles from './LinkButton.module.scss';
import { ERouterPath } from '../../../types/index';
import { resolvePath } from '../../../helpers/path';
import { TIcon } from '../../../types/icon';

interface IProps {
  to: ERouterPath;
  label?: string;
  styles?: string[];
  cssPrefix?: string;
  disabled?: boolean;
  icon?: TIcon;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LinkButton: React.FC<IProps> = ({ to, label, styles, cssPrefix, disabled, icon, onClick }) => {
  return (
    <Link className={getClassName(disabled)} to={resolvePath(to)}>
      <Button styles={styles} blockClassName={cssPrefix} icon={icon} disabled={disabled} onClick={onClick}>
        {String(label)}
      </Button>
    </Link>
  );
  function getClassName(isdisabled: boolean = false) {
    return isdisabled ? cssStyles.disabled : cssStyles.linkButton;
  }
};

export default LinkButton;
