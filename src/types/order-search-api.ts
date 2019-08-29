export interface IOrderDigestsSearchReq {
  categoryCode: string;
  customerPhoneNumber: string;
  memberscardNumber: string;
  customerNameKana: string;
  customerNameKanji: string;
  orderDateFrom: Date;
  orderDateTo: Date;
}
export interface IOrderDigestsSearchMockReq {
  category: string;
  nameKana: string;
  name: string;
}
export interface IOrderDigestsSearchRes {
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
