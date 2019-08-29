import { ILookupItem } from './lookup';
import { getPartition } from '../lookups/cloth-selection';
import { TComposition } from './composition';

export interface IClothSelection {
  brand: ILookupItem;
  model: ILookupItem;
  composition: TComposition;
  issoldout: string;
  color: ILookupItem;
  design: ILookupItem;
  clothName: string;
  fabricCode: string;
  partition: ILookupItem;
  deliveryDate: string;
  vendorClothNumber: string;

  // not used right now
  option: string;
  clothComposition: string;
  personalorderProductNumber: string;
  personalorderProductColor: string;
  optionPattern: string;
  retailPrice: string;
  retailPriceTaxin: string;
  seasonCode: string;
  seasonName: string;
  clothSeason: string;
  clothCode: string;
  isnew: string;
  makerName2: string;
  functionName: string;
}

export interface IProductsResponse {
  brandCode: string;
  itemCode: string;
  productSeasonCode: string;
  personalorderProductNumber: string;
  personalorderColorCode: string;
  seasonCode: string;
  seasonName: string;
  personalorderColorName: string;
  retailPrice: string;
  retailPriceTaxin: string;
  modelPatterns: [
    {
      partsNumber: string;
      modelPatterns: [{ modelPattern: string }];
    }
  ];
  design: string;
  designName: string;
  clothName: string;
  clothSeason: string;
  clothCode: string;
  vendorClothNumber: string;
  mixings: [
    {
      mixing: string;
      mixingRatio: string;
    }
  ];
  isnew: string;
  issoldout: string;
  makerName2: string;
  functionName: string;
}

export function getPartitionLookups() {
  return getPartition().map((x, key) => ({ id: key, value: x.value }));
}
