import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../store';
import AppRouter from './AppRouter';
import MainPageContainer from '../containers/MainPage/MainPage';
import MainPage from './pages/MainPage/MainPage';

const store = configureStore({});

describe('Routes', () => {
  test('Sample1 Container', () => {
    const appWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>,
    );
    expect(appWrapper.find(MainPageContainer)).toHaveLength(1);
  });

  test('Sample1 Page', () => {
    const appWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>{' '}
      </Provider>,
    );
    expect(appWrapper.find(MainPage)).toHaveLength(1);
  });
});
