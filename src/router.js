import React, { Component } from 'react';
import {
  Router,
  Route,
} from 'dva/router';

import IndexPage from './routes/IndexPage';

import SigninPage from "./routes/SigninPage.js";

import MainLayout from "./routes/MainLayout.js";

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/signin" component={SigninPage} />
      <Route component={MainLayout}>
        <Route path="/" component={IndexPage} />
      </Route>
    </Router>
  );
}
