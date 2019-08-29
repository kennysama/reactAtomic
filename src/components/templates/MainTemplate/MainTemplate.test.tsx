import React from 'react';
import ReactDOM from 'react-dom';
import MainTemplate from './MainTemplate';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App>
      <MainTemplate />
    </App>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
