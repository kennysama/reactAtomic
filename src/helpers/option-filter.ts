import { isSameSelectedOptionParam, getSelectedOptionType } from './option';
import {
  IDesignSelection,
  IPart,
  IOptionPattern,
  IOptionType,
  IOptionListItem,
  IOptionSelectingParam,
} from '../types/option';
import { Nullable } from '../types';

// new
export function filterListItems(
  designSelection: IDesignSelection,
  parts: IPart,
  partsIndex: number,
  isFromSpecialList: boolean = false,
): IOptionListItem[] {
  const isSpecial = (flag: string) => flag === '1';
  const optionPatterns = parts.optionPatterns.filter(v =>
    isFromSpecialList ? isSpecial(v.specialOptionFlag) : !isSpecial(v.specialOptionFlag),
  );

  return optionPatterns.map(optionPattern => {
    return filterOptionListItem(designSelection, parts, partsIndex, optionPattern, isFromSpecialList);
  });
}

// new
export function filterOptionListItem(
  designSelection: IDesignSelection,
  parts: IPart,
  partsIndex: number,
  optionPattern: IOptionPattern,
  isSpecial: boolean,
): IOptionListItem {
  const { availableOptions, selectedOptions, selectingOption } = designSelection;
  const { partsNumber } = parts;
  const { optionNumber } = optionPattern;

  const getOptionType = (): Nullable<IOptionType> => {
    const param: IOptionSelectingParam = {
      partsNumber,
      partsIndex,
      optionNumber,
      optionClassNumber: null,
      hasOpenPopup: false,
    };

    const matchedSelectedParam = selectedOptions.find(v => isSameSelectedOptionParam(v, param, true));
    return matchedSelectedParam ? getSelectedOptionType(availableOptions, matchedSelectedParam) : null;
  };

  const selectedOptionType = getOptionType();

  const getPriceTaxIn = (): number => {
    return selectedOptionType ? selectedOptionType.retailPriceTaxin : 0;
  };

  const getOptionName = (): string => {
    return optionPattern.optionName;
  };

  const getOptionClassNumber = (): Nullable<string> => {
    return selectedOptionType ? selectedOptionType.optionClassNumber : null;
  };

  const getOptionClassName = (): string => {
    return selectedOptionType ? selectedOptionType.optionClassName : '未設定';
  };

  const hasSelected = (): boolean => {
    if (partsNumber !== selectingOption.partsNumber) {
      return false;
    }
    if (optionNumber !== selectingOption.optionNumber) {
      return false;
    }
    if (partsIndex !== selectingOption.partsIndex) {
      return false;
    }
    return true;
  };

  const isRequired = (): boolean => {
    if (selectedOptionType) {
      return false;
    }
    return optionPattern.required === '1' ? true : false;
  };

  const isDisable = (): boolean => {
    return optionPattern.optionTypes.length <= 1 ? true : false;
  };

  const hasOpen = (): boolean => {
    if (!isSpecial) {
      return false;
    }
    if (!selectingOption.hasOpenPopup) {
      return false;
    }
    if (partsNumber !== selectingOption.partsNumber) {
      return false;
    }
    if (optionNumber !== selectingOption.optionNumber) {
      return false;
    }
    return true;
  };

  return {
    // listitem
    partsNumber,
    optionNumber,
    optionName: getOptionName(),
    isSpecialOption: false,
    // paper
    paperState: {
      optionClassNumber: getOptionClassNumber(),
      optionClassName: getOptionClassName(),
      priceTaxIn: getPriceTaxIn(),
      hasSelected: hasSelected(),
      isRequire: isRequired(),
      isDisable: isDisable(),
    },
    selectBoxState: {
      selectedOptionClassNumber: getOptionClassNumber(),
      hasOpen: hasOpen(),
      optionTypes: optionPattern.optionTypes,
    },
  };
}

export function filterSpecialListItem(
  designSelection: IDesignSelection,
  parts: IPart,
  partsIndex: number,
): IOptionListItem {
  const { availableOptions, selectedOptions, selectingOption } = designSelection;
  const { optionPatterns, partsNumber } = parts;

  const getOptionType = (pattern: IOptionPattern): Nullable<IOptionType> => {
    const param: IOptionSelectingParam = {
      partsNumber,
      partsIndex,
      optionNumber: pattern.optionNumber,
      optionClassNumber: null,
      hasOpenPopup: false,
    };

    const matchedSelectedParam = selectedOptions.find(v => isSameSelectedOptionParam(v, param, true));
    return matchedSelectedParam ? getSelectedOptionType(availableOptions, matchedSelectedParam) : null;
  };

  const getPriceTaxInTotal = (patterns: IOptionPattern[]): number => {
    return patterns.reduce((pre, cur) => {
      const optionType = getOptionType(cur);
      return optionType ? pre + optionType.retailPriceTaxin : pre;
    }, 0);
  };

  const getOptionName = () => {
    return '特殊オプション';
  };

  const getOptionClassName = (patterns: IOptionPattern[]): string => {
    const optionNumbers = patterns.map(v => v.optionNumber);
    const samePartsSelectedOptions = selectedOptions.filter(
      v => v.partsIndex === partsIndex && v.partsNumber === partsNumber,
    );
    const isMatch = (optionNumber: string) =>
      samePartsSelectedOptions.find(v => v.optionNumber === optionNumber) ? true : false;

    return optionNumbers.some(v => isMatch(v)) ? '設定あり' : '設定なし';
  };

  const hasSelected = (patterns: IOptionPattern[]): boolean => {
    if (partsNumber !== selectingOption.partsNumber) {
      return false;
    }
    if (partsIndex !== selectingOption.partsIndex) {
      return false;
    }

    const optionPattern = patterns.find(v => v.optionNumber === selectingOption.optionNumber);
    return optionPattern ? true : false;
  };

  const isRequired = (patterns: IOptionPattern[]): boolean => {
    const total = patterns.reduce((pre, cur) => {
      return pre + +cur.required;
    }, 0);
    return total > 0 ? true : false;
  };

  const isDisable = (patterns: IOptionPattern[]): boolean => {
    return patterns.length < 1 ? true : false;
  };

  const specialOptionPatterns = optionPatterns.filter(v => v.specialOptionFlag === '1');
  const priceTaxInTotal = getPriceTaxInTotal(specialOptionPatterns);
  return {
    partsNumber: parts.partsNumber,
    optionNumber: specialOptionPatterns[0].optionNumber,
    optionName: getOptionName(),
    isSpecialOption: true,
    paperState: {
      optionClassNumber: null,
      optionClassName: getOptionClassName(specialOptionPatterns),
      priceTaxIn: priceTaxInTotal,
      hasSelected: hasSelected(specialOptionPatterns),
      isRequire: isRequired(specialOptionPatterns),
      isDisable: isDisable(specialOptionPatterns),
    },
    selectBoxState: {
      hasOpen: false,
      // FIXME: 多分いらない
      optionTypes: [],
      selectedOptionClassNumber: null,
    },
  };
}
