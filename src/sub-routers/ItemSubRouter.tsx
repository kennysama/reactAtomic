import React from 'react';
import { Route } from 'react-router-dom';

import { ERouterPath } from '../types';
import { resolvePath } from '../helpers/path';
import DesignSelectionPageContainer from '../containers/DesignSelectionPage/DesignSelectionPage';
import ClothSelectionPageContainer from '../containers/ClothSelection/ClothSelectionPage';
import SizeCorrectionPageContainer from '../containers/SizeCorrectionPage/SizeCorrectionPage';

const ItemSubRouter: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Route path={resolvePath(ERouterPath.clothSelection)} component={ClothSelectionPageContainer} />
      <Route path={resolvePath(ERouterPath.designSelection)} component={DesignSelectionPageContainer} />
      <Route path={resolvePath(ERouterPath.sizeCorrection)} component={SizeCorrectionPageContainer} />
    </React.Fragment>
  );
};

export default ItemSubRouter;
