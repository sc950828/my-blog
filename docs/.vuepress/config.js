module.exports = {
  title: "苏纯的博客",
  description: "学无止境",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/HTML/" },
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
          "/CSS/CSS",
          "/CSS/CSS3",
        ]
      },
      {
        title: "JAVASCRIPT",
        children: [
          "/JAVASCRIPT/JAVASCRIPT基础"
        ]
      },
    ]
    // {
    //   "/HTML/": [
    //     "",
    //     "HTML",
    //     "HTML5"
    //   ]
    // }
  }
};
