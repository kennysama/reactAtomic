import { DesignSelectionActions, ActionType } from './actions';
import { IDesignSelection, IRequestParameter } from '../../types/option';
import { TOrderItemCode } from '../../types/order-items';

export interface IDesignSelectionState {
  loading: boolean;
  initialItemCode: TOrderItemCode;
  designSelection: IDesignSelection;
  currentRequestParam: IRequestParameter;
}

export const initialState: IDesignSelectionState = {
  loading: false,
  initialItemCode: '',
  designSelection: {
    availableOptions: [],
    selectedOptions: [],
    selectingOption: {
      partsIndex: 0,
      partsNumber: '01',
      optionNumber: '',
      optionClassNumber: '',
      hasOpenPopup: false,
    },
    sidebarParts: [],
    addableParts: [],
    deletableParts: [],
  },
  currentRequestParam: {
    path: {
      brandCode: '',
      itemCode: '',
      seasonCode: '',
    },
    query: {
      optionPattern: '',
    },
    other: {
      category: '',
      subCategory: '',
      initialPieces: [],
    },
  },
};

export function designSelectionReducer(
  state: IDesignSelectionState = initialState,
  action: DesignSelectionActions,
): IDesignSelectionState {
  switch (action.type) {
    case ActionType.DESIGN_SELECTION_DEFAULT:
      return {
        ...initialState,
      };
    case ActionType.LOAD_DESIGN_SELECTION_PARAMETERS_FROM_TEMPORAL:
      return { ...action.payload };

    case ActionType.AVAILABLE_OPTION_REQUEST:
      return {
        ...state,
        loading: true,
        currentRequestParam: {
          path: action.payload.pathParam,
          query: action.payload.queryParam,
          other: action.payload.otherCondition,
        },
      };

    case ActionType.AVAILABLE_OPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        designSelection: {
          ...state.designSelection,
          availableOptions: action.payload.availableOptions,
        },
      };

    case ActionType.AVAILABLE_OPTION_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case ActionType.CHANGE_SIDEBAR_PARTS_SUCCESS:
      return {
        ...state,
        designSelection: {
          ...state.designSelection,
          sidebarParts: action.payload,
        },
      };

    case ActionType.SELECT_OPTION_SUCCESS:
      return {
        ...state,
        designSelection: {
          ...state.designSelection,
          selectingOption: action.payload,
        },
      };

    case ActionType.SELECT_OPTION_TYPE_SUCCESS:
      return {
        ...state,
        designSelection: {
          ...state.designSelection,
          selectedOptions: action.payload.selectedParams,
          selectingOption: action.payload.selectingParam,
        },
      };

    case ActionType.INITIALIZE_SELECTED_OPTIONS_SUCCESS:
      return {
        ...state,
        designSelection: {
          ...state.designSelection,
          selectedOptions: action.payload,
        },
      };

    case ActionType.SET_DEFAULT_SELECTED_OPTIONS_SUCCESS:
      return {
        ...state,
        designSelection: {
          ...state.designSelection,
          selectedOptions: action.payload,
        },
      };

    case ActionType.ADD_PARTS_SUCCESS:
      return {
        ...state,
        designSelection: action.payload,
      };

    case ActionType.DELETE_PARTS_SUCCESS:
      return {
        ...state,
        designSelection: action.payload,
      };

    case ActionType.CHANGE_PARTS_NUMBERS_SUCCESS:
      return {
        ...state,
        designSelection: {
          ...state.designSelection,
          sidebarParts: action.payload.sidebarParts,
          addableParts: action.payload.addableParts,
          deletableParts: action.payload.deletableParts,
        },
      };

    case ActionType.SET_INITIAL_ITEM_CODE:
      return {
        ...state,
        initialItemCode: action.payload,
      };
  }

  return state;
}
