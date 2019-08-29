import { Actions, ActionType } from './actions';

import { IOrderDigests, IOrderDigestsSearch } from '../../types/ordersDigests';

export interface IOrderDigestsState {
  data: IOrderDigests[];
  loaded: boolean;
  loading: boolean;
  filterParams: IOrderDigestsSearch;
}

export const initialState: IOrderDigestsState = {
  data: [],
  loaded: false,
  loading: false,
  filterParams: {
    categoryCode: '1',
    customerPhoneNumber: '',
    memberscardNumber: '',
    customerNameKana: '',
    customerNameKanji: '',
    orderDateFrom: new Date(),
    orderDateTo: new Date(),
  },
};

export function orderDigestsReducer(state: IOrderDigestsState = initialState, action: Actions): IOrderDigestsState {
  switch (action.type) {
    case ActionType.ORDER_DIGESTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionType.ORDER_DIGESTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };

    case ActionType.LOAD_ORDER_DIGESTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
  }

  return state;
}
