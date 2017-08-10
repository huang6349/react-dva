import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Icon,
  Button,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import { Sidebar, Bread, Footer } from '../components/layout';

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
          <Layout.Header className={styles['ant-layout-header']}>
            <Row type="flex" justify="space-between">
              <Col xs={0} sm={0} md={12}>
                <Button type="primary" onClick={this.toggleCollapsed.bind(this)}>
                  <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
                </Button>
              </Col>
              <Col xs={24} sm={24} md={12} className="tr">
                <Icon className="mrxs" type="question-circle-o" />
                <span className="mrm">帮助</span>
                <span>设置</span>
                <span className="mlm">退出登录</span>
              </Col>
            </Row>
          </Layout.Header>
          <Layout.Header className={styles['ant-layout-breadcrumb']}>
            <Bread menus={this.props.sidebar.menus} pathname={this.props.location.pathname}></Bread>
          </Layout.Header>
          <Layout className={styles['ant-layout-main']}>
            <Layout.Content
              children={this.props.children}
              className={styles['ant-layout-content']}>
            </Layout.Content>
            <Layout.Footer className={styles['ant-layout-footer']}>
              <Footer></Footer>
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { sidebar: state['SIDEBAR'] };
}

export default connect(mapStateToProps)(MainLayout);
