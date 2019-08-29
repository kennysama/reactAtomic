import { getPartsName, getAddableParts, getDeletableParts } from './option';
import { TPartsNumber } from '../types/order-items';
import { getSubCategoryPieces } from './order-items';

const EXPECTED_BRANK: TPartsNumber[] = [];

// getPartsName
describe('option helper getPartsName', () => {
  it('01: jacket', () => {
    expect(getPartsName('01')).toEqual('ジャケット');
  });
});

// getAddableParts
describe('option helper getAddableParts', () => {
  // クラシック：スーツ
  it('case 1-1', () => {
    const category = 'CS';
    const subCategory = '01';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = ['02', '04'];
    expect(result).toEqual(expected);
  });

  // クラシック：ジャケット
  it('case 1-2', () => {
    const category = 'CS';
    const subCategory = '02';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = ['04'];
    expect(result).toEqual(expected);
  });

  // クラシック：トラウザーズ
  it('case 1-3', () => {
    const category = 'CS';
    const subCategory = '03';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = ['02', '04'];
    expect(result).toEqual(expected);
  });

  // クラシック：ベスト
  it('case 1-4', () => {
    const category = 'CS';
    const subCategory = '04';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // ウイメンズ：パンツスーツ
  it('case 4-1', () => {
    const category = 'WM';
    const subCategory = '08';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = ['02', '04'];
    expect(result).toEqual(expected);
  });

  // ウイメンズ：スカートスーツ
  it('case 4-2', () => {
    const category = 'WM';
    const subCategory = '09';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = ['05'];
    expect(result).toEqual(expected);
  });

  // ウイメンズ：ワンピーススーツ
  it('case 4-3', () => {
    const category = 'WM';
    const subCategory = '14';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getAddableParts(category, subCategory, initialPieces);
    const expected = ['02', '05'];
    expect(result).toEqual(expected);
  });
});

// getDeleteableParts
describe('option helper getDeleteableParts', () => {
  // クラシック：スーツ
  it('case 1-1', () => {
    const category = 'CS';
    const subCategory = '01';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // クラシック：ジャケット
  it('case 1-2', () => {
    const category = 'CS';
    const subCategory = '02';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // クラシック：トラウザーズ
  it('case 1-3', () => {
    const category = 'CS';
    const subCategory = '03';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // クラシック：ベスト
  it('case 1-4', () => {
    const category = 'CS';
    const subCategory = '04';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // ウイメンズ：パンツスーツ
  it('case 4-1', () => {
    const category = 'WM';
    const subCategory = '08';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // ウイメンズ：スカートスーツ
  it('case 4-2', () => {
    const category = 'WM';
    const subCategory = '09';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });

  // ウイメンズ：ワンピーススーツ
  it('case 4-3', () => {
    const category = 'WM';
    const subCategory = '14';
    const initialPieces = getSubCategoryPieces(subCategory);
    const result = getDeletableParts(category, subCategory, initialPieces);
    const expected = EXPECTED_BRANK;
    expect(result).toEqual(expected);
  });
});
