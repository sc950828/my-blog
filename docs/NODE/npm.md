### 1、npm 是什么？

npm 是 node 的包管理工具 node package manage

### 2、npm install moduleName 和 npm install -g moduleName 区别，也就是本地安装和全局安装的区别？

- npm install moduleName 是本地安装，会在运行当前命令的目录下创建 node_module 文件夹，并把模块安装到该目录下面。项目中要使用的话可以直接 require。
- npm install -g moduleName 是全局安装，可以在命令行直接使用，全局模块的真实安装路径在 C:\Users\admin\AppData\Roaming\npm 下。

### 3、npm install --save 和 npm install --save-dev 的区别？

- npm install --save 会修改 package.json 文件，将模块名和版本号添加到 dependencies,生产环境会用到。
- npm install --save-dev 会修改 package.json 文件，将模块名和版本号添加到 devDependencies，开发环境会用到。
- 这两种安装模块的方法都会修改 package.json 文件，使用 npm install 时会自动根据 package.json 里面的依赖进行安装。
- 如果没有指定--save 或者--save-dev 默认是--save，会把依赖写到 dependencies 中。

### 4、-S 和-D 是什么意思？

-S 就是--save -D 就是--save-dev 的缩写。

### 5、npm install 会安装什么 npm install --production 会安装什么？

- 如果没有在 npm install 后面具体指定安装什么模块的话，会安装 dependencies 和 devDependencies 两个环境的依赖。
- 如果使用 npm install --production 就会只安装 dependencies 中的依赖。

### 6、如果只需要安装 devDependencies 中的依赖怎么办？

使用 npm install --only=dev

### 7、查看配置

通过 npm config get registry 查看镜像源

通过 npm config get prefix 可以获取全局安装的模块的路径。

### 8、常用命令

```shell
npm install 安装模块
npm uninstall 卸载模块
npm update 更新模块
npm outdated 检查模块是否已经过时
npm ls 查看安装的模块
npm init 在项目中引导创建一个package.json文件
npm help 查看某条命令的详细帮助
npm root 查看包的安装路径
npm config 管理npm的配置路径
npm cache 管理模块的缓存
npm start 启动模块
npm stop 停止模块
npm restart 重新启动模块
npm test 测试模块
npm version 查看模块版本
npm view 查看模块的注册信息
npm adduser  用户登录
npm publish 发布模块
npm access 在发布的包上设置访问级别
npm package.json的语法
```

### 9、查看安装的包

- 查看全局安装的包 npm list -g --depth 0 带上 depth 0 会简单清晰点
- 查看本地安装的包 npm list --depth 0 带上 depth 0 会简单清晰点

### 10、nodemon

- 使用 node 做后台的时候，我们每次修改代码并不能更新，需要重启项目，很麻烦，使用 nodemon 就可以很方便的解决这个问题。改动自动刷新。
- npm install nodemon -g 全局安装就行，就可以使用了

### 11、前后端连载

    使用concurrently，就是一个命令可以启动多个项目，一般我们配置同时启动前后端。
    第一步：安装concurrently npm install concrrently -D
    第二步： 配置命令 在根目录的package.json配置命令
      假如后端是根目录启动是 "start": "node server.js",
      前端(client)配置在根目录，命令需要加前缀 "client": "npm start --prefix client",
      配置前后端连载使用concrrently，配置 "dev": "concurrently \"npm run start\" \"npm run client\""
      这样使用npm run dev就能把前后端两个项目一起启动起来
      这条命令是用来安装前端模块的，可以不配置"client-install": "npm install --prefix client",

### 12、服务器上部署 nodejs 后台

    因为node.js 是单进程，进程被杀死后整个服务就崩了，所以需要进程管理工具，一直使nodejs在服务器上运行
    第一种pm2
      全局安装pm2   npm install -g pm2
      进入项目,以server.js为入口文件为例
        启动项目 pm2 start server.js
        启动一个进程并把它命名为 serverone  pm2 start app.js --name serverone
        停止项目 pm2 stop server.js
        重启项目 pm2 restart server.js
        删除某个项目 pm2 delete id/name
        显示所有进程状态  pm2 list
        停止所有进程  pm2 stop all
        重启所有进程  pm2 restart all
    第二种 forever.js
      全局安装forever.js npm install -g forever.js
      进入项目,以server.js为入口文件为例
        启动项目 forever start server.js
        启动一个进程并把它命名为 serverone  pm2 start app.js --name serverone
        停止项目 forever stop server.js
        重启项目 forever restart server.js

