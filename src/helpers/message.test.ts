import { getClientMessage } from './message';

const returnMessageUndefined = {
  code: 'Client unknown',
  message: 'UnResister Message Code not found Error ',
};

const returnMessageErr = {
  code: 'Client E0002',
  message: 'Founded:  Season Codes, currentDate: {1}',
};

const returnMessageInfo = {
  code: 'Client I0002',
  message: 'fuga fuga',
};

const returnMessageWarn = {
  code: 'Client W0002',
  message: 'fuga fuga',
};

const returnMessageErrTwo = {
  code: 'Client E0001',
  message: 'ItemCode not founded Category: CA, Sub Category: 01, Parts: 02',
};

const returnMessageErrThree = {
  code: 'Client E0002',
  message: 'Founded: 2 Season Codes, currentDate: {1}',
};

it('should display a message to the client according to the given paramters', () => {
  expect(getClientMessage('err', '', [''])).toEqual(returnMessageUndefined);
  expect(getClientMessage('info', '', [''])).toEqual(returnMessageUndefined);
  expect(getClientMessage('warn', '', [''])).toEqual(returnMessageUndefined);
  expect(getClientMessage('err', '0002', [''])).toEqual(returnMessageErr);
  expect(getClientMessage('info', '0002', [''])).toEqual(returnMessageInfo);
  expect(getClientMessage('warn', '0002', [''])).toEqual(returnMessageWarn);
  expect(getClientMessage('err', '0001', ['CA', '01', '02'])).toEqual(returnMessageErrTwo);
  expect(getClientMessage('err', '0002', ['2'])).toEqual(returnMessageErrThree);
});
