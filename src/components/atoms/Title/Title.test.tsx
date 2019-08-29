import React from 'react';
import ReactDOM from 'react-dom';
import Title from './Title';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App><Title title="testing title" /></App>, div);
  ReactDOM.unmountComponentAtNode(div);
});
