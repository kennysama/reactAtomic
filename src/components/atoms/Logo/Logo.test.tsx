import React from 'react';
import ReactDOM from 'react-dom';

import Logo from './Logo';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App>
      <Logo />
    </App>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