### 13、包安装升级卸载

    npm install moduleName 本地安装
    npm install moduleName -g 全局安装
    npm uninstall moduleName 本地卸载
    npm uninstall moduleName -g 全局卸载
    npm update moduleName 本地更新包
    npm update moduleName -g 全局更新包

### 14、nvm 和 n 和 npx

nvm

nvm 就是为解决这个问题而产生的，他可以方便的在同一台设备上进行多个 node 版本之间切换

```shell
nvm install ## 安装指定版本，可模糊安装，如：安装v6.2.0，既可nvm install v6.2.0，又可nvm install 6.2
nvm uninstall ## 删除已安装的指定版本，语法与install类似
nvm use ## 切换使用指定的版本node
nvm ls ## 列出所有安装的版本
nvm ls-remote ## 列出所以远程服务器的版本（官方node version list）
nvm current ## 显示当前的版本
nvm alias ## 给不同的版本号添加别名
nvm unalias ## 删除已定义的别名
nvm reinstall-packages ## 在当前版本node环境下，重新全局安装指定版本号的npm包
```

n

n 是 node 一个模块，可以用来管理和切换 node 版本。n 不支持 windows。

```shell
npm install -g n
n #查看已安装版本
n latest  #安装最新版本并使用
n latest -d   #下载最新版但不使用，-d参数表示为仅下载
n stable  #安装最新稳定版本并使用
n <version>  #安装某个版本并使用，如$n 6.2.2
n rm <version ...> #删除某些版本
n ls    #查看已安装的版本
n ls-remote [version] 查看可用版本
n --latest    #查看最新版本
n --stable    #查看最新稳定版
n -h    #查看帮助信息，更多命令在这里查看
```

nrm

nrm(npm registry manager )是 npm 资源管理器，允许你快速切换 npm 源

```shell
npm install -g nrm  #nrm 安装
nrm ls  #列出可用的源
nrm use taobao #选择国内淘宝的源
nrm test npm #测试速度
nrm add taobao http://192.168.10.127:8081/repository/npm-public/  #添加源
nrm del  taobao #删除对应的源

```

npx

npm 从 5.2 版开始，增加了 npx 命令。npx 会帮你执行依赖包里的二进制文件，也就是说 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！使用完之后不会在你的本机或者项目留下任何东西，会自动删除掉。意思就是 npx 可以本地安装模块，然后使用起来像全局安装的模块一样方便，可以到处使用，使用完后自动删除。

```shell
# 以前的写法
npm i -D webpack
./node_modules/.bin/webpack -v
# 使用npx
npx webpack -v
```

在一些场景下使用 npx 切换 Node 版本，比用像 nvm 、 nave 、 n 这样的 Node 版本管理工具会方便很多。

```shell
$ npx node@0.12.8 -v
v0.12.8
```

npx 常用参数

```shell
#定义要安装的软件包，并添加到正在运行的$PATH ，
-p or --package <package>

#让 npx 强制使用本地模块，不下载远程模块，如果本地没有该模块则会出错。
--no-install

#与 --no-install 相反，让 npx 强制使用远程模块。
--ignore-existing

#设置 npm 缓存的位置，否则为 npm 默认缓存位置。
--cache

#在npm run-script类似外壳程序的环境中执行，并提供所有常用的环境变量。如果 NPX 安装了多个模块，只有 <string> 参数的第一个项会被当作命令执行，其他的就须要加上 -p 选项。
-c

#禁止npx本身的任何输出（进度条，错误消息，安装报告），子命令输出本身不会被禁止。
-q, --quiet

#当二进制是node脚本时，提供给node的额外参数。
-n, --node-arg

#查看 npx 版本
-v, --version
```

### 15、npm 发布自己的 package

    先创建自己的项目
    npm login 输入用户名 密码 邮箱
    npm publish 发布(每次发布需要更新版本号 npm version 版本，版本号不能是之前的)
    npm unpublish 包名 撤销发布

### 16、node_modules

首先项目运行时，遇见代码中的 require('xxxx') 请求模块时，会先在当前目录下寻找 node_modules 文件夹，然后在其中如果找到某个模块，则读取其 package.json 文件，找到 入口模块 main 字段，执行相应的 js 程序，如果当前目录没有找到 node_modules 文件夹，则继续往上一层寻找，直到当前项目路径的根目录，如果还没找到，就报错啦（提示找不到）

