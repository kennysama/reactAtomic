import { ERouterPath } from '../types';
import { IStep } from '../types/stepbar';

export const ITEM_STEPS: IStep[] = [
  {
    order: 0,
    textkey: 'SideBarTemplate.clothSelection',
    path: ERouterPath.clothSelection,
  },
  {
    order: 1,
    textkey: 'SideBarTemplate.designSelection',
    path: ERouterPath.designSelection,
  },
  {
    order: 2,
    textkey: 'SideBarTemplate.sizeCorrection',
    path: ERouterPath.sizeCorrection,
  },
];

export const ORDER_STEPS: IStep[] = [
  {
    order: 0,
    textkey: 'OrderHandling.destination',
    path: ERouterPath.address,
  },
  {
    order: 1,
    textkey: 'OrderHandling.amount',
    path: ERouterPath.amount,
  },
  {
    order: 2,
    textkey: 'OrderHandling.settlement',
    path: ERouterPath.settlement,
  },
];
