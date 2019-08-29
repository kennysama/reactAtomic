import { getOrderTotal, getTotalOrdersPayment } from './order-confirmation';
import { IOrderConfirmation } from '../types/order-confirmation';

const orderConfirmationOne: IOrderConfirmation = {
  orderConfirmationItemId: 0,
  isTemporal: false,
  home: {
    orderConfirmationItemId: 0,
    category: '',
    subCategory: '',
    itemCode: '',
    pieces: [],
  },
  clothSelection: {
    composition: {
      0: {
        id: '-0',
        value: '',
        percent: '0',
      },
      1: {
        id: '-0',
        value: '',
        percent: '0',
      },
      2: {
        id: '-0',
        value: '',
        percent: '0',
      },
      3: {
        id: '-0',
        value: '',
        percent: '0',
      },
    },
    fabricCode: '',
    option: '',
    deliveryDate: '',
    brand: {
      id: '',
      value: '',
    },
    model: {
      id: '',
      value: '',
    },
    clothComposition: '',
    partition: {
      id: '',
      value: '',
    },
    personalorderProductNumber: '',
    personalorderProductColor: '',
    retailPrice: '5000',
    retailPriceTaxin: '6000',
    optionPattern: '',
    seasonCode: '',
    seasonName: '',
    design: {
      id: '',
      value: '',
    },
    color: {
      id: '',
      value: '',
    },
    clothName: '',
    clothSeason: '',
    clothCode: '',
    vendorClothNumber: '',
    isnew: '',
    issoldout: '',
    makerName2: '',
    functionName: ' ',
  },
  designSelection: {
    loading: false,
    initialItemCode: '',
    designSelection: {
      availableOptions: [{ partsNumber: '04', partsName: '', optionPatterns: [] }],
      selectedOptions: [
        {
          partsIndex: 0,
          partsNumber: '01',
          optionNumber: '4',
          optionClassNumber: '1',
        },
        {
          partsIndex: 1,
          partsNumber: '02',
          optionNumber: '4',
          optionClassNumber: '1',
        },
        {
          partsIndex: 0,
          partsNumber: '01',
          optionNumber: '1',
          optionClassNumber: '1',
        },
      ],
      selectingOption: {
        partsIndex: 0,
        partsNumber: '01',
        optionNumber: '4',
        optionClassNumber: '1',
        hasOpenPopup: false,
      },
      sidebarParts: [],
      addableParts: [],
      deletableParts: [],
    },
    currentRequestParam: {
      path: {
        brandCode: '',
        itemCode: '',
        seasonCode: '',
      },
      query: {
        optionPattern: '',
      },
      other: {
        category: '',
        subCategory: '',
        initialPieces: [],
      },
    },
  },
  sizeCorrection: {
    loading: false,
    data: {
      temporal: '',
    },
  },
};
const orderConfirmationTwo: IOrderConfirmation = {
    orderConfirmationItemId: 0,
    isTemporal: false,
    home: {
      orderConfirmationItemId: 0,
      category: '',
      subCategory: '',
      itemCode: '',
      pieces: [],
    },
    clothSelection: {
      composition: {
        0: {
          id: '-0',
          value: '',
          percent: '0',
        },
        1: {
          id: '-0',
          value: '',
          percent: '0',
        },
        2: {
          id: '-0',
          value: '',
          percent: '0',
        },
        3: {
          id: '-0',
          value: '',
          percent: '0',
        },
      },
      fabricCode: '',
      option: '',
      deliveryDate: '',
      brand: {
        id: '',
        value: '',
      },
      model: {
        id: '',
        value: '',
      },
      clothComposition: '',
      partition: {
        id: '',
        value: '',
      },
      personalorderProductNumber: '',
      personalorderProductColor: '',
      retailPrice: '5000',
      retailPriceTaxin: '',
      optionPattern: '',
      seasonCode: '',
      seasonName: '',
      design: {
        id: '',
        value: '',
      },
      color: {
        id: '',
        value: '',
      },
      clothName: '',
      clothSeason: '',
      clothCode: '',
      vendorClothNumber: '',
      isnew: '',
      issoldout: '',
      makerName2: '',
      functionName: ' ',
    },
    designSelection: {
      loading: false,
      initialItemCode: '',
      designSelection: {
        availableOptions: [{ partsNumber: '04', partsName: '', optionPatterns: [ {
            optionNumber: '1',
            optionName: 'ジャケット op1',
            optionTypes: [
              {
                optionClassNumber: '1',
                optionClassName: 'ジャケット op1 type1',
                defaultFlag: '1',
                retailPrice: 1000,
                retailPriceTaxin: 1080,
                imagePath: '/images/sample/image1.png',
              },
            ],
            required: '1',
            specialOptionFlag: '0',
          }] }],
        selectedOptions: [
          {
            partsIndex: 0,
            partsNumber: '01',
            optionNumber: '4',
            optionClassNumber: '1',
          },
        ],
        selectingOption: {
          partsIndex: 0,
          partsNumber: '01',
          optionNumber: '4',
          optionClassNumber: '1',
          hasOpenPopup: false,
        },
        sidebarParts: [],
        addableParts: [],
        deletableParts: [],
      },
      currentRequestParam: {
        path: {
          brandCode: '',
          itemCode: '',
          seasonCode: '',
        },
        query: {
          optionPattern: '',
        },
        other: {
          category: '',
          subCategory: '',
          initialPieces: [],
        },
      },
    },
    sizeCorrection: {
      loading: false,
      data: {
        temporal: '',
      },
    },
  };

const ordersOne: IOrderConfirmation[] = [orderConfirmationOne, orderConfirmationOne];
const ordersTwo: IOrderConfirmation[] = [orderConfirmationOne, orderConfirmationTwo];

it('should return order total price', () => {
  expect(getOrderTotal(orderConfirmationOne)).toEqual(6000);
  expect(getOrderTotal(orderConfirmationTwo)).toEqual(0);
});

it('should return orders total price', () => {
  expect(getTotalOrdersPayment(ordersOne)).toEqual(12000);
  expect(getTotalOrdersPayment(ordersTwo)).toEqual(6000);
});
