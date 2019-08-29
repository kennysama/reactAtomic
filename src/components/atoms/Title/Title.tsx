import React from 'react';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import cssStyles from './Title.module.scss';

interface IProps {
  title: string;
  styles?: string[];
}

const getClassName = (base: string, styles: string[]): string => {
  const classNames = [base];
  if (styles.find(v => v === 'login')) {
    classNames.push(cssStyles.login);
  }
  if (styles.find(v => v === 'right')) {
    classNames.push(cssStyles.right);
  }
  if (styles.find(v => v === 'bold')) {
    classNames.push(cssStyles.bold);
  }
  if (styles.find(v => v === 'blue')) {
    classNames.push(cssStyles.blue);
  }
  if (styles.find(v => v === 'white')) {
    classNames.push(cssStyles.white);
  }
  if (styles.find(v => v === 'red')) {
    classNames.push(cssStyles.red);
  }
  if (styles.find(v => v === 'gray')) {
    classNames.push(cssStyles.gray);
  }
  if (styles.find(v => v === 'bgBrightBrown')) {
    classNames.push(cssStyles.bgBrightBrown);
  }
  if (styles.find(v => v === 'lineLightBrown')) {
    classNames.push(cssStyles.lineLightBrown);
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
  if (styles.find(v => v === 'black')) {
    classNames.push(cssStyles.black);
  }

  return classNames.join(' ');
};

const Title: React.FC<IProps> = ({ title, styles = [] }) => {
  return (
    <h2 className={getClassName(cssStyles.title, styles)}>
      <I18TextContainer textKey={String(title)} />
    </h2>
  );
};

export default Title;
