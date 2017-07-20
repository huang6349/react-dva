import { message } from 'antd';
import fetch from 'dva/fetch';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  /** 设置请求头信息 */
  options.headers = options.headers || {};
  options.headers['Content-Type'] = 'application/json;charset=UTF-8';
  options.headers['Accept'] = 'application/json';
  /** 发起请求 */
  return fetch(url, options).then(function (response) {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }).then(function (response) {
    // 验证请求结果解析为JSON对象
    return response.text().then(function (text) {
      return { data: text ? JSON.parse(text) : {}, headers: response.headers };
    });
  }).then(function (data) {
    // 请求成功的操作
    return data;
  }).catch(function (err) {
    // 请求失败的操作
    console.log('请求失败', err);
    message.error('您的操作出现了错误，这可能使我们的问题，请您稍后再试一次吧！', 3);
    return undefined;
  });
}
