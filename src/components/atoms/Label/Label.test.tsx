import React from 'react';
import ReactDOM from 'react-dom';
import Label from './Label';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App>
      <Label text="testing Label" />
    </App>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
