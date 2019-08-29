import { Nullable } from './index';
import { TPartsNumber, TCategory, TSubCategory } from './order-items';

export interface IGetAvailableOptionsReqPathParam {
  brandCode: string;
  itemCode: string;
  seasonCode: string;
}

export interface IGetAvailableOptionsReqQueryParam {
  optionPattern: string;
  optionNumber?: string;
  languageCode?: string;
}

export interface IGetAvailableOptionsRes {
  availableOptions: IPart[];
}

// =================================================
export interface IPart {
  partsNumber: TPartsNumber;
  partsName: string;
  optionPatterns: IOptionPattern[];
}

export interface IOptionPattern {
  optionNumber: string;
  optionName: string;
  specialOptionFlag: string;
  required: string;
  optionTypes: IOptionType[];
  // ・・・
  optionPattern?: string;
  optionPatternName?: string;
}

export interface IOptionType {
  optionClassNumber: string;
  optionClassName: string;
  defaultFlag: string;
  retailPrice: number;
  retailPriceTaxin: number;
  imagePath: string;
}

// =================================================

export interface IRequestParameter {
  path: IGetAvailableOptionsReqPathParam;
  query: IGetAvailableOptionsReqQueryParam;
  other: IOtherCondition;
}

export interface IOtherCondition {
  category: TCategory;
  subCategory: TSubCategory;
  initialPieces: TPartsNumber[];
}

interface IBaseOptionSelection {
  partsIndex: number;
  partsNumber: TPartsNumber;
  optionNumber: string;
}

export interface IOptionSelectedParam extends IBaseOptionSelection {
  optionClassNumber: string;
}

export interface IOptionSelectingParam extends IBaseOptionSelection {
  optionClassNumber: Nullable<string>;
  hasOpenPopup: boolean;
}

export interface IDesignSelection {
  availableOptions: IPart[];
  selectingOption: IOptionSelectingParam;
  selectedOptions: IOptionSelectedParam[];
  sidebarParts: ISidebarPart[];
  addableParts: TPartsNumber[];
  deletableParts: TPartsNumber[];
}

export interface ISidebarPart {
  number: TPartsNumber;
  index: number;
}

export interface IOptionListItem {
  partsNumber: TPartsNumber;
  optionNumber: string;
  optionName: string;
  isSpecialOption: boolean;
  paperState: IOptionPaper;
  selectBoxState: IOptionSelectBox;
}

export interface IOptionPaper {
  optionClassNumber: Nullable<string>;
  optionClassName: string;
  priceTaxIn: number;
  hasSelected: boolean;
  isRequire: boolean;
  isDisable: boolean;
  // onSelect?: (param: IOptionSelectingParam, isSelectType: boolean) => void;
}

export interface IOptionSelectBox {
  hasOpen: boolean;
  selectedOptionClassNumber: Nullable<string>;
  optionTypes: IOptionType[];
}
