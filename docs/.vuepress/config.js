module.exports = {
  title: "苏纯的博客",
  description: "前端路上的点点滴滴",
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
          ["/CSS/浏览器渲染流程", "浏览器渲染流程"],
          ["/CSS/重绘与回流", "重绘与回流"],
          ["/CSS/常见问题", "常见问题"],
          ["/CSS/常见兼容性问题", "常见兼容性问题"],
          ["/CSS/LESS", "LESS"],
          ["/CSS/SCSS", "SCSS"],
          ["/CSS/Postcss", "Postcss"],
          ["/CSS/ECharts", "ECharts"],
          ["/CSS/居中", "居中"],
          ["/CSS/布局", "布局"],
          ["/CSS/首屏和白屏", "首屏和白屏"],
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
          ["/JAVASCRIPT/排序", "排序"],
          ["/JAVASCRIPT/设计模式", "设计模式"],
          ["/JAVASCRIPT/深拷贝浅拷贝", "深拷贝浅拷贝"],
          ["/JAVASCRIPT/同步异步事件循环", "同步异步事件循环"],
          ["/JAVASCRIPT/原型和原型链", "原型和原型链"],
          ["/JAVASCRIPT/Promise与Async与Await", "Promise与Async与Await"],
          ["/JAVASCRIPT/垃圾回收", "垃圾回收"],
          ["/JAVASCRIPT/call和apply和bind", "call和apply和bind"],
          ["/JAVASCRIPT/数组操作", "数组操作"],
          ["/JAVASCRIPT/js代码是如何执行的", "js代码是如何执行的"],
          ["/JAVASCRIPT/new操作符实现", "new操作符实现"],
          ["/JAVASCRIPT/手写原理", "手写原理"],
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
          ["/HTTP/前端性能优化", "前端性能优化"],
          ["/HTTP/Ajax", "Ajax"],
          ["/HTTP/Axios", "Axios"],
          ["/HTTP/Cookie和Session和Token和JWT", "Cookie和Session和Token和JWT"],
          ["/HTTP/Fetch", "Fetch"],
          ["/HTTP/JqueryAjax", "JqueryAjax"],
          ["/HTTP/web安全", "web安全"],
          ["/HTTP/TCP", "TCP"],
          ["/HTTP/UDP", "UDP"],
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
          ["/VUE/vue内部运行机制", "vue内部运行机制"],
          ["/VUE/vue源码分析", "vue源码分析"],
          ["/VUE/vue常用技巧", "vue常用技巧"],
        ],
      },
      {
        title: "WEBPACK",
        children: [
          ["/WEBPACK/webpack", "webpack"],
          ["/WEBPACK/webpack常见问题", "webpack常见问题"],
          ["/WEBPACK/babel", "babel"],
        ],
      },
      {
        title: "NODE",
        children: [
          ["/NODE/node", "node"],
          ["/NODE/npm", "npm"],
          ["/NODE/koa", "koa"],
          ["/NODE/express", "express"],
        ],
      },
      {
        title: "GIT",
        children: [
          ["/GIT/git", "git"],
          ["/GIT/gitreadme", "gitgitreadme"],
        ],
      },
      {
        title: "DOCKER",
        children: [["/DOCKER/docker", "docker"]],
      },
      {
        title: "NGINX",
        children: [["/NGINX/nginx", "nginx"]],
      },
      {
        title: "微信",
        children: [["/微信/服务器配置", "服务器配置"]],
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
          ["/数据结构和算法/队列和栈", "队列和栈"],
          ["/数据结构和算法/二叉树", "二叉树"],
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
        title: "编辑器",
        children: [
          ["/编辑器/vscode", "vscode"],
          ["/编辑器/editorconfig", "editorconfig"],
          ["/编辑器/eslint", "eslint"],
        ],
      },
      {
        title: "技术官网",
        children: [
          ["/技术官网/前端基础官网", "前端基础官网"],
          ["/技术官网/前端常用工具官网", "前端常用工具官网"],
        ],
      },
    ],
  },
};
