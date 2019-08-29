import React from 'react';
import { storiesOf } from '@storybook/react';
import TextArea from './textArea';

storiesOf('Atoms', module).add('information area', () => <TextArea disabled={true} />);
