import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './main.js';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Main}/>
  </Router>
);

export default App;
