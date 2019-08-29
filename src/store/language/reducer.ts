import { LanguageActions, ActionType } from './actions';
import { ILookupItem } from '../../types/lookup';
import { getLanguage } from '../../helpers/i18n';
import { IndexedObject } from '../../types';
import { LANGUAGE_LOOKUPS } from '../../lookups/language';

export interface ILanguageState {
  language: ILookupItem;
  resource: IndexedObject;
  loading: boolean;
}

export const initialState: ILanguageState = {
  language: LANGUAGE_LOOKUPS[0],
  resource: getLanguage(),
  loading: false,
};

export function languageReducer(state: ILanguageState = initialState, action: LanguageActions): ILanguageState {
  switch (action.type) {
    case ActionType.LANGUAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionType.LANGUAGE_RESOURCE:
      return {
        ...state,
        resource: action.payload,
      };

    case ActionType.LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        language: action.payload,
      };
  }

  return state;
}
