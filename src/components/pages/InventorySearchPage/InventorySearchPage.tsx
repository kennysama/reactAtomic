import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import InventorySearchFilter from '../../molecules/InventorySearchFilter/InventorySearchFilter';
import { getInventorySearch, IInventorySearch, getInventoryList } from '../../../types/inventory-search';
import { mockupCategories } from '../../../helpers/temporary-function';
import InventorySearchResults from '../../molecules/InventorySearchResults/InventorySearchResults';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import styles from './InventorySearchPage.module.scss';
import { ERouterPath } from '../../../types';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';

type TProps = RouteComponentProps;

const InventorySearchPage: React.FC<TProps> = props => {
  return (
    <React.Fragment>
      <div className={styles.inventorySearchPage}>
        <InventorySearchFilter
          data={getInventorySearch()}
          brandLookup={mockupCategories()}
          periodLookup={mockupCategories()}
          onSearch={onSearchHandler}
        />
        <InventorySearchResults inventorySearchResults={getInventoryList()} />
      </div>
      {utility(props)}
    </React.Fragment>
  );
  function onSearchHandler(state: IInventorySearch): void {
    console.log(state);
  }
};

function getFooterButtons(props: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
    },
  ];
}

function utility(props: TProps) {
  return (
    <React.Fragment>
      {/* <LoadingInfo isLoading={props.isLoading} displayType="absolute" /> */}
      <FunctionFooter buttons={getFooterButtons(props)} />
    </React.Fragment>
  );
}

export default withRouter(InventorySearchPage);
