import { ILookupItem } from './lookup';

export interface IInventorySearch {
  itemNumber: string;
  brand: ILookupItem;
  byPeriod: ILookupItem;
  enoughStock: boolean;
  littleStock: boolean;
  noStock: boolean;
}

export function getInventorySearch(): IInventorySearch {
  return {
    itemNumber: '',
    enoughStock: false,
    littleStock: false,
    brand: { id: 0, value: '' },
    byPeriod: { id: 0, value: '' },
    noStock: false,
  };
}

export interface IInventorySearchResaults {
  id: number;
  brand: string;
  period: string;
  itemNumber: string;
  color: string;
  stockStatus: string;
}

export function getInventoryList(): IInventorySearchResaults[] {
  return [
    {
      id: 0,
      brand: 'ST',
      period: 'KM',
      itemNumber: '5312',
      color: '004',
      stockStatus: 'X',
    },
    {
      id: 1,
      brand: 'ST',
      period: 'KM',
      itemNumber: '5313',
      color: '004',
      stockStatus: 'X',
    },
    {
      id: 2,
      brand: 'ST',
      period: 'KM',
      itemNumber: '5314',
      color: '004',
      stockStatus: 'X',
    },
    {
      id: 3,
      brand: 'ST',
      period: 'KM',
      itemNumber: '5315',
      color: '004',
      stockStatus: 'O',
    },
    {
      id: 4,
      brand: 'ST',
      period: 'KM',
      itemNumber: '5312',
      color: '004',
      stockStatus: 'O',
    },
  ];
}
