import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Icon,
  Button,
} from 'antd';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'dva';

import { Header, Sidebar, Bread, Footer } from '../components/layout';

import styles from './MainLayout.css';

class MainLayout extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired,
  }
  state = {
    collapsed: false,
  }
  toggleCollapsed() {
    // 导航菜单[设置导航菜单展开或折叠-按钮触发]
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onCollapse(collapsed, type) {
    // 导航菜单[设置导航菜单展开或折叠-菜单回调]
    this.setState({
      collapsed: collapsed,
    });
  }

  render() {
    return (
      <Layout className={styles['ant-layout']}>
        <Layout.Sider
          collapsible={true}
          defaultCollapsed={false}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse.bind(this)}
          trigger={null}
          width="224"
          collapsedWidth="64"
          breakpoint="md"
          className={styles['ant-layout-sider']}>
          <Layout.Header className={styles['ant-layout-logo']}>
            {this.state.collapsed ? 'RD' : 'REACT-DVA'}
          </Layout.Header>
          <Sidebar menus={this.props.sidebar.menus} pathname={this.props.location.pathname} inlineCollapsed={this.state.collapsed} />
        </Layout.Sider>
        <Layout>
          <Header collapsed={this.state.collapsed} toggle={this.toggleCollapsed.bind(this)}></Header>
          <Layout.Header className={styles['ant-layout-breadcrumb']}>
            <Bread menus={this.props.sidebar.menus} pathname={this.props.location.pathname}></Bread>
          </Layout.Header>
          <Scrollbars className={styles['ant-layout-container']}>
            <Layout className={styles['ant-layout-main']}>
              <Layout.Content className={styles['ant-layout-content']} children={this.props.children}></Layout.Content>
              <Layout.Footer className={styles['ant-layout-footer']}>
                <Footer></Footer>
              </Layout.Footer>
            </Layout>
          </Scrollbars>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { sidebar: state['SIDEBAR'] };
}

export default connect(mapStateToProps)(MainLayout);
