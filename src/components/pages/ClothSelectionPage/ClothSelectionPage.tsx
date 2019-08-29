import React from 'react';

import styles from './ClothSelectionPage.module.scss';

import * as fromClothSelection from '../../../store/clothSelection';
import * as fromOrderConfirmation from '../../../store/order-confirmation';
import * as fromDialog from '../../../store/dialog';

import ClothSelectionContent from '../../organisms/ClothSelectionContent/ClothSelectionContent';
import { ILookupItem, TLookup } from '../../../types/lookup';
import { IClothSelection } from '../../../types/cloth-selection';
import { TOrderItemCode, TSubCategory } from '../../../types/order-items';
import ClothSelectionComposition from '../../organisms/ClothSelectionComposition/ClothSelectionComposition';
import { withRouter, RouteComponentProps } from 'react-router';
import { ERouterPath } from '../../../types';
import LoadingInfo from '../../molecules/LoadingInfo/LoadingInfo';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import { saveBtnFn, homeCancelBtnFn } from '../../../helpers/footer';

interface IProps {
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  //
  hasCompleted: boolean;
  hasCompletedFullOrder: boolean;
  disabled: boolean;
  brandLookup: TLookup;
  modelLookup: TLookup;
  partitionLookup: TLookup;
  data: IClothSelection;
  brandChangeHandler: (value: ILookupItem) => void;
  modelChangeHandler: (value: ILookupItem) => void;
  fabricCodeChangeHandler: typeof fromClothSelection.fabricCodeSuccess;
  optionChangeHandler: typeof fromClothSelection.optionSuccess;
  deliveryDateChangeHandler: typeof fromClothSelection.deliveryDateSuccess;
  itemClothRequest: typeof fromClothSelection.loadProductDetails;
  itemCode: TOrderItemCode;
  illustrationBtnVisible: boolean;
  openIllustrationDialog: () => void;
  compositionChangeHandler: typeof fromClothSelection.compositionChangeHandler;
  compositionPercentChangeHandler: typeof fromClothSelection.compositionPercentChangeHandler;
  partitionChangeHandler: typeof fromClothSelection.partitionSuccess;
  colorChangeHandler: typeof fromClothSelection.colorSuccess;
  designChangeHandler: typeof fromClothSelection.designSuccess;
  subCategory: TSubCategory;
}

type TProps = IProps & RouteComponentProps;

const ClothSelectionPage: React.FC<TProps> = props => {
  return (
    <div className={styles.clothSelectionPage}>
      <ClothSelectionContent
        openIllustrationDialog={props.openIllustrationDialog}
        isIllustrationBtnVisible={props.illustrationBtnVisible}
        itemCode={props.itemCode}
        itemClothRequest={props.itemClothRequest}
        brandLookup={props.brandLookup}
        modelLookup={props.modelLookup}
        data={props.data}
        brandChangeHandler={props.brandChangeHandler}
        modelChangeHandler={props.modelChangeHandler}
        fabricCodeChangeHandler={props.fabricCodeChangeHandler}
        optionChangeHandler={props.optionChangeHandler}
        deliveryDateChangeHandler={props.deliveryDateChangeHandler}
      />

      <ClothSelectionComposition
        disabled={props.disabled}
        partitionLookup={props.partitionLookup}
        data={props.data}
        compositionChangeHandler={props.compositionChangeHandler}
        compositionPercentChangeHandler={props.compositionPercentChangeHandler}
        partitionChangeHandler={props.partitionChangeHandler}
        colorChangeHandler={props.colorChangeHandler}
        designChangeHandler={props.designChangeHandler}
        subCategory={props.subCategory}
      />
      {utility(props)}
    </div>
  );
};

function getFooterButtons(props: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      func: homeCancelBtnFn(props.history, props.clearItemSteps, props.showOkCancelDialog),
    },
    {
      type: 'save',
      func: saveBtnFn(props.createNewItem),
      path: ERouterPath.home,
    },
    {
      type: 'next',
      isDisabled: !props.hasCompleted,
      path: ERouterPath.designSelection,
    },
    {
      type: 'confirm',
      isDisabled: !props.hasCompletedFullOrder,
      func: saveBtnFn(props.createNewItem),
      path: ERouterPath.orderConfirmation,
    },
  ];
}

function utility(props: TProps) {
  return (
    <React.Fragment>
      <LoadingInfo isLoading={false} displayType="absolute" />
      <FunctionFooter buttons={getFooterButtons(props)} />
    </React.Fragment>
  );
}

export default withRouter(ClothSelectionPage);
