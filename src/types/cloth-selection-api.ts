import { TCategory, TPartsNumber, TOrderItemCode, TSubCategory } from './order-items';

export interface IBrand {
  brandCode: string;
}
export interface IBrandParams {
  category: TCategory;
  itemCode: TOrderItemCode;
  pieces: TPartsNumber[];
}
export interface IModelParam {
  brandCode: string;
  languageCode: string;
}

export interface IModel {
  seasonCode: string;
  modelPattern: string;
  modelCode: string;
}
export interface IFabricDetailsParams {
  seasonCode: string;
  fabricCode: number;
}
