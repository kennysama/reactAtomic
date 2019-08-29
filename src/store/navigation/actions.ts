import { Dispatch, Action } from 'redux';

import Logger from '../../helpers/logger';
import history from '../../helpers/history';
import config from '../../configuration/config';

import { ERouterPath } from '../../types/index';
import { resolvePath } from '../../helpers/path';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';

export enum ActionType {
  HOME_DEFAULT = '[Navigation]  HOME_DEFAULT',
  HOME_WITH_ORDERS = '[Navigation]  HOME_WITH_ORDER',
  ORDERS_SEARCH_PAGE_DEFAULT = '[Navigation]  ORDERS_SEARCH_PAGE_DEFAULT',
  ADDRESS_DEFAULT = '[Navigation]  ADDRESS_DEFAULT',
  ADDRESS_SUCCESS = '[Navigation]  ADDRESS_SUCCESS',
  CLOTH_SELECTION_DEFAULT = '[Navigation]  CLOTH_SELECTION_DEFAULT',
  CLOTH_SELECTION_FAILURE = '[Navigation]  CLOTH_SELECTION_FAILURE',
  CLOTH_SELECTION_SUCCESS = '[Navigation]   CLOTH_SELECTION_SUCCESS',
  AMOUNT_DEFAULT = '[Navigation]  AMOUNT_DEFAULT',
  AMOUNT_SUCESS = '[Navigation]  AMOUNT_SUCESS',
  DESIGN_SELECTION_DEFAULT = '[Navigation]  DESIGN_SELECTION_DEFAULT',
  DESIGN_SELECTION_SUCCESS = '[Navigation] DESIGN_SELECTION_SUCCESS',
  PRIVACY_POLICY_DEFAULT = '[Navigation]  PRIVACY_POLICY_DEFAULT',
  PRIVACY_POLICY_SUCCESS = '[Navigation]  PRIVACY_POLICY_SUCCESS',
  SETTLEMENT_DEFAULT = '[Navigation]  SETTLEMENT_DEFAULT',
  SIZE_CORRECTION_DEFAULT = '[Navigation] SIZE_CORRECTION_DEFAULT',
  INVENTORY_SEARCH_DEFAULT = '[Navigation]  INVENTORY_SEARCH_DEFAULT',
  ORDER_CONTENT_CONFIRMATION_DEFAULT = '[Navigation]  ORDER_CONTENT_CONFIRMATION_DEFAULT',
}

export type HomeDefault = { type: typeof ActionType.HOME_DEFAULT };
export type HomeWithOrders = { type: typeof ActionType.HOME_WITH_ORDERS };
export type OrdersSearchPage = { type: typeof ActionType.ORDERS_SEARCH_PAGE_DEFAULT };
export type AddressDefault = { type: typeof ActionType.ADDRESS_DEFAULT };
export type AddressSuccess = { type: typeof ActionType.ADDRESS_SUCCESS };
export type ClothSelectionDefault = { type: typeof ActionType.CLOTH_SELECTION_DEFAULT };
export type ClothSelectionFailure = { type: typeof ActionType.CLOTH_SELECTION_FAILURE };
export type ClothSelectionSuccess = { type: typeof ActionType.CLOTH_SELECTION_SUCCESS };
export type AmountDefault = { type: typeof ActionType.AMOUNT_DEFAULT };
export type AmountSuccess = { type: typeof ActionType.AMOUNT_SUCESS };
export type DesignSelection = { type: typeof ActionType.DESIGN_SELECTION_DEFAULT };
export type DesignSelectionSuccess = { type: typeof ActionType.DESIGN_SELECTION_SUCCESS };
export type PrivacyPolicyDefault = { type: typeof ActionType.PRIVACY_POLICY_DEFAULT };
export type PrivacyPolicySuccess = { type: typeof ActionType.PRIVACY_POLICY_SUCCESS };
export type SettlementDefault = { type: typeof ActionType.SETTLEMENT_DEFAULT };
export type SizeCorrectionDefault = { type: typeof ActionType.SIZE_CORRECTION_DEFAULT };
export type InventorySearchDefault = { type: typeof ActionType.INVENTORY_SEARCH_DEFAULT };
export type OrderContentConfirmation = { type: typeof ActionType.ORDER_CONTENT_CONFIRMATION_DEFAULT };