### 17、browserslist

    表示我们插件在哪些浏览器里面兼容
    这个配置我们既可以放在package.json里面也可以单独配置在.browserslistrc文件中
    比如package.json配置
      "browserslist": [
        "> 1%", // 表示包含所有使用率 > 1% 的浏览器
        "last 2 versions", // 表示包含浏览器最新的两个版本
        "not ie <= 8" // 表示不包含 ie8 及以下版本
      ]
    至于它是如何去衡量浏览器的使用率和版本的，数据都是来源于 Can I Use

### 18、包版本

指定版本：比如 1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。

波浪号（tilde）+指定版本：比如~1.2.2，表示安装 1.2.x 的最新版本（不低于 1.2.2），但是不安装 1.3.x，也就是说安装时不改变大版本号和次要版本号。

插入号（caret）+指定版本：比如 ˆ1.2.2，表示安装 1.x.x 的最新版本（不低于 1.2.2），但是不安装 2.x.x，也就是说安装时不改变大版本号。

需要注意的是，如果大版本号为 0，则插入号的行为与波浪号相同，只能改变次次版本，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

latest：安装最新版本。

### 19、依赖类型

dependences 代码运行时所需要的依赖，比如 vue，vue-router。

devDependences 开发依赖，就是那些只在开发过程中需要，而运行时不需要的依赖，比如 babel，webpack。

peerDependences 同伴依赖，它用来告知宿主环境需要什么依赖以及依赖的版本范围。如果宿主环境没有对应版本的依赖，在安装依赖时会报出警告。比如包 eslint-plugin-import 中有依赖 2.x-5.x 的 eslint。

```json
 "peerDependencies": {
    "eslint": "2.x - 5.x"
  },
```

optionalDependencies 可选依赖，这种依赖即便安装失败，npm 也会认为整个依赖安装过程是成功的。

bundledDependencies 打包依赖，在发布包时，这个数组里的包都会被打包打包到最终的发布包里，需要注意 bundledDependencies 中的包必须是在 devDependencies 或 dependencies 声明过的。

### 20、bin 字段

bin 项用来指定各个内部命令对应的可执行文件的位置。

```js
"bin": {
  "someTool": "./bin/someTool.js"
}

scripts: {
  start: './node_modules/bin/someTool.js build'
}

// 简写为

scripts: {
  start: 'someTool build'
}
```

### 21、main 字段

main 字段指定了加载的入口文件，require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。

### 22、config 字段

config 字段用于添加命令行的环境变量。

```js
// package.json文件。
{
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
// 在server.js脚本就可以引用config字段的值。
http
  .createServer(...)
  .listen(process.env.npm_package_config_port)
// 用户执行npm run start命令时，这个脚本就可以得到值。

// 用户可以改变这个值。使用npm config set foo:port 80
```

### 23、engines 字段

engines 字段指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。

```js
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
```

该字段也可以指定适用的 npm 版本。

```js
{ "engines" : { "npm" : "~1.0.20" } }
```

### 初始化 package.json 文件

npm init 执行该命令会问几个基本问题，如包名称、版本号、作者信息、入口文件、仓库地址、许可协议等，多数问题已经提供了默认值，你可以在问题后敲回车接受默认值

也可以使用 npm init -f（意指 --force，或者使用 --yes）告诉 npm 直接跳过参数问答环节，快速生成 package.json。

初始化 package.json 时的字段默认值是可以自己配置的，将默认配置和 -f 参数结合使用，能让你用最短的时间创建 package.json

```
npm config set init.author.email "1287530097@qq.com"
npm config set init.author.name "randy"
npm config set init.author.url "https://github.com/sc950828"
npm config set init.license "ISC"
npm config set init.version "1.0.0"
```

### npm run

作为 npm 内置的核心功能之一，npm run 实际上是 npm run-script 命令的简写。当我们运行 npm run xxx 时，基本步骤如下：

- 从 package.json 文件中读取 scripts 对象里面的全部配置；
- 以传给 npm run 的第一个参数作为键，本例中为 xxx，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
- 在系统默认的 shell 中执行上述命令，系统默认 shell 通常是 bash，windows 环境下可能略有不同。

