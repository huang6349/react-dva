import React, { Component } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Switch,
  DatePicker,
} from 'antd';
import PropTypes from 'prop-types';

import styles from './SmartForm.css';

export const ItemType = {
  TEXT: 'text',
  PASSWORD: 'password',
  RADIO: 'radio',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  SWITCH: 'switch',
  DATEPICKER: 'DatePicker',
  MONTHPICKER: 'MonthPicker',
  RANGEPICKER: 'RangePicker',
};

class SmartForm extends React.Component {

  static propTypes = {
    /** 表单对象 */
    form: PropTypes.object.isRequired,
    /** 表单序列化模式 */
    schema: PropTypes.shape({
      /** 表单列的标识 */
      key: PropTypes.string.isRequired,
      /** 表单列的名称 */
      label: PropTypes.string.isRequired,
      /** 表单列的提示信息 */
      placeholder: PropTypes.string,
      /** 表单列的值 */
      value: PropTypes.any,
      /** 表单列的验证规则 */
      rules: PropTypes.array,
      /** 表单列的类型 */
      itemType: PropTypes.string,
      /** 表单列为“radio”、“select”的选项 */
      options: PropTypes.arrayOf(PropTypes.shape({
        /** 选项 */
        label: PropTypes.any.isRequired,
        /** 值 */
        value: PropTypes.any.isRequired,
      })),
      /** 表单列为开关时的显示选项['开','关'] */
      switchLabel: PropTypes.arrayOf(PropTypes.string),
      /** 表单列为日期选项 */
      moment: PropTypes.any,
      /** 表单列是否禁用 */
      disabled: PropTypes.bool,
    }).isRequired,
    labelCol: PropTypes.object,
    wrapperCol: PropTypes.object,
  }

  static defaultProps = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 6,
    },
  }

  state = {
    schema: {
      rules: [],
      itemType: ItemType.TEXT,
      switchLabel: [
        '开',
        '关',
      ],
    },
  }

  constructor(props) {
    super(props);

    this.getFieldDecorator = this.props.form.getFieldDecorator;
    this.schema = Object.assign({}, this.state.schema, this.props.schema);
  }

  /**
   * 表单元素包装域
   * 
   * @param {*} formItem 
   * @param {*} field 
   */
  wrapper(formItem, field) {
    return <Form.Item key={field.key} label={field.label} labelCol={this.props.labelCol} wrapperCol={this.props.wrapperCol} children={formItem} />;
  }

  /**
   * 将schema转换成错误的提示
   * 
   * @param {*} field 
   */
  transformNormal(field) {
    return this.wrapper(<span>请指定正确的itemType类型</span>, Object.assign({}, field, { label: '错误提示' }));
  }

  /**
   * 将schema转换成普通文本框
   * 
   * @param {*} field 
   */
  transformInput(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      initialValue: field.value ? (field.value).toString() : field.value,
      rules: field.rules,
    })(<Input type={field.itemType} placeholder={field.placeholder} />), field);
  }

  /**
   * 将schema转换成文本域
   * 
   * @param {*} field 
   */
  transformTextArea(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      initialValue: field.value ? (field.value).toString() : field.value,
      rules: field.rules,
    })(<Input.TextArea placeholder={field.placeholder} autosize={{ minRows: 4, maxRows: 6 }} />), field);
  }

  /**
   * 将schema转换成单选框
   * 
   * @param {*} field 
   */
  transformRadio(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      valuePropName: 'checked',
      rules: field.rules,
    })(<Radio.Group defaultValue={field.value}>{field.options.map((item) => <Radio key={`radio_${item.value}`} value={item.value}>{item.label}</Radio>)}</Radio.Group>), field);
  }

  /**
   * 将schema转换成选择器
   * 
   * @param {*} field 
   */
  transformSelect(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      initialValue: field.value,
      rules: field.rules,
    })(<Select allowClear={true} placeholder={field.placeholder} >{field.options.map((item) => <Select.Option key={`select_${item.value}`} value={item.value}>{item.label}</Select.Option>)}</Select>), field);
  }

  /**
   * 将schema转换成开关
   * 
   * @param {*} field 
   */
  transformSwitch(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      valuePropName: 'checked',
      initialValue: field.value,
      rules: field.rules,
    })(<Switch checkedChildren={field.switchLabel[0]} unCheckedChildren={field.switchLabel[1]} />), field);
  }

  /**
   * 将schema转换成日期选择框
   * 
   * @param {*} field 
   */
  transformDatePicker(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      initialValue: field.value,
      rules: field.rules,
    })(<DatePicker format='YYYY-MM-DD' />), field);
  }

  /**
   * 将schema转换成日期选择框[年月]
   * 
   * @param {*} field 
   */
  transformMonthPicker(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      initialValue: field.value,
      rules: field.rules,
    })(<DatePicker.MonthPicker format='YYYY-MM' />), field);
  }

  /**
 * 将schema转换成日期选择框[范围]
 * 
 * @param {*} field 
 */
  transformRangePicker(field) {
    return this.wrapper(this.getFieldDecorator(field.key, {
      initialValue: field.value,
      rules: field.rules,
    })(<DatePicker.RangePicker format='YYYY-MM-DD' />), field);
  }

  render() {
    switch (this.schema.itemType) {
      case ItemType.TEXT:
        return this.transformInput.bind(this)(this.schema);
        break;
      case ItemType.PASSWORD:
        return this.transformInput.bind(this)(this.schema);
        break;
      case ItemType.TEXTAREA:
        return this.transformTextArea.bind(this)(this.schema);
        break;
      case ItemType.RADIO:
        return this.transformRadio.bind(this)(this.schema);
        break;
      case ItemType.SELECT:
        return this.transformSelect.bind(this)(this.schema);
        break;
      case ItemType.SWITCH:
        return this.transformSwitch.bind(this)(this.schema);
        break;
      case ItemType.DATEPICKER:
        return this.transformDatePicker.bind(this)(this.schema);
        break;
      case ItemType.MONTHPICKER:
        return this.transformMonthPicker.bind(this)(this.schema);
        break;
      case ItemType.RANGEPICKER:
        return this.transformRangePicker.bind(this)(this.schema);
        break;
      default:
        return this.transformNormal.bind(this)(this.schema);
    }
  }
}

export default SmartForm;
