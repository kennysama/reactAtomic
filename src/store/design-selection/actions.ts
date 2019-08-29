import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import { IDesignSelectionState } from './reducer';

import {
  DesignSelectionRequest as navigateDesignSelectionRequest,
  DesignSelectionSuccess as navigateDesignSelectionSuccess,
} from '../navigation';
import Logger from '../../helpers/logger';
import { getAvailableOptionsRes } from '../../mockups/api/option';
import {
  IGetAvailableOptionsReqPathParam,
  IGetAvailableOptionsReqQueryParam,
  IGetAvailableOptionsRes,
  IOptionSelectingParam,
  IOptionSelectedParam,
  IDesignSelection,
  ISidebarPart,
  IOtherCondition,
} from '../../types/option';
import {
  editSelectedOptionParams,
  isSameSelectedOptionParam,
  getInitialSelectedOptionParams,
  getInitialSelectedOptionParam,
  getDefaultSelectedOptionParams,
  deletePartsList,
  deleteSelectedOptionParams,
  hasCompleteSelected,
  getAddableParts,
  getDeletableParts,
  isDoubleDesign,
  mergeSelectedOptions,
  shouldReloadAvailableOptions,
} from '../../helpers/option';
import { TPartsNumber, TOrderItemCode } from '../../types/order-items';
import { getOrderItem } from '../../helpers/order-items';

export enum ActionType {
  DESIGN_SELECTION_DEFAULT = '[Design Selection] Clear All State.',
  LOAD_DESIGN_SELECTION_PARAMETERS_FROM_TEMPORAL = '[Design Selection] Load Design Selection Parameters From Temporal.',
  AVAILABLE_OPTION_REQUEST = '[Design Selection] Load Available Option Request.',
  AVAILABLE_OPTION_SUCCESS = '[Design Selection] Load Available Option Success.',
  AVAILABLE_OPTION_FAILURE = '[Design Selection] Load Available Option Failure.',
  ADD_PARTS_SUCCESS = '[Design Selection] Add Parts Success.',
  DELETE_PARTS_SUCCESS = '[Design Selection] Delete Parts Success.',
  CHANGE_SIDEBAR_PARTS_SUCCESS = '[Design Selection] Change Sidebar Parts Success.',
  INITIALIZE_SELECTED_OPTIONS_SUCCESS = '[Design Selection] Initialize Selected Options Success.',
  SELECT_OPTION_SUCCESS = '[Design Selection] Select Option Success.',
  SELECT_OPTION_TYPE_SUCCESS = '[Design Selection] Select Option Type Success.',
  SELECT_OPTION_TYPE_ADD_SUCCESS = '[Design Selection] Select Option Type Add Success.',
  SELECT_OPTION_TYPE_REPLACE_SUCCESS = '[Design Selection] Select Option Type Replace Success.',
  SELECT_OPTION_TYPE_DELETE_SUCCESS = '[Design Selection] Select Option Type Delete Success.',
  SET_DEFAULT_SELECTED_OPTIONS_SUCCESS = '[Design Selection] Set Default SelectedOptions Success.',
  CHANGE_PARTS_NUMBERS_SUCCESS = '[Design Selection] Change PartsNumbers Success.',
  SET_INITIAL_ITEM_CODE = '[Design Selection] Set Initial ItemCode.',
}

