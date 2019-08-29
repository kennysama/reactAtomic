import React from 'react';
import { storiesOf } from '@storybook/react';

import FunctionFooter from './FunctionFooter';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';

import { Provider } from 'react-redux';
import { configureStore } from '../../../store';

const store = configureStore({});

const testFunc = (type: string) => {
  return () => {
    console.log(`testFunc ${type}`);
  };
};

const HOME: IFooterButton = {
  type: 'home',
  isRender: false,
};

const SAVE: IFooterButton = {
  type: 'save',
  isRender: true,
  func: testFunc('save'),
};

const BACK: IFooterButton = {
  type: 'back',
  isRender: true,
};

const NEXT: IFooterButton = {
  type: 'next',
  isRender: true,
  func: testFunc('next'),
};

const CONFIRM: IFooterButton = {
  type: 'confirm',
  isRender: true,
  isDisabled: true,
};

const BUTTONS = [HOME, SAVE, BACK, NEXT, CONFIRM];

storiesOf('organisms/FunctionFooter', module).add('default', () => (
  <Provider store={store}>
    <FunctionFooter buttons={BUTTONS} />
  </Provider>
));
