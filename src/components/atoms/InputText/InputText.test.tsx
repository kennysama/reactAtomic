import React from 'react';
import ReactDOM from 'react-dom';
import InputText, { IProps } from './InputText';
import App from '../../App';

const propsMock: IProps = {
  label: 'issue',
  placeholder: 'issue no',
  onValueChanged: jest.fn(),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App><InputText {...propsMock} /></App>, div);
  ReactDOM.unmountComponentAtNode(div);
});
