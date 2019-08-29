export type TSamples = ISample1Item[];

export interface ISamples {
  samples: TSamples;
}

export interface ISample1Item {
  id: number;
  value: string;
}
