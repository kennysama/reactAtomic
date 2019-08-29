import { IMessage, TMessageType } from '../types/error';
import { CLIENT_ERROR_PREFIX, ERROR_MESSAGES, INFO_MESSAGES, WARM_MESSAGES } from '../lookups/errors';

export function getClientMessage(type: TMessageType, code: string, params: string[] = []): IMessage {
  if (type === 'info') {
    return findMessage(type, code, INFO_MESSAGES, params);
  }
  if (type === 'warn') {
    return findMessage(type, code, WARM_MESSAGES, params);
  }
  // ERROR
  return findMessage(type, code, ERROR_MESSAGES, params);
}

function findMessage(type: TMessageType, code: string, messages: IMessage[], params: string[]): IMessage {
  const message = messages.find(v => v.code === code);
  if (!message) {
    return {
      code: `${CLIENT_ERROR_PREFIX} unknown`,
      message: `UnResister Message Code not found Error ${params.map(v => v)}`,
    };
  }

  const prefix = getPrefix(type);
  return {
    code: `${prefix}${message.code}`,
    message: replaceMessage(message.message, params),
  };
}

function getPrefix(type: TMessageType): string {
  if (type === 'info') {
    return `${CLIENT_ERROR_PREFIX} I`;
  }
  if (type === 'warn') {
    return `${CLIENT_ERROR_PREFIX} W`;
  }
  // ERROR
  return `${CLIENT_ERROR_PREFIX} E`;
}

function replaceMessage(message: string, params: string[]): string {
  return params.reduce((pre, cur, index) => {
    return pre.replace(`{${index}}`, cur);
  }, message);
}