npm 在执行指定 script 之前会把 node_modules/.bin 加到环境变量 `$PATH` 的前面，这意味着任何内含可执行文件的 npm 依赖都可以在 npm script 中直接调用，换句话说，你不需要在 npm script 中加上可执行文件的完整路径，比如 `./node_modules/.bin/eslint **.js`。

### 运行多个 npm script

让多个 npm script 串行我们使用 && 符号连接多个 script

```js
// 需要注意的是，串行执行的时候如果前序命令失败（通常进程退出码非0），后续全部命令都会终止
"test": "npm run lint:js && npm run lint:css && npm run lint:json"
```

让多个 npm script 并行我们使用 & 符号连接多个 script

```js
"test": "npm run lint:js & npm run lint:css & npm run lint:json"

// 并行的缺点是结果在最后输出 我们可以加上 & wait，而且可以使用 ctrl + c 来结束那些wait的进程 比如启用了 mocha 的 --watch 配置。 但是wait这条命令适合在 linux 下面
"test": "npm run lint:js & npm run lint:css & npm run lint:json & wait"
```

我们也还可以利用 npm 包 npm-run-all 来使 script 串行或并行

```js
// 安装
npm i npm-run-all -D

// 串行
"test": "npm-run-all lint:js lint:css lint:json"
// 或者通配符写法
"test": "npm-run-all lint:*"
// 并行 我们并不需要在后面增加 & wait，因为 npm-run-all 已经帮我们做了
"test": "npm-run-all --parallel lint:*"

// npm-run-all 还提供了很多配置项支持更复杂的命令编排，比如多个命令并行之后接串行的命令，感兴趣的请阅读文档
// https://github.com/mysticatea/npm-run-all/blob/HEAD/docs/npm-run-all.md
```

### 给 npm script 传递参数和添加注释和日志级别控制

传递参数我们使用 -- 符号

```js
"lint:js": "eslint *.js",
"lint:js:fix": "eslint *.js --fix"
// 我们可以使用如下命令 达到 npm run lint:js:fix相同的效果
npm run lint:js -- --fix
```

添加注释我们使用# 因为命令的本质是 shell 命令（适用于 linux 平台）

```js
"test": "# 运行所有代码检查 \n    npm-run-all --parallel lint:*"
```

日志级别控制

默认日志输出级别 即不加任何日志控制参数得到的输出，可能是你最常用的，能看到执行的命令、命令执行的结果。

显示尽可能少的有用信息 需要使用 --loglevel silent，或者 --silent，或者更简单的 -s 来控制，这个日志级别的输出只有命令本身的输出，读起来非常的简洁

```js
// 注意如果执行各种 lint script 的时候启用了 -s 配置，代码都符合规范的话，你不会看到任何输出
npm run lint:js -s
```

显示尽可能多的运行时状态 排查脚本问题的时候比较有用，需要使用 --loglevel verbose，或者 --verbose，或者更简单的 -d 来控制，这个日志级别的输出详细打印出了每个步骤的参数、返回值

```js
npm run lint:js -d
```

### 使用 npm script 的钩子

npm script 的设计者为命令的执行增加了类似生命周期的机制，具体来说就是 pre 和 post 钩子脚本。这种特性在某些操作前需要做检查、某些操作后需要做清理的情况下非常有用。

举例来说，运行 npm run test 的时候，分 3 个阶段：

- 检查 scripts 对象中是否存在 pretest 命令，如果有，先执行该命令；
- 检查是否有 test 命令，有的话运行 test 命令，没有的话报错；
- 检查是否存在 posttest 命令，如果有，执行 posttest 命令；

### 在 npm script 中使用变量

使用预定义变量，通过运行 npm run env 就能拿到完整的变量列表

变量的使用方法遵循 shell 里面的语法，直接在 npm script 给想要引用的变量前面加上 `$` 符号即可。在 windows 下使用%

```js
// linux mac
"dummy": "echo $npm_package_name"
// windows
"dummy": "echo %npm_package_name%"
```

除了预定义变量外，我们还可以在 package.json 中添加自定义变量，并且在 npm script 中使用这些变量。

在 package.json 文件里面使用 config 字段配置自定义变量

```js
"config": {
  "port": 3000
}
```

linux 和 mac 环境下我们使用`$npm_package_config_port`来获取到我们自定义的变量。windows 下使用%npm_package_config_port%来获取到我们自定义的变量。

