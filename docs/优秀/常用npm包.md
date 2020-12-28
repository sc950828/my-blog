## 💻 前端框架

### 1.[React](https://www.npmjs.com/package/react)

`React` 使用虚拟 `DOM` 将页面的各个部分作为单独的组件进行管理，从而允许你刷新组件而不刷新整个页面。 通常与 [React-dom](https://www.npmjs.com/package/react-dom) 和 [React-router-dom](https://www.npmjs.com/package/react-router-dom) 一起使用。

### 2.[Vue](https://www.npmjs.com/package/vue)

`Vue` 是通过结合 `React` 和其他库的最佳实践而构建出来的，专注于编写更快，更轻松，更愉快 `Web` 应用程序， 它拥有出色的文档。 通常与 [Vue-router](https://www.npmjs.com/package/vue-router) 和 [Vuex](https://www.npmjs.com/package/vuex) 一起使用。

### 3.[Svelte](https://www.npmjs.com/package/svelte)

`Svelte` 是构建 `web` 应用程序的一种新方法。它是一个编译器，它接受声明性组件并将它们转换为高效的 `JavaScript`，从而像动手术一样更新 `DOM`。

_其他值得注意的框架包括 [Angular](https://www.npmjs.com/package/angular),&nbsp; [Ember](https://www.npmjs.com/package/ember),&nbsp; [Backbone](https://www.npmjs.com/package/backbone),&nbsp; [Preact](https://www.npmjs.com/package/preact) 等。 你可以对其中任何一个进行神奇的操作，黄金法则是早点学习 [现代 JS（ES6 及更高版本）](https://javascript.info/)。_

## 🎨 样式框架

### 4.[Bootstrap](https://www.npmjs.com/package/bootstrap)

在用于构建响应式、移动端开发优先的网站方面，是全球的最受欢迎的框架。 直观而强大，但体积相对较大。 许多现代的 UI 工具包都基于它，例如 [React Bootstrap](https://www.npmjs.com/package/react-bootstrap) 或 [Reactstrap](https://www.npmjs.com/package/reactstrap)。

### 5.[Tailwind](https://www.npmjs.com/package/tailwindcss)

一种低级别的，比较实用的 CSS 框架，用于快速 UI 开发。从基础上开始建立，并且能够实现超级可定制。

### 6.[Styled-components](https://www.npmjs.com/package/styled-components)

在组件和样式之间架起桥梁的 `CSS-in-JS` 工具，提供了大量的特性，让你以一种功能性和可重用的方式启动和运行样式组件。

_其他出色的解决方案包括&nbsp;[Foundation](https://www.npmjs.com/package/foundation-sites),&nbsp;[Bulma](https://www.npmjs.com/package/bulma),&nbsp;[Materialize](https://www.npmjs.com/package/materialize-css)&nbsp;and&nbsp;[Ant Design](https://www.npmjs.com/package/antd).如果你喜欢编写普通的 CSS，则可以使用一些 `CSS` 扩展语言，例如&nbsp;[SASS](https://www.npmjs.com/package/sass) 来扩展其功能。_

## 🔲 后端框架

### 7.[Express](https://www.npmjs.com/package/express)

为 `Node.js` 提供了快速、无约束、极简的 `web` 框架。它是相对较小的，并有较多可用的插件特性。通常被称为 `Node.js` 的标准服务器框架。

### 8.[Hapi](https://www.npmjs.com/package/@hapi/hapi)

`Hapi` 最初用于 `Express` 框架。使用 `Hapi`，你可以以最小的开销和完全开箱即用的功能构建功能强大、拓展性强的应用程序。

### 9.[Sails](https://www.npmjs.com/package/sails)

`Sails` 是最流行的 `Node.js MVC` 框架，支持现代应用程序的需求：具有可扩展的，面向服务结构的数据驱动 `API`。

_与前端框架相同，还有很多后端替代方案，例如&nbsp;[Adonis](https://www.npmjs.com/package/@adonisjs/cli)&nbsp;和&nbsp;[Koa](https://www.npmjs.com/package/koa)。选择一个适合你的需求并充分学习它。_

## 🔗 CORS 和请求

### 10.[Cors](https://www.npmjs.com/package/cors)

`Node.js` 中间件，提供了各种选项，用于实现跨域资源共享的 `Connect / Express` 中间件。

### 11.[Axios](https://www.npmjs.com/package/axios)

基于 `Promise` 的 `HTTP` 客户端，用于浏览器和 `Node.js`。 与 `JS` 内置 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 相比，它易于设置，直观且简化了很多工作。

### 12.[Body-parser](https://www.npmjs.com/package/body-parser)

主体解析中间件，它提取传入请求流的整个主体部分，并将其公开在 `req.body` 上，以便与之交互。

## 🧩 API 服务

### 13.[Restify](https://www.npmjs.com/package/restify)

一个 `Node.js web` 服务框架，为构建语义化的 `RESTful web` 服务进行了优化，可以大规模生产使用。`Restify` 优化了自省和性能。

### 14.[GraphQL](https://www.npmjs.com/package/graphql)

用于 `api` 的查询语言和用于对运行时的现有数据执行查询。提供 `API` 中数据的完整描述，使客户端能够准确地要求他们所需要的数据。

## 🤝 Web sockets

### 15.[Socket.io](https://www.npmjs.com/package/socket.io)

`Socket.IO` 支持实时，双向和基于事件的通信。 它可以在每个平台，浏览器或其他设备上运行，并同时关注可靠性和速度。

### 16.[WS](https://www.npmjs.com/package/ws)

简单易用，快速且经过全面测试的 `WebSocket` 客户端和服务器实现。 一个很好的，不太抽象的，`Socket.io` 的替代方案。

## ✍ 日志

### 17.[Morgan](https://www.npmjs.com/package/morgan)

具体来说，它是一个 `HTTP` 请求记录器，存储 `HTTP` 请求，并为你提供有关应用程序如何使用以及可能存在潜在错误的简要信息。

### 18.[Winston](https://www.npmjs.com/package/winston)

一个几乎所有内容的日志记录器，支持多种传输方式。它存储的时间比 `Morgan` 长，它也有一个更大的维护者社区和更多的下载。

## 💾 数据库工具

### 19.[Mongoose](https://www.npmjs.com/package/mongoose)

`Mongoose` 是一个 `MongoDB` 对象建模工具，设计用于在异步环境中工作。`Mongoose` 支持 `Promise` 和回调。

### 20.[Sequelize](https://www.npmjs.com/package/sequelize)

`Sequelize` 是一个基于 `Promise` 的 `Node.js` `ORM` 工具，适用于 `Postgres`、MySQL、MariaDB、SQLite 和 Microsoft SQL Server。它具有可靠的事务支持、关系、即时和延迟加载、读取复制等特性。

## 🔓 授权工具

### 21.[Passport](https://www.npmjs.com/package/passport)

`Passport` 的目的是通过一组可扩展的插件(称为策略)对请求进行身份验证。向`Passport` 提供一个身份验证请求，`Passport` 提供钩子来控制身份验证成功或失败时发生的操作。

### 22.[Bcrypt](https://www.npmjs.com/package/bcrypt)

它是可以帮助你生成哈希密码的库。`Bcrypt` 是由 `Niels Provos` 和 `David Mazieres` 基于 `Blowfish cipher` 设计的密码哈希函数，并于 1999 年在 USENIX 上展出。

### 23.[JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)

`JSON Web` 令牌(JWT)是一种开放的、行业标准的 `RFC 7519` 方法，用于在双方之间安全地表示声明。这个包允许你解码、验证和生成 JWT。

## 🔧 配置模块

### 24.[Config](https://www.npmjs.com/package/config)

设置存储在应用程序中的配置文件中，可以由环境变量、命令行参数或外部源覆盖和扩展。

### 25.[Dotenv](https://www.npmjs.com/package/dotenv)

零依赖模块，将环境变量从 `.env` 文件加载到 `process.env`。

## 📃 静态网站生成器

### 26.[Gatsby](https://www.npmjs.com/package/gatsby)

一个现代的网站生成器，可以创建快速，高质量，动态的 `React` 应用程序，从博客到电子商务网站再到用户仪表板。具有很棒的插件生态系统和模板。

### 27.[NextJS](https://www.npmjs.com/package/next)

`NextJS` 首先支持服务器渲染以及静态生成的内容。 你还可以将 `serverless` 功能定义为 `API` 端点。

### 28.[NuxtJS](https://www.npmjs.com/package/nuxt)

在 `Vue` 的生态系统中，`NuxtJS` 基本上是 `NextJS` 的替代品。`NuxtJS` 的目标是让 `web` 开发功能强大，并且让开发者具有良好的开发意识。

## 🌟 模板语言

### 29.[Mustache](https://www.npmjs.com/package/mustache)

`Mustache` 是一种无逻辑的模板语法。它可以用于 `HTML`，配置文件，源代码等任何东西。它的工作原理是使用 hash 或对象中提供的值在模板中展开标记。

### 30.[Handlebars](https://www.npmjs.com/package/handlebars)

使用模板和输入对象生成 `HTML` 或其他文本格式。`Handlebars` 模板看起来像一个嵌入了把手表达式的正则文本。`Handlebars` 很大程度上与 `Mustache` 模板兼容。

### 31.[EJS](https://www.npmjs.com/package/ejs)

`EJS` 是一种简单的模板语言，可让你使用简单的语法，快速的执行和简单的调试 `JavaScript` 来生成 `HTML` 标记。`EJS` 拥有大量的活跃用户社区，并且该库正在积极开发中。

### 📷 图像处理

### 32.[Sharp](https://www.npmjs.com/package/sharp)

一个很好的模块，可以将常见格式的大图像转换为较小的，对网络友好的，不同尺寸的 JPEG，PNG 和 WebP 图像。

### 33.[GM](https://www.npmjs.com/package/gm)

多亏了 `Node.js` 模块 `GM`，你可以使用两个流行的工具—— `GraphicsMagick` 和 `ImageMagick` 直接在代码中创建，编辑，合成和转换图像。

### 34.[Cloudinary](https://www.npmjs.com/package/cloudinary)

一个专用模块可简化与云服务的协作，该解决方案为 `Web` 应用程序的整个图像管理管道提供了解决方案。

## 📅 日期格式化

### 35.[DayJS](https://www.npmjs.com/package/dayjs)

`DayJS` 是 [MomentJS](https://www.npmjs.com/package/moment)&nbsp;（自 2020 年 9 月起处于维护模式）的一种快速、轻巧的替代方案。它们的 `API` 使用类似，如果你使用过`MomentJS`，则已经知道如何使用大多数 `DayJS`。

### 36.[Luxon](https://www.npmjs.com/package/luxon)

如果你喜欢另一个轻量级替代方案，并且 `API` 稍有不同，那么 `Luxon` 可能是你的正确选择。

## 🧙‍♂️ 数据生成器

### 37.[Shortid](https://www.npmjs.com/package/shortid)

创建非常短无序的 `url` 友好的唯一 `ID`。 非常适合网址缩短、数据库 `ID` 和其他任何 `ID`。

> 译者注：看到官方不推荐再使用，而是推荐使 [nanoid](https://github.com/ai/nanoid/)

### 38.[Uuid](https://www.npmjs.com/package/uuid)

方便而且体积小的包，可以快速、轻松地生成更复杂的通用惟一标识符(UUIDs)。

### 39.[Faker](https://www.npmjs.com/package/faker)

实用的 `npm` 包，用于在浏览器和 `Node.js` 中制造大量假数据。

## ✅ 校验工具

### 40.[Validator](https://www.npmjs.com/package/validator)

便捷的字符串验证器，使程序更加健壮的库。许多有用方法，例如 `isEmail()`，`isCreditCard()`，`isDate()` 和 `isURL()`。

### 41.[Joi](https://www.npmjs.com/package/joi)

强大的 `JavaScript` `schema` 描述语言和数据验证器。

## 📧 表单和邮件

### 42.[Formik](https://www.npmjs.com/package/formik)

`Formik` 是 `React` 和 `React Native` 的一个流行开源表单库。它具有易于使用、声明性和适应性的特点。

### 43.[Multer](https://www.npmjs.com/package/multer)

`Multer` 是用于 `multipart/form-data` 数据格式的 `Node.js` 中间件，主要用于上传文件。

### 44.[Nodemailer](https://www.npmjs.com/package/nodemailer)

`Nodemailer` 是 `Node.js` 应用程序的一个模块，允许轻松发送电子邮件。这个项目从 2010 年就开始了，现在它是大多数 `Node.js` 用户默认使用的解决方案。

## 🧪 测试

### 45.[Jest](https://www.npmjs.com/package/jest)

`Jest` 是一个令人愉快的 `JavaScript` 测试框架，专注于简洁明快。它允许你使用易于使用、熟悉且功能丰富的 `API` 编写测试，从而快速获得结果。

### 46.[Mocha](https://www.npmjs.com/package/mocha)

`Mocha` 是一个 `JavaScript` 测试框架，使得异步测试简单而有趣。`Mocha` 测试是串行运行的，在将未捕获的异常映射到正确的测试用例的同时，允许进行灵活和准确的报告。

## 💫 Web 抓取和自动化

### 47.[Cheerio](https://www.npmjs.com/package/cheerio)

`Cheerio` 广泛用于 `web` 抓取工作，有时也用于自动执行任务。它非常快，因为它是基于 `jquery` 的。`Cheerio` 安装了 `Parse5` 解析器，能够解析任何类型的 `HTML` 和 `XML` 文档。

### 48.[Puppeteer](https://www.npmjs.com/package/puppeteer)

`Puppeteer` 被广泛用于自动执行浏览器任务，并且只能与谷歌 `chrome` 无头浏览器(即 `chromium`)一起工作。`Puppeteer` 还可以用于 `web` 抓取任务。与 `Cheerio` 模块相比，它功能强大，功能丰富。

## 🌷 检测和格式化工具

### 49.[ESLint](https://www.npmjs.com/package/eslint)

`ESLint` 是用于识别和报告 `ECMAScript / JavaScript` 代码中的书写方式的工具。 `ESLint` 是完全插件化的，每个规则都是一个插件，你可以在运行时添加更多内容。

### 50.[Prettier](https://www.npmjs.com/package/prettier)

`Prettier` 是一种固执己见的代码格式化程序。它通过解析代码并使用自己的规则(考虑到最大行的长度)重新打印代码，以及在必要时包装代码，来强制执行一致的样式。

## 📦 模块打包和压缩器

### 51.[Webpack](https://www.npmjs.com/package/webpack)

一个著名的功能强大的模块打包器。它的主要目的是将 `JavaScript` 文件打包以便在浏览器中使用，但它也能够转换、捆绑或打包任何资源。

### 52.[HTML-Minifier](https://www.npmjs.com/package/html-minifier)

轻巧，高度可配置且经过良好测试的基于 `Javascript` 的 `HTML` 压缩器/压缩器（支持 `Node.js`）。

### 53.[Clean-CSS](https://www.npmjs.com/package/clean-css)

适用于 `Node.js` 平台和任何现代浏览器的快速高效的 `CSS` 优化器。 具有高度可配置和多种兼容模式。

### 54.[UglifyJS2](https://www.npmjs.com/package/uglify-js)

`JavaScript` 解析器，压缩程序和美化工具包。 它可以使用多个输入文件，并支持许多配置选项。

## 👨‍💻 进程管理和运行

### 55.[Nodemon](https://www.npmjs.com/package/nodemon)

在 `Node.js` 应用程序的开发过程中使用的简单的监控脚本。对于开发非常有用，因为它非常容易重启，并且默认启用了文件监听

### 56.[PM2](https://www.npmjs.com/package/pm2)

带有内置负载均衡的 `Node.JS` 应用程序的生产进程管理器。 更全面，更适合生产，给你很多参数以进行调整功能

### 57.[Concurrently](https://www.npmjs.com/package/concurrently)

简单而直接——这是同时运行多个命令的有用工具。

## 🚧 CLI 和调试工具

### 58.[Commander](https://www.npmjs.com/package/commander)

提供一个连贯的 `API`，用于定义 `CLI` 应用程序的各个方面，如命令、选项、别名和帮助。简化了命令行应用程序的创建。

### 59.[Inquirer](https://www.npmjs.com/package/inquirer)

一个易于嵌入且美观的 `Node.js` 命令行界面。 提供了很棒的查询会话流程。

### 60.[Chalk](https://www.npmjs.com/package/chalk)

`Chalk` 是一个非常简单的库，创建它的目的很简单——给你的终端字符串添加样式。

### 61.[Debug](https://www.npmjs.com/package/debug)

一个很小的 `JavaScript` 调试实用程序。 只需将一个函数的名称传递给模块，它就会返回一个经过修饰的 `console.error` 版本，以便你将调试语句传递给该模块。

## 🧰 工具库

### 62.[Lodash](https://www.npmjs.com/package/lodash)

现代化的 `JavaScript` 实用程序库，提供模块化，高性能以及其他功能。 公开关于 `JavaScript` 数组，对象和其他数据结构的许多有用方法。

### 63.[Underscore](https://www.npmjs.com/package/underscore)

`Underscore` 提供了许多常用的功能工具以及更专业的工具：函数绑定，`javascript` 模板，创建快速索引，深度相等测试等。

### 64.[Async](https://www.npmjs.com/package/async)

`Async` 是一个实用模块，它为异步 `JavaScript` 提供了直接、强大的功能。

## 🔩 系统模块

### 65.[Fs-extra](https://www.npmjs.com/package/fs-extra)

`fs -extra` 包含了 `Node.js` `fs` 包中没有包含的方法，比如 `copy()`,&nbsp;`remove()`,&nbsp;`mkdirs()`

### 66.[Node-dir](https://www.npmjs.com/package/node-dir)

用于一些常见目录和文件操作的模块，包括用于获取文件数组、子目录和用于读取和处理文件内容的方法。

### 67.[Node-cache](https://www.npmjs.com/package/node-cache)

一个简单的缓存模块，具有设置，获取和删除方法的功能，类似于[memcached](https://memcached.org/)。 key 值可以具有一个超时设置（ttl），在此时间之后它们将过期并从缓存中删除。

## 🧷 其它:

### 68.[Helmet](https://www.npmjs.com/package/helmet)

通过设置各种 `HTTP` 头部来帮助你保护应用程序。 它是 `Connect` 风格的中间件，兼容 `Express` 等框架。

### 69.[PDFKit](https://www.npmjs.com/package/pdfkit)

`DFKit` 是一个用于 `Node` 和浏览器的 `PDF` 文档生成库，它可以轻松创建复杂、多页的可打印文档。

### 70.[CSV](https://www.npmjs.com/package/csv)

全面的 `CSV` 套件，结合了 4 个经过测试的软件包，可以生成，解析，转换和字符串化 `CSV` 数据。

### 71.[Marked](https://www.npmjs.com/package/marked)

用于解析 `markdown` 而不需要缓存或长时间阻塞的低级编译器。

### 72.[Randomcolor](https://www.npmjs.com/package/randomcolor)

一个用于生成有吸引力的随机颜色的小脚本。 你可以传递选项对象从而决定其产生的颜色类型。

### 73.[Pluralize](https://www.npmjs.com/package/pluralize)

该模块使用预先定义的规则列表，按顺序应用这些规则给指定单词单数或复数。 在许多情况下这很有用，例如基于用户输入的任何自动化。

### 74.[二维码](https://github.com/soldair/node-qrcode)

前端生成二维码
