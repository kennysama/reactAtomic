import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';

import { informationSuccess, errorSuccess } from '../dialog/actions';
import Logger from '../../helpers/logger';
import * as clothSelection from '../../services/cloth-selection/cloth-selection';

import { ILookupItem } from '../../types/lookup';
import { IClothSelection, IProductsResponse } from '../../types/cloth-selection';
import { ApiError } from '../../types/api';

import { TSeasonCode } from '../../types/season-code';
import { getSeasonCode } from '../../helpers/season-code';
import { TCategory } from '../../types/order-items';
import { illustrationSuccess } from '../dialog/actions';
import { IHomeSelectedItem } from '../../types/home';
import {
  getIllustrationBtnVisible,
  getIllustrationImageUrl,
  hasCompleteSelected,
  haveDetails,
} from '../../helpers/cloth-selection';
import { TCompositionIndex, ICompositionItem } from '../../types/composition';
import { IClothSelectionState } from './reducer';

const translate = 'ClothSelectionContent.';
export enum ActionType {
  CLOTH_SELECTION_DEFAULT = '[Cloth] Default',
  LOAD_CLOTH_SELECTION_PARAMETERS_FROM_TEMPORAL = '[Cloth] load cloth selection parameters from temporal.',
  LOAD_PRODUCT_DETAILS_SUCCESS = '[Cloth] Load product details Success',
  BRAND_CHANGE_SUCCESS = '[Cloth] Brand Change Success',
  MODEL_CHANGE_SUCCESS = '[Cloth] Model Change Success',
  MODEL_CLEAR_VALUE = '[Cloth] Model Clear Value',
  COMPOSITION_CHANGE_SUCCESS = '[Cloth] Composition Change Success',
  GET_SEASON_CODE_SUCCESS = '[Cloth] Get Season Code Success',
  FABRIC_CODE_SUCCESS = '[Cloth] Fabric Code Change Success',
  OPTION_SUCCESS = '[Cloth] option Change Success',
  PARTITION_SUCCESS = '[Cloth] Partition Success',
  COLOR_SUCCESS = '[Cloth] Color Success',
  DESIGN_SUCCESS = '[Cloth] Design Success',
  DELIVERY_DATE_SUCCESS = '[Cloth] delivery date Change Success',
  CLEAR_OUTOFSTOCK_MESSAGE = '[Cloth] Clear information',
  LOAD_ILLUSTRATION_BUTTON_VISIBLE = '[Cloth] set illustration button visible',
  LOAD_CLOTH_SELECTION_IS_SOLD_OUT_FAILURE = '[Cloth] warning if the fabric is sold out',
}

// Action Types

export type ClothSelectionDefault = {
  type: typeof ActionType.CLOTH_SELECTION_DEFAULT;
};
export type LoadClothSelectionParametersFromTemporal = {
  type: typeof ActionType.LOAD_CLOTH_SELECTION_PARAMETERS_FROM_TEMPORAL;
  payload: IClothSelection;
};

export type LoadIllustrationBtnVisible = {
  type: typeof ActionType.LOAD_ILLUSTRATION_BUTTON_VISIBLE;
  payload: boolean;
};

export type FabricCodeSuccess = {
  type: typeof ActionType.FABRIC_CODE_SUCCESS;
  payload: string;
};
export type OptionSuccess = {
  type: typeof ActionType.OPTION_SUCCESS;
  payload: string;
};
export type PartitionSuccess = {
  type: typeof ActionType.PARTITION_SUCCESS;
  payload: ILookupItem;
};
export type ColorSuccess = {
  type: typeof ActionType.COLOR_SUCCESS;
  payload: ILookupItem;
};
export type DesignSuccess = {
  type: typeof ActionType.DESIGN_SUCCESS;
  payload: ILookupItem;
};
export type DeliveryDateSuccess = {
  type: typeof ActionType.DELIVERY_DATE_SUCCESS;
  payload: string;
};
export type BrandChangeSuccess = {
  type: typeof ActionType.BRAND_CHANGE_SUCCESS;
  brand: ILookupItem;
  product: IProductsResponse;
};
export type CompositionChangeHandler = {
  type: typeof ActionType.COMPOSITION_CHANGE_SUCCESS;
  index: TCompositionIndex;
  payload: ICompositionItem;
};

