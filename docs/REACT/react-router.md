### 1、路由使用

react-router 是完整的 react 的路由解决方案，它保持 UI 与 URL 的同步。在项目中我们使用的是最新的 v4 版。

需要注意的是，在开发中不应该直接安装 react-router，因为 👉：在 v4 版中 react-router 被拆分成三个包：react-router，react-router-dom，react-router-native 和 react-router-config。

- react-router：提供核心的路由组件和函数。
- react-router-dom：提供浏览器使用的路由组件和函数。
- react-router-native：提供 react-native 对应平台使用的路由组件和函数。

v4 相比于 v1、v2、v3 几乎是重写了，遵循 Just Component 的 API 设计理念。主要变更有：声明式、可组合

进行网站（将会运行在浏览器环境中）构建，我们应当安装 react-router-dom。因为 react-router-dom 已经暴露出 react-router 中暴露的对象与方法，因此你只需要安装并引用 react-router-dom 即可。
