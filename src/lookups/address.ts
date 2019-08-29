import { IOrderDestination, IOrderDelivery } from '../types/order';
import { TLookup } from '../types/lookup';
import { toDeliveryDate } from '../helpers/date';
import addDays from 'date-fns/addDays';

// FIXME: 仮
export const ORDER_DELIVERY_METHOD_LIST: TLookup = [
  {
    id: 0,
    value: 'ご配送',
  },
  {
    id: 1,
    value: 'ご来店',
  },
  {
    id: 2,
    value: '倉庫',
  },
];

// FIXME: 仮
export const ORDER_DELIVERY_TIME_LIST: TLookup = [
  {
    id: 0,
    value: '午前(8~12時)',
  },
  {
    id: 1,
    value: '12~14時',
  },
  {
    id: 2,
    value: '14~16時',
  },
  {
    id: 3,
    value: '16~18時',
  },
  {
    id: 4,
    value: '18~20時',
  },
  {
    id: 5,
    value: '18~21時',
  },
  {
    id: 6,
    value: '19~21時',
  },
];

export const ORDER_DESTINATION_INITIAL_STATE: IOrderDestination = {
  shippingPostalCodeLeft: '',
  shippingPostalCodeRight: '',
  shippingCity: '',
  shippingResidence: '',
  name: '',
  shippingState: '',
  shippingPhoneNumberPartOne: '',
  shippingPhoneNumberPartTwo: '',
  shippingPhoneNumberPartThree: '',
  shippingPhoneNumberTwoPartOne: '',
  shippingPhoneNumberTwoPartTwo: '',
  shippingPhoneNumberTwoPartThree: '',
  emailPartOne: '',
  emailPartTwo: '',
};

function getDateList(): TLookup {
  const array = Array.from({ length: 11 }, (v, i) => i);
  return array.map(i => {
    return {
      id: i,
      value: toDeliveryDate(addDays(new Date(), 10 + i)),
    };
  });
}

export const ORDER_DELIVERY_DATE_LIST = getDateList();

export const ORDER_DELIVERY_INITIAL_STATE: IOrderDelivery = {
  date: ORDER_DELIVERY_DATE_LIST[0],
  fee: '',
  time: ORDER_DELIVERY_TIME_LIST[0],
  method: ORDER_DELIVERY_METHOD_LIST[0],
};
