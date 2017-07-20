import dva from 'dva';
import './index.css';

// 1. 初始化项目
const app = dva();

// 2. 注册插件
// app.use({});

// 3. 注册数据模型
// app.model(require('./models/example'));

// 4. 注册路由
app.router(require('./router'));

// 5. 启动项目
app.start('#root');
