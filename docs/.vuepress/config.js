module.exports = {
  base: '/docs/',
  title: 'About WEB',
  description: ' ',
  head: [],
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    serviceWorker: {
      updatePopup: {
        message: '发现新内容可用',
        buttonText: '刷新'
      }
    },
    nav: [{
        text: '前端整理',
        link: '/AboutWeb/'
      },
      {
        text: 'ECMAScript6',
        link: '/ECMAScript6/'
      },
      {
        text: '微信小程序',
        link: '/miniprogram/'
      },
      {
        text: '总结&封装',
        link: '/finish/'
      }
    ],
    sidebar: {
      '/AboutWeb/': genSidebarConfig('AboutWeb', 'AboutWeb'),
      '/ECMAScript6/': genSidebarConfig('ECMAScript6', 'ECMAScript6'),
      '/miniprogram/': genSidebarConfig('miniprogram', 'miniprogram'),
      '/finish/': genSidebarConfig('finish', 'finish')
    }
  }
}

function genSidebarConfig(module, title) {
  if (module === 'AboutWeb') {
    return [{
      title,
      collapsable: false,
      children: ['', 'web', 'CDN', 'urlStep', 'plug']
    }]
  }
  if (module === 'ECMAScript6') {
    return [{
      title,
      collapsable: false,
      children: ['', 'let', 'destructuring', 'proxy']
    }]
  }
  if (module === 'miniprogram') {
    return [{
      title,
      collapsable: false,
      children: ['']
    }]
  }
  if (module === 'finish') {
    return [{
      title,
      collapsable: false,
      children: ['', 'ajax']
    }]
  }
}