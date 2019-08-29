import {
  filterSelectedCompositions,
  isCompositionPercentDisable,
  isPercentValid,
  compositionAsArray,
} from './composition';
import { TComposition } from '../types/composition';

const composition: TComposition = {
  0: { id: '006', value: 'ナイロン', percent: '25' },
  1: { id: '005', value: 'ポリエステル', percent: '25' },
  2: { id: '060', value: 'ウール', percent: '25' },
  3: { id: '061', value: 'コットン', percent: '25' },
};
const compositionNotValid: TComposition = {
  0: { id: '006', value: 'ナイロン', percent: '26' },
  1: { id: '005', value: 'ポリエステル', percent: '25' },
  2: { id: '060', value: 'ウール', percent: '25' },
  3: { id: '061', value: 'コットン', percent: '25' },
};

const compositionNotValidtwo: TComposition = {
  0: { id: '006', value: 'ナイロン', percent: '24' },
  1: { id: '005', value: 'ポリエステル', percent: '25' },
  2: { id: '060', value: 'ウール', percent: '25' },
  3: { id: '061', value: 'コットン', percent: '25' },
};
it('should return list of all the different compositions that is not yet choosen', () => {
  expect(filterSelectedCompositions(composition, 1)).toEqual([
    { id: '-0', value: 'Selectbox.defaultMessage' },
    { id: '005', value: 'ポリエステル' },
    { id: '013', value: 'ポリウレタン' },
    { id: '007', value: 'キュプラ' },
  ]);

  expect(filterSelectedCompositions(composition, 0)).toEqual([
    { id: '-0', value: 'Selectbox.defaultMessage' },
    { id: '013', value: 'ポリウレタン' },
    { id: '007', value: 'キュプラ' },
    { id: '006', value: 'ナイロン' },
  ]);

  expect(filterSelectedCompositions(composition, 2)).toEqual([
    { id: '-0', value: 'Selectbox.defaultMessage' },
    { id: '060', value: 'ウール' },
    { id: '013', value: 'ポリウレタン' },
    { id: '007', value: 'キュプラ' },
  ]);
  expect(filterSelectedCompositions(composition, 3)).toEqual([
    { id: '-0', value: 'Selectbox.defaultMessage' },
    { id: '061', value: 'コットン' },
    { id: '013', value: 'ポリウレタン' },
    { id: '007', value: 'キュプラ' },
  ]);
});

it('should return whether or not Composition percentage is disabled', () => {
  expect(isCompositionPercentDisable(false, '0')).toBe(false);
  expect(isCompositionPercentDisable(false, '-0')).toBe(true);
  expect(isCompositionPercentDisable(true, '-0')).toBe(true);
  expect(isCompositionPercentDisable(true, '0')).toBe(true);
});

it('should return whether or not percentage is valid', () => {
  expect(isPercentValid(composition)).toBe(true);
  expect(isPercentValid(compositionNotValid)).toBe(false);
  expect(isPercentValid(compositionNotValidtwo)).toBe(false);
});

it('should return composition item array', () => {
  expect(compositionAsArray(composition)).toEqual([
    { id: '006', percent: '25', value: 'ナイロン' },
    { id: '005', percent: '25', value: 'ポリエステル' },
    { id: '060', percent: '25', value: 'ウール' },
    { id: '061', percent: '25', value: 'コットン' },
  ]);
});
