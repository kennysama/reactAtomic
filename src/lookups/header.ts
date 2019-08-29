import { IHeaderMapItem } from '../types/header';
import { ERouterPath } from '../types';

export const HEADER_ITEMS: IHeaderMapItem[] = [
  {
    path: ERouterPath.home,
    textKey: 'Home.page',
  },
  {
    path: ERouterPath.samples,
    textKey: 'Home.page',
  },
  {
    path: ERouterPath.pieChart,
    textKey: 'Home.page',
  },
  {
    path: ERouterPath.ordersSearch,
    textKey: 'OrdersSearchPage.page',
  },
  {
    path: ERouterPath.clothSelection,
    textKey: 'ClothSelection.page',
  },
  {
    path: ERouterPath.designSelection,
    textKey: 'DesignSelection.page',
  },
  {
    path: ERouterPath.sizeCorrection,
    textKey: 'SizeCorrection.page',
  },
  {
    path: ERouterPath.address,
    textKey: 'Address.page',
  },
  {
    path: ERouterPath.amount,
    textKey: 'Amount.page',
  },
  {
    path: ERouterPath.privacyPolicy,
    textKey: 'PrivacyPolicy.page',
  },
  {
    path: ERouterPath.settlement,
    textKey: 'Settlement.page',
  },
  {
    path: ERouterPath.inventorySearch,
    textKey: 'InventorySearch.page',
  },
  {
    path: ERouterPath.orderConfirmation,
    textKey: 'OrderContentConfirmation.page',
  },
];
