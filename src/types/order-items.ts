import { IndexedObject } from './index';

export interface IOrderItem {
  itemCode: TOrderItemCode;
  category: TCategory;
  subCategory: TSubCategory;
  pieces: TPartsNumber[];
  isDouble: boolean;
  availableBrand: (v: string) => boolean;
}

export interface ISubCategory {
  code: string;
  label: string;
  initialParts: TPartsNumber[];
}

export type TOrderItemCode =
  | ''
  | 'SR'
  | 'SV'
  | 'SP'
  | 'WR'
  | 'BR'
  | 'PR'
  | 'VR'
  | 'FB'
  | 'BF'
  | 'FI'
  | 'VF'
  | 'FX'
  | 'SK'
  | 'OP'
  | 'S5'
  | 'S6'
  | 'S7'
  | 'PN'
  | 'NS'
  | 'O2'
  | 'O7'
  | 'O6'
  | 'OR'
  | 'WV'
  | 'WX'
  | 'BW'
  | 'BV'
  | 'VS'
  | 'FR'
  | 'FV'
  | 'FP'
  | 'FJ'
  | 'XV'
  | 'XT'
  | 'WF'
  | 'WS'
  | 'WJ'
  | 'FQ'
  | 'FW'
  | 'FY'
  | 'SX'
  | 'WY'
  | 'S1'
  | 'S2'
  | 'P1'
  | 'P2'
  | 'FZ'
  | 'HD'
  | 'HH'
  | 'HF';

export type TCategory = '' | 'CS' | 'MT' | 'FM' | 'TX' | 'DS' | 'WM';

export type TSubCategory =
  | ''
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17';

export type TPartsNumber = '01' | '02' | '04' | '05' | '09' | '10';

export type TPartsCount = IndexedObject<number>;
