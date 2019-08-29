import {
  getIllustrationBtnVisible,
  getIllustrationImageUrl,
  getShirtColorsLookup,
  hasCompleteSelected,
  haveDetails,
} from './cloth-selection';
import { IHomeSelectedItem } from '../types/home';
import { TCategory } from '../types/order-items';
import { ILookupItem } from '../types/lookup';
import { TComposition } from '../types/composition';

const homeSelectedItemOne: IHomeSelectedItem = {
  category: 'WM',
  subCategory: '03',
};
const homeSelectedTwo: IHomeSelectedItem = {
  category: 'FM',
  subCategory: '03',
};
const category: TCategory = 'WM';
const brandEmpty: ILookupItem = {
  id: '',
  value: '',
};
const brandValid: ILookupItem = {
  id: '2',
  value: 'KM',
};
const modelValid: ILookupItem = {
  id: '2',
  value: 'ST',
};
const modelEmpty: ILookupItem = {
  id: '0',
  value: '',
};
const composition: TComposition = {
  0: { id: '1', value: 'cotton', percent: '25' },
  1: { id: '2', value: 'cotton', percent: '25' },
  2: { id: '3', value: 'cotton', percent: '25' },
  3: { id: '4', value: 'cotton', percent: '25' },
};
const notValidComposition = {
  0: { id: '1', value: 'cotton', percent: '30' },
  1: { id: '2', value: 'cotton', percent: '25' },
  2: { id: '3', value: 'cotton', percent: '25' },
  3: { id: '4', value: 'cotton', percent: '25' },
};
const shirtColors = [
  { id: '001', value: 'ホワイト' },
  { id: '002', value: 'グレー系' },
  { id: '012', value: 'ピンク＆パープル系' },
  { id: '030', value: 'その他' },
  { id: '072', value: 'ブルー系' },
];

const otherColors = [
  { id: '003', value: 'ライトグレー' },
  { id: '004', value: 'グレー' },
  { id: '005', value: 'ブラック' },
  { id: '030', value: 'その他' },
  { id: '033', value: 'ベージュ' },
  { id: '070', value: 'ブルー' },
  { id: '075', value: 'ネイビー' },
];

it('should return True if the given Category and SubCategory matches the bussiness rules', () => {
  expect(getIllustrationBtnVisible(homeSelectedItemOne)).toBe(true);
  expect(getIllustrationBtnVisible(homeSelectedTwo)).toBe(false);
});

it('should return an image related to the given category', () => {
  expect(getIllustrationImageUrl(category)).toBe(`/images/cloth/model/${category}.png`);
});

it('should return if given options have details', () => {
  expect(haveDetails('4566', brandEmpty)).toBe(true);
  expect(haveDetails('', brandValid)).toBe(false);
  expect(haveDetails('4577', brandValid)).toBe(true);
});

it('should return true if the selected option matched the valid rules and is complete', () => {
  expect(hasCompleteSelected(composition, '1', '4566', brandEmpty, modelValid, '2345')).toBe(false);
  expect(hasCompleteSelected(notValidComposition, '0', '4566', brandEmpty, modelValid, '')).toBe(false);
  expect(hasCompleteSelected(notValidComposition, '0', '4566', brandEmpty, modelEmpty, '34')).toBe(false);
  expect(hasCompleteSelected(composition, '0', '4566', brandValid, modelValid, '3467')).toBe(true);
});

it('should return the right colors for the given subCategory', () => {
  expect(getShirtColorsLookup('16')).toEqual(shirtColors);
  expect(getShirtColorsLookup('15')).toEqual(shirtColors);
  expect(getShirtColorsLookup('17')).toEqual(shirtColors);
  expect(getShirtColorsLookup('01')).toEqual(otherColors);
});
