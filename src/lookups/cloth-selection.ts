import { TLookup } from '../types/lookup';

export function getPartition() {
  return [
    { code: '001', value: 'Partition.store' },
    { code: '003', value: 'Partition.warehouse' },
    { code: '004', value: 'Partition.factory' },
    { code: '005', value: 'Partition.order' },
  ];
}

export function getShirtColors(): TLookup {
  return [
    { id: '001', value: 'ホワイト' },
    { id: '002', value: 'グレー系' },
    { id: '012', value: 'ピンク＆パープル系' },
    { id: '030', value: 'その他' },
    { id: '072', value: 'ブルー系' },
  ];
}

export function getOthersColors(): TLookup {
  return [
    { id: '003', value: 'ライトグレー' },
    { id: '004', value: 'グレー' },
    { id: '005', value: 'ブラック' },
    { id: '030', value: 'その他' },
    { id: '033', value: 'ベージュ' },
    { id: '070', value: 'ブルー' },
    { id: '075', value: 'ネイビー' },
  ];
}
