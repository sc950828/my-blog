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

### 7、怎么获取全局安装的模块的路径？

通过 npm config get prefix 可以获取全局安装的模块的路径。

### 8、npm start

npm start = npm run start

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

### 14、npx

    npm 从5.2版开始，增加了 npx 命令.
    当在执行npx <command>的时候，npx会做什么事情？
      帮你在本地（可以是项目中的也可以是本机全局安装的）寻找这个 command
        找到了： 就用本地的版本
        没找到： 下载到本地
      使用完之后不会在你的本机或者项目留下任何东西，会自动删除掉。
    意思就是npx可以本地安装模块，然后使用起来像全局安装的模块一样方便，可以到处使用，使用完后自动删除。

### 15、npm 发布自己的 package

    先创建自己的项目
    npm login 输入用户名 密码 邮箱
    npm publish 发布(每次发布需要更新版本号 npm version 版本，版本号不能是之前的)

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

### 19、peerDependencies

peerDependencies 字段，就是用来供插件指定其所需要的主工具的版本。

比如 A 模块是 B 模块的插件。用户安装的 B 模块是 1.0 版本，但是 A 插件只能和 2.0 版本的 B 模块一起使用。这时，用户要是将 1.0 版本的 B 的实例传给 A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果 A 和 B 一起安装，那么 B 必须是 2.0 模块。

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
