import { IMessage } from '../types/error';

export const CLIENT_ERROR_PREFIX = 'Client';

export const ERROR_MESSAGES: IMessage[] = [
  {
    code: '0001',
    message: 'ItemCode not founded Category: {0}, Sub Category: {1}, Parts: {2}',
  },
  {
    code: '0002',
    message: 'Founded: {0} Season Codes, currentDate: {1}',
  },
  {
    code: '0003',
    message: 'Component clashed because something went wrong.\nError Detail:{0}',
  },
];

export const WARM_MESSAGES: IMessage[] = [
  {
    code: '0001',
    message: 'hoge hoge',
  },
  {
    code: '0002',
    message: 'fuga fuga',
  },
];

export const INFO_MESSAGES: IMessage[] = [
  {
    code: '0001',
    message: 'hoge hoge',
  },
  {
    code: '0002',
    message: 'fuga fuga',
  },
];
