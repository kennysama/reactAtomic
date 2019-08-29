import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';

import * as fromClothSelection from '../../store/clothSelection';
import * as fromDesignSelection from '../../store/design-selection';
import * as fromNavigation from '../../store/header';

import ItemContentPage from '../../components/pages/ItemContentPage/ItemContentPage';
import { getItemStepbar } from '../../helpers/stepbar';

interface IStateProps {
  currentPath: string;
  hasClothCompleted: boolean;
  hasDesignCompleted: boolean;
}

const ItemContentPageContainer: React.FC<IStateProps> = (props: IStateProps) => {
  const { currentPath, hasClothCompleted, hasDesignCompleted } = props;
  const stepbar = getItemStepbar(currentPath, hasClothCompleted, hasDesignCompleted);
  return <ItemContentPage stepbar={stepbar} />;
};

function mapStateToProps(state: AppState): IStateProps {
  return {
    currentPath: fromNavigation.getCurrentPath(state),
    hasClothCompleted: fromClothSelection.getHasCompleted(state),
    hasDesignCompleted: fromDesignSelection.getHasCompleted(state),
  };
}

export default connect(mapStateToProps)(ItemContentPageContainer);
