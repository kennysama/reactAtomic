import React from 'react';

import styles from './FunctionFooter.module.scss';

import Button from '../../atoms/Button/Button';
import LinkButton from '../../molecules/LinkButton/LinkButton';
import { ERouterPath } from '../../../types';
import { IFooterButtonNew as IFooterButton, TFooterButtonType } from '../../../types/footer';

interface IProps {
  buttons: IFooterButton[];
}

const FunctionFooter: React.FC<IProps> = (props: IProps) => {
  const { buttons } = props;

  const renderButton = (type: TFooterButtonType) => {
    const button = buttons.find(btn => btn.type === type);
    if (!button) {
      return null;
    }

    const isRender = typeof button.isRender === 'undefined' ? true : button.isRender;
    if (!isRender) {
      return null;
    }

    if (!button.path) {
      return renderButtonElement(button);
    }
    return renderLinkElement(button, button.path);
  };

  const renderButtonElement = (button: IFooterButton) => {
    const { isDisabled, func, type, classes } = button;
    return (
      <div className={styles.btnSet}>
        <Button styles={getClassName(type, classes)} disabled={getDisabled(isDisabled)} onClick={func}>
          {getTextKey(button)}
        </Button>
      </div>
    );
  };

  const renderLinkElement = (button: IFooterButton, path: ERouterPath) => {
    const { isDisabled, type, func, classes } = button;
    return (
      <div className={styles.btnSet}>
      <LinkButton
        styles={getClassName(type, classes)}
        disabled={getDisabled(isDisabled)}
        to={path}
        label={getTextKey(button)}
        onClick={func}
      />
      </div>
    );
  };

  const getDisabled = (isDisabled?: boolean): boolean => {
    return typeof isDisabled === 'undefined' ? false : isDisabled;
  };

  const getTextKey = (button: IFooterButton): string => {
    const { textKey, type } = button;
    if (textKey) {
      return textKey;
    }

    switch (type) {
      case 'home':
        return 'Footer.home';

      case 'save':
        return 'Footer.getSaveHalfWay';

      case 'back':
        return 'Footer.prev';

      case 'next':
        return 'Footer.next';

      case 'confirm':
        return 'Footer.order';

      default:
        return 'undefinded type';
    }
  };

  const getClassName = (type: TFooterButtonType, classes: string[] = []): string[] => {
    const baseClasses = [...classes, 'black'];
    switch (type) {
      case 'home':
        return [...baseClasses, 'home', 'layout-portrait-icon-button'];

      case 'save':
        return [...baseClasses];

      case 'back':
        return [...baseClasses, 'arwLeft', 'layout-portrait-icon-button'];

      case 'next':
        return [...baseClasses, 'arwRight', 'layout-portrait-icon-button'];

      case 'confirm':
        return [...baseClasses, 'red', 'square', 'footerRight'];

      default:
        return baseClasses;
    }
  };

  return (
    <div className={styles.footer}>
      <div className={styles.leftBlock}>
        <div className={styles.leftBtnWrapper}>
          {renderButton('home')}
          {renderButton('save')}
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.centerBtnWrapper}>
          {renderButton('back')}
          {renderButton('next')}
        </div>
        <div className={styles.rightBtnWrapper}>{renderButton('confirm')}</div>
      </div>
    </div>
  );
};

export default FunctionFooter;
