import { IOptionType } from '../types/option';
import { getOrderCatalog } from './order-items';
import { TPartsCount } from '../types/order-items';

export const NO_SELECT_OPTION_CLASS_NUMBER = '-1';

export const NO_SELECT_OPTION: IOptionType = {
  optionClassNumber: NO_SELECT_OPTION_CLASS_NUMBER,
  optionClassName: '未設定',
  defaultFlag: '0',
  retailPrice: 0,
  retailPriceTaxin: 0,
  imagePath: '',
};

export const ORDER_CATALOG_ALL = getOrderCatalog();

export const INITIAL_PARTS_COUNT: TPartsCount = {
  '01': 0,
  '02': 0,
  '04': 0,
  '05': 0,
  '09': 0,
  '10': 0,
};
