import React from 'react';

import styles from './Footer.module.scss';
import { ERouterPath } from '../../../types/index';
import Button from '../../atoms/Button/Button';
import LinkButton from '../../molecules/LinkButton/LinkButton';
import * as FooterTypes from '../../../types/footer';
import { TIcon } from '../../../types/icon';
import { TFooterCallback } from '../../../types/footer';

interface IEventProps {
  leftBtnHandler: TFooterCallback;
  saveHalfWayHandler: TFooterCallback;
  prevBtnHandler: TFooterCallback;
  nextBtnHandler: TFooterCallback;
  rightBtnHandler: TFooterCallback;
}

type TProps = FooterTypes.IFooter & IEventProps;

const Footer: React.FC<TProps> = props => {
  const { buttonsGroup } = props.footer;
  return (
    <div className={styles.footer}>
      <div className={styles.leftBlock}>
        <div className={styles.leftBtnWrapper}>
          <div className={styles.btnSet}>{shouldRender(buttonsGroup.leftBtn, props.leftBtnHandler)}</div>
          <div className={styles.btnSet}>{shouldRender(buttonsGroup.saveHalfWay, props.saveHalfWayHandler)}</div>
        </div>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.centerBtnWrapper}>
          <div className={styles.btnSet}>{shouldRender(buttonsGroup.prevBtn, props.prevBtnHandler)}</div>
          <div className={styles.btnSet}>{shouldRender(buttonsGroup.nextBtn, props.nextBtnHandler)}</div>
        </div>
        <div className={styles.rightBtnWrapper}>{shouldRender(buttonsGroup.rightBtn, props.rightBtnHandler)}</div>
      </div>
    </div>
  );
  // generic functions
  // by now we dont need normal buttons.

  function shouldRender(fProps: FooterTypes.IFooterButton, callback: TFooterCallback) {
    if (fProps.render) {
      return (
        <div className={styles.btnSet}>
          {fProps.path
            ? renderLinkButton(fProps.path, callback, fProps.text, fProps.disabled, fProps.icon)
            : renderButton(fProps, callback)}
        </div>
      );
    }
  }
  function renderButton(fProps: FooterTypes.IFooterButton, callback: TFooterCallback) {
    return (
      <Button disabled={fProps.disabled} icon={fProps.icon}>
        {fProps.text}
      </Button>
    );
  }
  function renderLinkButton(
    path: ERouterPath,
    callback: TFooterCallback,
    text?: string,
    disabled?: boolean,
    icon?: TIcon,
  ) {
    return disabled ? (
      <LinkButton to={path} label={text} disabled={disabled} icon={icon} />
    ) : (
      <div onClick={callback.bind(callback, path)}>
        <LinkButton to={path} label={text} disabled={disabled} icon={icon} />
      </div>
    );
  }
};

export default Footer;
