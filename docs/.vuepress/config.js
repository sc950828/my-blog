module.exports = {
  title: "苏纯的博客",
  description: "前端路上的点点滴滴",
  base: "/my-blog/",
  head: [["link", { rel: "icon", href: "/randy.jpg" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "导航", link: "/GUIDE/" },
      // { text: "代码实例", link: "http://sc950828.top" },
      { text: "GitHub地址", link: "https://github.com/sc950828" },
    ],
    sidebar: [
      {
        title: "HTML",
        children: [
          ["/HTML/HTML", "HTML"],
          ["/HTML/HTML5", "HTML5"],
        ],
      },
      {
        title: "CSS",
        children: [
          ["/CSS/CSS", "CSS"],
          ["/CSS/CSS3", "CSS3"],
          ["/CSS/CSS选择器", "CSS选择器"],
          ["/CSS/常见问题", "常见问题"],
          ["/CSS/常见兼容性问题", "常见兼容性问题"],
          ["/CSS/布局", "布局"],
          ["/CSS/LESS", "LESS"],
          ["/CSS/SCSS", "SCSS"],
          ["/CSS/Postcss", "Postcss"],
          ["/CSS/首屏和白屏", "首屏和白屏"],
          ["/CSS/重绘与回流", "重绘与回流"],
          ["/CSS/浏览器渲染流程", "浏览器渲染流程"],
          ["/CSS/前端性能优化", "前端性能优化"],
          ["/CSS/图片处理", "图片处理"],
        ],
      },
      {
        title: "JAVASCRIPT",
        children: [
          ["/JAVASCRIPT/JavaScript基础", "JavaScript基础"],
          ["/JAVASCRIPT/JavaScript常见问题", "JavaScript常见问题"],
          ["/JAVASCRIPT/JavaScript事件", "JavaScript事件"],
          ["/JAVASCRIPT/ES6", "ES6"],
          ["/JAVASCRIPT/TypeScript", "TypeScript"],
          ["/JAVASCRIPT/闭包", "闭包"],
          ["/JAVASCRIPT/数据类型转换", "数据类型转换"],
          ["/JAVASCRIPT/this问题", "this问题"],
          ["/JAVASCRIPT/继承", "继承"],
          ["/JAVASCRIPT/防抖与节流", "防抖与节流"],
          ["/JAVASCRIPT/模块化", "模块化"],
          ["/JAVASCRIPT/设计模式", "设计模式"],
          ["/JAVASCRIPT/深拷贝浅拷贝", "深拷贝浅拷贝"],
          ["/JAVASCRIPT/同步异步事件循环", "同步异步事件循环"],
          ["/JAVASCRIPT/原型和原型链", "原型和原型链"],
          ["/JAVASCRIPT/Promise与Async与Await", "Promise与Async与Await"],
          ["/JAVASCRIPT/垃圾回收", "垃圾回收"],
          ["/JAVASCRIPT/js运行机制", "js运行机制"],
          ["/JAVASCRIPT/手写", "手写"],
          ["/JAVASCRIPT/常用正则", "常用正则"],
          ["/JAVASCRIPT/前端二进制", "前端二进制"],
        ],
      },
      {
        title: "WEB移动端",
        children: [
          ["/WEB移动端/移动端", "移动端"],
          ["/WEB移动端/移动端常见问题", "移动端常见问题"],
        ],
      },
      {
        title: "HTTP",
        children: [
          ["/HTTP/HTTP", "HTTP"],
          ["/HTTP/HTTP常见问题", "HTTP常见问题"],
          ["/HTTP/缓存", "缓存"],
          ["/HTTP/跨域", "跨域"],
          ["/HTTP/权限", "权限"],
          ["/HTTP/Ajax", "Ajax"],
          ["/HTTP/Axios", "Axios"],
          ["/HTTP/Fly", "Fly"],
          ["/HTTP/Cookie和Session和Token和JWT", "Cookie和Session和Token和JWT"],
          ["/HTTP/Fetch", "Fetch"],
          ["/HTTP/JqueryAjax", "JqueryAjax"],
          ["/HTTP/web安全", "web安全"],
          ["/HTTP/TCP", "TCP"],
          ["/HTTP/UDP", "UDP"],
          ["/HTTP/DNS", "DNS"],
        ],
      },
      {
        title: "VUE",
        children: [
          ["/VUE/vue", "vue"],
          ["/VUE/vue常见问题", "vue常见问题"],
          ["/VUE/vuex", "vuex"],
          ["/VUE/vue-cli", "vue-cli"],
          ["/VUE/vue-router", "vue-router"],
          ["/VUE/vue源码分析", "vue源码分析"],
          ["/VUE/vue常用技巧", "vue常用技巧"],
          ["/VUE/vue服务端渲染", "vue服务端渲染"],
          ["/VUE/jsx", "jsx"],
          ["/VUE/nuxt", "nuxt"],
          ["/VUE/vue项目总结", "vue项目总结"],
        ],
      },
      {
        title: "REACT",
        children: [
          ["/REACT/react", "react"],
          ["/REACT/react-router", "react-router"],
          ["/REACT/react-redux", "react-redux"],
          ["/REACT/dva", "dva"],
          ["/REACT/umijs", "umijs"],
          ["/REACT/状态管理", "状态管理"],
          ["/REACT/react常见问题", "react常见问题"],
        ],
      },
      {
        title: "UNIAPP",
        children: [
          ["/UNIAPP/uniapp基础", "uniapp基础"],
          ["/UNIAPP/跨端开发", "跨端开发"]
        ]
      },
      {
        title: "FLUTTER",
        children: [
          ["/FLUTTER/移动开发简介", "移动开发简介"],
          ["/FLUTTER/flutter", "flutter"],
          ["/FLUTTER/dart", "dart"],
          ["/FLUTTER/widget", "widget"],
        ]
      },
      {
        title: "WEBPACK",
        children: [
          ["/WEBPACK/webpack", "webpack"],
          ["/WEBPACK/webpack常见问题", "webpack常见问题"],
          ["/WEBPACK/webpack优化", "webpack优化"],
          ["/WEBPACK/babel", "babel"],
        ],
      },
      {
        title: "NODE",
        children: [
          ["/NODE/node", "node"],
          ["/NODE/npm", "npm"],
          ["/NODE/yarn", "yarn"],
          ["/NODE/koa", "koa"],
          ["/NODE/express", "express"],
          ["/NODE/node常见问题", "node常见问题"],
          ["/NODE/数据库安装", "数据库安装"],
          ["/NODE/GraphQL", "GraphQL"],
          ["/NODE/egg", "egg"],
          ["/NODE/mongodb", "mongodb"],
        ],
      },
      {
        title: "GIT",
        children: [
          ["/GIT/git", "git"],
          ["/GIT/git规范", "git规范"],
          ["/GIT/gitreadme", "gitreadme"],
          ["/GIT/gitaction", "gitaction"],
        ],
      },
      {
        title: "DOCKER",
        children: [
          ["/DOCKER/docker", "docker"],
          ["/DOCKER/docker file", "docker file"],
          ["/DOCKER/docker compose", "docker compose"],
        ],
      },
      {
        title: "NGINX",
        children: [["/NGINX/nginx", "nginx"]],
      },
      {
        title: "微信",
        children: [
          ["/微信/微信公众号", "微信公众号"],
          ["/微信/服务器配置", "服务器配置"],
          ["/微信/小程序与H5的区别", "小程序与H5的区别"],
          ["/微信/微信小程序优化", "微信小程序优化"],
          ["/微信/微信小程序", "微信小程序"],
          ["/微信/mpvue", "mpvue"],
        ],
      },
      {
        title: "计算机基础",
        children: [
          ["/计算机基础/计算机基础", "计算机基础"],
          ["/计算机基础/linux常用命令", "linux常用命令"],
          ["/计算机基础/ubuntu", "ubuntu"],
          ["/计算机基础/windows", "windows"],
          ["/计算机基础/mac", "mac"],
        ],
      },
      {
        title: "数据结构和算法",
        children: [
          ["/数据结构和算法/基础", "基础"],
          ["/数据结构和算法/字符串", "字符串"],
          ["/数据结构和算法/数组和链表", "数组和链表"],
          ["/数据结构和算法/队列和栈", "队列和栈"],
          ["/数据结构和算法/树", "树"],
          ["/数据结构和算法/排序", "排序"],
        ],
      },
      {
        title: "浏览器",
        children: [
          ["/浏览器/Chrome调试技巧", "Chrome调试技巧"],
          ["/浏览器/浏览器内核", "浏览器内核"],
        ],
      },
      {
        title: "工具",
        children: [
          ["/工具/vscode", "vscode"],
          ["/工具/editorconfig", "editorconfig"],
          ["/工具/eslint", "eslint"],
          ["/工具/charles", "charles抓包"],
          ["/工具/代码规范", "代码规范"],
        ],
      },
      {
        title: "技术官网",
        children: [
          ["/技术官网/前端基础官网", "前端基础官网"],
          ["/技术官网/前端常用工具官网", "前端常用工具官网"],
          ["/技术官网/常用npm包", "常用npm包"],
          ["/技术官网/前端实用标签", "前端实用标签"]
        ],
      },
    ],
  },
};
