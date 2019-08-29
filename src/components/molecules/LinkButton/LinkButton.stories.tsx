import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import LinkButton from './LinkButton';
import { ERouterPath } from '../../../types/index';

storiesOf('Molecules', module).add('LinkButton', () => (
  <Router>
    <LinkButton label="Link Button" to={ERouterPath.login} />
  </Router>
));
