import React from 'react';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import cssStyles from './Label.module.scss';

interface IProps {
  text?: string;
  styles?: string[];
  position?: 'LEFT' | 'TOP';
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  translate?: boolean;
}

const getClassName = (base: string, styles: string[]): string => {
  const classNames = [base];
  if (styles.find(v => v === 'aqua')) {
    classNames.push(cssStyles.aqua);
  }
  if (styles.find(v => v === 'blue')) {
    classNames.push(cssStyles.blue);
  }
  if (styles.find(v => v === 'black')) {
    classNames.push(cssStyles.black);
  }
  if (styles.find(v => v === 'sidebar')) {
    classNames.push(cssStyles.sidebar);
  }
  if (styles.find(v => v === 'red')) {
    classNames.push(cssStyles.red);
  }
  if (styles.find(v => v === 'header')) {
    classNames.push(cssStyles.header);
  }
  if (styles.find(v => v === 'small')) {
    classNames.push(cssStyles.small);
  }
  if (styles.find(v => v === 'medium')) {
    classNames.push(cssStyles.medium);
  }
  if (styles.find(v => v === 'large')) {
    classNames.push(cssStyles.large);
  }
  if (styles.find(v => v === 'center')) {
    classNames.push(cssStyles.center);
  }
  if (styles.find(v => v === 'right')) {
    classNames.push(cssStyles.right);
  }
  if (styles.find(v => v === 'disabled')) {
    classNames.push(cssStyles.disabled);
  }
  if (styles.find(v => v === 'bold')) {
    classNames.push(cssStyles.bold);
  }

  return classNames.join(' ');
};

const Label: React.FC<IProps> = ({ text, styles = [], position, onClick, translate = 'true' }) => {
  if (!text) {
    return null;
  }

  return (
    <React.Fragment>
      <label className={getClassName(cssStyles.label, styles)} onClick={onClick}>
        {translate ? <I18TextContainer textKey={String(text)} /> : text}
      </label>
      {position === 'TOP' ? <br /> : null}
    </React.Fragment>
  );
};

export default Label;
