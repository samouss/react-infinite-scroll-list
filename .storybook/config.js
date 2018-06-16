import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'infinite-scroll-list',
  url: 'https://github.com/samouss/react-infinite-scroll-list',
  showAddonPanel: false,
});

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
