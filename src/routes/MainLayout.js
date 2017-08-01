import React, { Component } from 'react';
import {
  Layout,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import styles from './MainLayout.css';

class MainLayout extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <Layout>
        <Layout.Sider></Layout.Sider>
        <Layout>
          <Layout.Header></Layout.Header>
          <Layout.Content children={this.props.children}></Layout.Content>
          <Layout.Footer></Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MainLayout);
