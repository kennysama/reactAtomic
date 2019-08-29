export interface IMessage {
  code: string;
  message: string;
}

export type TMessageType = 'err' | 'warn' | 'info';
