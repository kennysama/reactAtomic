import { Nullable } from '../types/index';
import {
  IPart,
  IOptionPattern,
  IOptionType,
  IOptionSelectingParam,
  IOptionSelectedParam,
  ISidebarPart,
  IOtherCondition,
  IGetAvailableOptionsReqQueryParam,
  IGetAvailableOptionsReqPathParam,
  IRequestParameter,
} from '../types/option';
import { TLookup, ILookupItem } from '../types/lookup';
import { NO_SELECT_OPTION, INITIAL_PARTS_COUNT, ORDER_CATALOG_ALL } from '../lookups/option';
import { TPartsNumber, TCategory, TSubCategory, TPartsCount, TOrderItemCode } from '../types/order-items';
import { parts as PARTS } from '../lookups/parts';
import { NO_SELECT_OPTION_CLASS_NUMBER } from '../lookups/option';
import { IClothSelection } from '../types/cloth-selection';

// new
export const isSpecialOption = (v: Nullable<IOptionPattern>) => v !== null && v.specialOptionFlag === '1';

export function getPartsName(partsNumber: TPartsNumber): string {
  const part = PARTS.find(v => v.code === partsNumber);
  return part ? part.label : '';
}

export function toSpecialOptionLookups(optionTypes: IOptionType[]): TLookup {
  return [NO_SELECT_OPTION, ...optionTypes].map(type => {
    const item: ILookupItem = {
      id: type.optionClassNumber,
      value: type.optionClassName,
    };
    return item;
  });
}

export function toOptionTypeFromLookup(
  optionTypes: IOptionType[],
  optionClassNumber: Nullable<string>,
): Nullable<IOptionType> {
  const optionType = optionTypes.find(type => type.optionClassNumber === optionClassNumber);
  return optionType ? optionType : null;
}

/**
 * 選択済みのオプションを選択したオプションで編集して、返却する
 * @param selectedOptionParams 選択済みのオプション
 * @param selectingOptionParam 選択したオプション
 */
export function editSelectedOptionParams(
  selectedOptionParams: IOptionSelectedParam[],
  selectingOptionParam: IOptionSelectingParam,
): IOptionSelectedParam[] {
  const hasSameOptionType = selectedOptionParams.find(v => isSameSelectedOptionParam(v, selectingOptionParam));
  if (hasSameOptionType) {
    // 同一のoptionTypeがある場合は削除して返却
    return selectedOptionParams.filter(v => !isSameSelectedOptionParam(v, selectingOptionParam));
  }

  const hasSameOptionPattern = selectedOptionParams.find(v => isSameSelectedOptionParam(v, selectingOptionParam, true));
  if (hasSameOptionPattern) {
    // 同一のOptionPatternがある場合はoptionNumberが合致するのを削除
    const deletedSameOptionPattern = selectedOptionParams.filter(
      v => !isSameSelectedOptionParam(v, selectingOptionParam, true),
    );

    // optionClassNumberが未選択の場合は削除した配列を返却
    if (selectingOptionParam.optionClassNumber === NO_SELECT_OPTION_CLASS_NUMBER) {
      return deletedSameOptionPattern;
    }

    // 未選択でない場合は追加して返却
    return [...deletedSameOptionPattern, toSelectedOptionParam(selectingOptionParam)];
  }

  // 上記以外は追加して返却
  return [...selectedOptionParams, toSelectedOptionParam(selectingOptionParam)];
}

// new
export function isSameSelectedOptionParam(
  selectedOptionParam: IOptionSelectedParam,
  selectingOptionParam: IOptionSelectingParam,
  isNoCheckOptionClassNumber: boolean = false,
): boolean {
  const { partsIndex, partsNumber, optionNumber, optionClassNumber } = selectingOptionParam;
  if (selectedOptionParam.partsIndex !== partsIndex) {
    return false;
  }
  if (selectedOptionParam.partsNumber !== partsNumber) {
    return false;
  }
  if (selectedOptionParam.optionNumber !== optionNumber) {
    return false;
  }
  if (isNoCheckOptionClassNumber) {
    return true;
  }
  if (selectedOptionParam.optionClassNumber !== optionClassNumber) {
    return false;
  }
  return true;
}