export type DesignSelectionDefault = { type: typeof ActionType.DESIGN_SELECTION_DEFAULT };
export type LoadDesignSelectionParametersFromTemporal = {
  type: typeof ActionType.LOAD_DESIGN_SELECTION_PARAMETERS_FROM_TEMPORAL;
  payload: IDesignSelectionState;
};
export type AvailableOptionRequest = {
  type: typeof ActionType.AVAILABLE_OPTION_REQUEST;
  payload: {
    pathParam: IGetAvailableOptionsReqPathParam;
    queryParam: IGetAvailableOptionsReqQueryParam;
    otherCondition: IOtherCondition;
  };
};
export type AvailableOptionSuccess = {
  type: typeof ActionType.AVAILABLE_OPTION_SUCCESS;
  payload: IGetAvailableOptionsRes;
};
export type AvailableOptionFailure = { type: typeof ActionType.AVAILABLE_OPTION_FAILURE; ex: Error };
export type ChangeSidebarPartsSuccess = {
  type: typeof ActionType.CHANGE_SIDEBAR_PARTS_SUCCESS;
  payload: ISidebarPart[];
};
export type AddPartsSuccess = { type: typeof ActionType.ADD_PARTS_SUCCESS; payload: IDesignSelection };
export type DeletePartsSuccess = { type: typeof ActionType.DELETE_PARTS_SUCCESS; payload: IDesignSelection };
export type SelectOptionSuccess = { type: typeof ActionType.SELECT_OPTION_SUCCESS; payload: IOptionSelectingParam };
export type SelectOptionTypeSuccess = {
  type: typeof ActionType.SELECT_OPTION_TYPE_SUCCESS;
  payload: {
    selectedParams: IOptionSelectedParam[];
    selectingParam: IOptionSelectingParam;
  };
};
export type InitializeSelectedOptionsSuccess = {
  type: typeof ActionType.INITIALIZE_SELECTED_OPTIONS_SUCCESS;
  payload: IOptionSelectedParam[];
};
export type SetDefaultSelectedOptionsSuccess = {
  type: typeof ActionType.SET_DEFAULT_SELECTED_OPTIONS_SUCCESS;
  payload: IOptionSelectedParam[];
};
export type ChangePartsNumbersSuccess = {
  type: typeof ActionType.CHANGE_PARTS_NUMBERS_SUCCESS;
  payload: {
    sidebarParts: ISidebarPart[];
    addableParts: TPartsNumber[];
    deletableParts: TPartsNumber[];
  };
};
export type SetInitialItemCode = { type: typeof ActionType.SET_INITIAL_ITEM_CODE; payload: TOrderItemCode };

export function DesignSelectionDefault(): DesignSelectionDefault {
  return {
    type: ActionType.DESIGN_SELECTION_DEFAULT,
  };
}

export function loadDesignSelectionParametersFromTemporal(
  payload: IDesignSelectionState,
): LoadDesignSelectionParametersFromTemporal {
  return {
    type: ActionType.LOAD_DESIGN_SELECTION_PARAMETERS_FROM_TEMPORAL,
    payload,
  };
}

export function loadAvailableOptionRequest(
  pathParam: IGetAvailableOptionsReqPathParam,
  queryParam: IGetAvailableOptionsReqQueryParam,
  otherCondition: IOtherCondition,
): AvailableOptionRequest {
  return {
    type: ActionType.AVAILABLE_OPTION_REQUEST,
    payload: {
      pathParam,
      queryParam,
      otherCondition,
    },
  };
}
export function loadAvailableOptionSuccess(payload: IGetAvailableOptionsRes): AvailableOptionSuccess {
  return { type: ActionType.AVAILABLE_OPTION_SUCCESS, payload };
}
export function loadAvailableOptionFailure(error: Error): AvailableOptionFailure {
  return { type: ActionType.AVAILABLE_OPTION_FAILURE, ex: error };
}
export function initializeSidebarOptionSuccess(payload: ISidebarPart[]): ChangeSidebarPartsSuccess {
  return { type: ActionType.CHANGE_SIDEBAR_PARTS_SUCCESS, payload };
}
export function selectOptionSuccess(payload: any): SelectOptionSuccess {
  return { type: ActionType.SELECT_OPTION_SUCCESS, payload };
}
export function selectOptionTypeSuccess(
  selectedParams: IOptionSelectedParam[],
  selectingParam: IOptionSelectingParam,
): SelectOptionTypeSuccess {
  return { type: ActionType.SELECT_OPTION_TYPE_SUCCESS, payload: { selectedParams, selectingParam } };
}
export function initializeSelectedOptionsSuccess(payload: IOptionSelectedParam[]): InitializeSelectedOptionsSuccess {
  return { type: ActionType.INITIALIZE_SELECTED_OPTIONS_SUCCESS, payload };
}
export function setDefaultSelectedOptionsSuccess(payload: IOptionSelectedParam[]): SetDefaultSelectedOptionsSuccess {
  return { type: ActionType.SET_DEFAULT_SELECTED_OPTIONS_SUCCESS, payload };
}
export function addPartsSuccess(payload: IDesignSelection): AddPartsSuccess {
  return { type: ActionType.ADD_PARTS_SUCCESS, payload };
}
export function deletePartsSuccess(payload: IDesignSelection): DeletePartsSuccess {
  return { type: ActionType.DELETE_PARTS_SUCCESS, payload };
}
export function changePartsNumbersSuccess(
  sidebarParts: ISidebarPart[],
  addableParts: TPartsNumber[],
  deletableParts: TPartsNumber[],
): ChangePartsNumbersSuccess {
  return {
    type: ActionType.CHANGE_PARTS_NUMBERS_SUCCESS,
    payload: {
      sidebarParts,
      addableParts,
      deletableParts,
    },
  };
}
export function setInitialItemCode(itemCode: TOrderItemCode): SetInitialItemCode {
  return {
    type: ActionType.SET_INITIAL_ITEM_CODE,
    payload: itemCode,
  };
}

