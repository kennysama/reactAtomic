import React from 'react';
import ReactDOM from 'react-dom';
import TextArea from './textArea';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextArea placeHolder="info" disabled={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
