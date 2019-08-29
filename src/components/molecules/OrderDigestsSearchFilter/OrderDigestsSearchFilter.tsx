import React, { Component } from 'react';

import styles from './OrderDigestsSearchFilter.module.scss';
// import Title from '../../atoms/Title/Title';
import SelectBox from '../../atoms/SelectBox/SelectBox';
import InputText from '../../atoms/InputText/InputText';
import Label from '../../atoms/Label/Label';
import { ILookupItem } from '../../../types/lookup';
// import I18TextContainer from '../../../containers/I18Text/I18Text';
import Button from '../../atoms/Button/Button';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { IOrderDigestsSearch, getOrderDigestsSearchFilters } from '../../../types/ordersDigests';
import { mockupCategories } from '../../../helpers/temporary-function';

interface IState {
  searchFilters: IOrderDigestsSearch;
}

interface IProps {
  onGetSearchFilters: (state: IOrderDigestsSearch) => void;
}

class SearchFilter extends Component<IProps, IState> {
  private translate = 'SearchFilter.';
  constructor(props: any) {
    super(props);
    this.state = { searchFilters: getOrderDigestsSearchFilters() };
  }

  render() {
    return (
      <div>
        <div className={styles.orderDigestsSearchFilter}>
          <div className={styles.row}>
            <div className={styles.columnSize1}>
              <Label text={this.translate + 'category'} />
              <div className={styles.inputWrap}>
                <SelectBox
                  data={mockupCategories()}
                  selectedOption={this.state.searchFilters.categoryCode}
                  onValueChanged={this.onCategoryChangeHandler}
                />
              </div>
            </div>
            <div className={styles.columnSize1}>
              <Label text={this.translate + 'phone'} />
              <div className={styles.inputWrap}>
                <InputText
                  onValueChanged={this.onPhoneChangeHandler}
                  value={this.state.searchFilters.customerPhoneNumber}
                />
              </div>
            </div>
            <div className={styles.columnSize2}>
              <Label text={this.translate + 'cardNo'} />
              <div className={styles.inputWrap}>
                <InputText
                  onValueChanged={this.onCardNoChangeHandler}
                  value={this.state.searchFilters.memberscardNumber}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnSize1}>
              <Label text={this.translate + 'nameKana'} />
              <div className={styles.inputWrap}>
                <InputText
                  onValueChanged={this.onNameKanaChangeHandler}
                  value={this.state.searchFilters.customerNameKana}
                />
              </div>
            </div>
            <div className={styles.columnSize1}>
              <Label text={this.translate + 'nameKanji'} />
              <div className={styles.inputWrap}>
                <InputText
                  onValueChanged={this.onNameKanjiChangeHandler}
                  value={this.state.searchFilters.customerNameKanji}
                />
              </div>
            </div>
            <div className={styles.columnSize3}>
              <Label text={this.translate + 'paymentDate'} />
              <div className={styles.inputWrap}>
                <DateRangePicker
                  dateFrom={this.state.searchFilters.orderDateFrom}
                  dateTo={this.state.searchFilters.orderDateTo}
                  onDateFromChange={this.onDateFromChangeHandler}
                  onDateToChange={this.onDateToChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className={styles.rowBtn}>
            <div className={styles.column}>
              <Button onClick={this.onClickHandler} styles={['black', 'size-xl', 'block', 'search']}>
                検索する
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onGetSearchFilters(this.state.searchFilters);
  };

  onCategoryChangeHandler = (event: ILookupItem) => {
    const val = event.id;
    const newVal = val.toString();
    this.setState({ searchFilters: { ...this.state.searchFilters, categoryCode: newVal } });
  };

  onPhoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ searchFilters: { ...this.state.searchFilters, customerPhoneNumber: value } });
  };
  onCardNoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({
      searchFilters: { ...this.state.searchFilters, memberscardNumber: value },
    });
  };
  onNameKanaChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({
      searchFilters: { ...this.state.searchFilters, customerNameKana: value },
    });
  };
  onNameKanjiChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({
      searchFilters: { ...this.state.searchFilters, customerNameKanji: value },
    });
  };

  onDateFromChangeHandler = (date: Date) => {
    const value = date;
    this.setState({
      searchFilters: { ...this.state.searchFilters, orderDateFrom: value },
    });
  };

  onDateToChangeHandler = (date: Date) => {
    const value = date;
    this.setState({
      searchFilters: { ...this.state.searchFilters, orderDateTo: value },
    });
  };
}

export default SearchFilter;
