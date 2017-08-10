import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Button,
} from 'antd';
import PropTypes from 'prop-types';

import styles from './Header.css';

class Header extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
  }
  toggle() {
    // 页眉[点击按钮，切换导航菜单状态为展开或折叠]
    const { toggle } = this.props;
    if (toggle) {
      toggle();
    }
  }

  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col xs={0} sm={0} md={12}>
          <Button type="primary" onClick={this.toggle.bind(this)}>
            <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
          </Button>
        </Col>
        <Col xs={24} sm={24} md={12} className="tr">
          <Icon className="mrxs" type="question-circle-o" />
          <span className="mrm">帮助</span>
          <span>设置</span>
          <span className="mlm">退出登录</span>
        </Col>
      </Row>
    );
  }
}

export default Header;
