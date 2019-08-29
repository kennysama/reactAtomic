import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FlagSelector from './FlagSelector';

storiesOf('Atoms/Radio Button', module).add('Default', () => (
  <FlagSelector
    name="radio buttons"
    data={[
      { id: 1, value: 'button1', url: '' },
      { id: 2, value: 'button2', url: '' },
      { id: 3, value: 'button3', url: '' },
    ]}
    checkedValue={null}
    onValueChanged={action('Changed')}
  />
));
