import { createOkCancelDialogData, createSelectionDialogData } from './dialog';

it('should return a OkCancel Dialog with the given critria', () => {
  expect(
    createOkCancelDialogData('message', 'title one', false, undefined, undefined, 'labelOK', 'label Cancel'),
  ).toEqual({
    contents: 'message',
    hasOpen: true,
    isTextKey: false,
    labelCancel: 'label Cancel',
    labelOk: 'labelOK',
    onCancel: undefined,
    onOK: undefined,
    title: 'title one',
  });
  expect(createOkCancelDialogData('message', 'title one', true)).toEqual({
    contents: 'message',
    hasOpen: true,
    isTextKey: true,
    labelCancel: undefined,
    labelOk: undefined,
    onCancel: undefined,
    onOK: undefined,
    title: 'title one',
  });
});

it('should return a selection Dialog with the given critria', () => {
  expect(
    createSelectionDialogData('message', 'title one', false, undefined, undefined, 'label yes', 'label no'),
  ).toEqual({
    contents: 'message',
    hasOpen: true,
    isTextKey: false,
    labelNo: 'label no',
    labelYes: 'label yes',
    onNo: undefined,
    onYes: undefined,
    title: 'title one',
  });
  expect(createSelectionDialogData('message', 'title one', true)).toEqual({
    contents: 'message',
    hasOpen: true,
    isTextKey: true,
    labelNo: undefined,
    labelYes: undefined,
    onNo: undefined,
    onYes: undefined,
    title: 'title one',
  });
});
