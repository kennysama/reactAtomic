export interface IOrderPayment {
  id: number;
  basePrice: number;
  optionsPrice: number;
  productTotal: number;
}

export interface IOrderPaymentTotal {
  payment: IOrderPayment[];
  total: number;
  date: string;
}

export function getOrdersListTotal(): IOrderPaymentTotal {
  return {
    payment: [
      {
        id: 1,
        basePrice: 690000,
        optionsPrice: 0,
        productTotal: 690000,
      },
      {
        id: 2,
        basePrice: 690000,
        optionsPrice: 0,
        productTotal: 690000,
      },
    ],
    total: 690000,
    date: '2019/05/31',
  };
}
