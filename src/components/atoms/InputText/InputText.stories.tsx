import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputText from './InputText';

storiesOf('Atoms/Input Text', module).add('Default', () => (
  <InputText  label="issue" placeholder="issue no" onValueChanged={action('Changed')} />
));
