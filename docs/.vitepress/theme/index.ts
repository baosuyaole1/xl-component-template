import DefaultTheme from 'vitepress/theme';
import '@xlz-ui/theme-chalk/src/index.scss';
import xlzUI from '@xlz-ui/components';
import './style/var.scss';
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(xlzUI); // 注册组件
  },
};
