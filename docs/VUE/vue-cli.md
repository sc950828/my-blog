### 1、创建 vue 项目

利用 vue-cli 创建 vue 应用，这里的 vue-cli 是 vue2.0 及以上版本，不适用 vue3.0。需要安装 mode.js，版本需要大于等于 6.0，大于等于 8.0 的最好，npm 需要大于等于 3.0

vue2.0 的安装

- 第一步： npm install -g vue-cli 全局安装 vue-cli。
- 第二步： vue init templateName projectName 使用 vue 初始化一个基于 templateName 的项目，项目名自定义。这里的 template 有很多，一般我们使用 webpack。（webpack-simple，browserify， browserify-simple 等）。这里会要你填写项目名，作者，描述，选择模块什么的，自己按情况选择填写就行了。
- 第三步： cd projectName 进入我们创建好的项目。
- 第四步： npm install 这里会根据 package.json 文件里面的依赖下载对应的模块。
- 第五步： npm run dev 运行 vue 项目。

vue3.0 的安装

- 第一步：npm install @vue/cli -g 全局安装@vue/cli
- 第二步：vue create paojectName 创建项目
- 第三步：cd paojectName 进入我们创建好的项目。
- 第四步： npm install 这里会根据 package.json 文件里面的依赖下载对应的模块。
- 第五步： npm run serve 运行 vue 项目。

### 2、vue 项目中怎么使用 elementui？

- 第一步： npm install element-ui --save 安装 elementui。
- 第二步： 在 main.js 中引入并使用。
  - import ElementUi from 'element-ui'
  - import 'element-ui/lib/theme-chalk/index.css'
  - Vue.use(ElementUi)
    - 其实在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，
    - zIndex 设置弹框的初始 z-index（默认值：2000）。Vue.use(Element, { size: 'small', zIndex: 3000 });

### 3、vue 项目中怎么使用国际化

- 第一步： 安装 vue-i18n npm install vue-i18n
- 第二步： 新建 lang 文件夹
- 第三步： 在 lang 文件夹里面新建 en.js 和 zh.js 里面 export default 一个 json 文件。就是键值对分别对应英文和中文。
- 第四步： 在 lang 文件夹里面新建 index.js，index.js 里面

```js
import Vue from "vue";
import VueI18n from "vue-i18n";
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import enLocale from "./en";
import zhLocale from "./zh";

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};

const i18n = new VueI18n({
  locale: Cookies.get("language") || "zh", // set locale  这里控制中英文显示，设置英文我们只需在前台页面选择英文的时候将变量locale变为‘en’即可
  messages // set locale messages
});
export default i18n;
```

- 第五步：在 main.js 中

```js
import i18n from "./lang";
import Element from "element-ui";

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});

new Vue({
  el: "#app",
  i18n,
  components: { App },
  template: "<App/>"
});
```

- 第六步： 使用

```js
    我们使用{{$t('key')}}调用就可以了。
```

### 4、vue 项目中怎么使用 axios?

- 第一步： npm install axios
- 第二步： 在 main.js 中引入并使用。axios 并不是 vue 插件，所以不能 使用 Vue.use(),为了解决这个问题，我们在引入 axios 之后，通过修改原型链，来更方便的使用。
  - import 'axios' from 'axios'
  - Vue.prototype.$axios = axios;在项目中就能使用this.$axios 调用 axios 的各种方法了。

### 5、vue 项目中怎么使用 router？

    第一步： npm install vue-router --save-dev
    第二步： 在main.js中引入并使用
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
    然后定义routes，就是路由数组，如果项目大路由多可以定义单独的路由js，然后import进来。
      const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
      ]
    创建 router 实例，然后传 routes 配置
      const router = new VueRouter({
        routes // (缩写) 相当于 routes: routes
      })
    创建和挂载根实例。记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
      const app = new Vue({
        router
      }).$mount('#app')
    通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
      this.$route.params.username
      this.$router.go(-1)

### 1、vue 项目中怎么使用 less？

    第一步： 安装less less-loader 就是 npm install less less-loader --save-dev
    第二步： 配置loader，在webpack.base.conf.js中加上如下配置即可。
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
      }

### 6、vue 项目怎么配置 favicon？

    第一步： 准备好favicon，放在项目的根目录
    第二步： 在index.html中加上 <link rel="shortcut icon" href="favicon.ico"  type="image/x-icon">
    第三步： 在webpack.dev.conf.js中加上favicon: 'favicon.ico'
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        favicon: './favicon.ico'
      }),

### 7、vue 项目怎么使用 vuex

    第一步： npm install vuex --save-dev 安装vuex
    第二步： 引入并使用
      import Vuex from 'vuex'
      Vue.use(Vuex)
      const store = new Vuex.Store({
        state: {
          count: 0
        },
        mutations: {
          increment (state) {
            state.count++
          }
        }
      })

    new Vue({
      el: '#app',
      store,//在vue实例上使用store
      template: '<App/>',
      components: { App }
    })

    通过this.$store访问store里面的东西

