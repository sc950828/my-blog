### 1、打开 Chrome 开发者工具
  使用 快捷键 Ctrl + Shift + I (Windows) 或 Cmd + Opt + I (Mac)

### 2、切换控制台位置
  使用一个快捷键 ctrl + shift + D (Windows)或 command + shift + D (Mac) 来实现位置的切换

### 3、切换 DevTools 的面板
- 1.使用 ctrl + `[` 和 ctrl + `]`(Windows)或者command + `[` 和 command + `]` (Mac)可以从当前面板的分别向左和向右切换面板。
- 2.按下 ctrl + 1 到 ctrl + 9可以直接转到编号1...9的面板(ctrl + 1转到元素面板，ctrl + 4` 转到 网络信息面板等等)
- 请注意! 我们在上面介绍的第二组快捷键默认被禁用了。你可以通过 DevTools>>Settings>>Preferences>>Appearance 打开这个选项

### 4、copy
  在控制台如果我们定义了一个变量我们可以使用copy(val)将其复制。

### 5、Store as global (存储为一个全局变量)
- 在控制台如果我们输出了一个变量我们想将其复制定义成另外一个变量我们可以右键该变量选择Store as global就会定义成另外一个全局变量。
- 全局变量的命名从temp1开始。

### 6、递增/递减 给元素调整样式值得时候很有用。
- option + 上下箭头每次加减0.1
- 上下箭头每次加减1
- shift + 上下箭头每次加减10
- command + 上下箭头每次加减100

### 7、使用 Command
    Command 菜单可以帮助我们快速找到那些被隐藏起来的功能。
    在 Chrome 的调试打开的情况下 按下 [ Ctrl] + [Shift] + [P](windows) 或者 [⌘] + [Shift]+ [P] (Mac)
    1.截图
      截图全屏 通过Capture full size screenshot命令
      截图选中的dom节点 通过Capture node screenshot命令
    2.主题
      在 Commands 菜单中寻找与 theme 相关的选项，实现 明亮 & 暗黑 两种主题之间的切换
    3.面板显示
      Commands 菜单并且输入 layout 使用横向面板布局或者使用纵向面板。

### 8、 代码块的使用
- 进入到 Sources 面板，在导航栏里选中 Snippets 这栏，点击 New snippet(新建一个代码块) ，然后输入你的代码之后保存！
- 现在你可以通过右击菜单或者快捷键： `[ctrl] + [enter]` 来运行它了。
- 当我在 DevTools 中预设了一组很棒的代码块以后，甚至都不必再通过 Sources 来运行它们。使用 Command菜单 才是最快的方式。
- 我们打开command菜单，只需在它的输入框中输入 ! ，就可以根据名字来筛选预设代码块。

### 9、console 中的 '$'
- $是document.querySelector 的别名。$(".div") 选择类名为.div的元素。
- $$是document.QuerySelectorAll的别名。选择类名为.div的元素数组。
- 在 Chrome 的 Elements 面板中， $0 是对我们当前选中的 html 节点的引用。
- $1 是对上一次我们选择的节点的引用，$2 是对在那之前选择的节点的引用，等等。一直到 $4
- $_ 是对上次执行的结果的引用。

### 10、console.assert(val, val1, val2 ...)
  当我们传入的第一个参数为 假 时，console.assert 打印跟在这个参数后面的值。

### 11、console.log({})
- 当我们输出console.log(name, age)的时候输出randy, 24
- 当我们输出console.log({name, age})的时候输出{name: 'randy', age: 24}

### 12、console.table()
  如果有一个 数组 (或者是 类数组 的对象，或者就是一个 对象 )需要打印，你可以使用 console.table 方法将它以一个漂亮的表格的形式打印出来。

### 13、console.dir()
  输出这个dom节点所关联到的真实的js对象。

### 14、时间计时器
- console.time() — 开启一个计时器
- console.timeEnd() — 结束计时并且将结果在 console 中打印出来

### 15、 通过 'h' 来隐藏元素
  按一下 'h' 就可以隐藏你在元素面板中选择的元素。再次按下 'h' 可以使它出现。某些的时候这很有用：例如你想截图，但你想去掉里面的敏感信息。

### 16、拖动 与 放置 元素
  当你想看看页面的某一部分在 DOM 树的不同位置的显示效果时，只需要拖动放置它(到指定的位置)

### 17、使用 control (按钮) 来移动元素!
    如果你只是想移动你当前选中的元素，在 DOM 结构中往上挪一点或者往下挪一点，而不是拖动和放置，
    你同样可以使用[ctrl] + [⬆] / [ctrl] + [⬇] ([⌘] + [⬆] / [⌘] + [⬇] on Mac)

### 18、在元素面板中展开所有的子节点
  一个一个的去点击级联的 ▶ 按钮太慢了，不如使用右击节点后的 expand recursively 命令
