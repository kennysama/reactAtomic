import { IPart } from './option';

export interface IGetItemsAndPartsReqPathParam {
  category: string;
  brandCode: string;
}

export interface IGetItemsAndPartsReqQueryParam {
  itemCode?: string;
}

export interface IGetItemsAndPartsRes {
  items: IItem[];
}

// =================================================

export interface IItem {
  itemCode: string;
  itemName: string;
  parts: IPart[];
}
