import { NudeDemensionCodeType, NudeDemensionCodeShirtType, IOptionClass, IOption } from '../types/size-correction';
import { ALL_NUDE_DIMENSIONS } from '../lookups/size-correction';
import { TLookup } from '../types/lookup';

export function getNudeDimensionsName(code: NudeDemensionCodeType | NudeDemensionCodeShirtType): string {
  const dimension = ALL_NUDE_DIMENSIONS.find(v => v.code === code);
  if (!dimension) {
    throw new Error();
  }
  return dimension.name;
}

export function toSizeAdjustOptionLookups(optionClasses: IOptionClass[]): TLookup {
  return optionClasses.map(v => {
    return {
      id: v.optionClassNumber,
      value: v.optionClassName,
    };
  });
}

export function getSizeAdjustHistory(measurementNumber: number | string, histories: IOption[]): IOption {
  const history = histories.find(v => v.optionCode === String(measurementNumber));
  if (!history) {
    throw new Error();
  }
  return history;
}
