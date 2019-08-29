import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';

import Logger from '../../helpers/logger';
import { ILookupItem } from '../../types/lookup';
import { getLanguage } from '../../helpers/i18n';
import { IndexedObject } from '../../types';

export enum ActionType {
  LANGUAGE_REQUEST = '[Language]  Request',
  LANGUAGE_RESOURCE = '[Language]  Resource',
  LANGUAGE_SUCCESS = '[Language]  Success',
  LANGUAGE_FAILURE = '[Language]  Failure',
}

export type LanguageRequest = { type: typeof ActionType.LANGUAGE_REQUEST };
export type LanguageResource = { type: typeof ActionType.LANGUAGE_RESOURCE; payload: IndexedObject };
export type LanguageSuccess = { type: typeof ActionType.LANGUAGE_SUCCESS; payload: ILookupItem };
export type LanguageFailure = { type: typeof ActionType.LANGUAGE_FAILURE; ex: Error };

export function languageRequest(): LanguageRequest {
  return { type: ActionType.LANGUAGE_REQUEST };
}
export function languageResource(payload: any): LanguageResource {
  return { type: ActionType.LANGUAGE_RESOURCE, payload };
}
export function languageSuccess(payload: ILookupItem): LanguageSuccess {
  return { type: ActionType.LANGUAGE_SUCCESS, payload };
}
export function languageFailure(ex: Error): LanguageFailure {
  return { type: ActionType.LANGUAGE_FAILURE, ex };
}

export function loadLanguage(params: ILookupItem): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] loadLanguage');

  return (dispatch: Dispatch) => {
    dispatch(languageRequest());
    const newResource = getLanguage(+params.id);
    dispatch(languageResource(newResource));
    dispatch(languageSuccess(params));
  };
}

export type LanguageActions = LanguageRequest | LanguageResource | LanguageSuccess | LanguageFailure;
