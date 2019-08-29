export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type IndexedObject<V = any> = { [k: string]: V };

export interface IMessage {
  code: string;
  value: string;
}

export interface IAppError {
  code?: string;
  message: string;
}

export enum ERouterPath {
  login = '',
  samples = 'samples',
  home = 'home',
  dialog = 'dialog',
  ordersSearch = 'orders',
  pieChart = 'pie',
  inventorySearch = 'inventory',

  itemContentPage = 'item',
  clothSelection = 'item/cloth',
  designSelection = 'item/design',
  sizeCorrection = 'item/size',

  orderContentPage = 'order',
  orderConfirmation = 'order/orderConfirmation',
  address = 'order/shipping',
  amount = 'order/options',
  privacyPolicy = 'order/privacy',
  settlement = 'order/settlement',
}