// Action
export function loadAvailableOption(
  pathParam: IGetAvailableOptionsReqPathParam,
  queryParam: IGetAvailableOptionsReqQueryParam,
  otherCondition: IOtherCondition,
): ThunkAction<void, AppState, null, Action> {
  Logger.log('[Store] loadAvailableOption.', { pathParam, queryParam });
  return (dispatch: Dispatch) => {
    dispatch(loadAvailableOptionRequest(pathParam, queryParam, otherCondition));
    return getAvailableOptionsRes(pathParam, queryParam)
      .then(res => {
        // AvailableOptionSuccess
        dispatch(loadAvailableOptionSuccess(res));
        // changePartsNumbers
        changePartsNumbers(dispatch, res, otherCondition, []);
      })
      .catch(err => dispatch(loadAvailableOptionFailure(err)));
  };
}

function reloadAvailableOptions(dispatch: Dispatch, state: IDesignSelectionState) {
  const { currentRequestParam } = state;
  const currentItemCode = getItemCode(state);

  const pathParam = { ...currentRequestParam.path, itemCode: currentItemCode };
  const { query, other } = currentRequestParam;
  const isReload = shouldReloadAvailableOptions(currentRequestParam, pathParam, query, other);
  Logger.log('[Store] reloadAvailableOptions. isReload', isReload);
  if (!isReload) {
    return;
  }

  dispatch(loadAvailableOptionRequest(pathParam, query, other));
  return getAvailableOptionsRes(pathParam, query)
    .then(res => {
      // AvailableOptionSuccess
      dispatch(loadAvailableOptionSuccess(res));
      const { selectedOptions, sidebarParts } = state.designSelection;
      // changePartsNumbers
      changePartsNumbers(dispatch, res, other, selectedOptions, sidebarParts);
    })
    .catch(err => dispatch(loadAvailableOptionFailure(err)));
}

export function changePartsNumbers(
  dispatch: Dispatch,
  res: IGetAvailableOptionsRes,
  other: IOtherCondition,
  currentSelectedOptions: IOptionSelectedParam[],
  currentSidebarParts?: ISidebarPart[],
) {
  const { initialPieces, category, subCategory } = other;
  const pieces = currentSidebarParts ? currentSidebarParts.map(v => v.number) : initialPieces;
  // sidebar
  const sidebarParts = currentSidebarParts ? currentSidebarParts : getSidebarParts(pieces);
  // addableParts
  const addableParts = getAddableParts(category, subCategory, pieces);
  // deletableParts
  const deletableParts = getDeletableParts(category, subCategory, pieces);
  dispatch(changePartsNumbersSuccess(sidebarParts, addableParts, deletableParts));

  // InitializeSelectedOptions
  const selectedOptions = getInitialSelectedOptions(res, sidebarParts, currentSelectedOptions);
  dispatch(initializeSelectedOptionsSuccess(selectedOptions));
}

