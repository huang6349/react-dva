import dva from 'dva';

/** 设置元素的间距[比例] */
import '../node_modules/css-spacing/src/css-spacing.css';
/** 规定元素是否应该浮动 */
import '../node_modules/css-floats/src/css-floats.css';
/** 规定文本的水平对齐方式 */
import '../node_modules/css-text-align/src/css-text-align.css'
/** "REACT-DVA"的公共样式 */
import './index.css';

// 1. 初始化项目
const app = dva();

// 2. 注册插件
// app.use({});

// 3. 注册数据模型
// app.model(require('./models/example'));
app.model(require("./models/sidebar"));

// 4. 注册路由
app.router(require('./router'));

// 5. 启动项目
app.start('#root');
