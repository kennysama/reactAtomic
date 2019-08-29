import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import LinkButton from './LinkButton';
import App from '../../App';

test('renders without crashing', () => {
  mount(
    <App>
      <MemoryRouter initialEntries={['/']}>
        <LinkButton size="medium" to="/" label="Link Button Test" />
      </MemoryRouter>
    </App>,
  );
});
