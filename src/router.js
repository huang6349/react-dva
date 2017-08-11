import React, { Component } from 'react';
import {
  Router,
  Route,
} from 'dva/router';

import MainLayout from "./routes/MainLayout";

import IndexPage from './routes/IndexPage';
import SigninPage from "./routes/SigninPage";

import { Error } from './components/views';

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/signin" component={SigninPage} />
      <Route component={MainLayout}>
        <Route path="/" component={IndexPage} />
      </Route>
      <Route path="*" component={Error} />
    </Router>
  );
}
