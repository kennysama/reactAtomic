import { Dispatch, Action } from 'redux';

import Logger from '../../helpers/logger';

import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';

export enum ActionType {
  UPDATE_HEADER_TITLE = '[Header] Update Header Title',
}

export type UpdateHeaderTitle = { type: typeof ActionType.UPDATE_HEADER_TITLE; payload: string };

// actions
export function updateHeaderTitle(textKey: string): UpdateHeaderTitle {
  return { type: ActionType.UPDATE_HEADER_TITLE, payload: textKey };
}

// actions creater
export function setTitleTextKey(textKey: string): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] Update Header Title', textKey);
  return (dispatch: Dispatch) => {
    dispatch(updateHeaderTitle(textKey));
  };
}

// FIXME: create new navigation store and state has only currentPath.
// currentPath handle HeaderTitle and Stepbar state.
// converter
export function getCurrentPath(state: AppState): string {
  const { textKey } = state.header.header;
  const currentPath = window.location.pathname;
  Logger.log('[Store] getCurrentPath and Header', { currentPath, textKey });
  return currentPath;
}

export type Actions = UpdateHeaderTitle;
