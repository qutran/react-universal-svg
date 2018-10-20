import './_fix';
import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import './index.css';

const render = () => ReactDOM.render(<App />, document.getElementById('root'));

render();

if (module.hot) {
  module.hot.accept('./App', render);
}
