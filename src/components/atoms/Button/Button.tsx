import React from 'react';
import Icon from '@material-ui/core/Icon/Icon';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import cssStyles from './Button.module.scss';

import { TIcon } from '../../../types/icon';

interface IProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dataId?: string;
  blockClassName?: string;
  styles?: string[];
  icon?: TIcon;
  disabled?: boolean;
}

const getClassName = (base: string, styles: string[]): string => {
  const classNames = [base];
  if (styles.find(v => v === 'block')) {
    classNames.push(cssStyles.block);
  }
  if (styles.find(v => v === 'white')) {
    classNames.push(cssStyles.white);
  }
  if (styles.find(v => v === 'black')) {
    classNames.push(cssStyles.black);
  }
  if (styles.find(v => v === 'dark')) {
    classNames.push(cssStyles.dark);
  }
  if (styles.find(v => v === 'red')) {
    classNames.push(cssStyles.red);
  }
  if (styles.find(v => v === 'pink')) {
    classNames.push(cssStyles.pink);
  }
  if (styles.find(v => v === 'square')) {
    classNames.push(cssStyles.square);
  }
  if (styles.find(v => v === 'size-xs')) {
    classNames.push(cssStyles.xs);
  }
  if (styles.find(v => v === 'size-s')) {
    classNames.push(cssStyles.s);
  }
  if (styles.find(v => v === 'size-l')) {
    classNames.push(cssStyles.l);
  }
  if (styles.find(v => v === 'size-xl')) {
    classNames.push(cssStyles.xl);
  }
  if (styles.find(v => v === 'center')) {
    classNames.push(cssStyles.center);
  }
  if (styles.find(v => v === 'right')) {
    classNames.push(cssStyles.right);
  }
  if (styles.find(v => v === 'logout')) {
    classNames.push(cssStyles.logout);
  }
  if (styles.find(v => v === 'search')) {
    classNames.push(cssStyles.search);
  }
  if (styles.find(v => v === 'home')) {
    classNames.push(cssStyles.home);
  }
  if (styles.find(v => v === 'cart')) {
    classNames.push(cssStyles.cart);
  }
  if (styles.find(v => v === 'arwLeft')) {
    classNames.push(cssStyles.arwLeft);
  }
  if (styles.find(v => v === 'arwRight')) {
    classNames.push(cssStyles.arwRight);
  }
  if (styles.find(v => v === 'layout-portrait-icon-button')) {
    classNames.push(cssStyles.layoutPortraitIconButton);
  }
  if (styles.find(v => v === 'footerRight')) {
    classNames.push(cssStyles.footerRight);
  }
  return classNames.join(' ');
};

const Button: React.FC<IProps> = ({
  onClick,
  dataId,
  blockClassName = 'btn',
  styles = [],
  icon,
  disabled = false,
  children,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    data-id={dataId}
    className={getClassName(cssStyles[blockClassName], styles)}
  >
    {icon && icon.position === 'LEFT' && <Icon className="icon_small">{icon.name}</Icon>}
    <span>
      <I18TextContainer textKey={String(children)} />
    </span>
    {icon && icon.position === 'RIGHT' && <Icon className="icon_small">{icon.name}</Icon>}
  </button>
);

export default Button;