注意我们在 config 字段里面不能使用 npm run env 输出来的预定义变量。

windows 环境下建议使用 git bash 来运行 npm script，使用 windows 自带的 cmd 可能会遇到比较多的问题

### 实现 npm script 跨平台兼容

Linux、Mac 平台做开发，所有的 npm script 都会顺利运行，但是 Windows 下面可能就比较痛苦了，因为不是所有的 shell 命令都是跨平台兼容的，甚至各种常见的文件系统操作也是不兼容的。

文件系统操作的跨平台兼容

- 使用 rimraf 或 del-cli，用来删除文件和目录，实现类似于 rm -rf 的功能；
- 使用 cpr，用于拷贝、复制文件和目录，实现类似于 cp -r 的功能；
- 使用 make-dir-cli，用于创建目录，实现类似于 mkdir -p 的功能；

用 cross-var 引用变量

Linux 和 Windows 下引用变量的方式是不同的，Linux 下直接可以用 `$npm_package_name`，而 Windows 下必须使用 `%npm_package_name%`，我们可以使用 cross-var 实现跨平台的变量引用

```js
// 安装
npm i cross-var -D
// 使用
"cover:open": "cross-var opn http://localhost:$npm_package_config_port",

// 可能发现引入 cross-var 之后，它竟然给我们安装了 babel，如果想保持依赖更轻量的话，可以考虑使用 cross-var-no-babel
```

用 cross-env 设置环境变量

```js
// 安装
npm i cross-env -D
// 使用
"test": "cross-env NODE_ENV=test mocha tests/",
```

### 用 node.js 脚本替代复杂的 npm script

Node.js 丰富的生态能赋予我们更强的能力，对于前端工程师来说，使用 Node.js 来编写复杂的 npm script 具有明显的 2 个优势：首先，编写简单的工具脚本对前端工程师来说额外的学习成本很低甚至可以忽略不计，其次，因为 Node.js 本身是跨平台的，用它编写的脚本出现跨平台兼容问题的概率很小。

```js
// 安装
npm i shelljs -D
npm i chalk -D // 使用 chalk 来给输出加点颜色，让脚本变的更有趣 不是必须的

// 创建脚本文件
touch scripts/cover.js

// 编写脚本
const { rm, cp, mkdir, exec, echo, env } = require('shelljs');
const chalk = require('chalk');
const npm_package_version = env['npm_package_version'];

console.log(chalk.green('1. remove old coverage reports...'));
rm('-rf', 'coverage');
rm('-rf', '.nyc_output');

console.log(chalk.green('2. run test and collect new coverage...'));
exec('nyc --reporter=html npm run test');

console.log(chalk.green('3. archive coverage report by version...'));
mkdir('-p', 'coverage_archive/' + npm_package_version);
cp('-r', 'coverage/*', 'coverage_archive/' + npm_package_version);

console.log(chalk.green('4. open coverage report for preview...'));
exec('npm-run-all --parallel cover:serve cover:open');

// 在package.json里面配置script
"cover": "node scripts/cover.js",
```

### 在 Git Hooks 中执行 npm script

有 pre-commit、pre-push、 husky，相比较而言 husky 更好用，它支持更多的 Git Hooks 种类，再结合 lint-staged 使用就更溜。

```js
// 安装
npm i husky lint-staged -D

// 在scripts 对象中增加 husky 能识别的 Git Hooks 脚本
"precommit": "npm run lint",
"prepush": "npm run test"

// 但是在大型项目、遗留项目中接入过 lint 工作流的同学可能深有体会，每次提交代码会检查所有的代码，
// 可能比较慢就不说了，接入初期 lint 工具可能会报告几百上千个错误，这时候估计大多数人内心是崩溃的，
// 尤其是当你是新规范的推进者，遇到的阻力会增大好几倍，毕竟大多数人不愿意背别人的锅，坏笑。
// 我们有 lint-staged 来缓解这个问题，每个团队成员提交的时候，只检查当次改动的文件
  "scripts": {
    "precommit": "lint-staged",
    "prepush": "npm run test",
    "lint": "npm-run-all --parallel lint:*",
  },
  "lint-staged": {
    "*.js": "eslint",
    "*.less": "stylelint",
    "*.css": "stylelint",
    "*.json": "jsonlint --quiet",
    "*.md": "markdownlint --config .markdownlint.json"
  }
```
