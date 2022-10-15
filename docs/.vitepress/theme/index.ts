import DefaultTheme from 'vitepress/theme';
import '@xlz-ui/theme-chalk/src/index.scss';
import ZIcon from '@xlz-ui/components/icon';
import './style/var.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon); // 注册组件
  },
};
