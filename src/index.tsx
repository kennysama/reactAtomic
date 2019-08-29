import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './styles/main.scss';

import config from './configuration/config';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// Warn when closing or reloading a page
window.onbeforeunload = e => {
  if (config.isDev) {
    return;
  }
  e.returnValue = 'ページを離れようとしています。入力中の内容が消えますが、よろしいですか？';
};
