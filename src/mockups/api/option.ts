import {
  IGetAvailableOptionsReqPathParam,
  IGetAvailableOptionsReqQueryParam,
  IGetAvailableOptionsRes,
  IPart,
  IOptionPattern,
  IOptionType,
} from '../../types/option';
import { getLazyResponseData } from '../../helpers/index';
import { parts as PARTS } from '../../lookups/parts';
import { TPartsNumber } from '../../types/order-items';

export async function getAvailableOptionsRes(
  path?: IGetAvailableOptionsReqPathParam,
  query?: IGetAvailableOptionsReqQueryParam,
) {
  const resData: IGetAvailableOptionsRes = {
    availableOptions: createPartsList(),
  };

  return getLazyResponseData(resData, 300);
}

export function createPartsList(): IPart[] {
  return PARTS.map((part, i) => {
    const ret: IPart = {
      partsNumber: part.code as TPartsNumber,
      partsName: part.label,
      optionPatterns: createOptionPatterns(part.label, 5 + i),
    };
    return ret;
  });
}

const SPECIAL_OPTION_MAX = 20;
const SPECIAL_OPTION_NAME = '特殊オプション';
const SPECIAL_OPTION_DEFAULT: IOptionType = {
  optionClassNumber: '00',
  optionClassName: 'なし',
  defaultFlag: '1',
  retailPrice: 0,
  retailPriceTaxin: 0,
  imagePath: '',
};

function createOptionPatterns(partsName: string, creatingNumber: number): IOptionPattern[] {
  const ret: IOptionPattern[] = [];
  for (let i = 0; i < creatingNumber; i++) {
    const index = String(i + 1);
    const optionName = `${partsName} op${index}`;
    const creationgOptionTypeNumber = i === 3 ? 1 : i + 8;
    const element: IOptionPattern = {
      optionNumber: index,
      optionName,
      optionTypes: createOptionTypes(optionName, creationgOptionTypeNumber),
      required: i !== 4 ? '1' : '0',
      specialOptionFlag: '0',
    };
    ret.push(element);
  }

  for (let i = 0; i < SPECIAL_OPTION_MAX; i++) {
    const index = String(i + 100 - SPECIAL_OPTION_MAX);
    const optionTypes = createOptionTypes(SPECIAL_OPTION_NAME + index, i + 3, true);
    const element: IOptionPattern = {
      optionNumber: index,
      optionName: SPECIAL_OPTION_NAME + index,
      optionTypes: [SPECIAL_OPTION_DEFAULT, ...optionTypes],
      required: '0',
      specialOptionFlag: '1',
    };
    ret.push(element);
  }

  return [...ret];
}

const IMAGE_PATH = '/images/sample/image';
const IMAGE_EXTENTION = '.png';
function createOptionTypes(optionName: string, creatingNumber: number, isSpecial = false): IOptionType[] {
  const ret: IOptionType[] = [];
  for (let i = 0; i < creatingNumber; i++) {
    const index = String(i + 1);
    const price = Math.floor((i + 1) * 1000);
    const element: IOptionType = {
      optionClassNumber: index,
      optionClassName: `${optionName} type${index}`,
      defaultFlag: !isSpecial ? (i === 0 ? '1' : '0') : '0',
      retailPrice: price,
      retailPriceTaxin: Math.floor(price * 1.08),
      imagePath: IMAGE_PATH + String((i % 12) + 1) + IMAGE_EXTENTION,
    };
    ret.push(element);
  }

  return [...ret];
}

export const OPTION_DATA: IGetAvailableOptionsRes = {
  availableOptions: createPartsList(),
};
