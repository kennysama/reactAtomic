import { getCompositionLookup } from '../lookups/composition';
import { TCompositionIndex, TComposition, ICompositionItem } from '../types/composition';

export function filterSelectedCompositions(composition: TComposition, currentIndex: TCompositionIndex) {
  return getCompositionLookup().filter(allItems =>
    compositionAsArray(composition).find(
      x => x.id === allItems.id && x.id !== '-0' && x.id !== composition[currentIndex].id,
    )
      ? false
      : true,
  );
}

export function isCompositionPercentDisable(disable: boolean, selectedID: string): boolean {
  return disable === false && selectedID !== '-0' ? false : true;
}

export function isPercentValid(composition: TComposition) {
  const items = compositionAsArray(composition);

  const total = items.reduce(
    (previous, current) => (previous = String(parseFloat(current.percent) + parseFloat(previous))),
    '0',
  );

  return parseFloat(total) === 100 ? true : false;
}

export function compositionAsArray(composition: TComposition): ICompositionItem[] {
  return Object.keys(composition).map(index => composition[Number(index) as TCompositionIndex]);
}
