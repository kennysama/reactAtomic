import React from 'react';
import ReactDOM from 'react-dom';
import InputPassword, { IProps } from './InputPassword';
import App from '../../App';

const propsMock: IProps = {
  label: 'password',
  placeholder: 'please input password',
  onValueChanged: jest.fn(),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App>
      <InputPassword {...propsMock} />
    </App>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
