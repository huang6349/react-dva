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
import { isEqual, isEmpty, last, uniq, filter, difference } from 'underscore';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './MainLayout.css';

class Sidebar extends React.Component {
  static propTypes = {
    menus: PropTypes.array.isRequired,
    inlineCollapsed: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
  }
  state = {
    menus: [],
    selectedKeys: [],
    openKeys: [],
  }
  PREFIX_SUB = 'sub';
  PREFIX_ITEM = 'item';
  inlineCollapsed;
  inlineOpenKeys = [];
  current_name = 'id';
  parent_name = 'parent_id';
  child_name = 'childs';
  title_name = 'name';
  icon_name = 'icon';
  url_name = 'url';
  pid = null;
  constructor(props) {
    super(props);

    this.inlineCollapsed = this.props.inlineCollapsed;
  }
  componentWillMount() {
    // 导航菜单[设置默认展开项和选中项]
    this.setDefaultKeys(this.props.menus);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.inlineCollapsed && !this.props.inlineCollapsed) {
      // 导航菜单[关闭]
      this.inlineOpenKeys = this.state.openKeys;
      this.setOpenKeys([]);
    }
    if (!nextProps.inlineCollapsed && this.props.inlineCollapsed) {
      // 导航菜单[展开]
      this.setOpenKeys(this.inlineOpenKeys);
      this.inlineOpenKeys = [];
    }
    if (!isEqual(this.props.menus, nextProps.menus)) {
      // 导航菜单[设置序列化导航菜单项的数据]
      this.setMenus(nextProps.menus);
      // 导航菜单[设置默认展开项和选中项]
      this.setDefaultKeys(nextProps.menus);
    }
  }
  setMenus(menus) {
    // 设置序列化导航菜单项的数据
    this.setState({ menus: this.transformMenusData(menus) });
  }
  setOpenKeys(openKeys) {
    // 设置导航菜单展开项
    this.setState({ openKeys: openKeys });
  }
  setSelectedKeys(selectedKeys) {
    // 设置导航菜单选中项
    this.setState({ selectedKeys: selectedKeys });
  }
  setDefaultKeys(items = []) {
    // 导航菜单[设置默认展开项和选中项]
    // 申明返回值
    let selectedKeys = [], openKeys = [];
    // 获得选中菜单项
    Array.from(items).forEach((value, index, array) => {
      if (isEqual(`${value[this.url_name]}`, this.props.pathname)) {
        selectedKeys = selectedKeys.concat(`${this.PREFIX_ITEM}-${value[this.current_name]}`);
      }
    });
    // 获得打开菜单项
    Array.from(selectedKeys).forEach((value, index, array) => {
      openKeys = openKeys.concat(this.getAncestorKeys(items, value));
    });
    // 更新值
    this.setOpenKeys(openKeys);
    this.setSelectedKeys(uniq(selectedKeys));
  }
  getAncestorKeys(items = [], id) {
    // 导航菜单[获得展开当前项需要的KEY值]
    // 申明返回值
    let openKeys = [];
    // 获得父级打开菜单项
    Array.from(items).forEach((value, index, array) => {
      if (value[this.parent_name] && isEqual(`${this.PREFIX_ITEM}-${value[this.current_name]}`, `${id}`)) {
        // 将当前项的父级菜单KEY值加入到展开项中
        openKeys = openKeys.concat(`${this.PREFIX_SUB}-${value[this.parent_name]}`);
        // 递归计算当前项的祖级菜单KEY值，并加入到展开项中
        openKeys = openKeys.concat(this.getAncestorKeys(items, `${this.PREFIX_ITEM}-${value[this.parent_name]}`));
      }
    });
    // 返回值
    return uniq(openKeys);
  }
  getRootOpenKey(openKeys) {
    // 导航菜单[获得展开项的根级菜单项的KEY值]
    const keys1 = openKeys || [];
    const keys2 = this.state.openKeys || [];
    // 返回值
    return keys1.length > keys2.length ? difference(keys1, keys2)[0] : difference(keys2, keys1)[0];
  }
  handleChange(openKeys) {
    if (!isEqual(this.inlineCollapsed, this.props.inlineCollapsed)) {
      // 导航菜单[收起或展开状态发生变化后不执行更新KEY值的操作]
      this.inlineCollapsed = this.props.inlineCollapsed;
      return false;
    }
    // 导航菜单[展开项发生变化，更新导航菜单展开项的KEY值]
    // 初始化配置
    const latestOpenKeys = openKeys;
    const latestCloseKeys = this.state.openKeys;
    // 获得展开项的根级菜单项的KEY值
    const rootOpenKey = this.getRootOpenKey(latestOpenKeys);
    // 申明返回值
    let nextOpenKeys = [];
    Array.from(this.props.menus || []).forEach((value, index, array) => {
      if (isEqual(`${this.PREFIX_SUB}-${value[this.current_name]}`, rootOpenKey)) {
        nextOpenKeys = this.getAncestorKeys(array, `${this.PREFIX_ITEM}-${value[this.current_name]}`);
        if (latestOpenKeys.length > latestCloseKeys.length) {
          nextOpenKeys = nextOpenKeys.concat(rootOpenKey);
        }
      }
    });
    // 更新值
    this.setOpenKeys(uniq(nextOpenKeys));
  }
  handleClick({ item, key, keyPath }) {
    // 导航菜单[选中项发生变化，更新导航菜单选中项的KEY值]
    this.setSelectedKeys([key]);
  }
  transformMenusData(items = [], config = {}) {
    // 数据转换[将类树形结构的数据转换为树形结构的数据]
    // 初始化配置
    const pid = config.pid || this.pid;
    // 申明返回值
    let menus = [];
    // 构造树形结构数据
    Array.from(items).forEach((item, index, array) => {
      if (isEqual(`${item[this.parent_name]}`, `${pid}`)) {
        let menu = Object.assign([], item);
        menu[this.child_name] = Object.assign([], this.transformMenusData(items, Object.assign(config, { pid: item[this.current_name] })));
        menus.push(menu);
      }
    });
    // 返回值
    return menus;
  }
  serializeMenus(items = []) {
    // 数据序列化[将树形结构的菜单数据序列化为菜单项]
    // 序列化菜单项
    return Array.from(items).map((item, index, array) => {
      const title = item[this.icon_name] ? <span><Icon type={item[this.icon_name]} /><span>{item[this.title_name]}</span></span> : item[this.title_name];
      if (item[this.child_name] && item[this.child_name].length > 0) {
        return (
          <Menu.SubMenu key={`${this.PREFIX_SUB}-${item[this.current_name]}`} title={title}>
            {this.serializeMenus(item[this.child_name])}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={`${this.PREFIX_ITEM}-${item[this.current_name]}`}>
            <Link to={item[this.url_name]}>{title}</Link>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={this.state.selectedKeys}
        openKeys={this.state.openKeys}
        onOpenChange={this.handleChange.bind(this)}
        onClick={this.handleClick.bind(this)}
        multiple={false}
        inlineCollapsed={this.props.inlineCollapsed}>
        {this.serializeMenus.bind(this)(this.state.menus)}
      </Menu>
    );
  }
}

class MainLayout extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
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
