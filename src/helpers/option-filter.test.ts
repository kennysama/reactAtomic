import { filterListItems, filterOptionListItem, filterSpecialListItem } from './option-filter';
import { IDesignSelection, IPart, IOptionPattern } from '../types/option';

const designSelection: IDesignSelection = {
  availableOptions: [],
  selectedOptions: [],
  selectingOption: { optionClassNumber: '', hasOpenPopup: false, partsIndex: 0, partsNumber: '01', optionNumber: '' },
  sidebarParts: [],
  addableParts: [],
  deletableParts: [],
};
const part: IPart = {
  partsNumber: '01',
  partsName: 'ジャケット',
  optionPatterns: [
    {
      optionNumber: '1',
      optionName: 'ジャケット op1',
      optionTypes: [
        {
          optionClassNumber: '1',
          optionClassName: 'ジャケット op1 type1',
          defaultFlag: '1',
          retailPrice: 1000,
          retailPriceTaxin: 1080,
          imagePath: '/images/sample/image1.png',
        },
      ],
      required: '1',
      specialOptionFlag: '0',
    },
  ],
};
const partTwo: IPart = {
  partsNumber: '01',
  partsName: 'ジャケット',
  optionPatterns: [
    {
      optionNumber: '1',
      optionName: 'ジャケット op1',
      optionTypes: [
        {
          optionClassNumber: '1',
          optionClassName: 'ジャケット op1 type1',
          defaultFlag: '1',
          retailPrice: 1000,
          retailPriceTaxin: 1080,
          imagePath: '/images/sample/image1.png',
        },
      ],
      required: '1',
      specialOptionFlag: '1',
    },
  ],
};
const optionPattern: IOptionPattern = {
  optionNumber: '1',
  optionName: 'ジャケット op1',
  optionTypes: [
    {
      optionClassNumber: '1',
      optionClassName: 'ジャケット op1 type1',
      defaultFlag: '1',
      retailPrice: 1000,
      retailPriceTaxin: 1080,
      imagePath: '/images/sample/image1.png',
    },
  ],
  required: '1',
  specialOptionFlag: '1',
};

it('it should return a filtered list of design items', () => {
  expect(filterListItems(designSelection, part, 0, false)).toEqual([
    {
      isSpecialOption: false,
      optionName: 'ジャケット op1',
      optionNumber: '1',
      paperState: {
        hasSelected: false,
        isDisable: true,
        isRequire: true,
        optionClassName: '未設定',
        optionClassNumber: null,
        priceTaxIn: 0,
      },
      partsNumber: '01',
      selectBoxState: {
        hasOpen: false,
        optionTypes: [
          {
            defaultFlag: '1',
            imagePath: '/images/sample/image1.png',
            optionClassName: 'ジャケット op1 type1',
            optionClassNumber: '1',
            retailPrice: 1000,
            retailPriceTaxin: 1080,
          },
        ],
        selectedOptionClassNumber: null,
      },
    },
  ]);
  expect(filterListItems(designSelection, partTwo, 0, false)).toEqual([]);
});

it('it should return an options filtered list of design items', () => {
  expect(filterOptionListItem(designSelection, part, 0, optionPattern, false)).toEqual({
    isSpecialOption: false,
    optionName: 'ジャケット op1',
    optionNumber: '1',
    paperState: {
      hasSelected: false,
      isDisable: true,
      isRequire: true,
      optionClassName: '未設定',
      optionClassNumber: null,
      priceTaxIn: 0,
    },
    partsNumber: '01',
    selectBoxState: {
      hasOpen: false,
      optionTypes: [
        {
          defaultFlag: '1',
          imagePath: '/images/sample/image1.png',
          optionClassName: 'ジャケット op1 type1',
          optionClassNumber: '1',
          retailPrice: 1000,
          retailPriceTaxin: 1080,
        },
      ],
      selectedOptionClassNumber: null,
    },
  });
});

it('it should return special options filtered list of design items', () => {
  expect(filterSpecialListItem(designSelection, partTwo, 1)).toEqual({
    isSpecialOption: true,
    optionName: '特殊オプション',
    optionNumber: '1',
    paperState: {
      hasSelected: false,
      isDisable: false,
      isRequire: true,
      optionClassName: '設定なし',
      optionClassNumber: null,
      priceTaxIn: 0,
    },
    partsNumber: '01',
    selectBoxState: { hasOpen: false, optionTypes: [], selectedOptionClassNumber: null },
  });
});
