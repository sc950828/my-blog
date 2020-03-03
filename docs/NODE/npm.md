1. npm是什么？
  npm是node的包管理工具 node package manage

2. npm install moduleName和npm install -g moduleName区别，也就是本地安装和全局安装的区别？
  npm install moduleName是本地安装，会在运行当前命令的目录下创建node_module文件夹，并把模块安装到该目录下面。项目中要使用的话可以直接require。
  npm install -g moduleName是全局安装，可以在命令行直接使用，全局模块的真实安装路径在C:\Users\admin\AppData\Roaming\npm下。

3. npm install --save和npm install --save-dev的区别？
  npm install --save会修改package.json文件，将模块名和版本号添加到dependencies,生产环境会用到。
  npm install --save-dev会修改package.json文件，将模块名和版本号添加到devDependencies，开发环境会用到。
  这两种安装模块的方法都会修改package.json文件，使用npm install时会自动根据package.json里面的依赖进行安装。
  如果没有指定--save或者--save-dev默认是--save，会把依赖写到dependencies中。

4. -S和-D是什么意思？
  -S就是--save -D就是--save-dev的缩写。

5. npm install会安装什么 npm install --production会安装什么？
  如果没有在npm install 后面具体指定安装什么模块的话，会安装dependencies和devDependencies两个环境的依赖。
  如果使用npm install --production就会只安装dependencies中的依赖。

6. 如果只需要安装devDependencies中的依赖怎么办？
  使用npm install --only=dev

7. 怎么获取全局安装的模块的路径？
  通过npm config get prefix可以获取全局安装的模块的路径。

8. npm start
  npm start = npm run start

9. 查看安装的包
  查看全局安装的包 npm list -g --depth 0  带上depth 0 会简单清晰点
  查看本地安装的包 npm list  --depth 0  带上depth 0 会简单清晰点

10. nodemon
  使用node做后台的时候，我们每次修改代码并不能更新，需要重启项目，很麻烦，使用nodemon就可以很方便的解决这个问题。改动自动刷新。
  npm install nodemon -g 全局安装就行，就可以使用了

11. 前后端连载
  使用concurrently，就是一个命令可以启动多个项目，一般我们配置同时启动前后端。
  第一步：安装concurrently npm install concrrently -D
  第二步： 配置命令 在根目录的package.json配置命令
    假如后端是根目录启动是 "start": "node server.js",
    前端(client)配置在根目录，命令需要加前缀 "client": "npm start --prefix client",
    配置前后端连载使用concrrently，配置 "dev": "concurrently \"npm run start\" \"npm run client\""
    这样使用npm run dev就能把前后端两个项目一起启动起来
    这条命令是用来安装前端模块的，可以不配置"client-install": "npm install --prefix client",

12. 服务器上部署nodejs后台
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

13. 包安装升级卸载
  npm install moduleName 本地安装
  npm install moduleName -g 全局安装
  npm uninstall moduleName 本地卸载
  npm uninstall moduleName -g 全局卸载
  npm update moduleName 本地更新包
  npm update moduleName -g 全局更新包

14. npx
  npm 从5.2版开始，增加了 npx 命令.
  当在执行npx <command>的时候，npx会做什么事情？
    帮你在本地（可以是项目中的也可以是本机全局安装的）寻找这个 command
      找到了： 就用本地的版本
      没找到：
    使用完之后不会在你的本机或者项目留下任何东西，会自动删除掉。
  意思就是npx可以本地安装模块，然后使用起来像全局安装的模块一样方便，可以到处使用

15. npm发布自己的package
  先创建自己的项目
  npm login 输入用户名 密码 邮箱
  npm publish 发布(每次发布需要更新版本号 npm version 版本，版本号不能是之前的)

16. node_modules
  首先项目运行时，遇见代码中的 require('xxxx') 请求模块时，会先在当前目录下寻找 node_modules 文件夹，
  然后在其中如果找到某个模块，则读取其 package.json 文件，找到 入口模块 main 字段，执行相应的 js 程序，
  如果当前目录没有找到 node_modules 文件夹，则继续往上一层寻找，一层层抽丝拨茧，直到世界的尽头（当前项目路径的根目录），
  如果还没找到，就报错啦（提示找不到）

17. browserslist
  表示我们插件在哪些浏览器里面兼容
  这个配置我们既可以放在package.json里面也可以单独配置在.browserslistrc文件中
  比如package.json配置
    "browserslist": [
      "> 1%", // 表示包含所有使用率 > 1% 的浏览器
      "last 2 versions", // 表示包含浏览器最新的两个版本
      "not ie <= 8" // 表示不包含 ie8 及以下版本
    ]
  至于它是如何去衡量浏览器的使用率和版本的，数据都是来源于 Can I Use