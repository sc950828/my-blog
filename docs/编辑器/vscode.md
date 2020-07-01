### 1、常用插件

    1. open-in-browser
      能把html文件在浏览器中打开
    2. Chinese Language
      中文包
    3. Vetur
      vue的支持
    4. Vue 2 Snippets
      vue高亮代码提示
    5. GitLens
      了解 git 的提交历史。精确到行
    6. ES7 React/Redux/React-Native/JS snippets
      react代码提示
    7. javascript console utils
      选中变量自动生成console语句
      比如选中 name 按快捷键 command + shift + l 就会在下一行生成console.log("name: ", name)语句
    8. indent-rainbow
      缩进通过不同的颜色区分
    9. Bracket Pair Colorizer
      用不同的颜色标识括号，让你一眼就能看出括号范围
    10. Simple React Snippets
      react简单提示
    11. Bootstrap4Snippets
      bootstrap4支持
    12. Element UI Snippets
      elementui支持
    13. ESLint
      提示错误
    14. HTML Snippets
      HTML5支持
    15. JavaScript(ES6)code snippets
      es6的支持
    16. Monokai Pro
      主题
    17. Prettier
      代码格式化 可以使用快捷键 alt + shift + f，也可以配置成保存的时候自动格式化
    18. vscode-icons
      vscode的文件图标
    19. REST Client
      测试接口

### 2、常用快捷键

    打开用户设置
      mac     command + ,
      windows ctrl + ,
    显示快捷键
      mac     command + k command + s
      windows ctrl + k ctrl + s
    切换工作区
      mac     control + r
      windows ctrl + r
      相当于用当前窗口打开另外的文件夹，如果想用新窗口打开需要按住command再选择要打开的新文件
    换行显示
      mac     alt + z
      windows alt + z
    转到多少行
      mac     control + g
      windows ctrl + g
    转到文件
      mac     command + p
      windows ctrl + p
    转到下一个错误或者警告
      mac     f8
      windows f8
    转到上一个错误或者警告
      mac     shift + f8
      windows shift + f8
    切换tab
      mac     control + tab
      windows ctrl + tab
    选择当前行
      mac     command + l
      windows ctrl + l
    选择下一个匹配项
      mac     command + d
      windows ctrl + d
    选择所有的匹配项
      mac     command + f2
      windows ctrl + f2
    格式化选中的代码
      mac     command + k command + f
      windows ctrl + k ctrl+ f
    转到定义处
      mac     f12
      windows f12
    变量重命名
      mac     f2
      windows f2
    去除行尾多余的空格
      mac     command + k command + x
      windows ctrl + k ctrl + x
    在资源管理器中显示当前文件
      mac     command + k r
      windows ctrl + k r
    切换sidebar
      mac     command + b
      windows ctrl + b
    上下移动行
      mac     alt + 上或下箭头
      windows alt + 上或下箭头
    上下复制行
      mac     alt + shift + 上或下箭头
      windows alt + shift + 上或下箭头
    全屏显示
      mac     f11
      windows f11
    撤销
      mac     command + z
      windows ctrl + z
    取消撤销
      mac     command + shift + z
      windows ctrl + y

### 3、常用设置

    {
      //icon主题
      "workbench.iconTheme": "Monokai Pro Icons",
      //颜色主题
      "workbench.colorTheme": "Monokai Pro",
      //字体大小
      "editor.fontSize": 16,
      //tab键空格数
      "editor.tabSize": 2,
      //空格显示成点
      "editor.renderWhitespace": "all",
      //在保存的时候format
      "editor.formatOnSave": true,
      //tab键提示
      "editor.tabCompletion": "on",
      //自动保存
      "files.autoSave": "off",
      //文件末尾都加上新的一行
      "files.insertFinalNewline": true,
      //自动更新引入文件名
      "javascript.updateImportsOnFileMove.enabled": "always",
      // 自动同步修改标签名 默认html,xml,php 配置成*代表所有语言都支持
      "auto-rename-tag.activationOnLanguage": ["*"],
      // eslint插件设置
      "eslint.alwaysShowStatus": true,
      "eslint.format.enable": true,
      // 括号插件Bracket Pair Colorizer 2 设置
      "bracket-pair-colorizer-2.colors": ["Gold", "Orchid", "LightSkyBlue"],
      "bracket-pair-colorizer-2.forceUniqueOpeningColor": true,
      "bracket-pair-colorizer-2.highlightActiveScope": true,
      // css插件设置
      "css.lint.compatibleVendorPrefixes": "warning",
      "css.lint.duplicateProperties": "warning",
      // less插件设置
      "less.lint.compatibleVendorPrefixes": "warning",
      "less.lint.duplicateProperties": "warning",
      // scss插件设置
      "scss.lint.compatibleVendorPrefixes": "warning",
      "scss.lint.duplicateProperties": "warning",
      // css less scss markdown因为没安装格式化插件所以默认使用prettier 保险起见我们也设置为使用prettier格式化
      "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode" //使用prettier格式化css
      },
      "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode" //使用prettier格式化less
      },
      "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode" //使用prettier格式化scss
      },
      "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode" //使用prettier格式化markdown
      },
      // 禁掉默认的json格式化
      "json.format.enable": false,
      // 使用prettier格式化json
      "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      // 禁掉默认的html格式化
      "html.format.enable": false,
      //使用prettier格式化html
      "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      // 使用eslint格式化javascript
      "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
      },
      // typescript 没在项目用到 暂时先使用prettier格式化
      "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      // 使用vetur格式化vue
      "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
      }
      /*  prettier的配置 详情查看 https://prettier.io/docs/en/options.html*/
      // "prettier.printWidth": 80, // 超过最大值换行
      // "prettier.tabWidth": 2, // 缩进字节数
      // "prettier.useTabs": false, // 缩进不使用tab，使用空格
      // "prettier.semi": true, // 句尾添加分号
      // "prettier.singleQuote": false, // 使用单引号代替双引号
      // "prettier.jsxSingleQuote": false, // 在JSX中使用单引号而不是双引号
      // "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
      // "prettier.arrowParens": "always", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
      // "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
      // "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
      // "prettier.endOfLine": "lf", // 结尾是 \n \r \n\r auto
      // "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
      // "prettier.htmlWhitespaceSensitivity": "ignore",
      // "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
      // "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
      // "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
      // "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
      // "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
      // "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
      // "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（默认在ES5中加尾逗号，可以设置为none）
      // "prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
    }

### 4、Emmet 插件的使用

    使用tab进行生成
    默认生成div #aa 或 .aa  生成id或class为aa的div
    span.aa生成class为aa的span
    div.aa>span.bb 生成class为aa的div里面是class为bb的span    > 是下一层
    div.aa+span#bb 生成class为aa id为bb的span 并列两个元素    +是兄弟
    div>ul>li^span  生成div下面的ul和span，ul下面是li         ^是返回上一层
    ul>li*5   生成ul下面5个li
    ul>li.item$*5 生成ul下面5个li 类名为item1到item5
    ul>li.item$$$*5 生成ul下面5个li 类名为item001到item005
    ul>li.item$@-*5 生成ul下面5个li 类名为item5到item1  @-倒序
    ul>li.item$@3*5 生成ul下面5个li 类名为item3到item7   @n从第几开始
