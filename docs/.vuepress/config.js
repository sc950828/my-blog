module.exports = {
  title: "苏纯的博客",
  description: "学无止境",
  head: [["link", { rel: "icon", href: "/randy.jpg" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "导航", link: "/Guide/" },
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
          ["/CSS/常见兼容性问题", "常见兼容性问题"],
          ["/CSS/常见问题", "常见问题"],
          ["/CSS/浏览器渲染流程", "浏览器渲染流程"],
          ["/CSS/移动端", "移动端"],
          ["/CSS/重绘 回流", "重绘 回流"],
          ["/CSS/CSS选择器", "CSS选择器"],
          ["/CSS/LESS", "LESS"],
          ["/CSS/SCSS", "SCSS"],
          ["/CSS/Postcss", "Postcss"]
        ]
      },
      {
        title: "JAVASCRIPT",
        children: [["/JAVASCRIPT/JAVASCRIPT基础", "JAVASCRIPT基础"]]
      }
    ]
  }
};
