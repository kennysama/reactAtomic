import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import styles from './SizeCorrectionPage.module.scss';

import { IFooterButtonNew as IFooterButton } from '../../../types/footer';

import * as fromOrderConfirmation from '../../../store/order-confirmation';
import * as fromDialog from '../../../store/dialog';

import {
  NUDE_DIMENSIONS,
  RECOMMENDED_GAUGES_TEMP,
  getSizeAdjustOptionDummy,
  getMeasurementListPropsDummy,
  DUMMY_MESUREMENT_HISTORIES,
} from '../../../lookups/size-correction';
import NudeDimensionSection from '../../organisms/NudeDimensionSection/NudeDimensionSection';
import SizeAdjustSection from '../../organisms/SizeAdjustSection/SizeAdjustSection';
import { ERouterPath } from '../../../types';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';
import LoadingInfo from '../../molecules/LoadingInfo/LoadingInfo';
import { homeCancelBtnFn, saveBtnFn } from '../../../helpers/footer';

interface IProps {
  createNewItem: typeof fromOrderConfirmation.createNewItem;
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps;
  hasCompleted: boolean;
  hasCompletedFullOrder: boolean;
  isLoading: boolean;
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog;
  //
  temporalCompleteStep: () => void;
}

type TProps = IProps & RouteComponentProps;

const SizeCorrectionPage: React.FC<TProps> = (props: TProps) => {
  const adjustOptions = getSizeAdjustOptionDummy();
  const measurementItems = getMeasurementListPropsDummy();
  const recommendedGauges = RECOMMENDED_GAUGES_TEMP;
  const selectedPartNumber = RECOMMENDED_GAUGES_TEMP[0].partsNumber;
  const baseGauge = RECOMMENDED_GAUGES_TEMP[0];
  const histories = DUMMY_MESUREMENT_HISTORIES;

  return (
    <React.Fragment>
      <div id={styles.container}>
        <div className={styles.nudeDimension}>
          <NudeDimensionSection nudeDimensions={NUDE_DIMENSIONS} gauges={recommendedGauges} />
        </div>
        <div className={styles.sideAdjust}>
          <SizeAdjustSection
            adjustOptions={adjustOptions}
            measurementItems={measurementItems}
            histories={histories}
            selectedParts={selectedPartNumber}
            selectedGauge={baseGauge}
            recommendedGauges={recommendedGauges}
          />
        </div>
      </div>
      {utility(props)}
    </React.Fragment>
  );

  function getFooterButtons(prop: TProps): IFooterButton[] {
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
        path: ERouterPath.designSelection,
      },
      {
        type: 'next',
        isDisabled: false,
        func: props.temporalCompleteStep,
      },
      {
        type: 'confirm',
        isDisabled: !props.hasCompletedFullOrder,
        func: saveBtnFn(props.createNewItem),
        path: ERouterPath.orderConfirmation,
      },
    ];
  }

  function utility(prop: TProps) {
    return (
      <React.Fragment>
        <LoadingInfo isLoading={prop.isLoading} displayType="absolute" />
        <FunctionFooter buttons={getFooterButtons(prop)} />
      </React.Fragment>
    );
  }
};
export default withRouter(SizeCorrectionPage);
