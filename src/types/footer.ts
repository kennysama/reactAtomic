import { TIcon } from './icon';
import { ERouterPath } from '.';
import { ISideButtonsGroup } from './side-bar';

export type TFooterButtonType = 'home' | 'save' | 'next' | 'back' | 'confirm';

export interface IFooterButtonNew {
  type: TFooterButtonType;
  classes?: string[];
  textKey?: string;
  path?: ERouterPath;
  isRender?: boolean;
  isDisabled?: boolean;
  func?: () => void;
}

// old ============

export interface IFooter {
  footer: {
    buttonsGroup: IFooterButtonsGroup;
  };
}

export interface IFooterButtonsGroup {
  [key: string]: IFooterButton;
  leftBtn: IFooterButton;
  rightBtn: IFooterButton;
  prevBtn: IFooterButton;
  nextBtn: IFooterButton;
  saveHalfWay: IFooterButton;
}

export interface IFooterButton {
  render?: boolean;
  disabled?: boolean;
  text?: string;
  icon?: TIcon;
  path?: ERouterPath;
}

export type TFooterCallback = (to: ERouterPath) => void;

export function getEmptyButtonsGroup(obj: IFooterButtonsGroup): IFooterButtonsGroup {
  const ret = obj;
  Object.keys(obj).map(key => {
    return (ret[key] = {});
  });
  return ret;
}

/*Buttons */
export function getHomeBtn(disabled: boolean = false): IFooterButton {
  return { render: true, disabled, path: ERouterPath.home, text: 'Footer.home' };
}

export function getNextBtn(path: ERouterPath, disabled: boolean = false): IFooterButton {
  return {
    render: true,
    disabled,
    text: 'Footer.next',
    icon: { name: 'skip_next', position: 'RIGHT' },
    path,
  };
}

export function getPrevBtn(path: ERouterPath, disabled: boolean = false, sidebar?: ISideButtonsGroup): IFooterButton {
  const to =
    sidebar && sidebar.clothSelectionBtn.completed && sidebar.designSelectionBtn.completed
      ? ERouterPath.designSelection
      : path;

  return {
    render: true,
    disabled,
    text: 'Footer.prev',
    icon: { name: 'skip_previous', position: 'LEFT' },
    path: to,
  };
}

export function getOrderBtn(disabled: boolean = false): IFooterButton {
  return { render: true, disabled, path: ERouterPath.samples, text: 'Footer.order' };
}

export function getToOrderHandlingBtn(disabled: boolean = false): IFooterButton {
  return { render: true, disabled, path: ERouterPath.address, text: 'Footer.orderHandling' };
}

export function getOrderContentConfirmationBtn(disabled: boolean = false): IFooterButton {
  return {
    render: true,
    disabled,
    text: 'Footer.orderContents',
    path: ERouterPath.orderConfirmation,
  };
}

export function getSaveHalfWayBtn(disabled: boolean = false): IFooterButton {
  return {
    render: true,
    disabled,
    text: 'Footer.getSaveHalfWay',
    path: ERouterPath.home,
  };
}
