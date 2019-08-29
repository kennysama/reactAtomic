import { IOptionPattern, IOptionType } from '../option';

export class OptionTypeModel {
  private _data: IOptionType;

  constructor(initialData?: IOptionType) {
    const data = initialData ? initialData : this.initialData;
    this._data = { ...data };
  }

  get initialData(): IOptionType {
    return {
      optionClassNumber: '',
      optionClassName: '',
      defaultFlag: '0',
      retailPrice: 0,
      retailPriceTaxin: 0,
      imagePath: '',
    };
  }

  get data(): IOptionType {
    return { ...this._data };
  }

  set data(data: IOptionType) {
    this._data = { ...data };
  }

  get number(): string {
    return this._data.optionClassNumber;
  }

  get name(): string {
    return this._data.optionClassName;
  }

  get isDefault(): boolean {
    return this._data.defaultFlag === '1' ? true : false;
  }

  get retailPrice(): number {
    return this._data.retailPrice;
  }

  get retailPriceInTaxin(): number {
    return this._data.retailPriceTaxin;
  }

  get imagePath(): string {
    return this._data.imagePath ? this._data.imagePath : '';
  }
}
