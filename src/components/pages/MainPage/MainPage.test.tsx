import React from 'react';
import ReactDOM from 'react-dom';

import ReportsPage from './MainPage';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App>
      <ReportsPage />
    </App>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
