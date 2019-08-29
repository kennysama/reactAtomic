import { IHomeSelectedItem } from '../types/home';
import { TCategory, TSubCategory } from '../types/order-items';
import { TLookup, ILookupItem } from '../types/lookup';
import { getShirtColors, getOthersColors } from '../lookups/cloth-selection';
import { TComposition } from '../types/composition';
import { isPercentValid } from './composition';

export function getIllustrationBtnVisible(params: IHomeSelectedItem): boolean {
  return params.category === 'WM' &&
    (params.subCategory === '03' ||
      params.subCategory === '08' ||
      params.subCategory === '06' ||
      params.subCategory === '15')
    ? true
    : false;
}
export function getIllustrationImageUrl(category: TCategory): string {
  return `/images/cloth/model/${category}.png`;
}

export function getShirtColorsLookup(subCategory: TSubCategory): TLookup {
  if (subCategory === '15' || subCategory === '16' || subCategory === '17') {
    return getShirtColors();
  } else {
    return getOthersColors();
  }
}

export function hasCompleteSelected(
  composition: TComposition,
  issoldout: string,
  vendorClothNumber: string,
  brand: ILookupItem,
  model: ILookupItem,
  fabricCode: string,
): boolean {
  if (issoldout !== '0') {
    return false;
  }
  if (vendorClothNumber === '' && !isPercentValid(composition)) {
    return false;
  }
  if (brand.id === '' || model.id === '' || fabricCode.length !== 4) {
    return false;
  }

  return true;
}

export function haveDetails(vendorClothNumber: string, brand: ILookupItem): boolean {
  if (brand.id === '') { return true; }
  return vendorClothNumber === '' ? false : true;
}
