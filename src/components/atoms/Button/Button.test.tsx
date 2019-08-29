import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';
import App from '../../App';

it('renders without crashing', () => {
  const wrapper = shallow(
    <App>
      <Button>test</Button>
    </App>,
  );
  wrapper.unmount();
});