// new
export function toSelectedOptionParam(selectingOptionParam: IOptionSelectingParam): IOptionSelectedParam {
  const { partsIndex, partsNumber, optionNumber, optionClassNumber } = selectingOptionParam;
  if (optionClassNumber === null) {
    throw new Error('toSelectedOptionParam function cannot convert.');
  }
  return {
    partsIndex,
    partsNumber,
    optionNumber,
    optionClassNumber,
  };
}

// new
export function getSelectedOptionType(
  availableOptions: IPart[],
  selectedOptionParam: IOptionSelectedParam,
): Nullable<IOptionType> {
  const { partsNumber, optionNumber, optionClassNumber } = selectedOptionParam;
  const matchedParts = availableOptions.find(v => v.partsNumber === partsNumber);
  if (!matchedParts) {
    return null;
  }

  const matchedOptionPattern = matchedParts.optionPatterns.find(v => v.optionNumber === optionNumber);
  if (!matchedOptionPattern) {
    return null;
  }

  const matchedOptionType = matchedOptionPattern.optionTypes.find(v => v.optionClassNumber === optionClassNumber);
  if (!matchedOptionType) {
    return null;
  }

  return matchedOptionType;
}

// new
export function calcOptionTotal(availableOptions: IPart[], selectedOptionParams: IOptionSelectedParam[]): number {
  const selectedOptions = selectedOptionParams.map(v => getSelectedOptionType(availableOptions, v));
  return selectedOptions.reduce((pre, cur) => {
    return cur === null ? pre : pre + cur.retailPriceTaxin;
  }, 0);
}

// new
export function getSelectingOptionPattern(
  availableOptions: IPart[],
  selectingOptionParam: IOptionSelectingParam,
): Nullable<IOptionPattern> {
  const { partsNumber, optionNumber } = selectingOptionParam;
  const matchedParts = availableOptions.find(v => v.partsNumber === partsNumber);
  if (!matchedParts) {
    return null;
  }

  const matchedOptionPattern = matchedParts.optionPatterns.find(v => v.optionNumber === optionNumber);
  if (!matchedOptionPattern) {
    return null;
  }

  return matchedOptionPattern;
}

export function getInitialSelectedOptionParams(
  availableOptions: IPart[],
  sidebarParts: ISidebarPart[],
): IOptionSelectedParam[] {
  return sidebarParts
    .map((sidebarPart, partsIndex) => {
      return getInitialSelectedOptionParam(availableOptions, sidebarPart.number, partsIndex);
    })
    .reduce((pre, cur) => [...pre, ...cur], []);
}

export function getInitialSelectedOptionParam(
  availableOptions: IPart[],
  partsNumber: TPartsNumber,
  partsIndex: number,
): IOptionSelectedParam[] {
  const parts = getAvailableOptionsParts(availableOptions, partsNumber);
  const optionPatterns = parts.optionPatterns.filter(v => v.optionTypes.length === 1);
  return optionPatterns.map(optionPattern => {
    const optionNumber = optionPattern.optionNumber;
    // MEMO: filterで1つのものしか抽出してないからOK
    const optionClassNumber = optionPattern.optionTypes[0].optionClassNumber;
    const param: IOptionSelectedParam = {
      partsIndex,
      partsNumber,
      optionNumber,
      optionClassNumber,
    };
    return param;
  });
}

export function getAvailableOptionsParts(availableOptions: IPart[], partsNumber: TPartsNumber): IPart {
  const parts = availableOptions.find(v => v.partsNumber === partsNumber);
  if (!parts) {
    throw new Error(`ERROR: this partsNumber ${partsNumber} is not found from availableOptions response.`);
  }
  return parts;
}

