import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from '../../store';

import * as fromNavigation from '../../store/navigation';
import * as fromDesignSelectionPage from '../../store/design-selection';
import * as fromHome from '../../store/home';
import * as fromClothSelection from '../../store/clothSelection';
import * as fromLanguage from '../../store/language';
import * as fromOrderConfirmation from '../../store/order-confirmation';
import * as fromHeader from '../../store/header';
import * as fromDialog from '../../store/dialog';

import DesignSelectionPage from '../../components/pages/DesignSelectionPage/DesignSelectionPage';
import {
  IDesignSelection,
  IOptionSelectingParam,
  IGetAvailableOptionsReqPathParam,
  IGetAvailableOptionsReqQueryParam,
  IOptionSelectedParam,
  IRequestParameter,
  IOtherCondition,
} from '../../types/option';
import { TPartsNumber, TOrderItemCode, TCategory, TSubCategory } from '../../types/order-items';
import { IClothSelection } from '../../types/cloth-selection';
import { ILookupItem } from '../../types/lookup';
import {
  createRequestPathParameter,
  createRequestQueryParameter,
  createOtherCondition,
  shouldReloadAvailableOptions,
} from '../../helpers/option';
import Logger from '../../helpers/logger';
import { resolveHeaderTextKey } from '../../helpers/header';
import { IOKCancelDialog } from '../../types/dialog';

interface IStateProps {
  isLoading: boolean;
  designSelection: IDesignSelection;
  initialItemCode: TOrderItemCode;
  currentItemCode: TOrderItemCode;
  clothSelection: IClothSelection;
  selectedLanguage: ILookupItem;
  currentRequestParam: IRequestParameter;
  hasCompleted: boolean;
  hasCompletedFullOrder: boolean;
  currentCategory: TCategory;
  currentSubCategory: TSubCategory;
  currentInitialPieces: TPartsNumber[];
}

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.DesignSelectionRequest;
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;

  //
  loadAvailableOptions: typeof fromDesignSelectionPage.loadAvailableOption;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSelectOptionType: typeof fromDesignSelectionPage.selectOptionType;
  onSetDefaultSelectedOptions: typeof fromDesignSelectionPage.setDefaultSelectedOptions;
  onAddParts: typeof fromDesignSelectionPage.addParts;
  onDeleteParts: typeof fromDesignSelectionPage.deleteParts;
  setNavigation: typeof fromDesignSelectionPage.setNavigation;
  setInitialItemCode: typeof fromDesignSelectionPage.setInitialItemCode;
}

type TProps = IStateProps & IDispatchProps;

class DesignSelectionPageContainer extends Component<TProps> {
  componentDidMount() {
    const {
      clothSelection,
      selectedLanguage,
      currentRequestParam,
      hasCompleted,
      currentCategory,
      currentSubCategory,
      currentInitialPieces,
      initialItemCode,
      currentItemCode,
    } = this.props;
    //
    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);
    this.props.getNavBars();
    this.props.setInitialItemCode(initialItemCode);
    // load
    const pathParam = createRequestPathParameter(clothSelection, currentItemCode, initialItemCode);
    const queryParam = createRequestQueryParameter(clothSelection, selectedLanguage);
    const otherCondition = createOtherCondition(currentCategory, currentSubCategory, currentInitialPieces);
    const isReload = shouldReloadAvailableOptions(currentRequestParam, pathParam, queryParam, otherCondition);
    if (!isReload) {
      this.props.setNavigation(hasCompleted);
      return;
    }
    this.props.loadAvailableOptions(pathParam, queryParam, otherCondition);
  }

  render() {
    Logger.log('currentItemCode', this.props.currentItemCode);
    return (
      <DesignSelectionPage
        createNewItem={this.props.createNewItem}
        clearItemSteps={this.props.clearItemSteps}
        isLoading={this.props.isLoading}
        hasCompleted={this.props.hasCompleted}
        hasCompletedFullOrder={this.props.hasCompletedFullOrder}
        showOkCancelDialog={this.props.showOkCancelDialog}
        designSelection={this.props.designSelection}
        clothSelection={this.props.clothSelection}
        onSelectOption={this.props.onSelectOption}
        onSelectOptionType={this.props.onSelectOptionType}
        onSetDefaultSelectedOptions={this.props.onSetDefaultSelectedOptions}
        onAddParts={this.props.onAddParts}
        onDeleteParts={this.props.onDeleteParts}
      />
    );
  }
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    isLoading: fromDesignSelectionPage.getLoading(state),
    designSelection: fromDesignSelectionPage.getDesignSelection(state),
    initialItemCode: fromHome.getItemCode(state),
    currentItemCode: fromDesignSelectionPage.getCurrentItemCode(state),
    clothSelection: fromClothSelection.getCurrentClothSelection(state),
    selectedLanguage: fromLanguage.getLanguage(state),
    currentRequestParam: fromDesignSelectionPage.getRequestParameter(state),
    hasCompleted: fromDesignSelectionPage.getHasCompleted(state),
    hasCompletedFullOrder: fromOrderConfirmation.getHasCompletedFullOrder(state),
    currentCategory: fromHome.getCategory(state),
    currentSubCategory: fromHome.getSubCategory(state),
    currentInitialPieces: fromHome.getPieces(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.DesignSelectionRequest()),
    createNewItem: () => dispatch<any>(fromOrderConfirmation.createNewItem()),
    clearItemSteps: () => dispatch<any>(fromOrderConfirmation.clearItemSteps()),
    showOkCancelDialog: (params: IOKCancelDialog) => dispatch<any>(fromDialog.showOkCancelDialog(params)),

    loadAvailableOptions: (
      pathParam: IGetAvailableOptionsReqPathParam,
      queryParam: IGetAvailableOptionsReqQueryParam,
      other: IOtherCondition,
    ) => dispatch<any>(fromDesignSelectionPage.loadAvailableOption(pathParam, queryParam, other)),
    onSelectOption: (selectedOption: IOptionSelectedParam[], selectingOptionParam: IOptionSelectingParam) =>
      dispatch<any>(fromDesignSelectionPage.selectOption(selectedOption, selectingOptionParam)),
    onSelectOptionType: (selectedOption: IOptionSelectedParam[], selectingOptionParam: IOptionSelectingParam) =>
      dispatch<any>(fromDesignSelectionPage.selectOptionType(selectedOption, selectingOptionParam)),
    onSetDefaultSelectedOptions: (partsIndex: number, partsNumber: TPartsNumber) =>
      dispatch<any>(fromDesignSelectionPage.setDefaultSelectedOptions(partsIndex, partsNumber)),
    onAddParts: (partsNumber: TPartsNumber) => dispatch<any>(fromDesignSelectionPage.addParts(partsNumber)),
    onDeleteParts: (partsNumber: TPartsNumber, partsIndex: number) =>
      dispatch<any>(fromDesignSelectionPage.deleteParts(partsNumber, partsIndex)),
    setNavigation: (isCompleted: boolean) => dispatch<any>(fromDesignSelectionPage.setNavigation(isCompleted)),
    setInitialItemCode: (itemCode: TOrderItemCode) =>
      dispatch<any>(fromDesignSelectionPage.setInitialItemCode(itemCode)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesignSelectionPageContainer);
