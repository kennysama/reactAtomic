export function getOrderClassification(): TRadioGroup[] {
  const translate = 'Home.';
  return [
    { key: 1, value: 'product', text: translate + 'product' },
    { key: 2, value: 'remake', text: translate + 'remake' },
    { key: 3, value: 'sample', text: translate + 'sample' },
  ];
}
export function getBalance(): TRadioGroup[] {
  const translate = 'BalanceIntroducer.';
  return [
    { key: 1, value: 'none', text: translate + 'none' },
    { key: 2, value: 'introduction', text: translate + 'introduction' },
    { key: 3, value: 'customerService', text: translate + 'customerService' },
    { key: 4, value: 'measurements', text: translate + 'measurements' },
  ];
}
export type TRadioGroup = { key: number; value: string; text: string };
