module.exports = {
  title: "苏纯的博客",
  description: "学无止境",
  head: [["link", { rel: "icon", href: "/randy.jpg" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "导航", link: "/Guide/" },
      { text: "代码实例", link: "http://sc950828.top" },
      { text: "GitHub地址", link: "https://github.com/sc950828" }
    ],
    sidebar: [
      {
        title: "HTML",
        children: [
          ["/HTML/HTML", "HTML"],
          ["/HTML/HTML5", "HTML5"]
        ]
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
          ["/CSS/ECharts", "ECharts"]
        ]
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
          ["/JAVASCRIPT/call和apply和bind", "call和apply和bind"]
        ]
      },
      {
        title: "WEB移动端",
        children: [
          ["/WEB移动端/移动端", "移动端"],
          ["/WEB移动端/移动端常见问题", "移动端常见问题"]
        ]
      },
      {
        title: "VUE",
        children: [
          ["/VUE/vue", "vue"],
          ["/VUE/vue常见问题", "vue常见问题"],
          ["/VUE/vuex", "vuex"],
          ["/VUE/vue内部运行机制", "vue内部运行机制"],
        ]
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
          ["/HTTP/web安全", "web安全"]
        ]
      },
      {
        title: "计算机基础",
        children: [
          ["/计算机基础/计算机基础", "计算机基础"]
        ]
      },
      {
        title: "技术官网",
        children: [
          ["/技术官网/前端基础官网", "前端基础官网"],
          ["/技术官网/前端常用工具官网", "前端常用工具官网"]
        ]
      },
    ]
  }
};
