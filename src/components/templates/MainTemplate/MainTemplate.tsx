import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../../AppRouter';

import './MainTemplate.scss';

import * as fromDialog from '../../../store/dialog';
import HeaderContainer from '../../../containers/Header/Header';
import FooterContainer from '../../../containers/Footer/Footer';
import { IApiError } from '../../../types/api';
import ErrorDialog from '../../organisms/ErrorDialog/ErrorDialog';
import InformationDialog from '../../organisms/InformationDialog/InformationDialog';
import { ERouterPath } from '../../../types';
import ErrorBoundary from '../../organisms/ErrorBoundary/ErrorBoundary';
import { IOKCancelDialog, ISelectionDialog } from '../../../types/dialog';
import OKCancelDialog from '../../molecules/OKCancelDialog/OKCancelDialog';
import SelectionDialog from '../../molecules/SelectionDialog/SelectionDialog';

interface IProps {
  errors: IApiError[];
  errorDialogOpen: boolean;
  clearErrors: typeof fromDialog.clearError;
  information: string;
  informationDialogOpen: boolean;
  clearInformation: typeof fromDialog.clearInformation;
  image: string;
  okCancelDialogData: IOKCancelDialog;
  clearOkCancelDialog: typeof fromDialog.clearOkCancelDialog;
  selectionDialogData: ISelectionDialog;
  clearSelectionDialog: typeof fromDialog.clearSelectionDialog;
  // FIXME: Temporarily
  currentPath: string;
}

const MainTemplate: React.FC<IProps> = ({
  errors,
  clearErrors,
  errorDialogOpen,
  information,
  informationDialogOpen,
  clearInformation,
  image = '',
  okCancelDialogData,
  clearOkCancelDialog,
  selectionDialogData,
  clearSelectionDialog,
  currentPath,
}) => {
  // FIXME: Temporarily
  const path = currentPath;
  const footerElement =
    path === `/${ERouterPath.designSelection}` ||
    path === `/${ERouterPath.clothSelection}` ||
    path === `/${ERouterPath.sizeCorrection}` ||
    path === `/${ERouterPath.orderConfirmation}` ||
    path === `/${ERouterPath.ordersSearch}` ||
    path === `/${ERouterPath.address}` ||
    path === `/${ERouterPath.amount}` ||
    path === `/${ERouterPath.privacyPolicy}` ||
    path === `/${ERouterPath.settlement}` ||
    path === `/${ERouterPath.inventorySearch}` ||
    path === `/${ERouterPath.home}` ? null : (
      <FooterContainer />
    );

  return (
    <Router>
      <HeaderContainer />
      <div className="page-wrapper">
        <div className="pages-content">
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </div>
      </div>
      {footerElement}
      <ErrorDialog hasOpen={errorDialogOpen} onHandleClose={clearErrors} errors={errors} />
      <InformationDialog
        image={image}
        hasOpen={informationDialogOpen}
        onHandleClose={clearInformation}
        text={information}
      />
      <OKCancelDialog {...okCancelDialogData} onClose={clearOkCancelDialog} />
      <SelectionDialog {...selectionDialogData} onClose={clearSelectionDialog} />
    </Router>
  );
};

export default MainTemplate;
