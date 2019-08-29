import messagesJa from '../i18n/ja/messages.json';
import messagesEn from '../i18n/en/messages.json';
import messagesZh from '../i18n/zh/messages.json';
import { IndexedObject } from '../types';

function resolveMessages(languageId: number): IndexedObject {
  if (languageId === 0) {
    return messagesJa;
  }
  if (languageId === 1) {
    return messagesEn;
  }
  if (languageId === 2) {
    return messagesZh;
  }
  return messagesJa;
}

export function getLanguage(id: number = 0): any {
  return resolveMessages(id);
}

export function getMessage(resource: string = '', languageJSON: any): string {
  const [page, key] = resource.split('.');

  if (!key) {
    return page;
  }

  if (!languageJSON[page]) {
    console.log('resource Page not found ', resource);
    return 'Resource Page not found';
  }

  const message = languageJSON[page][key];

  if (message) {
    return message;
  } else {
    console.log('resource key not found ', message);
    return 'resource key not found ';
  }
}

export type I18Children = {
  childrenComponent: (key: string) => void;
  key: string;
};
