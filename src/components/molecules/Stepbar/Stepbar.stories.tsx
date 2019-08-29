import React from 'react';
import { storiesOf } from '@storybook/react';

import Stepbar from './Stepbar';

import { Provider } from 'react-redux';
import { configureStore } from '../../../store';
import { ERouterPath } from '../../../types';
import { MemoryRouter } from 'react-router';
import { resolvePath } from '../../../helpers/path';
import { IStep } from '../../../types/stepbar';

const store = configureStore({});

let currentPath = resolvePath(ERouterPath.designSelection);

const testFunc = (path: ERouterPath) => {
  return () => {
    console.log(`called ${path}`);
    currentPath = resolvePath(path);
  };
};

const STEPS: IStep[] = [
  {
    order: 0,
    textkey: 'SideBarTemplate.clothSelection',
    path: ERouterPath.clothSelection,
    onClick: testFunc(ERouterPath.clothSelection),
  },
  {
    order: 1,
    textkey: 'SideBarTemplate.designSelection',
    path: ERouterPath.designSelection,
    onClick: testFunc(ERouterPath.designSelection),
  },
  {
    order: 2,
    textkey: 'SideBarTemplate.sizeCorrection',
    path: ERouterPath.sizeCorrection,
    onClick: testFunc(ERouterPath.sizeCorrection),
  },
];

storiesOf('molecules/Stepbar', module).add('default', () => (
  <Provider store={store}>
    <MemoryRouter initialEntries={['/']}>
      <Stepbar currentPath={currentPath} steps={STEPS} />
    </MemoryRouter>
  </Provider>
));
