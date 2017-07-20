import qs from 'qs';
import {
  isBoolean,
  isNumber,
  isObject,
  isEmpty,
} from 'underscore';
import request from '../utils/request';

/**
 * 格式化数据，删除空对象
 * 
 * @param {Object} params
 * @returns params
 */
function formatData(params) {
  for (let i in params) {
    let param = params[i];
    if (isObject(param)) {
      params[i] = formatData(param);
      if (isEmpty(params[i])) {
        delete params[i];
      }
    } else {
      if (isEmpty(param) && !isBoolean(param)) {
        delete params[i];
      }
    }
  }
  return params;
}

/**
 * POST请求
 * 
 * @export POST
 * @param {string} url
 * @param {Object} params
 * @returns response
 */
export async function POST(url, params) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(formatData(params)),
  });
};

/**
 * DELETE请求
 * 
 * @export DELETE
 * @param {string} url
 * @param {number|string} id
 * @returns response
 */
export async function DELETE(url, id) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
};

/**
 * GET请求
 * 
 * @export GET
 * @param {string} url
 * @param {Object} params
 * @returns response
 */
export async function GET(url, params) {
  return request(`${url}${params ? '?' : ''}${qs.stringify(params)}`, {
    method: 'GET',
  });
};

/**
 * PUT请求
 * 
 * @export PUT
 * @param {string} url
 * @param {Object} params
 * @param {number|string} id
 * @returns response
 */
export async function PUT(url, params, id) {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(formatData(Object.assign({}, params, { id: isNumber(id) ? id.toString() : id }))),
  });
};

const restful = {
  POST: POST,
  DELETE: DELETE,
  GET: GET,
  PUT: PUT,
};

export default restful;
