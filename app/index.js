import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './components/app.js';
require('./index.css');

ReactDOM.render(
  <App/>
  ,document.getElementById('root'));
