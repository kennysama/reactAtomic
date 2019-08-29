import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './Sidebar';

storiesOf('Organisms', module).add('Sidebar ', () => (
  <Router>
    <Sidebar />
  </Router>
));