function getSidebarParts(initialPieces: TPartsNumber[]): ISidebarPart[] {
  return initialPieces.map((partsNumber, partsIndex) => {
    const parts: ISidebarPart = {
      number: partsNumber,
      index: partsIndex,
    };
    return parts;
  });
}

function getInitialSelectedOptions(
  res: IGetAvailableOptionsRes,
  sidebarParts: ISidebarPart[],
  currentSelectedOptions: IOptionSelectedParam[],
): IOptionSelectedParam[] {
  const { availableOptions } = res;
  const initialOptions = getInitialSelectedOptionParams(availableOptions, sidebarParts);
  if (currentSelectedOptions.length < 1) {
    return initialOptions;
  }
  return mergeSelectedOptions(currentSelectedOptions, initialOptions);
}

export function selectOption(selectedOptions: IOptionSelectedParam[], selectingOptionParam: IOptionSelectingParam) {
  Logger.log('[Store] selectOption.', selectingOptionParam);

  const selectedOptionType = selectedOptions.find(v => isSameSelectedOptionParam(v, selectingOptionParam, true));
  if (!selectedOptionType) {
    // 合致するoptionTypeがない場合
    return (dispatch: Dispatch) => {
      dispatch(selectOptionSuccess(selectingOptionParam));
    };
  }

  const selectedParam: IOptionSelectingParam = {
    ...selectingOptionParam,
    optionClassNumber: selectedOptionType.optionClassNumber,
  };

  return (dispatch: Dispatch) => {
    dispatch(selectOptionSuccess(selectedParam));
  };
}

export function selectOptionType(
  selectedOptionParams: IOptionSelectedParam[],
  selectingOptionParam: IOptionSelectingParam,
) {
  Logger.log('[Store] selectOptionType.', { selectedOptionParams, selectingOptionParam });
  const selectedOptions = editSelectedOptionParams(selectedOptionParams, selectingOptionParam);
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    dispatch(selectOptionTypeSuccess(selectedOptions, selectingOptionParam));

    const currentState = getCurrentState();
    // console.log('currentItemCode', getItemCode(currentState.designSelection.page));
    const desingSelection = currentState.designSelection.page.designSelection;
    const { availableOptions, sidebarParts } = desingSelection;
    const isCompleted = hasCompleteSelected(availableOptions, sidebarParts, selectedOptions);
    dispatch(changeNavigation(isCompleted));

    // reload
    const newState = {
      ...currentState.designSelection.page,
      designSelection: {
        ...currentState.designSelection.page.designSelection,
        selectedOptions,
      },
    };
    reloadAvailableOptions(dispatch, newState);
  };
}

export function setDefaultSelectedOptions(partsIndex: number, partsNumber: TPartsNumber) {
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    const currentState = getCurrentState();
    const desingSelection = currentState.designSelection.page.designSelection;
    const { availableOptions, selectedOptions, sidebarParts } = desingSelection;

    // おすすめ設定
    const defaultOptions = getDefaultSelectedOptionParams(availableOptions, selectedOptions, partsIndex, partsNumber);
    const newSelectedOptions = [...selectedOptions, ...defaultOptions];
    dispatch(setDefaultSelectedOptionsSuccess(newSelectedOptions));

    // 必須入力項目チェック
    const isCompleted = hasCompleteSelected(availableOptions, sidebarParts, newSelectedOptions);
    dispatch(changeNavigation(isCompleted));
  };
}

