import { Nullable } from './index';

export interface ICustomer {
  memberscardNumber: number;
  customerCode: string;
  customerSex: number;
  customerBirthday: string;
  customerFamilyName: string;
  customer_given_name: string;
  customerFamilyName_kana: string;
  customerGivenNameKana: string;
  pcMailAddress: string;
  customerPhoneNumber: string;
  customerCellularphoneNumber: string;
  customerPostalCode: string;
  customerState: string;
  customerCity: string;
  customerStreet: string;
  customerResidence: string;

  size?: ISize;
}

// TODO: Sample
interface ISize {
  height: Nullable<number>;
  weight: Nullable<number>;
}
