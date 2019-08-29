import React from 'react';
import ReactDOM from 'react-dom';

import DialogSamplePage from './DialogSamplePage';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App>
      <DialogSamplePage />
    </App>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
