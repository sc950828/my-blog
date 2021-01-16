### 什么是 yarn？

“Yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。

### 安装

```shell
# 安装 是一个npm包
npm install -g yarn
# 查看版本
yarn --version
```

### 命令对比

```js

// 安装到生产依赖
npm install react --save
yarn add react

// 卸载
npm uninstall react --save
yarn remove react

// 安装到开发依赖
npm install react --save-dev
yarn add react --dev

// 更新
npm update --save
yarn upgrade

// 全局安装
npm install -g xx
yarn global add xx
```

### 其他常用命令

```shell
# 查询当前工作文件夹所有的依赖
yarn list
# 查看包信息，可以查看特定
yarn info <package> [<field>]
```

### Yarn 的优点？

速度快 。速度快主要来自以下两个方面：

- 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
- 离线模式：如果之前已经安装过一个软件包，用 Yarn 再次安装时之间从缓存中获取，就不用像 npm 那样再从网络下载了。

安装版本统一：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。但是 npm5 做了类似的优化。

更简洁的输出：npm 的输出信息比较冗长。在执行 npm install 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji 直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。

更好的语义化： yarn 改变了一些 npm 命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。
