import { TLookup, ILookupItem } from '../types/lookup';
import Logger from '../helpers/logger';
import { IOKCancelDialog, ISelectionDialog } from '../types/dialog';

const DEFAULT_SELECT_OPTION: ILookupItem = {
  id: -0,
  value: 'Select',
};

export const MOCKUP_CATEGORIES: TLookup = [
  DEFAULT_SELECT_OPTION,
  { id: '1', value: 'Category.cat1' },
  { id: '2', value: 'Category.cat2' },
  { id: '3', value: 'Category.cat3' },
];

const testFunc = (key: string) => {
  return () => {
    Logger.log(`pushed`, key);
  };
};

export const SAMPLE_DATA_OK_CANCEL_DIALOG: IOKCancelDialog = {
  hasOpen: true,
  title: 'sample data ok cancel show',
  contents:
    '編集中のオーダーはクリアされます。ホーム画面に戻りますか？' +
    'sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.',
  onOK: testFunc('ok'),
  onCancel: testFunc('cancel'),
};

export const SAMPLE_DATA_SELECTION_DIALOG: ISelectionDialog = {
  hasOpen: true,
  title: 'sample data selection show',
  contents:
    'ワンピースのセットアップとして、ジャケットを含めますか？' +
    'sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.sample.',
  onYes: testFunc('Yes!Yes!Yes!Yes!Yes!'),
  onNo: testFunc('No!No!No!No!No!'),
};
