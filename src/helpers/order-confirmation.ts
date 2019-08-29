import { IOrderConfirmation } from '../types/order-confirmation';
import { calcOptionTotal } from './option';

export function getOrderTotal(order: IOrderConfirmation): number {
  const optionTotalPrice = calcOptionTotal(
    order.designSelection.designSelection.availableOptions,
    order.designSelection.designSelection.selectedOptions,
  );
  let taxedPrice = order.clothSelection.retailPriceTaxin;
  if (taxedPrice === '') {
    taxedPrice = '0';
  }
  const retailTaxedPrice = parseInt(taxedPrice, 10);
  return optionTotalPrice + retailTaxedPrice;
}

export function getTotalOrdersPayment(ordersList: IOrderConfirmation[]): number {
  const totalOrderPaymentList = ordersList.map(order => getOrderTotal(order));
  return totalOrderPaymentList && totalOrderPaymentList.length
    ? totalOrderPaymentList.reduce((accumulator, currentValue) => accumulator + currentValue)
    : 0;
}
