import { TIcon } from './icon';
import { ILookupItem } from './lookup';

export interface IOrderDestination {
  shippingPostalCodeLeft: string;
  shippingPostalCodeRight: string;
  shippingCity: string;
  shippingState: string;
  shippingResidence: string;
  shippingPhoneNumberPartOne: string;
  shippingPhoneNumberPartTwo: string;
  shippingPhoneNumberPartThree: string;
  shippingPhoneNumberTwoPartOne: string;
  shippingPhoneNumberTwoPartTwo: string;
  shippingPhoneNumberTwoPartThree: string;
  emailPartOne: string;
  emailPartTwo: string;
  name: string;
}
export interface IOrderAddress {
  id: number;
  orderDestination: IOrderDestination;
  orderDelivery: IOrderDelivery;
}

export interface IOrderDimensions {
  totalLenght: number;
  OB: number;
  bust: number;
  mediumCopper: number;
  waist: number;
  hips: number;
}

export function getOrderDimensions(): IOrderDimensions {
  return { totalLenght: 0, OB: 0, bust: 0, mediumCopper: 0, waist: 0, hips: 0 };
}

export interface IOrderNote {
  productsTotal: string;
  shippingFee: string;
  paymentFee: string;
  usagepoints: string;
  total: string;
}

export interface IOrderRecommended {
  jacket: string;
  trousers: string;
  vestOne: string;
  vestTwo: string;
}

export function getOrderNote(): IOrderNote {
  return { productsTotal: '¥ 108,000', shippingFee: '¥ 0', paymentFee: '¥ 0', usagepoints: '¥ 0', total: '¥ 108,000' };
}

export interface IOrderBalance {
  none: boolean;
  referrerCode: string;
  introduction: boolean;
  customerService: boolean;
  measurement: boolean;
  orderWithoutPayment: boolean;
}

export function getOrderBalance(): IOrderBalance {
  return {
    none: true,
    referrerCode: '',
    introduction: false,
    customerService: false,
    measurement: false,
    orderWithoutPayment: false,
  };
}

export interface IOrderDistributionCategory {
  customerCode: string;
  customerCodeReturnValue: string;
}

export function getDistributionCategory(): IOrderDistributionCategory {
  return {
    customerCode: '',
    customerCodeReturnValue: '',
  };
}
export interface IOrderDelivery {
  date: ILookupItem;
  time: ILookupItem;
  fee: string;
  method: ILookupItem;
}

export interface IOrderPoints {
  availablePoints: string;
  currentPoints: string;
}

export interface IOrderCampaign {
  pointsNotUsed: string;
}

export function getCampaignPoints(): IOrderCampaign {
  return { pointsNotUsed: '' };
}

export function getPointUsage(): IOrderPoints {
  return { availablePoints: '', currentPoints: '' };
}

export type IConfirmButton = { icon: TIcon; lockText: 'change' | 'save' };

export function getConfirmButton(confirmed: boolean): IConfirmButton {
  if (!confirmed) {
    return { icon: { name: 'lock_open', position: 'LEFT' }, lockText: 'save' };
  } else {
    return { icon: { name: 'lock', position: 'LEFT' }, lockText: 'change' };
  }
}
