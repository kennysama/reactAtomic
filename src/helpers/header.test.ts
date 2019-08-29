import { resolveHeaderTextKey } from './header';
it('should return header path', () => {
  expect(resolveHeaderTextKey('/home')).toEqual('Home.page');
  expect(resolveHeaderTextKey('/samples')).toEqual('Home.page');
  expect(resolveHeaderTextKey('/pie')).toEqual('Home.page');
  expect(resolveHeaderTextKey('/orders')).toEqual('OrdersSearchPage.page');
  expect(resolveHeaderTextKey('/item/cloth')).toEqual('ClothSelection.page');
  expect(resolveHeaderTextKey('/item/design')).toEqual('DesignSelection.page');
  expect(resolveHeaderTextKey('/item/size')).toEqual('SizeCorrection.page');
  expect(resolveHeaderTextKey('/order/shipping')).toEqual('Order.page');
  expect(resolveHeaderTextKey('/order/options')).toEqual('Amount.page');
  expect(resolveHeaderTextKey('/order/privacy')).toEqual('PrivacyPolicy.page');
  expect(resolveHeaderTextKey('/order/settlement')).toEqual('Settlement.page');
  expect(resolveHeaderTextKey('/inventory')).toEqual('InventorySearch.page');
  expect(resolveHeaderTextKey('/order/orderConfirmation')).toEqual('OrderContentConfirmation.page');
  expect(resolveHeaderTextKey('')).toEqual('Home.page');
});
