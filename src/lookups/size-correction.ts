import {
  INudeDemension,
  IPartsGauge,
  IAdjustOption,
  IOptionClass,
  IMesurementItem,
  IMeasurementListItemProps,
  IOption,
} from '../types/size-correction';

export const NUDE_DIMENSIONS: INudeDemension[] = [
  {
    code: '7001',
    name: '総丈',
  },
  {
    code: '7004',
    name: 'OB',
  },
  {
    code: '7005',
    name: '上胴',
  },
  {
    code: '7006',
    name: '中胴',
  },
  {
    code: '7010',
    name: 'ウエスト',
  },
  {
    code: '7011',
    name: '尻囲',
  },
];

export const SHIRT_NUDE_DIMENSIONS: INudeDemension[] = [
  {
    code: '7027',
    name: 'ネック',
  },
  {
    code: '7029',
    name: 'チェスト',
  },
  {
    code: '7033',
    name: '裄丈',
  },
  {
    code: '7034',
    name: 'カフス長',
  },
  {
    code: '7030',
    name: 'ウエスト',
  },
  {
    code: '7200',
    name: 'ヒップ',
  },
];

export const ALL_NUDE_DIMENSIONS = [...NUDE_DIMENSIONS, ...SHIRT_NUDE_DIMENSIONS];

// FIXME: Tentatively
export const RECOMMENDED_GAUGES_TEMP: IPartsGauge[] = [
  {
    partsNumber: '01',
    gauge: {
      majorGauge: 'D6',
      minorGauge: '50',
    },
  },
  {
    partsNumber: '02',
    gauge: {
      majorGauge: 'YA',
      minorGauge: '90',
    },
  },
  {
    partsNumber: '04',
    gauge: {
      majorGauge: 'ZZ',
      minorGauge: '99',
    },
  },
];

// FIXME: Tentatively
const SIZE_OPITON_LIST = [
  {
    optionNumber: '1011',
    optionName: '肩バッド（右）',
  },
  {
    optionNumber: '1012',
    optionName: '肩バッド（左）',
  },
  {
    optionNumber: '3015',
    optionName: '鎌深',
  },
  {
    optionNumber: '3016',
    optionName: 'AH刳る',
  },
  {
    optionNumber: '3006',
    optionName: '前肩',
  },
];

// FIXME: Tentatively
export function getSizeAdjustOptionDummy(): IAdjustOption[] {
  return SIZE_OPITON_LIST.map(v => {
    return {
      ...v,
      specialOptionFlag: '0',
      optionClasses: getSizeAdjustOptionClassesDummy(),
    };
  });
}

// FIXME: Tentatively
export function getSizeAdjustOptionClassesDummy(): IOptionClass[] {
  const max = 4;
  const array = Array.from({ length: max }, (v, i) => i + 1);
  return array.map(v => {
    return {
      optionClassNumber: String(v),
      optionClassName: `補正サイズオプション${v}`,
    };
  });
}

// FIXME: Tentatively
export function getMeasurementListPropsDummy(): IMeasurementListItemProps[] {
  return DUMMY_MESUREMENT_ITEMS.map(v => {
    return {
      measurementItem: v,
      standardSize: {
        measurementNumber: v.measurementNumber,
        measurementValue: 80 + v.adjustmentLowerLimit,
      },
      selectedSize: 80 + v.adjustmentLowerLimit,
    };
  });
}

const DUMMY_MESUREMENT_ITEMS = getMesurementItems();

function getMesurementItems(): IMesurementItem[] {
  const max = 10;
  const array = Array.from({ length: max }, (v, i) => {
    return {
      no: i + 7900,
      limit: (i + 1) * 5,
      pitch: i !== 1 ? 0.5 : 1,
    };
  });
  return array.map(v => {
    return {
      measurementNumber: v.no,
      measurementName: `採寸項目名${v.no}`,
      adjustmentUpperLimit: v.limit,
      adjustmentLowerLimit: v.limit,
      measurementPitch: v.pitch,
    };
  });
}

export const DUMMY_MESUREMENT_HISTORIES = getMesurementHistories();

function getMesurementHistories(): IOption[] {
  const dummy = getMeasurementListPropsDummy();
  const mesurements = dummy.map(v => {
    return {
      optionCode: String(v.measurementItem.measurementNumber),
      optionName: v.measurementItem.measurementName,
      optionClassNumber: '',
      optionClassName: String(v.standardSize.measurementValue + 1),
    };
  });

  const dummyOptions = getSizeAdjustOptionDummy();
  const options = dummyOptions.map(v => {
    return {
      optionCode: v.optionNumber,
      optionName: v.optionName,
      optionClassNumber: v.optionClasses[0].optionClassNumber,
      optionClassName: v.optionClasses[0].optionClassName,
    };
  });

  return [...mesurements, ...options];
}
