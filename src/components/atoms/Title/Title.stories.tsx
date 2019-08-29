import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from './Title';

storiesOf('Atoms', module).add('Page Title', () => <Title title="Sample Page Title" />);
