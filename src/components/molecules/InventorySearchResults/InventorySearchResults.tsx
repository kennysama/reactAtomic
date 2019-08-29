import React from 'react';

// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell/TableCell';
// import TableBody from '@material-ui/core/TableBody';

import styles from './InventorySearchResults.module.scss';
import { IInventorySearchResaults } from '../../../types/inventory-search';
// import Label from '../../atoms/Label/Label';
import I18TextContainer from '../../../containers/I18Text/I18Text';

export interface IProps {
  inventorySearchResults: IInventorySearchResaults[];
}

const InventorySearchResults: React.FC<IProps> = ({ inventorySearchResults }) => {
  const translate = 'InventorySearchResults.';

  return (
    <div className={styles.inventorySearchResults}>
      <div className={styles.header}>
        <p className={styles.title}>
          <I18TextContainer textKey={translate + 'label'} />：<span>{inventorySearchResults.length}件</span>
        </p>
        <dl className={styles.update}>
          <dt>更新日時</dt>
          <dd>2019.04.26 15:00</dd>
        </dl>
      </div>

      <div className={styles.content}>
        <div className={styles.thead}>
          <div className={styles.row}>
            <div className={styles.col1}>ブランド</div>
            <div className={styles.col2}>期別</div>
            <div className={styles.col3}>品番</div>
            <div className={styles.col4}>色</div>
            <div className={styles.col5}>在庫状況</div>
          </div>
        </div>
        <div className={styles.tbody}>
          {inventorySearchResults.map(search => (
            <div className={styles.row} key={search.id}>
              <div className={styles.col1}>{search.brand}</div>
              <div className={styles.col2}>{search.period}</div>
              <div className={styles.col3}>{search.itemNumber}</div>
              <div className={styles.col4}>{search.color}</div>
              <div className={styles.col5}>{search.stockStatus}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventorySearchResults;
