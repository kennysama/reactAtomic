import { ISeasonCodeLookup } from '../types/season-code';

export function getSeasonCodeLookup(): ISeasonCodeLookup[] {
  return [
    { dateTo: new Date('2017/09/01'), dateFrom: new Date('2018/02/28'), seasonCode: 'HW' },
    { dateTo: new Date('2018/03/01'), dateFrom: new Date('2018/08/31'), seasonCode: 'YM' },
    { dateTo: new Date('2018/09/01'), dateFrom: new Date('2019/02/28'), seasonCode: 'YW' },
    { dateTo: new Date('2019/03/01'), dateFrom: new Date('2019/08/31'), seasonCode: 'KM' },
    { dateTo: new Date('2019/09/01'), dateFrom: new Date('2020/02/08'), seasonCode: 'KW' },
    { dateTo: new Date('2020/03/01'), dateFrom: new Date('2020/08/31'), seasonCode: 'BM' },
    { dateTo: new Date('2020/09/01'), dateFrom: new Date('2021/02/28'), seasonCode: 'BW' },
    { dateTo: new Date('2021/03/01'), dateFrom: new Date('2021/08/31'), seasonCode: 'IM' },
    { dateTo: new Date('2021/03/01'), dateFrom: new Date('2022/02/28'), seasonCode: 'IW' },
    { dateTo: new Date('2022/03/01'), dateFrom: new Date('2022/08/31'), seasonCode: 'NM' },
    { dateTo: new Date('2022/03/01'), dateFrom: new Date('2023/02/28'), seasonCode: 'NW' },
    { dateTo: new Date('2022/03/01'), dateFrom: new Date('2023/08/31'), seasonCode: 'SM' },
    { dateTo: new Date('2022/03/01'), dateFrom: new Date('2024/02/28'), seasonCode: 'SW' },
    { dateTo: new Date('2024/03/01'), dateFrom: new Date('2024/08/31'), seasonCode: 'CM' },
    { dateTo: new Date('2024/03/01'), dateFrom: new Date('2025/02/28'), seasonCode: 'CW' },
    { dateTo: new Date('2025/03/01'), dateFrom: new Date('2025/08/31'), seasonCode: 'GM' },
    { dateTo: new Date('2025/09/01'), dateFrom: new Date('2026/02/28'), seasonCode: 'GW' },
    { dateTo: new Date('2026/03/01'), dateFrom: new Date('2026/08/31'), seasonCode: 'LM' },
    { dateTo: new Date('2026/09/01'), dateFrom: new Date('2027/02/28'), seasonCode: 'LW' },
    { dateTo: new Date('2027/03/01'), dateFrom: new Date('2027/08/31'), seasonCode: 'HM' },
    { dateTo: new Date('2027/09/01'), dateFrom: new Date('2028/02/28'), seasonCode: 'HW' },
  ];
}
