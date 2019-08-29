import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import styles from './DesignSelectionPage.module.scss';

import * as fromDesignSelectionPage from '../../../store/design-selection';
import * as fromOrderConfirmation from '../../../store/order-confirmation';
import * as fromDialog from '../../../store/dialog';

import DesignSelectionContent from '../../organisms/DesignSelectionContent/DesignSelectionContent';
import DesignSelectionSidebar from '../../organisms/DesignSelectionSidebar/DesignSelectionSidebar';
import DesignSelectionHeader from '../../molecules/DesignSelectionHeader/DesignSelectionHeader';
import LoadingInfo from '../../molecules/LoadingInfo/LoadingInfo';

import { IDesignSelection } from '../../../types/option';
import { IClothSelection } from '../../../types/cloth-selection';
import { calcOptionTotal, getSelectingOptionPattern, isSpecialOption as isSpecial } from '../../../helpers/option';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import { ERouterPath } from '../../../types';
import { saveBtnFn, homeCancelBtnFn } from '../../../helpers/footer';

interface IProps {
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  //
  isLoading: boolean;
  hasCompleted: boolean;
  hasCompletedFullOrder: boolean;
  designSelection: IDesignSelection;
  clothSelection: IClothSelection;
  onSelectOption: typeof fromDesignSelectionPage.selectOption;
  onSelectOptionType: typeof fromDesignSelectionPage.selectOptionType;
  onSetDefaultSelectedOptions: typeof fromDesignSelectionPage.setDefaultSelectedOptions;
  onAddParts: typeof fromDesignSelectionPage.addParts;
  onDeleteParts: typeof fromDesignSelectionPage.deleteParts;
}

type TProps = IProps & RouteComponentProps;

const DesignSelectionPage: React.FC<TProps> = (props: TProps) => {
  const { availableOptions, selectedOptions, selectingOption } = props.designSelection;
  // DesignSelectionHeader
  const { fabricCode, brand, model, retailPriceTaxin } = props.clothSelection;
  const optionTotal = calcOptionTotal(availableOptions, selectedOptions);
  // DesignSelectionContent
  const selectingPattern = getSelectingOptionPattern(availableOptions, selectingOption);
  const selectorTitle = selectingPattern ? selectingPattern.optionName : '';
  const isSpecialOption = isSpecial(selectingPattern);

  return (
    <React.Fragment>
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <DesignSelectionSidebar
              onSelectOption={props.onSelectOption}
              designSelection={props.designSelection}
              onSetDefaultSelectedOptions={props.onSetDefaultSelectedOptions}
              onAddParts={props.onAddParts}
              onDeleteParts={props.onDeleteParts}
            />
          </div>
          <div className={styles.sideContent}>
            <div className={styles.header}>
              <DesignSelectionHeader
                fabricCode={fabricCode}
                brandName={brand.value}
                modelName={model.value}
                unitPrice={+retailPriceTaxin}
                optionPrice={optionTotal}
              />
            </div>
            <div className={styles.selector}>
              <DesignSelectionContent
                designSelection={props.designSelection}
                optionPattern={selectingPattern}
                title={selectorTitle}
                isSpecial={isSpecialOption}
                onSelectOption={props.onSelectOption}
                onSelectOptionType={props.onSelectOptionType}
              />
            </div>
          </div>
        </div>
      </div>
      {utility(props)}
    </React.Fragment>
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
      type: 'back',
      path: ERouterPath.clothSelection,
    },
    {
      type: 'next',
      isDisabled: !props.hasCompleted,
      path: ERouterPath.sizeCorrection,
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
      <LoadingInfo isLoading={props.isLoading} displayType="absolute" />
      <FunctionFooter buttons={getFooterButtons(props)} />
    </React.Fragment>
  );
}

export default withRouter(DesignSelectionPage);
