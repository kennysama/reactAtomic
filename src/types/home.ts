import { ERouterPath } from '.';
import { TCategory, TPartsNumber, TSubCategory, TOrderItemCode } from './order-items';

export interface IImageGallery {
  key: number;
  url: string;
  title: string;
  to: ERouterPath;
  buttons: IImageGalleryButton[];
}

export interface IImageGalleryButton {
  category: TCategory;
  key: number;
  subCategory: TSubCategory;
  text: string;
  to: ERouterPath;
}

export interface IHomeParams {
  orderConfirmationItemId: number;
  category: TCategory;
  subCategory: TSubCategory;
  itemCode: TOrderItemCode;
  pieces: TPartsNumber[];
}

export interface IHomeSelectedItem {
  category: TCategory;
  subCategory: TSubCategory;
}
