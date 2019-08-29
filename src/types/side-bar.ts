import { TLookup } from './lookup';
import { ERouterPath } from '.';

export function getOrderContentButtons(): TLookup {
  return [{ id: 1, value: 'clothSelection' }, { id: 2, value: 'designSelection' }, { id: 3, value: 'sizeCorrection' }];
}

export interface ISidebar {
  sidebar: ISideButtonsGroup;
}

export interface ISideButtonsGroup {
  [key: string]: ISidebarButton;
  clothSelectionBtn: ISidebarButton;
  designSelectionBtn: ISidebarButton;
  sizeCorrectionBtn: ISidebarButton;
  orderDestination: ISidebarButton;
  orderAmount: ISidebarButton;
  orderSettlement: ISidebarButton;
}

export interface ISidebarButton {
  className?: TSidebarButtonClassName;
  completed?: boolean;
  text?: string;
  path?: ERouterPath;
}

export type TSidebarButtonClassName = 'active' | 'default' | 'disabled';

export function getEmptySidebar(obj: ISideButtonsGroup): ISideButtonsGroup {
  const ret = obj;
  Object.keys(obj).map(key => {
    return (ret[key] = {});
  });
  return ret;
}

/* Page Containers : Order Content and Order Handling */
// Order Content
export type TItemContentPage = ERouterPath.clothSelection | ERouterPath.designSelection | ERouterPath.sizeCorrection;

export function getItemContentPage(
  path: TItemContentPage,
  className?: TSidebarButtonClassName,
  completed: boolean = false,
): ISidebarButton {
  switch (path) {
    case ERouterPath.clothSelection:
      return getSidebarClothSelectionBtn(completed, className);
    case ERouterPath.designSelection:
      return getSidebarDesignSelectionBtn(completed, className);
    case ERouterPath.sizeCorrection:
      return getSidebarSizeCorrectionBtn(completed, className);
  }
}

function getSidebarClothSelectionBtn(completed: boolean, className?: TSidebarButtonClassName): ISidebarButton {
  return {
    className,
    completed,
    path: ERouterPath.clothSelection,
    text: 'SideBarTemplate.clothSelection',
  };
}

function getSidebarDesignSelectionBtn(completed: boolean, className?: TSidebarButtonClassName): ISidebarButton {
  return {
    className,
    completed,
    path: ERouterPath.designSelection,
    text: 'SideBarTemplate.designSelection',
  };
}

function getSidebarSizeCorrectionBtn(completed: boolean, className?: TSidebarButtonClassName): ISidebarButton {
  return {
    className,
    completed,
    path: ERouterPath.sizeCorrection,
    text: 'SideBarTemplate.sizeCorrection',
  };
}
// Order Handling

export type TOrderHandling = ERouterPath.address | ERouterPath.amount | ERouterPath.settlement;

export function getOrderHandlingtPage(
  path: TOrderHandling,
  className?: TSidebarButtonClassName,
  completed: boolean = false,
): ISidebarButton {
  switch (path) {
    case ERouterPath.address:
      return getSidebarDestinationSelectionBtn(completed, className);
    case ERouterPath.amount:
      return getSidebarAmountBtn(completed, className);
    case ERouterPath.settlement:
      return getSidebarSettlementBtn(completed, className);
  }
}

function getSidebarDestinationSelectionBtn(completed: boolean, className?: TSidebarButtonClassName): ISidebarButton {
  return {
    className,
    completed,
    path: ERouterPath.address,
    text: 'OrderHandling.destination',
  };
}

function getSidebarAmountBtn(completed: boolean, className?: TSidebarButtonClassName): ISidebarButton {
  return {
    className,
    completed,
    path: ERouterPath.amount,
    text: 'OrderHandling.amount',
  };
}

function getSidebarSettlementBtn(completed: boolean, className?: TSidebarButtonClassName): ISidebarButton {
  return {
    className,
    completed,
    path: ERouterPath.settlement,
    text: 'OrderHandling.settlement',
  };
}
