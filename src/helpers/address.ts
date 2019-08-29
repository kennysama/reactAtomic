import { IOrderDestination, IOrderDelivery, IOrderAddress } from '../types/order';

export function updateAddressDestination(
  addressList: IOrderAddress[],
  destination: IOrderDestination,
  itemId: number,
): IOrderAddress[] {
  const targetAddress = getAddress(addressList, itemId);
  const ignoredTargetAddress = deleteAddress(addressList, itemId);
  const newAddress: IOrderAddress = {
    ...targetAddress,
    orderDestination: destination,
  };

  return [...ignoredTargetAddress, newAddress];
}
export function updateAddressDelivery(
  addressList: IOrderAddress[],
  delivery: IOrderDelivery,
  itemId: number,
): IOrderAddress[] {
  const targetAddress = getAddress(addressList, itemId);
  const ignoredTargetAddress = deleteAddress(addressList, itemId);
  const newAddress: IOrderAddress = {
    ...targetAddress,
    orderDelivery: delivery,
  };

  return [...ignoredTargetAddress, newAddress];
}

export function getAddress(addressList: IOrderAddress[], itemId: number): IOrderAddress {
  const address = addressList.find(v => v.id === itemId);
  if (!address) {
    // FIXME: error handling
    throw Error(`not found address matched itemId: ${itemId}`);
  }
  return address;
}

export function deleteAddress(addressList: IOrderAddress[], itemId: number): IOrderAddress[] {
  return addressList.filter(v => v.id !== itemId);
}
