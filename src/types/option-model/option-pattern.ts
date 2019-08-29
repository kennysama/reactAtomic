import { OptionTypeModel } from './option-type';
import { IOptionPattern, IOptionType } from '../option';

export class OptionPatternModel {
  private _data: IOptionPattern;
  private _optionTypes: OptionTypeModel[] = [];

  constructor(initialData?: IOptionPattern) {
    const data = initialData ? initialData : this.initialData;
    this._data = { ...data };
    if (this._data.optionTypes) {
      this.optionTypes = this._data.optionTypes;
    }
  }

  get initialData(): IOptionPattern {
    return {
      optionNumber: '',
      optionName: '',
      specialOptionFlag: '0',
      required: '0',
      optionTypes: [],
    };
  }

  get data(): IOptionPattern {
    return { ...this._data };
  }

  set data(data: IOptionPattern) {
    this._data = { ...data };
    if (this._data.optionTypes) {
      this.optionTypes = this._data.optionTypes;
    }
  }

  get number(): string {
    return this._data.optionNumber;
  }

  get name(): string {
    return this._data.optionName;
  }

  get optionTypes(): IOptionType[] {
    return this._optionTypes.map(type => type.data);
  }

  set optionTypes(optionTypes: IOptionType[]) {
    this._optionTypes = optionTypes.map(type => new OptionTypeModel(type));
  }

  get defaultOptionType(): OptionTypeModel | null {
    const optionType = this._optionTypes.find(v => v.isDefault === true);
    if (optionType) {
      return optionType;
    }
    return null;
  }
}
