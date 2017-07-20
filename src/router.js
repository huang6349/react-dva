import React, { Component } from 'react';
import {
  Router,
  Route,
} from 'dva/router';

import IndexPage from './routes/IndexPage';

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}></Route>
    </Router>
  );
}
