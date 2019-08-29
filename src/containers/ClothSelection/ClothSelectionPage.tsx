import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';

import * as fromHeader from '../../store/header';
import * as fromNavigation from '../../store/navigation';
import * as fromClothSelection from '../../store/clothSelection';
import * as fromLanguage from '../../store/language';
import * as fromHome from '../../store/home';
import * as fromOrderConfirmation from '../../store/order-confirmation';
import * as fromDialog from '../../store/dialog';

import ClothSelectionPage from '../../components/pages/ClothSelectionPage/ClothSelectionPage';

import { TLookup, ILookupItem } from '../../types/lookup';
import { IClothSelection, getPartitionLookups } from '../../types/cloth-selection';

import { TCategory, TOrderItemCode, TPartsNumber, TSubCategory } from '../../types/order-items';
import { IHomeSelectedItem } from '../../types/home';
import { resolveHeaderTextKey } from '../../helpers/header';
import { TCompositionIndex, ICompositionItem } from '../../types/composition';
import { IOKCancelDialog } from '../../types/dialog';

interface IStateProps {
  selectedLanguage: ILookupItem;
  hasCompleted: boolean;
  hasCompletedFullOrder: boolean;
  brandLookup: TLookup;
  modelLookup: TLookup;
  data: IClothSelection;
  disabled: boolean;
  illustrationBtnVisible: boolean;
  category: TCategory;
  itemCode: TOrderItemCode;
  pieces: TPartsNumber[];
  subCategory: TSubCategory;
}

interface IDispatchProps {
  setHeaderTitleKey: typeof fromHeader.setTitleTextKey;
  getNavBars: typeof fromNavigation.clothSelectionDefault;
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
  //
  modelChangeHandler: typeof fromClothSelection.modelChangeHandler;
  loadSeasonCode: typeof fromClothSelection.loadSeasonCode;
  brandChangeHandler: typeof fromClothSelection.brandChangeHandler;
  fabricCodeChangeHandler: typeof fromClothSelection.fabricCodeSuccess;
  optionChangeHandler: typeof fromClothSelection.optionSuccess;
  deliveryDateChangeHandler: typeof fromClothSelection.deliveryDateSuccess;
  clothSelectionSuccess: typeof fromNavigation.ClothSelectionSuccess;
  itemClothRequest: typeof fromClothSelection.loadProductDetails;
  openIllustrationDialog: typeof fromClothSelection.getIllustrationImage;
  getIllustrationBtnVisible: typeof fromClothSelection.getIllustrationBtn;
  compositionChangeHandler: typeof fromClothSelection.compositionChangeHandler;
  compositionPercentChangeHandler: typeof fromClothSelection.compositionPercentChangeHandler;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  // todo create the handlers if need validation
  partitionChangeHandler: typeof fromClothSelection.partitionSuccess;
  colorChangeHandler: typeof fromClothSelection.colorSuccess;
  designChangeHandler: typeof fromClothSelection.designSuccess;
  //
}

type TProps = IDispatchProps & IStateProps;

class ClothSelectionPageContainer extends Component<TProps> {
  componentDidMount() {
    const { props } = this;

    const textKey = resolveHeaderTextKey();
    this.props.setHeaderTitleKey(textKey);

    props.getIllustrationBtnVisible({ category: props.category, subCategory: props.subCategory });
    props.getNavBars();

    isSavedComponent(props);
  }

  render() {
    const {
      itemCode,
      itemClothRequest,
      disabled,
      brandLookup,
      modelLookup,
      fabricCodeChangeHandler,
      optionChangeHandler,
      deliveryDateChangeHandler,
      data,
      brandChangeHandler,
      modelChangeHandler,
      compositionChangeHandler,
      compositionPercentChangeHandler,
      illustrationBtnVisible,
      partitionChangeHandler,
      colorChangeHandler,
      designChangeHandler,
      subCategory,
      hasCompletedFullOrder,
      showOkCancelDialog,
      createNewItem,
      clearItemSteps,
      hasCompleted,
    } = this.props;
    return (
      <ClothSelectionPage
        createNewItem={createNewItem}
        clearItemSteps={clearItemSteps}
        //
        hasCompleted={hasCompleted}
        hasCompletedFullOrder={hasCompletedFullOrder}
        showOkCancelDialog={showOkCancelDialog}
        illustrationBtnVisible={illustrationBtnVisible}
        itemCode={itemCode}
        itemClothRequest={itemClothRequest}
        disabled={disabled}
        partitionLookup={getPartitionLookups()}
        brandLookup={brandLookup}
        modelLookup={modelLookup}
        data={data}
        brandChangeHandler={brandChangeHandler}
        modelChangeHandler={modelChangeHandler}
        fabricCodeChangeHandler={fabricCodeChangeHandler}
        optionChangeHandler={optionChangeHandler}
        deliveryDateChangeHandler={deliveryDateChangeHandler}
        openIllustrationDialog={this.illustrationDialogHandler}
        compositionChangeHandler={compositionChangeHandler}
        compositionPercentChangeHandler={compositionPercentChangeHandler}
        partitionChangeHandler={partitionChangeHandler}
        colorChangeHandler={colorChangeHandler}
        designChangeHandler={designChangeHandler}
        subCategory={subCategory}
      />
    );
  }
  illustrationDialogHandler = () => {
    this.props.openIllustrationDialog(this.props.category);
  };
}

