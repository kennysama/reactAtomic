import React, { Component } from 'react';

import styles from './InventorySearchFilter.module.scss';
import SelectBox from '../../atoms/SelectBox/SelectBox';
import InputText from '../../atoms/InputText/InputText';
import { ILookupItem, TLookup } from '../../../types/lookup';
import CheckBox from '../../atoms/CheckBox/CheckBox';
import Label from '../../atoms/Label/Label';
import { IInventorySearch, getInventorySearch } from '../../../types/inventory-search';
import Button from '../../atoms/Button/Button';

interface IProps {
  data: IInventorySearch;
  brandLookup: TLookup;
  periodLookup: TLookup;
  onSearch: (state: IInventorySearch) => void;
}

interface IState {
  itemNumber: string;
  brand: ILookupItem;
  byPeriod: ILookupItem;
  enoughStock: boolean;
  littleStock: boolean;
  noStock: boolean;
}

class InventorySearchFilter extends Component<IProps, IState> {
  private translate = 'InventorySearchFilter.';
  constructor(props: IProps) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (
      <div className={styles.inventorySearchFilter}>
        <div className={styles.row}>
          <div className={styles.columnSize1}>
            <Label text={this.translate + 'brand'} />
            <div className={styles.inputWrap}>
              <SelectBox
                data={this.props.brandLookup}
                selectedOption={this.state.brand.id}
                onValueChanged={this.onBrandChangeHandler}
              />
            </div>
          </div>
          <div className={styles.columnSize2}>
            <Label text={this.translate + 'byPeriod'} />
            <div className={styles.inputWrap}>
              <SelectBox
                data={this.props.periodLookup}
                selectedOption={this.state.byPeriod.id}
                onValueChanged={this.onModelChangeHandler}
              />
            </div>
          </div>
          <div className={styles.columnSize2}>
            <Label text={this.translate + 'itemNumber'} />
            <div className={styles.inputWrap}>
              <InputText onValueChanged={this.onItemNumberChangeHandler} value={this.state.itemNumber} />
            </div>
          </div>
        </div>
        <div className={styles.rowBtn}>
          <div className={styles.columnSize3}>
            <Label text={this.translate + 'inventoryStatus'} />
            <div className={styles.inputWrap}>
              <CheckBox onChange={this.onEnoughStockChangeHandler} label={this.translate + 'enoughStock'} />
              <CheckBox onChange={this.onLittleStockChangeHandler} label={this.translate + 'littleStock'} />
              <CheckBox onChange={this.onNoStockChangeHandler} label={this.translate + 'noStock'} />
            </div>
          </div>
          <div className={styles.columnSize4}>
            <Button onClick={this.onSearchClickHandler} styles={['black', 'size-xl', 'block', 'search']}>
              {this.translate + 'search'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  //  <Button onClick={this.onResetClickHandler}>{this.translate + 'reset'}</Button>

  onBrandChangeHandler = (value: ILookupItem) => {
    this.setState({ brand: value });
  };

  onModelChangeHandler = (value: ILookupItem) => {
    this.setState({ byPeriod: value });
  };

  onEnoughStockChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    this.setState({
      enoughStock: value,
    });
  };

  onLittleStockChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    this.setState({
      littleStock: value,
    });
  };

  onNoStockChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    this.setState({
      noStock: value,
    });
  };

  onItemNumberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({
      itemNumber: value,
    });
  };

  onSearchClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onSearch(this.state);
  };

  onResetClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState(getInventorySearch());
  };
}

export default InventorySearchFilter;
