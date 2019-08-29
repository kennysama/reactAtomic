import { Actions, ActionType } from './actions';

export interface IHeaderState {
  textKey: string;
}

const initialState: IHeaderState = {
  textKey: 'Home.page',
};

export function headerReducer(state: IHeaderState = initialState, action: Actions): IHeaderState {
  switch (action.type) {
    case ActionType.UPDATE_HEADER_TITLE:
      return {
        ...state,
        textKey: action.payload,
      };
  }

  return state;
}
