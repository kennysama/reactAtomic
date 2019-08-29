import React from 'react';
import { shallow } from 'enzyme';

import FlagSelector, { IProps } from './FlagSelector';

const propsMock: IProps = {
  name: 'name',
  data: [{ id: 1, value: 'button1' }, { id: 2, value: 'button2' }],
  checkedValue: null,
  onValueChanged: jest.fn(),
};

it('should call Props callback function on Change Event', () => {
  const wrapper = shallow<FlagSelector>(<FlagSelector {...propsMock} />);

  wrapper
    .find('input')
    .last()
    .simulate('change', { currentTarget: { value: '2' } });

  const expected = propsMock.data[1];
  expect(propsMock.onValueChanged).toBeCalledWith(expected);
  expect(propsMock.onValueChanged).toHaveBeenCalledTimes(1);

  wrapper.unmount();
});
