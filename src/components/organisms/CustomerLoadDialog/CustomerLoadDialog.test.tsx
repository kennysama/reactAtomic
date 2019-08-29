import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CustomerLoadDialog from './CustomerLoadDialog';

test('renders without crashing', () => {
  const dummy = () => {
    const i = 1;
  };
  mount(
    <MemoryRouter>
      <CustomerLoadDialog
        hasOpen={true}
        onHandleClose={dummy}
        loading={false}
        hasError={false}
        onHandleLoad={dummy}
        loadedErrorMessage={''}
      />
    </MemoryRouter>,
  );
});
