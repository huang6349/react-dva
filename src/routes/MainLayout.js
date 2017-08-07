import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Breadcrumb,
  Avatar,
  Icon,
  Button,
  Menu,
} from 'antd';
import PropTypes from 'prop-types';
import { isEqual, last, uniq, filter } from 'underscore';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './MainLayout.css';

class Sidebar extends React.Component {

  static propTypes = {
    menus: PropTypes.array.isRequired,
  }

  state = {
    selectedKeys: [],
    openKeys: [],
    current_name: 'id',
    parent_name: 'parent_id',
    child_name: 'childs',
    title_name: 'name',
    icon_name: 'icon',
    url_name: 'url',
    pid: null,
  }

  handleChange(openKeys) {
    const state = this.state;
    const current_name = this.state.current_name;
    let nextOpenKeys = [];
    if (openKeys && openKeys.length > 0) {
      const latestOpenKey = last(openKeys);
      Array.from(this.props.menus || []).forEach((value, index, array) => {
        if (isEqual(`${value[current_name]}`, `${latestOpenKey}`)) {
          nextOpenKeys = nextOpenKeys.concat(this.getAncestorKeys(array, value[current_name]));
        }
      });
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  getAncestorKeys(items = [], id, config = {}) {
    const current_name = config.current_name || this.state.current_name;
    const parent_name = config.parent_name || this.state.parent_name;
    let openKeys = [`${id}`];
    Array.from(items).forEach((value, index, array) => {
      if (value[parent_name] && isEqual(`${value[current_name]}`, `${id}`)) {
        openKeys = openKeys.concat(this.getAncestorKeys(items, value[parent_name])).concat(`${value[parent_name]}`);
      }
    });
    return uniq(openKeys);
  }

  handleClick({ item, key, keyPath }) {
    this.setState({
      selectedKeys: [key],
      openKeys: filter(keyPath, function (keys) {
        return !isEqual(keys, key);
      }),
    });
  }

  transformMenusData(items = [], config = {}) {
    const current_name = config.current_name || this.state.current_name;
    const parent_name = config.parent_name || this.state.parent_name;
    const pid = config.pid || this.state.pid;
    const child_name = config.child_name || this.state.child_name;
    let menus = [];
    Array.from(items).forEach((item, index, array) => {
      if (item[parent_name] === pid) {
        let menu = Object.assign([], item);
        menu[child_name] = Object.assign([], this.transformMenusData(items, Object.assign(config, { pid: item[current_name] })));
        menus.push(menu);
      }
    });
    return menus;
  }

  createMenus(items = [], config = {}) {
    const current_name = config.current_name || this.state.current_name;
    const title_name = config.title_name || this.state.title_name;
    const icon_name = config.icon_name || this.state.icon_name;
    const url_name = config.url_name || this.state.url_name;
    const child_name = config.child_name || this.state.child_name;
    return Array.from(items).map((item, index, array) => {
      let title = item[icon_name] ? <span><Icon type={item[icon_name]} /><span>{item[title_name]}</span></span> : item[title_name];
      if (item[child_name] && item[child_name].length > 0) {
        return (
          <Menu.SubMenu key={item[current_name]} title={title}>
            {this.createMenus.bind(this)(item[child_name])}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item[current_name]}>
            <Link to={item[url_name]}>{title}</Link>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    return (
      <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys} openKeys={this.state.openKeys} onOpenChange={this.handleChange.bind(this)} onClick={this.handleClick.bind(this)} multiple={false}>
        {this.createMenus.bind(this)(this.transformMenusData.bind(this)(this.props.menus))}
      </Menu>
    );
  }
}

class MainLayout extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    sidebar: PropTypes.object.isRequired,
  }

  state = {
    collapsed: false,
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onCollapse(collapsed, type) {
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
          <Sidebar menus={this.props.sidebar.menus} />
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
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
            </Breadcrumb>
          </Layout.Header>
          <Layout className={styles['ant-layout-main']}>
            <Layout.Content
              children={this.props.children}
              className={styles['ant-layout-content']}>
            </Layout.Content>
            <Layout.Footer className={styles['ant-layout-footer']}>Ant&nbsp;Design&nbsp;版权所有&nbsp;©&nbsp;2015&nbsp;由蚂蚁金服体验技术部支持</Layout.Footer>
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
