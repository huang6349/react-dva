import React, { Component } from 'react';
import {
  Row,
  Col,
} from 'antd';

import { version } from '../../../package.json';

import styles from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col xs={0} sm={0} md={12}>Ant&nbsp;Design&nbsp;版权所有&nbsp;©&nbsp;2015&nbsp;由蚂蚁金服体验技术部支持</Col>
        <Col xs={24} sm={24} md={12} className="tr">当前版本：v&nbsp;{version}</Col>
      </Row>
    );
  }
}

export default Footer;