export function HomeRequest(): HomeDefault {
  return { type: ActionType.HOME_DEFAULT };
}
export function HomeWithOrders(): HomeWithOrders {
  return { type: ActionType.HOME_WITH_ORDERS };
}

export function OrdersDigestsRequest(): OrdersSearchPage {
  return { type: ActionType.ORDERS_SEARCH_PAGE_DEFAULT };
}
export function AddressRequest(): AddressDefault {
  return { type: ActionType.ADDRESS_DEFAULT };
}
export function AddressSuccess(): AddressSuccess {
  return { type: ActionType.ADDRESS_SUCCESS };
}
export function clothSelectionDefault(): ClothSelectionDefault {
  return { type: ActionType.CLOTH_SELECTION_DEFAULT };
}
export function ClothSelectionFailure(): ClothSelectionFailure {
  return { type: ActionType.CLOTH_SELECTION_FAILURE };
}
export function ClothSelectionSuccess(): ClothSelectionSuccess {
  return { type: ActionType.CLOTH_SELECTION_SUCCESS };
}
export function AmountRequest(): AmountDefault {
  return { type: ActionType.AMOUNT_DEFAULT };
}
export function AmountSuccess(): AmountSuccess {
  return { type: ActionType.AMOUNT_SUCESS };
}
export function PrivacyPolicyRequest(): PrivacyPolicyDefault {
  return { type: ActionType.PRIVACY_POLICY_DEFAULT };
}
export function PrivacyPolicySuccess(): PrivacyPolicySuccess {
  return { type: ActionType.PRIVACY_POLICY_SUCCESS };
}
export function SettlementRequest(): SettlementDefault {
  return { type: ActionType.SETTLEMENT_DEFAULT };
}
export function DesignSelectionRequest(): DesignSelection {
  return { type: ActionType.DESIGN_SELECTION_DEFAULT };
}
export function DesignSelectionSuccess(): DesignSelectionSuccess {
  return { type: ActionType.DESIGN_SELECTION_SUCCESS };
}
export function SizeCorrectionDefault(): SizeCorrectionDefault {
  return { type: ActionType.SIZE_CORRECTION_DEFAULT };
}

export function InventorySearchDefault(): InventorySearchDefault {
  return { type: ActionType.INVENTORY_SEARCH_DEFAULT };
}

export function OrderContentConfirmation(): OrderContentConfirmation {
  return { type: ActionType.ORDER_CONTENT_CONFIRMATION_DEFAULT };
}

// Action Creators
export function navigateAfterLogIn(dispatch: Dispatch): void {
  const path = config.env === 'production' ? resolvePath(ERouterPath.home) : resolvePath(ERouterPath.samples);
  Logger.log('[Navigation] logIn', path);
  history.push(path);
  dispatch(HomeRequest());
}

export function homeNavBars(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] homeDefault');
  return (dispatch: Dispatch, currentState: () => AppState) => {
    const { orderConfirmationItems } = currentState().orderConfirmation.orderConfirmation;
    if (Object.keys(orderConfirmationItems).length > 0) {
      dispatch(HomeWithOrders());
    } else {
      dispatch(HomeRequest());
    }
  };
}

export type Actions =
  | HomeDefault
  | HomeWithOrders
  | OrdersSearchPage
  | AddressDefault
  | AddressSuccess
  | ClothSelectionDefault
  | ClothSelectionFailure
  | ClothSelectionSuccess
  | AmountDefault
  | AmountSuccess
  | DesignSelection
  | DesignSelectionSuccess
  | PrivacyPolicyDefault
  | PrivacyPolicySuccess
  | SettlementDefault
  | SizeCorrectionDefault
  | InventorySearchDefault
  | OrderContentConfirmation;
