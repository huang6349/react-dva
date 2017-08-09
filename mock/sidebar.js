
export default {
  'GET /api/sidebar'(req, res) {
    setTimeout(function () {
      res.json([
        {
          id: 1,
          parent_id: null,
          name: '导航一',
          icon: 'desktop',
          url: null,
        },
        {
          id: 2,
          parent_id: null,
          name: '导航二',
          icon: 'pie-chart',
          url: null,
        },
        {
          id: 3,
          parent_id: null,
          name: '导航三',
          icon: 'appstore',
          url: null,
        },
        {
          id: 101,
          parent_id: 1,
          name: '首页',
          icon: null,
          url: '/',
        },
        {
          id: 102,
          parent_id: 2,
          name: '选项2',
          icon: null,
          url: null,
        },
        {
          id: 103,
          parent_id: 1,
          name: '选项3',
          icon: null,
          url: null,
        },
        {
          id: 104,
          parent_id: 1,
          name: '选项4',
          icon: null,
          url: null,
        },
        {
          id: 201,
          parent_id: 2,
          name: '选项5',
          icon: null,
          url: null,
        },
        {
          id: 202,
          parent_id: 2,
          name: '选项6',
          icon: null,
          url: null,
        },
        {
          id: 203,
          parent_id: 2,
          name: '选项7',
          icon: null,
          url: null,
        },
        {
          id: 204,
          parent_id: 2,
          name: '选项8',
          icon: null,
          url: null,
        },
        {
          id: 301,
          parent_id: 3,
          name: '选项9',
          icon: null,
          url: null,
        },
        {
          id: 302,
          parent_id: 3,
          name: '选项10',
          icon: null,
          url: null,
        },
        {
          id: 303,
          parent_id: 3,
          name: '选项11',
          icon: null,
          url: null,
        },
        {
          id: 304,
          parent_id: 3,
          name: '选项12',
          icon: null,
          url: null,
        },
      ]);
    }, 100);
  },
};
