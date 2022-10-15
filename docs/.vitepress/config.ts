export default {
  title: 'XLZ-UI',
  description: 'A Vue.js UI library.',
  lastUpdated: true,
  themeConfig: {
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