function isSavedComponent(props: TProps) {
  if (props.data.fabricCode.length === 4) {
    props.itemClothRequest(props.data.seasonCode, props.data.fabricCode);
  }

  // reload logic
  if (props.data.brand.id !== '') {
    props.brandChangeHandler(props.data.brand);
  }
  if (props.data.model.id !== '') {
    props.modelChangeHandler(props.data.model);
  }

  // To do if its reload check if the value change from last time.
  // display message or something? ask yasuhara san
  props.loadSeasonCode();

  //
  // props.data.compositionItems.forEach(item => props.compositionChangeHandler(item));
}

function mapStateToProps(state: AppState): IStateProps {
  return {
    illustrationBtnVisible: fromClothSelection.illsturationBtnVisible(state),
    subCategory: fromHome.getSubCategory(state),
    disabled: fromClothSelection.getDetailsDisabled(state),
    brandLookup: fromClothSelection.getBrandLookup(state),
    modelLookup: fromClothSelection.getModelLookup(state),
    data: fromClothSelection.getData(state),
    selectedLanguage: fromLanguage.getLanguage(state),
    category: fromHome.getCategory(state),
    itemCode: fromHome.getItemCode(state),
    pieces: fromHome.getPieces(state),
    hasCompleted: fromClothSelection.getHasCompleted(state),
    hasCompletedFullOrder: fromOrderConfirmation.getHasCompletedFullOrder(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    setHeaderTitleKey: (textKey: string) => dispatch<any>(fromHeader.setTitleTextKey(textKey)),
    getNavBars: () => dispatch<any>(fromNavigation.clothSelectionDefault()),
    createNewItem: () => dispatch<any>(fromOrderConfirmation.createNewItem()),
    clearItemSteps: () => dispatch<any>(fromOrderConfirmation.clearItemSteps()),
    //
    getIllustrationBtnVisible: (params: IHomeSelectedItem) =>
      dispatch<any>(fromClothSelection.getIllustrationBtn(params)),
    itemClothRequest: (seasonCode: string, fabricCode: string) =>
      dispatch<any>(fromClothSelection.loadProductDetails(seasonCode, fabricCode)),
    brandChangeHandler: (params: ILookupItem) => dispatch<any>(fromClothSelection.brandChangeHandler(params)),
    optionChangeHandler: (params: string) => dispatch<any>(fromClothSelection.optionSuccess(params)),
    deliveryDateChangeHandler: (params: string) => dispatch<any>(fromClothSelection.deliveryDateSuccess(params)),
    modelChangeHandler: (params: ILookupItem) => dispatch<any>(fromClothSelection.modelChangeHandler(params)),
    loadSeasonCode: () => dispatch<any>(fromClothSelection.loadSeasonCode()),
    fabricCodeChangeHandler: (params: string) => dispatch<any>(fromClothSelection.fabricCodeChangeHandler(params)),
    clothSelectionSuccess: () => dispatch<any>(fromNavigation.ClothSelectionSuccess()),
    openIllustrationDialog: (category: TCategory) => dispatch<any>(fromClothSelection.getIllustrationImage(category)),
    compositionChangeHandler: (index: TCompositionIndex, item: ICompositionItem) =>
      dispatch<any>(fromClothSelection.compositionChangeHandler(index, item)),
    compositionPercentChangeHandler: (index: TCompositionIndex, item: ICompositionItem) =>
      dispatch<any>(fromClothSelection.compositionPercentChangeHandler(index, item)),
    partitionChangeHandler: (params: ILookupItem) => dispatch<any>(fromClothSelection.partitionSuccess(params)),
    colorChangeHandler: (params: ILookupItem) => dispatch<any>(fromClothSelection.colorSuccess(params)),
    designChangeHandler: (params: ILookupItem) => dispatch<any>(fromClothSelection.designSuccess(params)),
    showOkCancelDialog: (params: IOKCancelDialog) => dispatch<any>(fromDialog.showOkCancelDialog(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClothSelectionPageContainer);
