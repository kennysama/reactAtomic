import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import create from './theme';

const req = require.context('../../components/', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addParameters({
  info: {
    inline: true,
  },
  options: {
    theme: create,
  },
});

addDecorator(withInfo);

configure(loadStories, module);