export type ModelChangeSuccess = {
  type: typeof ActionType.MODEL_CHANGE_SUCCESS;
  payload: ILookupItem;
};
export type ModelClearValue = {
  type: typeof ActionType.MODEL_CLEAR_VALUE;
};
export type GetSeasonCodeSuccess = {
  type: typeof ActionType.GET_SEASON_CODE_SUCCESS;
  payload: TSeasonCode;
};
export type loadProductDetailsSuccess = {
  type: typeof ActionType.LOAD_PRODUCT_DETAILS_SUCCESS;
  payload: IProductsResponse[];
};
export type LoadClothSelectionIsSoldOutFailure = {
  type: typeof ActionType.LOAD_CLOTH_SELECTION_IS_SOLD_OUT_FAILURE;
  payload: string;
};
// Actions

export function clothSelectionDefault(): ClothSelectionDefault {
  return { type: ActionType.CLOTH_SELECTION_DEFAULT };
}
export function loadClothSelectionParametersFromTemporal(
  payload: IClothSelection,
): LoadClothSelectionParametersFromTemporal {
  return { type: ActionType.LOAD_CLOTH_SELECTION_PARAMETERS_FROM_TEMPORAL, payload };
}
export function loadIllustrationBtnVisible(payload: boolean): LoadIllustrationBtnVisible {
  return { type: ActionType.LOAD_ILLUSTRATION_BUTTON_VISIBLE, payload };
}
export function fabricCodeSuccess(payload: string): FabricCodeSuccess {
  return { type: ActionType.FABRIC_CODE_SUCCESS, payload };
}
export function optionSuccess(payload: string): OptionSuccess {
  return { type: ActionType.OPTION_SUCCESS, payload };
}
export function partitionSuccess(payload: ILookupItem): PartitionSuccess {
  return { type: ActionType.PARTITION_SUCCESS, payload };
}
export function colorSuccess(payload: ILookupItem): ColorSuccess {
  return { type: ActionType.COLOR_SUCCESS, payload };
}
export function designSuccess(payload: ILookupItem): DesignSuccess {
  return { type: ActionType.DESIGN_SUCCESS, payload };
}
export function deliveryDateSuccess(payload: string): DeliveryDateSuccess {
  return { type: ActionType.DELIVERY_DATE_SUCCESS, payload };
}
export function brandChangeSuccess(brand: ILookupItem, product: IProductsResponse): BrandChangeSuccess {
  return { type: ActionType.BRAND_CHANGE_SUCCESS, brand, product };
}
export function compositionChangeHandler(
  index: TCompositionIndex,
  payload: ICompositionItem,
): CompositionChangeHandler {
  return { type: ActionType.COMPOSITION_CHANGE_SUCCESS, index, payload };
}
export function modelChangeSuccess(payload: ILookupItem): ModelChangeSuccess {
  return { type: ActionType.MODEL_CHANGE_SUCCESS, payload };
}
export function modelClearValue(): ModelClearValue {
  return { type: ActionType.MODEL_CLEAR_VALUE };
}
export function getSeasonCodeSuccess(payload: TSeasonCode): GetSeasonCodeSuccess {
  return { type: ActionType.GET_SEASON_CODE_SUCCESS, payload };
}
export function loadProductDetailsSuccess(payload: IProductsResponse[]): loadProductDetailsSuccess {
  return { type: ActionType.LOAD_PRODUCT_DETAILS_SUCCESS, payload };
}

