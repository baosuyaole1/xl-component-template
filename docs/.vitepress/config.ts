export default {
  title: '小乐子组件库',
  description: 'A Vue.js UI library.',
  lastUpdated: true,
  lang: 'en-US',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/a.svg',
    // 右上角按钮
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/baosuyaole1/XLZ-UI',
      },
    ],
    nav: [
      {
        text: '首页',
        link: '/',
      },
    ],
    // 菜单
    sidebar: [
      {
        text: '基础',
        items: [
          { text: '快速开始', link: '/guide/' },
          { text: '使用方法', link: '/guide/usage' },
        ],
      },
      {
        text: '组件',
        items: [{ text: 'icon', link: '/components/icon' }],
      },
    ],
  },
};
