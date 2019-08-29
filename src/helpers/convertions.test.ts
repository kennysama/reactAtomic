import { toCamelCase, toCamelCaseObject, toSnakeCase, toSnakeCaseObject } from './convertions';
import { IndexedObject } from '../types';

const indexedSnakeCaseObject: IndexedObject = {
  [0]: { item_number: 'S' },
};
const indexedCamelCaseObject: IndexedObject = {
  [0]: { itemNumber: 'S' },
};

const objectSnake = {
  hoga_hoga1: 'aaaaa',
  fuga_fuga1: {
    hoga_hoga2: {
      hoga_hoga3: 'aaaaa',
      fuga_fuga3: 0,
    },
    fuga_fuga2: {
      hoga_hoga3: false,
      fuga_fuga3: {
        hoga_hoga4: [0.001, 0.002],
        fuga_fuga4: [
          {
            hoga_hoga5: ['aaaa', 'bbbb'],
            fuga_fuga5: 'aa',
          },
          {
            hoga_hoga5: 1,
            fuga_fuga5: false,
          },
        ],
      },
    },
  },
};
const objectCamel = {
  hogaHoga1: 'aaaaa',
  fugaFuga1: {
    hogaHoga2: {
      hogaHoga3: 'aaaaa',
      fugaFuga3: 0,
    },
    fugaFuga2: {
      hogaHoga3: false,
      fugaFuga3: {
        hogaHoga4: [0.001, 0.002],
        fugaFuga4: [
          {
            hogaHoga5: ['aaaa', 'bbbb'],
            fugaFuga5: 'aa',
          },
          {
            hogaHoga5: 1,
            fugaFuga5: false,
          },
        ],
      },
    },
  },
};
const objectListSnake = [0, 1, 3].map(v => objectSnake);
const objectListCamel = [0, 1, 3].map(v => objectCamel);

it('should return camelCase string', () => {
  expect(toCamelCase('item_number')).toEqual('itemNumber');
  expect(toCamelCase('itemNumber')).toEqual('itemNumber');
  expect(toCamelCase('ItemNumber')).toEqual('itemNumber');
});

it('should return snake_case string', () => {
  expect(toSnakeCase('itemNumber')).toEqual('item_number');
  expect(toSnakeCase('ItemNumber')).toEqual('item_number');
  expect(toSnakeCase('item_number')).toEqual('item_number');
});

it('should return a camelCase indexed objects list string', () => {
  expect(toCamelCaseObject(indexedSnakeCaseObject)).toEqual({ 0: { itemNumber: 'S' } });
  expect(toCamelCaseObject(indexedCamelCaseObject)).toEqual({ 0: { itemNumber: 'S' } });
  const camel = toCamelCaseObject(objectSnake);
  expect(camel).toEqual(objectCamel);
  const camelTwo = toCamelCaseObject(objectListSnake);
  expect(camelTwo).toEqual(objectListCamel);
});

it('should return a snake_case indexed objects list string', () => {
  expect(toSnakeCaseObject(indexedSnakeCaseObject)).toEqual({ 0: { item_number: 'S' } });
  expect(toSnakeCaseObject(indexedCamelCaseObject)).toEqual({ 0: { item_number: 'S' } });
  const snake = toSnakeCaseObject(objectCamel);
  expect(snake).toEqual(objectSnake);
  const snakeTwo = toSnakeCaseObject(objectListCamel);
  expect(snakeTwo).toEqual(objectListSnake);
});
