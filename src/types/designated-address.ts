import { IOrderDestination } from './order';

export type TOrderDestination = IOrderDestination & { shippingStore: string };

export interface IDesignatedAddressGroup {
  name: string;
  content: TOrderDestination[];
}

export function getDesignatedAddress(): IDesignatedAddressGroup[] {
  return [
    {
      name: 'tokyo',
      content: [
        {
          shippingStore: '羽田空港店',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
    {
      name: 'aaaaa',
      content: [
        {
          shippingStore: 'xxxxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'fasfas',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
    {
      name: 'bbbbb',
      content: [
        {
          shippingStore: '羽田空港店',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
    {
      name: 'ccccccc',
      content: [
        {
          shippingStore: '羽田空港店',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
    {
      name: 'dddddddd',
      content: [
        {
          shippingStore: '羽田空港店',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
    {
      name: 'eeeeeeee',
      content: [
        {
          shippingStore: '羽田空港店',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
    {
      name: 'iiiiiiii',
      content: [
        {
          shippingStore: '羽田空港店',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: '東京都',
          shippingResidence: '第一旅客ターミナル 5F name',
          shippingState: '東京都中央区',
          shippingPhoneNumberPartOne: '080',
          shippingPhoneNumberPartTwo: '3572',
          shippingPhoneNumberPartThree: '0549',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
        {
          shippingStore: 'xxxxx',
          shippingPostalCodeLeft: '111',
          shippingPostalCodeRight: '1111',
          shippingCity: 'yyyyy',
          shippingResidence: 'zzzzz 5F name',
          shippingState: 'yysdgs',
          shippingPhoneNumberPartOne: '082',
          shippingPhoneNumberPartTwo: '3542',
          shippingPhoneNumberPartThree: '0569',
          shippingPhoneNumberTwoPartOne: '',
          shippingPhoneNumberTwoPartTwo: '',
          shippingPhoneNumberTwoPartThree: '',
          emailPartOne: '',
          emailPartTwo: '',
          name: '',
        },
      ],
    },
  ];
}
