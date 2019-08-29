export type TCompositionIndex = 0 | 1 | 2 | 3;
export type TComposition = { 0: ICompositionItem; 1: ICompositionItem; 2: ICompositionItem; 3: ICompositionItem };

export interface ICompositionItem {
  id: string;
  value: string;
  percent: string;
}