// Action Creators
export function brandChangeHandler(selectedBrand: ILookupItem): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] brandChangeHandler');

  return (dispatch: Dispatch, currentState: () => AppState) => {
    const products = currentState().clothSelection.clothSelection.products;
    const currentProduct = products.find(x => x.brandCode === selectedBrand.value);

    if (currentProduct) {
      dispatch(brandChangeSuccess(selectedBrand, currentProduct));
      dispatch(modelClearValue());
      if (currentProduct.issoldout !== '0') {
        dispatch(informationSuccess(translate + 'soldOut'));
      }
    }
  };
}

export function modelChangeHandler(selectedModel: ILookupItem): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] model Change Handler');
  return (dispatch: Dispatch) => {
    dispatch(modelChangeSuccess(selectedModel));
  };
}

export function loadSeasonCode(): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] model Change Handler');
  return (dispatch: Dispatch) => {
    try {
      const currentDate = new Date();
      const seasonCode = getSeasonCode(currentDate);
      dispatch(getSeasonCodeSuccess(seasonCode));
    } catch (error) {
      if (error instanceof ApiError) {
        dispatch(errorSuccess({ errors: error.errors }));
      } else {
        dispatch(errorSuccess({ errors: [{ code: 'unknown', message: error }] }));
      }
    }
  };
}

export function fabricCodeChangeHandler(fabricCode: string): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] model Change Handler');
  return (dispatch: Dispatch) => {
    dispatch(fabricCodeSuccess(fabricCode));
  };
}

export function getIllustrationBtn(params: IHomeSelectedItem): ThunkAction<void, AppState, null, Action> {
  return (dispatch: Dispatch) => {
    getIllustrationBtnVisible(params)
      ? dispatch(loadIllustrationBtnVisible(true))
      : dispatch(loadIllustrationBtnVisible(false));
  };
}

export function getIllustrationImage(category: TCategory) {
  return (dispatch: Dispatch) => {
    const url = getIllustrationImageUrl(category);
    dispatch(illustrationSuccess(url));
  };
}

export function loadProductDetails(seasonCode: string, fabricCode: string): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] loadProductDetails');

  return (dispatch: Dispatch) => {
    return clothSelection.searchProduct(seasonCode, fabricCode).then(data => {
      dispatch(loadProductDetailsSuccess(data));

      if (data.length === 1) {
        dispatch(brandChangeSuccess({ id: 0, value: data[0].brandCode }, data[0]));
      }
    });
  };
}

export function compositionPercentChangeHandler(
  index: TCompositionIndex,
  item: ICompositionItem,
): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] compositionPercentChangeHandler');
  return (dispatch: Dispatch) => {
    dispatch(compositionChangeHandler(index, item));
  };
}

export function getModelsLookup(state: IClothSelectionState) {
  const { products } = state;

  return products
    .filter(product => product.brandCode === state.data.brand.value)
    .flatMap(modelPatterns =>
      modelPatterns.modelPatterns.flatMap(parts =>
        parts.modelPatterns.flatMap(pattern => ({ id: pattern.modelPattern, value: pattern.modelPattern })),
      ),
    );
}

export function getBrandsLookup(state: IClothSelectionState) {
  const { products } = state;
  return products.map((product, index) => ({ id: index, value: product.brandCode }));
}

export function hasCompleted(state: IClothSelectionState): boolean {
  const { composition, issoldout, vendorClothNumber, brand, model, fabricCode } = state.data;
  return hasCompleteSelected(composition, issoldout, vendorClothNumber, brand, model, fabricCode);
}

export function areDetailsDisabled(state: IClothSelectionState): boolean {
  const { vendorClothNumber, brand } = state.data;
  return haveDetails(vendorClothNumber, brand);
}

export type Actions =
  | ClothSelectionDefault
  | LoadClothSelectionParametersFromTemporal
  | BrandChangeSuccess
  | ModelChangeSuccess
  | ModelClearValue
  | CompositionChangeHandler
  | GetSeasonCodeSuccess
  | FabricCodeSuccess
  | OptionSuccess
  | PartitionSuccess
  | ColorSuccess
  | DesignSuccess
  | DeliveryDateSuccess
  | LoadClothSelectionIsSoldOutFailure
  | loadProductDetailsSuccess
  | LoadIllustrationBtnVisible;
