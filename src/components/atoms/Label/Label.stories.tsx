import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './Label';

storiesOf('Atoms', module).add('Page Title', () => <Label text="Sample label" />);
