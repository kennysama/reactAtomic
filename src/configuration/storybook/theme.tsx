import { create } from '@storybook/theming';

export default create({
  base: 'light',
  colorPrimary: 'hotpink',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: '#F2F6F8',
  appBorderColor: 'grey',
  appBorderRadius: 4,
  appContentBg: 'silver',

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barBg: '#70CBF8',
  barSelectedColor: 'black',
  barTextColor: 'black',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputBorderRadius: 4,
  inputTextColor: 'black',

  brandImage: 'https://placehold.it/350x150',
  brandTitle: 'My custom storybook',
  brandUrl: 'https://example.com',
});
