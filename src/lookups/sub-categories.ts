import { ISubCategory } from '../types/order-items';

export function getSubCategories(): ISubCategory[] {
  return [
    {
      code: '01',
      label: 'スーツ',
      initialParts: ['01', '02'],
    },
    {
      code: '02',
      label: 'ジャケット',
      initialParts: ['01'],
    },
    {
      code: '03',
      label: 'トラウザーズ',
      initialParts: ['02'],
    },
    {
      code: '04',
      label: 'ベスト',
      initialParts: ['04'],
    },
    {
      code: '05',
      label: 'パンツスーツ',
      initialParts: ['01', '02'],
    },
    {
      code: '06',
      label: 'スカートスーツ',
      initialParts: ['01', '05'],
    },
    {
      code: '07',
      label: 'タキシード',
      initialParts: ['01', '02'],
    },

    {
      code: '08',
      label: 'パンツスーツ',
      initialParts: ['01', '02'],
    },

    {
      code: '09',
      label: 'スカートスーツ',
      initialParts: ['01', '05'],
    },
    {
      code: '10',
      label: 'パンツ',
      initialParts: ['02'],
    },

    {
      code: '11',
      label: 'スカート',
      initialParts: ['05'],
    },
    {
      code: '12',
      label: 'スカート',
      initialParts: ['05'],
    },

    {
      code: '13',
      label: 'ワンピース',
      initialParts: ['10'],
    },
    {
      code: '14',
      label: 'ワンピーススーツ',
      initialParts: ['01', '10'],
    },
    {
      code: '15',
      label: '長袖シャツ',
      initialParts: ['09'],
    },
    {
      code: '16',
      label: '半袖シャツ',
      initialParts: ['09'],
    },
    {
      code: '17',
      label: 'フォーマルシャツ',
      initialParts: ['09'],
    },
  ];
}