### 8、解决 vue 的跨域问题

    域名 协议 端口号三者有一个不同即为跨域
    假如我们前端项目在localhost:8080 后端项目在localhost:3000

    第一种：这种方法的本质是代理服务器
      在config文件夹下的index.js中进行配置
      在请求中我们使用/api代替http://localhost:3000
      proxyTable: {
        '/api': {
            target:'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
        }
      }

    第二种：CORS 跨来源资源共享。即在服务端配置header, 这种方式适用于别人请求我们的接口
      header('Access-Control-Allow-Origin:*');//允许所有来源访问
      header('Access-Control-Allow-Method:POST,GET,PUT,DELETE');//允许访问的方式
      注意
      如果请求头带了 Access-Control-Request-Headers 相应的服务端也要加 Access-Control-Allow-Headers 而且两个值相同。
      如果请求加了 withCredentials: true 服务端也要将此设为 true，
      服务端设置Access-Control-Allow-Credentials: true。在跨域的情况下是否允许发送cookie
      注意使用了cookie之后Access-Control-Allow-Origin不能设置为*,需使用具体的。

    第三种： nginx设置代理 这种方式适用于我们访问别人的后台接口
      第一步： 先安装nginx
      第二步： 把前端项目配置在nginx上
      第三步： 进行配置 访问/api就相当于访问http://192.168.10.1:8080
        客户端请求发送到代理服务器 代理服务器发送请求到真实服务器 真实服务器把结果返回给代理服务器 代理服务器把结果给客户端。

      http {
        server {
           listen 80;

           location /api{
                proxy_pass http://192.168.10.1:8080;
           }
        }
      }

### 9、vue 使用 echarts

    第一步: 安装 npm install echarts -D
    第二步: 引入使用 import echarts from 'echarts'  Vue.prototype.$echarts = echarts
    使用this.$echarts 就能绘图了

### 10、vue-cli

    static目录和assets目录
      src下面的assets目录存放的静态资源是会被webpack处理的
      static下面的静态资源是不会被webpack处理，会被直接复制过去。
        assetsSubDirectory: 'static' //这个是配置静态资源的目录
        assetsPublicPath: '/', //静态资源前缀 如果是/public 则引用静态资源的地方路径是/public/static

### 11、vue3

    环境变量
      在根目录创建文件
        .env                # 在所有的环境中被载入
        .env.local          # 在所有的环境中被载入，但会被 git 忽略
        .env.[mode]         # 只在指定的模式中被载入 development staging production
        .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
      一个环境文件只包含环境变量的“键=值”对: key=value  注意变量前缀必须是VUE_APP_  除了NODE_ENV和BASE_URL
      在不同的模式下会自动引入.evn.[mode]里面的变量，如果需要改变需要在使用命令的时候明确指定 "serve": "vue-cli-service serve --mode stage",
      权重
        .env.[mode].local > .env.[mode] > .env.local > .env
        除了相同配置项权重大的覆盖小的，不同配置项它们会进行合并操作，类似于 Javascript 中的 Object.assign 的用法。

### 12、vue 中使用 font-awesome

- 第一步 npm install font-awesome
- 第二步 在 main.js 引入 font-awesome/css/font-awesome.min.css

### 13、vue 中使用 bootstrap-vue

    安装
      npm install bootstrap-vue
    引用
      import BootstrapVue from 'bootstrap-vue'
      import 'bootstrap/dist/css/bootstrap.css'
      import 'bootstrap-vue/dist/bootstrap-vue.css'
      Vue.use(BootstrapVue)

### 14、vue2 和 vue3 的区别

- 创建方式不同 vue2 是 vue init webpack name, vue3 是 vue create name
- webpack 配置文件不同
  - vue2 在 build 文件夹里面 包括 webpack.base.conf.js webpack.dev.conf.js webpack.prod.conf.js
  - vue3 默认已经配置好 如需自定义新建 vue.config.js 文件配置即可

### 15、vue.config.js

- baseurl 其改变的其实是 webpack 配置文件中 output 的 publicPath 项，就是将项目地址加一个二级目录,比如你配置了 baseUrl: 'vue',你的首页就需要通过http://localhost:8080/vue/打开。在vue-cli.3.3版本后 baseUrl 被废除了，要写成 publicPath
- outputDir 这其实改变了 webpack 配置中 output 下的 path 项，修改了文件的输出路径。默认打包在 dist 文件夹下 如果你配置了 outputDir: 'output',打包的文件会在 output 下面
- productionSourceMap 该配置会修改 webpack 中 devtool 项的值为 source-map。该配置项用于设置是否为生产环境构建生成 source map，一般在生产环境下为了快速定位错误信息，我们都会开启 source map
- chainWebpack，chainWebpack 配置项允许我们更细粒度的控制 webpack 的内部配置
- configureWebpack，我们还可以使用 configureWebpack 更细粒度的控制 webpack 的内部配置，两者的不同点在于 chainWebpack 是链式修改，而 configureWebpack 更倾向于整体替换和修改。你可以在项目目录下运行 vue inspect 来查看你修改后的 webpack 完整配置
- devServer，提供了 devServer 项用于配置 webpack-dev-server 的行为

```js
    devServer: {
      open: true, // 是否自动打开浏览器页面
      host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
      port: 8080, // 端口地址
      https: false, // 使用https提供服务
      proxy: null, // string | Object 代理设置

      // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
      before: app => {
        // `app` 是一个 express 实例
      }
    }
```

### 16、h5 调试 vue

    npm install VConsole
    import Vconsole from 'VConsole'
    const vc = new VConsole()
