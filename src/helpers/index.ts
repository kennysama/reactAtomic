import { Nullable } from '../types';
import { ILookupItem } from '../types/lookup';

export function isInputChecked(selectedOption: Nullable<string>, option: ILookupItem): boolean {
  if (!selectedOption) {
    return false;
  }

  return Number(selectedOption) === option.id;
}

export async function getLazyResponseData<T>(data: T, waitFor: number = 1): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, waitFor);
  });
}
