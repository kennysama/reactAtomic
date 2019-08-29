export type TSeasonCode =
  | 'HW'
  | 'YM'
  | 'YW'
  | 'KM'
  | 'KW'
  | 'BM'
  | 'BW'
  | 'IM'
  | 'IW'
  | 'NM'
  | 'NW'
  | 'SM'
  | 'SW'
  | 'CM'
  | 'CW'
  | 'GM'
  | 'GW'
  | 'LM'
  | 'LW'
  | 'HM'
  | 'HW';

export interface ISeasonCodeLookup {
  dateTo: Date;
  dateFrom: Date;
  seasonCode: TSeasonCode;
}
