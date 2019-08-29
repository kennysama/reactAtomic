import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputPassword from './InputPassword';

storiesOf('Atoms/Input Text', module).add('Default', () => (
  <InputPassword label="password" placeholder="please input password" onValueChanged={action('Changed')} />
));
