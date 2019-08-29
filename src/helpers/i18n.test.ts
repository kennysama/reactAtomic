import { getLanguage, getMessage } from './i18n';
import messagesJa from '../i18n/ja/messages.json';
import messagesEn from '../i18n/en/messages.json';
import messagesZh from '../i18n/zh/messages.json';
import { IndexedObject } from '../types';

const indexedObject: IndexedObject = {
  Home: {
    page: 'Home',
  },
};

it('should return the right language according to the given id', () => {
  expect(getLanguage(0)).toEqual(messagesJa);
  expect(getLanguage(1)).toEqual(messagesEn);
  expect(getLanguage(2)).toEqual(messagesZh);
  expect(getLanguage()).toEqual(messagesJa);
});

it('should return the message for the given resource', () => {
  expect(getMessage('Home.page', indexedObject)).toEqual('Home');
  expect(getMessage('Home.hello', indexedObject)).toEqual('resource key not found ');
  expect(getMessage('hello.page', indexedObject)).toEqual('Resource Page not found');
});
