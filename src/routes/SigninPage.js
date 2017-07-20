import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  message,
} from 'antd';
import { connect } from 'dva';

import SmartForm, { ItemType } from '../components/views/SmartForm';

import styles from './SigninPage.css';

class SigninPage extends React.PureComponent {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    form: React.PropTypes.object.isRequired,
  }

  schemas = [
    {
      key: 'account',
      label: '账号',
      placeholder: '请输入账号',
      rules: [
        { min: 5, message: '账号最少为5个字符长度' },
      ],
    },
    {
      key: 'password',
      label: '密码',
      placeholder: '请输入密码',
      rules: [
        { min: 5, message: '密码最少为5个字符长度' },
      ],
      itemType: ItemType.PASSWORD,
    },
  ]

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        message.error('您的登录表单填写有误！');
        return false;
      }
      if (!values.account) {
        message.error('您的登录帐号不能为空！');
        return false;
      }
      if (!values.password) {
        message.error('您的登录密码不能为空！');
        return false;
      }
    });
  }

  render() {
    return (
      <section className={styles['ant-layout-aside']}>
        <Row className={styles['ant-layout-main']} gutter={0} type="flex" align="middle" justify="space-around">
          <Col xs={20} sm={18} md={16} lg={12} xl={8}>
            <div className={styles['ant-layout-title']}>
              <h1>欢迎使用"REACT-DVA"</h1>
            </div>
            <div className={styles['ant-layout-content']}>
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: '24px' }}>
                {
                  this.schemas.map((schema, index) => <SmartForm key={index} form={this.props.form} schema={schema} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} />)
                }
                <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
                  <Button type="primary" htmlType="submit">登录</Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Form.create()(SigninPage));