export function addParts(partsNumber: TPartsNumber) {
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    const currentState = getCurrentState();
    const desingSelection = currentState.designSelection.page.designSelection;
    const { availableOptions, sidebarParts, addableParts, deletableParts, selectedOptions } = desingSelection;

    const newDeleteableParts = [...deletableParts, partsNumber];
    const newAddableParts = deletePartsList(addableParts, partsNumber);
    const newPartsIndex = Math.max(...sidebarParts.map(v => v.index)) + 1;
    const partsSelectedOptions = getInitialSelectedOptionParam(availableOptions, partsNumber, newPartsIndex);
    const newSidebarPart: ISidebarPart = { number: partsNumber, index: newPartsIndex };
    const newSidebarParts = [...sidebarParts, newSidebarPart];

    const newStore: IDesignSelection = {
      ...desingSelection,
      sidebarParts: newSidebarParts,
      deletableParts: newDeleteableParts,
      addableParts: newAddableParts,
      selectedOptions: [...selectedOptions, ...partsSelectedOptions],
    };
    dispatch(addPartsSuccess(newStore));

    // 必須入力項目チェック
    const isCompleted = hasCompleteSelected(availableOptions, newStore.sidebarParts, newStore.selectedOptions);
    dispatch(changeNavigation(isCompleted));

    // reload
    const newState = {
      ...currentState.designSelection.page,
      designSelection: newStore,
    };
    reloadAvailableOptions(dispatch, newState);
  };
}

export function deleteParts(partsNumber: TPartsNumber, partsIndex: number) {
  return (dispatch: Dispatch, getCurrentState: () => AppState) => {
    const currentState = getCurrentState();
    const desingSelection = currentState.designSelection.page.designSelection;
    const { sidebarParts, addableParts, deletableParts, selectedOptions, availableOptions } = desingSelection;

    const newSidebarParts = sidebarParts.filter(v => v.number !== partsNumber || v.index !== partsIndex);
    const newDeleteableParts = deletePartsList(deletableParts, partsNumber);
    const newAddableParts = [...addableParts, partsNumber];
    const newSelectedOptions = deleteSelectedOptionParams(selectedOptions, partsNumber, partsIndex);

    const newStore: IDesignSelection = {
      ...desingSelection,
      sidebarParts: newSidebarParts,
      deletableParts: newDeleteableParts,
      addableParts: newAddableParts,
      selectedOptions: newSelectedOptions,
    };
    dispatch(deletePartsSuccess(newStore));

    // 必須入力項目チェック
    const isCompleted = hasCompleteSelected(availableOptions, newStore.sidebarParts, newStore.selectedOptions);
    dispatch(changeNavigation(isCompleted));

    // reload
    const newState = {
      ...currentState.designSelection.page,
      designSelection: newStore,
    };
    reloadAvailableOptions(dispatch, newState);
  };
}

export function setNavigation(isCompleted: boolean) {
  return (dispatch: Dispatch) => {
    dispatch(changeNavigation(isCompleted));
  };
}

function changeNavigation(isCompleted: boolean) {
  return isCompleted ? navigateDesignSelectionSuccess() : navigateDesignSelectionRequest();
}

export function clearAllState() {
  return (dispatch: Dispatch) => {
    dispatch(DesignSelectionDefault());
  };
}

export function getItemCode(state: IDesignSelectionState): TOrderItemCode {
  const { currentRequestParam, designSelection, initialItemCode } = state;
  const { path, other } = currentRequestParam;
  const { sidebarParts, selectedOptions } = designSelection;
  const { category } = other;
  const { brandCode } = path;
  const pieces = sidebarParts.map(v => v.number);
  const isDouble = isDoubleDesign(selectedOptions);
  const itemCode = getOrderItem(category, pieces, isDouble, brandCode);

  return itemCode ? itemCode : initialItemCode;
}

export function hasCompleted(state: IDesignSelectionState): boolean {
  const { designSelection } = state;
  const { availableOptions, sidebarParts, selectedOptions } = designSelection;
  return hasCompleteSelected(availableOptions, sidebarParts, selectedOptions);
}

export type DesignSelectionActions =
  | DesignSelectionDefault
  | LoadDesignSelectionParametersFromTemporal
  | AvailableOptionRequest
  | AvailableOptionSuccess
  | AvailableOptionFailure
  | AddPartsSuccess
  | DeletePartsSuccess
  | ChangeSidebarPartsSuccess
  | SelectOptionSuccess
  | SelectOptionTypeSuccess
  | InitializeSelectedOptionsSuccess
  | SetDefaultSelectedOptionsSuccess
  | ChangePartsNumbersSuccess
  | SetInitialItemCode;
