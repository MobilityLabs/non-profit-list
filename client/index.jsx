import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import AppRouter from './router.jsx';

import './style.scss';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<AppContainer key={Math.random()}><AppRouter/></AppContainer>, document.getElementById('app'));
