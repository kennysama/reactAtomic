import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';
import { TIcon } from '../../../types/icon';

import { Provider } from 'react-redux';
import { configureStore } from '../../../store';

const store = configureStore({});
const LABEL = 'LoginPage.loginButtonLabel';

storiesOf('Atoms/Buttons', module).add('default', () => (
  <Provider store={store}>
    <Button>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('disable', () => (
  <Provider store={store}>
    <Button disabled={true}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('black', () => (
  <Provider store={store}>
    <Button styles={['black']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('dark', () => (
  <Provider store={store}>
    <Button styles={['dark']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('red', () => (
  <Provider store={store}>
    <Button styles={['red']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('pink', () => (
  <Provider store={store}>
    <Button styles={['pink']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('block', () => (
  <Provider store={store}>
    <Button styles={['block']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('white', () => (
  <Provider store={store}>
    <Button styles={['white']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('square', () => (
  <Provider store={store}>
    <Button styles={['square']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('size-xs', () => (
  <Provider store={store}>
    <Button styles={['size-s']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('size-s', () => (
  <Provider store={store}>
    <Button styles={['size-s']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('size-l', () => (
  <Provider store={store}>
    <Button styles={['size-l']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('size-xl', () => (
  <Provider store={store}>
    <Button styles={['size-xl']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('center', () => (
  <Provider store={store}>
    <Button styles={['center']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('right', () => (
  <Provider store={store}>
    <Button styles={['right']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('block&white', () => (
  <Provider store={store}>
    <Button styles={['block', 'white']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('header > logout', () => (
  <Provider store={store}>
    <Button styles={['black', 'logout']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('home > search', () => (
  <Provider store={store}>
    <Button styles={['search']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer', () => (
  <Provider store={store}>
    <Button styles={['black']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > rightBtn black', () => (
  <Provider store={store}>
    <Button styles={['black', 'square', 'footerRight']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > rightBtn red', () => (
  <Provider store={store}>
    <Button styles={['red', 'square', 'footerRight']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > rightBtn black disabled', () => (
  <Provider store={store}>
    <Button styles={['black', 'square', 'footerRight']} disabled={true}>
      {LABEL}
    </Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > rightBtn red disabled', () => (
  <Provider store={store}>
    <Button styles={['red', 'square', 'footerRight']} disabled={true}>
      {LABEL}
    </Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > home', () => (
  <Provider store={store}>
    <Button styles={['black', 'home', 'layout-portrait-icon-button']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > arw Left', () => (
  <Provider store={store}>
    <Button styles={['black', 'arwLeft', 'layout-portrait-icon-button']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > arw Right', () => (
  <Provider store={store}>
    <Button styles={['black', 'arwLRight', 'layout-portrait-icon-button']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > cart Left', () => (
  <Provider store={store}>
    <Button styles={['dark', 'arwLeft', 'cart']}>{LABEL}</Button>
  </Provider>
));

storiesOf('Atoms/Buttons', module).add('footer > cart Right', () => (
  <Provider store={store}>
    <Button styles={['dark', 'arwLRight', 'cart']}>{LABEL}</Button>
  </Provider>
));

const ICON: TIcon = {
  name: 'home',
  position: 'LEFT',
};
storiesOf('Atoms/Buttons', module).add('icon', () => (
  <Provider store={store}>
    <Button icon={ICON}>Footer.home</Button>
  </Provider>
));
