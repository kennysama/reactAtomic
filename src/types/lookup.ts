export type TLookup = ILookupItem[];

export interface ILookupItem {
  id: number | string;
  value: string;
  url?: string;
}
