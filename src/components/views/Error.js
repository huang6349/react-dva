import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Button,
} from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';

import styles from './Error.css';

class Error extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  }
  static defaultProps = {
    message: '你访问的网页被狗吃了 [ 404 Not Found ]',
  }

  render() {
    return (
      <section className={styles['ant-layout-container']}>
        <Row className={styles['ant-layout-main']} gutter={0} type="flex" align="middle" justify="space-around">
          <Col xs={20} sm={18} md={16} lg={12} xl={8}>
            <div className={styles['ant-layout-content']}>
              <Icon className={styles['ant-layout-icon']} type="frown-o" />
              <h1 className="ptm pbl">{this.props.message}</h1>
              <div className={`${styles['ant-layout-operation']} ptm pbm`}>
                <span className="prs">你现在可以</span>
                <Button type="primary"><Link to="/">返回首页</Link></Button>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Error;
