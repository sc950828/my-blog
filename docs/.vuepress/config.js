module.exports = {
  title: "苏纯的博客",
  description: "前端路上的点点滴滴",
  base: "/my-blog/",
  head: [["link", { rel: "icon", href: "/randy.ico" }]],
  themeConfig: {
    lastUpdated: '上一次修改时间：',
    nav: [
      { text: "导航", link: "/GUIDE/" },
      { text: "博客首页", link: "/" },
      { text: "个人首页", link: "https://home.suchun.vip" },
      { text: "GitHub", link: "https://github.com/sc950828" },
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
          ["/CSS/CSS选择器", "CSS选择器"],
          ["/CSS/CSS3", "CSS3"],
          ["/CSS/LESS", "LESS"],
          ["/CSS/SCSS", "SCSS"],
          ["/CSS/Postcss", "Postcss"],
          ["/CSS/布局", "布局"],
          ["/CSS/常见问题", "常见问题"],
          ["/CSS/常见兼容性问题", "常见兼容性问题"],
          ["/CSS/重绘与回流", "重绘与回流"],
        ],
      },
      {
        title: "JAVASCRIPT",
        children: [
          ["/JAVASCRIPT/JavaScript基础", "JavaScript基础"],
          ["/JAVASCRIPT/JavaScript事件", "JavaScript事件"],
          ["/JAVASCRIPT/JavaScript常见问题", "JavaScript常见问题"],
          ["/JAVASCRIPT/js运行机制", "js运行机制"],
          ["/JAVASCRIPT/同步异步事件循环", "同步异步事件循环"],
          ["/JAVASCRIPT/原型和原型链", "原型和原型链"],
          ["/JAVASCRIPT/深拷贝浅拷贝", "深拷贝浅拷贝"],
          ["/JAVASCRIPT/this问题", "this问题"],
          ["/JAVASCRIPT/继承", "继承"],
          ["/JAVASCRIPT/闭包", "闭包"],
          ["/JAVASCRIPT/数据类型转换", "数据类型转换"],
          ["/JAVASCRIPT/防抖与节流", "防抖与节流"],
          ["/JAVASCRIPT/垃圾回收", "垃圾回收"],
          ["/JAVASCRIPT/手写", "手写"],
          ["/JAVASCRIPT/JQuery", "JQuery"],
        ],
      },
      {
        title: "ECMAScript",
        children: [
          ["/ECMAScript/前言", "前言"],
          ["/ECMAScript/ES6", "ES6"],
          ["/ECMAScript/异步", "异步"],
          ["/ECMAScript/模块化", "模块化"],
          ["/ECMAScript/ES7", "ES7"],
          ["/ECMAScript/ES8", "ES8"],
          ["/ECMAScript/ES9", "ES9"],
          ["/ECMAScript/ES10", "ES10"],
          ["/ECMAScript/ES11", "ES11"],
        ],
      },
      {
        title: "TypeScript",
        children: [
          ["/TypeScript/TypeScript", "TypeScript"],
        ],
      },
      {
        title: "WEB移动端",
        children: [
          ["/WEB移动端/移动端", "移动端"],
          ["/WEB移动端/移动端常见问题", "移动端常见问题"],
          ["/WEB移动端/H5坑位指南", "H5坑位指南"]
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
          ["/HTTP/Fetch", "Fetch"],
          ["/HTTP/JqueryAjax", "JqueryAjax"],
          ["/HTTP/Cookie和Session和Token和JWT", "Cookie和Session和Token和JWT"],
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
          ["/UNIAPP/跨端开发", "跨端开发"],
          ["/UNIAPP/hybrid", "hybrid"]
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
          ["/GIT/gitaction", "gitaction"],
        ],
      },
      {
        title: "DOCKER",
        children: [
          ["/DOCKER/docker", "docker"],
          ["/DOCKER/dockerfile文件", "docker file文件"],
          ["/DOCKER/dockercompose", "docker compose"],
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
          ["/计算机基础/linux文件权限", "linux文件权限"],
          ["/计算机基础/shell", "shell"]
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
          ["/数据结构和算法/设计模式", "设计模式"],
        ],
      },
      {
        title: "浏览器",
        children: [
          ["/浏览器/Chrome调试技巧", "Chrome调试技巧"],
          ["/浏览器/浏览器内核", "浏览器内核"],
          ["/浏览器/浏览器渲染流程", "浏览器渲染流程"],
        ],
      },
      {
        title: "性能优化",
        children: [
          ["/性能优化/前端性能优化", "前端性能优化"],
          ["/性能优化/首屏和白屏", "首屏和白屏"],
        ],
      },
      {
        title: "工具",
        children: [
          ["/工具/vscode", "vscode"],
          ["/工具/editorconfig", "editorconfig"],
          ["/工具/eslint", "eslint"],
          ["/工具/charles", "charles抓包"],
          ["/工具/postman", "postman"],
          ["/工具/代码规范", "代码规范"],
          ["/工具/markdown", "markdown"]
        ],
      },
      {
        title: "优秀",
        children: [
          ["/优秀/前端常用工具官网", "前端常用工具官网"],
          ["/优秀/常用npm包", "常用npm包"],
          ["/优秀/前端好文章", "前端好文章"],
          ["/优秀/前端好文章2", "前端好文章2"],
          ["/优秀/图片处理", "图片处理"],
          ["/优秀/常用正则", "常用正则"],
          ["/优秀/前端二进制", "前端二进制"],
        ],
      },
    ],
  },
};
