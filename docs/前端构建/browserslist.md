### 简介

browserslist 是在不同的前端工具之间共用目标浏览器和 node 版本的配置工具。它主要被以下工具使用：

[Autoprefixer](https://github.com/postcss/autoprefixer)

[Babel](https://github.com/babel/babel/tree/master/packages/babel-preset-env)

[post-preset-env](https://github.com/jonathantneal/postcss-preset-env)

[eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)

[stylelint-unsupported-browser-features](https://github.com/ismay/stylelint-no-unsupported-browser-features)

[postcss-normalize](https://github.com/jonathantneal/postcss-normalize)

browserslist 使用 Can I Use 网站的数据来查询浏览器版本范围。

### 配置

我们有两种方法设置 browserslist

1、在 package.json 里面配置

```json
{
  "browserslist": [
    "last 1 version",
    "> 1%",
    "maintained node versions",
    "not dead"
  ]
}
```

2、在工程的根目录下存在.browerslistrc 配置文件

```
# 注释是这样写的，以#号开头
last 1 version
> 1%
maintained node versions
not dead
```

如果上述的配置文件缺失或者其他因素导致未能生成有效的配置，browserslist 将使用默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。

### 查看

直接在工程目录下运行 npx browserslist 来查看你配置的筛选条件筛选出的浏览器版本范围

### 浏览器类别

```
Android for Android WebView.
Baidu for Baidu Browser.
BlackBerry or bb for Blackberry browser.
Chrome for Google Chrome.
ChromeAndroid or and_chr for Chrome for Android
Edge for Microsoft Edge.
Electron for Electron framework. It will be converted to Chrome version.
Explorer or ie for Internet Explorer.
ExplorerMobile or ie_mob for Internet Explorer Mobile.
Firefox or ff for Mozilla Firefox.
FirefoxAndroid or and_ff for Firefox for Android.
iOS or ios_saf for iOS Safari.
Node for Node.js.
Opera for Opera.
OperaMini or op_mini for Opera Mini.
OperaMobile or op_mob for Opera Mobile.
QQAndroid or and_qq for QQ Browser for Android.
Safari for desktop Safari.
Samsung for Samsung Internet.
UCAndroid or and_uc for UC Browser for Android.
```
