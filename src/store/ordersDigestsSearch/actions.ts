import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';

import Logger from '../../helpers/logger';
import * as ordersDigests from '../../services/order-search/order-search';
import { IOrderDigests, IOrderDigestsSearch } from '../../types/ordersDigests';
import { IOrderDigestsSearchReq } from '../../types/order-search-api';

export enum ActionType {
  LOAD_ORDER_DIGESTS_SUCCESS = '[OrderDigests] Load Order Success',
  ORDER_DIGESTS_REQUEST = '[OrderDigests] Order Request',
  ORDER_DIGESTS_FAILURE = '[OrderDigests] Order Failure',
}

// Action Types
export type OrdersDigestsRequest = { type: typeof ActionType.ORDER_DIGESTS_REQUEST };
export type OrderDigestsFailure = { type: typeof ActionType.ORDER_DIGESTS_FAILURE; ex: Error };
export type LoadOrderDigestsSuccess = { type: typeof ActionType.LOAD_ORDER_DIGESTS_SUCCESS; payload: IOrderDigests[] };

// Actions
export function OrdersDigestsRequest(): OrdersDigestsRequest {
  return { type: ActionType.ORDER_DIGESTS_REQUEST };
}
export function OrderDigestsFailure(ex: Error): OrderDigestsFailure {
  return { type: ActionType.ORDER_DIGESTS_FAILURE, ex };
}
export function LoadOrderDigestsSuccess(payload: IOrderDigests[]): LoadOrderDigestsSuccess {
  return { type: ActionType.LOAD_ORDER_DIGESTS_SUCCESS, payload };
}

// Action Creators
export function GetOrderDigests(req: IOrderDigestsSearchReq): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] loadOrder');
  return (dispatch: Dispatch) => {
    dispatch(OrdersDigestsRequest());

    const params = resolveSearchDigestsReqParams(req);

    return ordersDigests
      .searchOrderDigests(params)
      .then(data => {
        dispatch(LoadOrderDigestsSuccess(data));
      })
      .catch((ex: Error) => {
        dispatch(OrderDigestsFailure(ex));
      });
  };
}

function resolveSearchDigestsReqParams(state: IOrderDigestsSearch): IOrderDigestsSearchReq {
  return GetSearchDigestsReqParams(state);
}

export function GetSearchDigestsReqParams(params: IOrderDigestsSearch): IOrderDigestsSearchReq {
  return {
    categoryCode: params.categoryCode,
    customerPhoneNumber: params.customerPhoneNumber,
    memberscardNumber: params.memberscardNumber,
    customerNameKana: params.customerNameKana,
    customerNameKanji: params.customerNameKanji,
    orderDateFrom: params.orderDateFrom,
    orderDateTo: params.orderDateTo,
  };
}

export type Actions = OrdersDigestsRequest | OrderDigestsFailure | LoadOrderDigestsSuccess;
