import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './ItemList.module.scss';

// TODO: If we can use this component in the future,
// we will be able to pass the state from the outside.
type TBrockType = 'right' | 'left';
interface IBrock {
  item: React.ReactNode;
  styles?: string[];
}

export interface IListItem {
  key: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

interface IProps {
  title?: string;
  items: IListItem[];
}

const ItemList: React.FC<IProps> = ({ title, items }) => {
  return (
    <React.Fragment>
      <h4>{title}</h4>
      {items.map(item => {
        return renderItem(item);
      })}
    </React.Fragment>
  );

  function renderItem(item: IListItem) {
    return (
      <Grid container={true} spacing={8} className={styles.left} key={item.key}>
        <Grid item={true} xs={6} className={styles.left}>
          {item.left}
        </Grid>
        <Grid item={true} xs={6} className={styles.leftAlign}>
          {item.right}
        </Grid>
      </Grid>
    );
  }
};

export default ItemList;
