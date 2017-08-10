import React, { Component } from 'react';
import {
  Breadcrumb,
} from 'antd';
import PropTypes from 'prop-types';
import { isEqual, uniq } from 'underscore';

import { MENU } from '../../utils/constants';

import styles from './Bread.css';

class Bread extends React.Component {
  static propTypes = {
    menus: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
  }
  current_name;
  parent_name;
  title_name;
  url_name;
  constructor(props) {
    super(props);

    this.current_name = MENU.ID;
    this.parent_name = MENU.PARENT_ID;
    this.title_name = MENU.NAME;
    this.url_name = MENU.URL;
  }
  getItems(items = []) {
    // 面包屑[获取序列化数据]
    // 申明返回值
    let selected = [], breads = [];
    // 获得路由匹配项
    Array.from(items).forEach((value, index, array) => {
      if (isEqual(`${value[this.url_name]}`, this.props.pathname)) {
        selected = selected.concat(`${value[this.current_name]}`);
      }
    });
    // 获得系列化数据
    Array.from(selected).forEach((value, index, array) => {
      breads = breads.concat(this.getAncestors(items, value));
    });
    // 返回值
    return breads;
  }
  getAncestors(items = [], id) {
    // 面包屑[获得匹配项祖级项]
    // 申明返回值
    let ancestors = [];
    // 获得祖级项
    Array.from(items).forEach((value, index, array) => {
      if (isEqual(`${value[this.current_name]}`, `${id}`)) {
        ancestors = ancestors.concat(this.getAncestors(items, `${value[this.parent_name]}`));
        ancestors = ancestors.concat(value);
      }
    });
    // 返回值
    return uniq(ancestors);
  }
  serializeItem(items = []) {
    // 数据序列化[将面包屑数据序列化为面包屑项]
    return Array.from(this.getItems(items)).map((item, index, array) => {
      return <Breadcrumb.Item key={`${item[this.current_name]}`}>{item[this.title_name]}</Breadcrumb.Item>;
    });
  }

  render() {
    return (
      <Breadcrumb separator=">">{this.serializeItem.bind(this)(this.props.menus)}</Breadcrumb>
    );
  }
}

export default Bread;
