import { ICustomer } from './customer';

export interface ILoadReq {
  memberscardNumber: string;
}

export interface ILoadRes extends ICustomer {
  isValid?: boolean;
}
