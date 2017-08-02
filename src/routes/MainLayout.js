import React, { Component } from 'react';
import {
  Layout,
  Breadcrumb,
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
      <Layout className={styles['ant-layout']}>
        <Layout.Sider
          collapsible={true}
          defaultCollapsed={false}
          width="224"
          collapsedWidth="64"
          className={styles['ant-layout-sider']}>
        </Layout.Sider>
        <Layout>
          <Layout.Header className={styles['ant-layout-header']}></Layout.Header>
          <Layout.Header className={styles['ant-layout-breadcrumb']}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
            </Breadcrumb>
          </Layout.Header>
          <Layout className={styles['ant-layout-main']}>
            <Layout.Content children={this.props.children}></Layout.Content>
            <Layout.Footer className={styles['ant-layout-footer']}>Ant&nbsp;Design&nbsp;版权所有&nbsp;©&nbsp;2015&nbsp;由蚂蚁金服体验技术部支持</Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MainLayout);
