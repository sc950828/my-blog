### 1、常用插件
    1. open-in-browser
      能把html文件在浏览器中打开
    2. Chinese Language
      中文包
    3. Vetur
      vue的支持
    4. Vue 2 Snippets
      vue高亮代码提示
    5. gitlens
      提示代码谁提交的
    6. ES7 React/Redux/React-Native/JS snippets
      react代码提示
    7. javascript console utils
      选中变量自动生成console语句
      比如选中 name 按快捷键 command + shift + l 就会在下一行生成console.log("name: ", name)语句
    8. indent-rainbow
      缩进通过不同的颜色区分
    9. Bracket Pair Colorizer
      用不同的颜色标识括号，让你一眼就能看出括号范围
    10. GitLens
      了解 git 的提交历史。精确到行
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
    "emmet.includeLanguages": {"javascript": "javascriptreact"} 设置react按tab补全标签
    "editor.formatOnType": true, 
    "editor.formatOnSave": true 设置代码自动格式化，变漂亮。

### 4、Emmet插件的使用
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
