import { TPartsNumber, TOrderItemCode } from './order-items';

// ====================================================
// types
// ====================================================
export type NudeDemensionCodeType = '7001' | '7004' | '7005' | '7006' | '7010' | '7011';

export type NudeDemensionCodeShirtType = '7027' | '7029' | '7033' | '7034' | '7030' | '7200';

export type AllNudeDemensionCodeType = NudeDemensionCodeType | NudeDemensionCodeShirtType;

// ====================================================
// App Interface
// ====================================================
export interface INudeDemension {
  code: AllNudeDemensionCodeType;
  name: string;
  value?: number;
}

export interface IPartsGauge {
  partsNumber: TPartsNumber;
  gauge: IGauge;
}

// FIXME: sample
export interface IMeasurementListItemProps {
  measurementItem: IMesurementItem;
  standardSize: IStandardSize;
  selectedSize: number;
}

// FIXME: sample
export interface IOption {
  optionCode: string;
  optionName: string;
  optionClassNumber: string;
  optionClassName: string;
  optionMark?: string;
}

// ====================================================
// API Interface
// ====================================================
/**
 * 採寸項目リスト取得 path req
 */
export interface ISizeMeasurementsPathReqParams {
  brandCode: string;
}

/**
 * 採寸項目リスト取得 query req
 */
export interface ISizeMeasurementsQueryReqParams {
  languageCode?: string;
}

/**
 * 採寸項目リスト取得 res
 */
export interface ISizeMeasurementsRes {
  measurement: IMesurementList[];
}

export interface IMesurementList {
  partsNumber: TPartsNumber;
  measurementItems: IMesurementItem[];
}

export interface IMesurementItem {
  measurementNumber: number;
  measurementName: string;
  adjustmentUpperLimit: number;
  adjustmentLowerLimit: number;
  measurementPitch: number;
}

/**
 * 標準サイズリスト取得 req
 */
export interface IStandardSizePathReqParams {
  brandCode: string;
  partsNumber: TPartsNumber;
  modelCode: string;
  gauge: string;
}

/**
 * 標準サイズリスト取得 res
 */
export interface IStandardSizeRes {
  standardSize: IStandardSize[];
}

export interface IStandardSize {
  measurementNumber: number;
  measurementValue: number;
}

/**
 * 推奨ゲージ取得 req
 */
export interface ISizeRecommendPathReqParams {
  brandCode: string;
}

export interface ISizeRecommendBodyReqParams {
  parts: ISizeRecommendParts[];
  nudeSizes: ISizeRecommendNudeSize[];
}

/**
 * request
 */
export interface ISizeRecommendParts {
  partsNumber: TPartsNumber;
  modelCode: string;
}

export type ISizeRecommendNudeSize = IStandardSize;

/**
 * 推奨ゲージ取得 res
 */
export interface ISizeRecommendRes {
  parts: IRecommendPartsSize[];
}

/**
 * response
 */
export interface IRecommendPartsSize {
  partsNumber: TPartsNumber;
  recommendedGauge: IGauge;
  allGauge: IGauge[];
}

export interface IGauge {
  majorGauge: string;
  minorGauge: string;
}

/**
 * 設定可能補正サイズリスト情報取得 req
 */
export interface ISizeAdjustOptionsPathReqParam {
  brandCode: string;
  itemCode: TOrderItemCode;
  seasonCode: string;
  partsNumber: TPartsNumber;
  optionPattern: string;
}

export interface ISizeAdjustOptionsQueryReqParam {
  languageCode?: string;
}

/**
 * 設定可能補正サイズリスト情報取得 res
 */
export interface ISizeAdjustOptionsRes {
  adjustOptions: IAdjustOption[];
}

export interface IAdjustOption {
  optionNumber: string;
  optionName: string;
  specialOptionFlag: string;
  optionClasses: IOptionClass[];
}

export interface IOptionClass {
  optionClassNumber: string;
  optionClassName: string;
}
