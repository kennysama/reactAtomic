export interface IOrderDigests {
  id: string;
  nameKana: string;
  name: string;
  category: string;
  textile: string;
  orderDate: string;
  memo: string;
  order: string;
  customer: string;
}

export function getOrderList() {
  return [
    {
      id: '194700302',
      name_kana: 'Saute Taro',
      name: 'Sato Taro',
      category: 'スーツ',
      textile: 'SDFFV2222',
      orderDate: '20190511',
      memo: '',
      order: '/orders/194700302',
      customer: '/customer/9900123456721',
    },
    {
      id: '194700303',
      name_kana: 'Saute Taro',
      name: 'Sato Taro',
      category: 'スーツ',
      textile: 'SDFFV2222',
      orderDate: '20190511',
      memo: '',
      order: '/orders/194700302',
      customer: '/customer/9900123456721',
    },
    {
      id: '194700304',
      name_kana: 'Saute Taro',
      name: 'Sato Taro',
      category: 'スーツ',
      textile: 'SDFFV2222',
      orderDate: '20190511',
      memo: '',
      order: '/orders/194700302',
      customer: '/customer/9900123456721',
    },
  ];
}

export interface IOrderDigestsSearch {
  categoryCode: string;
  customerPhoneNumber: string;
  memberscardNumber: string;
  customerNameKana: string;
  customerNameKanji: string;
  orderDateFrom: Date;
  orderDateTo: Date;
}

export function getOrderDigestsSearchFilters(): IOrderDigestsSearch {
  return {
    categoryCode: '1',
    customerPhoneNumber: '',
    memberscardNumber: '',
    customerNameKana: '',
    customerNameKanji: '',
    orderDateFrom: new Date(),
    orderDateTo: new Date(),
  };
}
