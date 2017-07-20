import React, { Component } from 'react';
import {
  Router,
  Route,
} from 'dva/router';

import IndexPage from './routes/IndexPage';

import SigninPage from "./routes/SigninPage.js";

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}></Route>
      <Route path="/signin" component={SigninPage} />
    </Router>
  );
}