export function getDefaultSelectedOptionParams(
  availableOptions: IPart[],
  selectedOptionParams: IOptionSelectedParam[],
  partsIndex: number,
  partsNumber: TPartsNumber,
): IOptionSelectedParam[] {
  const parts = getAvailableOptionsParts(availableOptions, partsNumber);
  const matchedParams = selectedOptionParams.filter(v => v.partsIndex === partsIndex && v.partsNumber === partsNumber);

  const defaultParams: IOptionSelectedParam[] = [];
  parts.optionPatterns.forEach(optionPattern => {
    const { optionNumber } = optionPattern;
    const alreadySelectedParam = matchedParams.find(v => v.optionNumber === optionNumber);
    if (alreadySelectedParam) {
      return;
    }

    const defaultOptionType = optionPattern.optionTypes.find(v => v.defaultFlag === '1');
    if (!defaultOptionType) {
      return;
    }

    const { optionClassNumber } = defaultOptionType;
    const param: IOptionSelectedParam = {
      partsIndex,
      partsNumber,
      optionNumber,
      optionClassNumber,
    };
    defaultParams.push(param);
  });

  return defaultParams;
}

export function canAddPartsList(partsList: TPartsNumber[], partsNumber: TPartsNumber): boolean {
  const matchedParts = partsList.filter(v => v === partsNumber);
  return matchedParts.length > 0 ? true : false;
}

export function deletePartsList(
  partsList: TPartsNumber[],
  partsNumber: TPartsNumber,
  position?: number,
): TPartsNumber[] {
  const targetIndex = partsList.indexOf(partsNumber, position);
  if (targetIndex === -1) {
    throw new Error(`ERROR: this partsNumber ${partsNumber} is not found from partsList parameter.`);
  }
  return partsList.filter((v, i) => i !== targetIndex);
}

export function deleteSelectedOptionParams(
  selectedOptionParams: IOptionSelectedParam[],
  partsNumber: TPartsNumber,
  partsIndex: number,
): IOptionSelectedParam[] {
  return selectedOptionParams.filter(v => v.partsNumber !== partsNumber || v.partsIndex !== partsIndex);
}

export function hasCompleteSelected(
  availableOptions: IPart[],
  sidebarParts: ISidebarPart[],
  selectedOptionParams: IOptionSelectedParam[],
): boolean {
  // 1つも選択していない場合はfalse
  if (selectedOptionParams.length < 1) {
    return false;
  }

  // 選択可能かつ必須オプションを抽出する
  const requieredParams = sidebarParts
    .map(sidebarPart => {
      const partsNumber = sidebarPart.number;
      const partsIndex = sidebarPart.index;
      const part = getAvailableOptionsParts(availableOptions, partsNumber);
      const optionPatterns = part.optionPatterns.filter(v => v.required === '1');
      const params = optionPatterns.map(pattern => {
        const param: IOptionSelectingParam = {
          partsIndex,
          partsNumber,
          optionNumber: pattern.optionNumber,
          // memo: 以下は比較しないのでテキトーに
          optionClassNumber: '',
          hasOpenPopup: false,
        };
        return param;
      });
      return params;
    })
    .reduce((pre, cur) => [...pre, ...cur], []);

  // 選択済みのオプションに必須オプションが全て含まれているか
  return requieredParams.every(v => selectedOptionParams.some(w => isSameSelectedOptionParam(w, v, true)));
}

export function getAddableParts(
  category: TCategory,
  subCategory: TSubCategory,
  initialPieces: TPartsNumber[],
): TPartsNumber[] {
  return getPartsNumberList(category, subCategory, initialPieces);
}

export function getDeletableParts(
  category: TCategory,
  subCategory: TSubCategory,
  initialPieces: TPartsNumber[],
): TPartsNumber[] {
  return getPartsNumberList(category, subCategory, initialPieces, true);
}

function getPartsNumberList(
  category: TCategory,
  subCategory: TSubCategory,
  initialPieces: TPartsNumber[],
  isDeletable = false,
): TPartsNumber[] {
  const partsCount = getMaxOrMinPartsCount(category, subCategory, isDeletable);
  const initialPartsCount = toTPartsCount(INITIAL_PARTS_COUNT, initialPieces);

  const keys = Object.keys(INITIAL_PARTS_COUNT);
  return keys
    .map(key => {
      const count = isDeletable ? initialPartsCount[key] - partsCount[key] : partsCount[key] - initialPartsCount[key];
      return Array.from({ length: count }, () => key as TPartsNumber);
    })
    .reduce((pre, cur) => [...pre, ...cur], []);
}

