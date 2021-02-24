module.exports = {
  title: "苏纯的博客",
  description: "前端路上的点点滴滴",
  base: "/my-blog/",
  head: [
    ["link", { rel: "icon", href: "/randy.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "苏纯,汨罗苏纯,苏纯博客,苏纯的博客,苏纯个人博客,苏纯的个人博客,前端博客,苏纯前端博客",
      },
    ],
  ],
  themeConfig: {
    lastUpdated: "上一次修改",
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
          ["/TypeScript/基础", "基础"],
          ["/TypeScript/数据类型", "数据类型"],
          ["/TypeScript/接口", "接口"],
          ["/TypeScript/类", "类"],
          ["/TypeScript/泛型", "泛型"],
          ["/TypeScript/命名空间", "命名空间"],
          ["/TypeScript/装饰器", "装饰器"],
          ["/TypeScript/配置文件", "配置文件"],
        ],
      },
      {
        title: "H5",
        children: [
          ["/H5/H5基础", "H5基础"],
          ["/H5/H5坑位指南", "H5坑位指南"],
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
        title: "微信",
        children: [
          ["/微信/微信公众号", "微信公众号"],
          ["/微信/服务器配置", "服务器配置"],
          ["/微信/小程序与H5的区别", "小程序与H5的区别"],
          ["/微信/微信小程序优化", "微信小程序优化"],
          ["/微信/微信小程序", "微信小程序"],
        ],
      },
      {
        title: "UNIAPP",
        children: [["/UNIAPP/uniapp基础", "uniapp基础"]],
      },
      {
        title: "FLUTTER",
        children: [
          ["/FLUTTER/移动开发简介", "移动开发简介"],
          ["/FLUTTER/hybrid", "hybrid"],
          ["/FLUTTER/flutter", "flutter"],
          ["/FLUTTER/dart", "dart"],
          ["/FLUTTER/widget", "widget"],
        ],
      },
      {
        title: "NODE",
        children: [
          ["/NODE/node", "node"],
          ["/NODE/npm", "npm"],
          ["/NODE/常用npm包", "常用npm包"],
          ["/NODE/yarn", "yarn"],
          ["/NODE/node常见问题", "node常见问题"],
        ],
      },
      {
        title: "服务端框架",
        children: [
          ["/服务端框架/express", "express"],
          ["/服务端框架/koa", "koa"],
          ["/服务端框架/egg", "egg"],
          ["/服务端框架/GraphQL", "GraphQL"],
        ],
      },
      {
        title: "数据库",
        children: [
          ["/数据库/数据库安装", "数据库安装"],
          ["/数据库/mongodb", "mongodb"],
        ],
      },
      {
        title: "GIT",
        children: [
          ["/GIT/git", "git"],
          ["/GIT/gitaction", "gitaction"],
        ],
      },
      {
        title: "前端构建",
        children: [
          ["/前端构建/webpack", "webpack"],
          ["/前端构建/webpack常见问题", "webpack常见问题"],
          ["/前端构建/webpack优化", "webpack优化"],
          ["/前端构建/babel", "babel"],
          ["/前端构建/eslint", "eslint"],
          ["/前端构建/browserslist", "browserslist"],
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
        title: "性能优化",
        children: [
          ["/性能优化/前端性能优化", "前端性能优化"],
          ["/性能优化/首屏和白屏", "首屏和白屏"],
        ],
      },
      {
        title: "计算机基础",
        children: [
          ["/计算机基础/计算机组成原理基础", "计算机组成原理基础"],
          ["/计算机基础/计算机组成原理组成", "计算机组成原理组成"],
          ["/计算机基础/计算机组成原理计算", "计算机组成原理计算"],
          ["/计算机基础/操作系统基础", "操作系统基础"],
          ["/计算机基础/linux常用命令", "linux常用命令"],
          ["/计算机基础/linux文件权限", "linux文件权限"],
          ["/计算机基础/shell", "shell"],
        ],
      },
      {
        title: "计算机网络",
        children: [
          ["/计算机网络/计算机网络基础", "计算机网络基础"],
          ["/计算机网络/HTTP", "HTTP"],
          ["/计算机网络/HTTPS", "HTTPS"],
          ["/计算机网络/TCP", "TCP"],
          ["/计算机网络/UDP", "UDP"],
          ["/计算机网络/DNS", "DNS"],
          ["/计算机网络/计算机网络常见问题", "计算机网络常见问题"],
          ["/计算机网络/缓存", "缓存"],
          ["/计算机网络/跨域", "跨域"],
          ["/计算机网络/鉴权","鉴权"],
          ["/计算机网络/web安全", "web安全"],
          ["/计算机网络/Ajax", "Ajax"],
          ["/计算机网络/JqueryAjax", "JqueryAjax"],
          ["/计算机网络/Fetch", "Fetch"],
          ["/计算机网络/Axios", "Axios"],
          ["/计算机网络/Fly", "Fly"],
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
        title: "工具",
        children: [
          ["/工具/vscode", "vscode"],
          ["/工具/editorconfig", "editorconfig"],
          ["/工具/charles", "charles抓包"],
          ["/工具/postman", "postman"],
          ["/工具/markdown", "markdown"],
        ],
      },
      {
        title: "优秀",
        children: [
          ["/优秀/前端好文章", "前端好文章"],
          ["/优秀/前端好文章2", "前端好文章2"],
          ["/优秀/常用正则", "常用正则"],
        ],
      },
    ],
  },
};
