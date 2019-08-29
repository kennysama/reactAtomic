import { TOrderItemCode, TPartsNumber, ISubCategory } from '../types/order-items';
import { getSubCategories } from '../lookups/sub-categories';
import { getOrderCatalog } from '../lookups/order-items';

export function getOrderItem(
  category: string,
  pieces: string[],
  isDouble = false,
  brand: string = '',
): TOrderItemCode | undefined {
  const orderItem = getOrderCatalog().filter(
    row =>
      row.category === category &&
      row.pieces.sort().join() === pieces.sort().join() &&
      row.isDouble === isDouble &&
      row.availableBrand(brand) === true,
  )[0];

  return orderItem ? orderItem.itemCode : undefined;
}

export function getSubCategoryPieces(subCategory: string): TPartsNumber[] {
  return getSubCategories().filter((item: ISubCategory) => item.code === subCategory)[0].initialParts;
}