function getMaxOrMinPartsCount(category: TCategory, subCategory: TSubCategory, isMin = false): TPartsCount {
  const targetPieces = ORDER_CATALOG_ALL.filter(v => {
    return v.category === category && v.subCategory === subCategory;
  }).map(v => v.pieces);

  const partsCountList = targetPieces.map(v => toTPartsCount({ ...INITIAL_PARTS_COUNT }, v));
  const partsCount = { ...INITIAL_PARTS_COUNT };
  const keys = Object.keys(INITIAL_PARTS_COUNT) as TPartsNumber[];
  keys.forEach(key => {
    const value = isMin ? Math.min(...partsCountList.map(v => v[key])) : Math.max(...partsCountList.map(v => v[key]));
    partsCount[key] = value;
  });

  return partsCount;
}

function toTPartsCount(partsObject: TPartsCount, parts: TPartsNumber[]): TPartsCount {
  const pre = { ...partsObject };
  const keys = Object.keys(INITIAL_PARTS_COUNT) as TPartsNumber[];
  keys.forEach(key => {
    const partsCount = parts.filter(v => v === key).length;
    const isTarget = pre[key] < partsCount;
    if (isTarget) {
      pre[key] = partsCount;
    }
  });
  return pre;
}

// request param
export function createRequestPathParameter(
  clothSelection: IClothSelection,
  currentItemCode: TOrderItemCode,
  inititalItemCode: TOrderItemCode,
): IGetAvailableOptionsReqPathParam {
  const param: IGetAvailableOptionsReqPathParam = {
    brandCode: clothSelection.brand.value,
    itemCode: currentItemCode ? currentItemCode : inititalItemCode,
    seasonCode: clothSelection.seasonCode,
  };
  return param;
}

export function createRequestQueryParameter(
  clothSelection: IClothSelection,
  selectedLanguage: ILookupItem,
): IGetAvailableOptionsReqQueryParam {
  const param: IGetAvailableOptionsReqQueryParam = {
    optionPattern: clothSelection.optionPattern,
    languageCode: selectedLanguage.value,
  };
  return param;
}

export function createOtherCondition(
  category: TCategory,
  subCategory: TSubCategory,
  initialPieces: TPartsNumber[],
): IOtherCondition {
  const condition: IOtherCondition = {
    category,
    subCategory,
    initialPieces,
  };
  return condition;
}

export function shouldReloadAvailableOptions(
  currentParam: IRequestParameter,
  pathParam: IGetAvailableOptionsReqPathParam,
  queryParam: IGetAvailableOptionsReqQueryParam,
  otherCondition: IOtherCondition,
): boolean {
  const { path, query, other } = currentParam;
  // MEMO: objectを作る関数が同一だからstringifyで大丈夫
  if (JSON.stringify(path) !== JSON.stringify(pathParam)) {
    return true;
  }
  if (JSON.stringify(query) !== JSON.stringify(queryParam)) {
    return true;
  }
  // other
  if (other.category !== otherCondition.category) {
    return true;
  }
  if (other.subCategory !== otherCondition.subCategory) {
    return true;
  }
  return false;
}

export function isDoubleDesign(selectedOptions: IOptionSelectedParam[]): boolean {
  // FIXME: 実装は仮
  return selectedOptions.some(v => v.partsNumber === '01' && v.optionNumber === '1' && 4 < +v.optionClassNumber);
}

export function mergeSelectedOptions(
  selectedOptions: IOptionSelectedParam[],
  initialOptions: IOptionSelectedParam[],
): IOptionSelectedParam[] {
  const targetOptions = initialOptions.filter(initialOption => {
    if (!selectedOptions.find(v => v.partsIndex === initialOption.partsIndex)) {
      return false;
    }
    if (!selectedOptions.find(v => v.partsNumber === initialOption.partsNumber)) {
      return false;
    }
    if (!selectedOptions.find(v => v.optionNumber === initialOption.optionNumber)) {
      return false;
    }
    if (!selectedOptions.find(v => v.optionClassNumber === initialOption.optionClassNumber)) {
      return false;
    }
    return true;
  });

  return [...selectedOptions, ...targetOptions];
}
