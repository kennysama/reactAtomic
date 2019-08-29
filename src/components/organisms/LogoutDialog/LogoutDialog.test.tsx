import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import LogoutDialog from './LogoutDialog';
import App from '../../App';

test('renders without crashing', () => {
  const dummy = () => {
    const i = 1;
  };
  mount(
    <App>
      <MemoryRouter>
        <LogoutDialog hasOpen={true} onHandleClose={dummy} />
      </MemoryRouter>
    </App>,
  );
});
