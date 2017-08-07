import { GET } from '../services/restful';

export default {
  namespace: 'SIDEBAR',
  state: {
    /** 菜单项 */
    menus: [],
    /** 选中的菜单项 */
    selectedKeys: [],
    /** 展开的菜单项 */
    openKeys: [],
  },
  reducers: {
    /** 修改组件状态属性 */
    UPDATE_STATE: function (state, action) {
      return Object.assign({}, state, action.payload);
    },
  },
  effects: {
    /** 初始化菜单 */
    INIT: function* ({ payload }, { select, call, put }) {
      const response = yield call(GET, '/api/sidebar');
      if (response && response.data) {
        // 更新数据流
        yield put({
          type: 'UPDATE_STATE',
          payload: {
            menus: response.data,
          },
        });
      }
    },
  },
  subscriptions: {
    setup: function ({ dispatch, history }) {
      let bool = false;
      history.listen(function (location) {
        if (!bool) {
          dispatch({
            type: 'INIT',
            payload: {
              pathname: location.pathname,
            },
          });
          bool = true;
        }
      });
    },
  },
};
