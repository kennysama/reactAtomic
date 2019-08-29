import { Actions, ActionType } from './actions';

import { IClothSelection, IProductsResponse } from '../../types/cloth-selection';

export interface IClothSelectionState {
  products: IProductsResponse[];
  data: IClothSelection;
  illustrationBtnvisible: boolean;
}

export const initialState: IClothSelectionState = {
  illustrationBtnvisible: false,
  products: [],
  data: {
    composition: {
      0: { id: '-0', value: '', percent: '0' },
      1: { id: '-0', value: '', percent: '0' },
      2: { id: '-0', value: '', percent: '0' },
      3: { id: '-0', value: '', percent: '0' },
    },
    fabricCode: '',
    option: '',
    deliveryDate: '',
    brand: { id: '', value: '' },
    model: { id: '', value: '' },
    clothComposition: '',
    partition: { id: '', value: '' },

    personalorderProductNumber: '',
    personalorderProductColor: '',
    retailPrice: '',
    retailPriceTaxin: '',
    optionPattern: '',
    seasonCode: '',
    seasonName: '',
    design: { id: '', value: '' },
    color: { id: '', value: '' },
    clothName: '',
    clothSeason: '',
    clothCode: '',
    vendorClothNumber: '',

    isnew: '',
    issoldout: '',
    makerName2: '',
    functionName: ' ',
  },
};

export function clothSelectionReducer(
  state: IClothSelectionState = initialState,
  action: Actions,
): IClothSelectionState {
  switch (action.type) {
    case ActionType.CLOTH_SELECTION_DEFAULT: {
      return { ...initialState };
    }
    case ActionType.LOAD_CLOTH_SELECTION_PARAMETERS_FROM_TEMPORAL: {
      return { ...state, data: action.payload };
    }
    case ActionType.LOAD_PRODUCT_DETAILS_SUCCESS: {
      return { ...state, products: action.payload };
    }
    case ActionType.BRAND_CHANGE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          brand: action.brand,
          vendorClothNumber: action.product.vendorClothNumber,
          issoldout: action.product.issoldout,
          design: { id: action.product.design, value: action.product.designName },
          color: { id: action.product.personalorderColorCode, value: action.product.personalorderColorName },
          retailPriceTaxin: action.product.retailPriceTaxin,
          retailPrice: action.product.retailPrice,
        },
      };
    case ActionType.COMPOSITION_CHANGE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, composition: { ...state.data.composition, [action.index]: action.payload } },
      };
    case ActionType.MODEL_CHANGE_SUCCESS:
      return { ...state, data: { ...state.data, model: action.payload } };
    case ActionType.MODEL_CLEAR_VALUE:
      return { ...state, data: { ...state.data, model: initialState.data.model } };
    case ActionType.GET_SEASON_CODE_SUCCESS:
      return { ...state, data: { ...state.data, seasonCode: action.payload } };
    case ActionType.FABRIC_CODE_SUCCESS:
      return { ...state, data: { ...state.data, fabricCode: action.payload } };
    case ActionType.OPTION_SUCCESS:
      return { ...state, data: { ...state.data, option: action.payload } };
    case ActionType.PARTITION_SUCCESS:
      return { ...state, data: { ...state.data, partition: action.payload } };
    case ActionType.COLOR_SUCCESS:
      return { ...state, data: { ...state.data, color: action.payload } };
    case ActionType.DESIGN_SUCCESS:
      return { ...state, data: { ...state.data, design: action.payload } };
    case ActionType.DELIVERY_DATE_SUCCESS:
      return { ...state, data: { ...state.data, deliveryDate: action.payload } };
    case ActionType.LOAD_ILLUSTRATION_BUTTON_VISIBLE:
      return { ...state, illustrationBtnvisible: action.payload };
  }

  return state;
}
