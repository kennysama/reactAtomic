import { Actions, ActionType } from './actions';

import { IHomeParams } from '../../types/home';

export interface IHomeState {
  home: IHomeParams;
}

export const initialState: IHomeState = {
  home: { orderConfirmationItemId: 0, category: '', subCategory: '', itemCode: '', pieces: [] },
};

export function homeReducer(state: IHomeState = initialState, action: Actions): IHomeState {
  switch (action.type) {
    case ActionType.LOAD_HOME_PARAMETERS_SUCCESS:
      return { ...state, home: { ...action.payload } };
    case ActionType.HOME_DEFAULT:
      return { ...initialState };
    case ActionType.LOAD_HOME_PARAMETERS_FROM_TEMPORAL:
      return { ...state, home: action.payload };
  }

  return state;
}
