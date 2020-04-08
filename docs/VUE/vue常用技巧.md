### 1、require.context()

```js
const path = require("path");
const files = require.context("@/components/home", false, /\.vue$/);
const modules = {};
files.keys().forEach((key) => {
  const name = path.basename(key, ".vue");
  modules[name] = files(key).default || files(key);
});
components: modules;

// 在组件 或者store时候用引入文件可以用到
实际上是 webpack 的方法,vue 工程一般基于 webpack,所以可以使用
require.context(directory,useSubdirectories,regExp)
接收三个参数:
directory：说明需要检索的目录
useSubdirectories：是否检索子目录
regExp: 匹配文件的正则表达式,一般是文件名
```

### 2、watch 的立即执行和深度监听

```js
watch:{
  inpValObj:{
    handler(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
    },
    immediate: true, //立即执行 第一次会执行
    deep:true //深度监听 对象和数组的时候有用
  }
}
```

### 3、组件通讯

```js
props和$emit;
vuex
$attrs和$listeners
// 父组件
<home @change="change" title="这是标题" width="80" height="80" imgUrl="imgUrl"/>

// 子组件
props: {
  width: {
    type: String,
    default: ''
  }
},
mounted() {
  // 子使用父方法
  console.log(this.$listeners) //即可拿到 change 事件
  // attrs获取父传子未在 props 定义的值
  console.log(this.$attrs) //{title: "这是标题", height: "80", imgUrl: "imgUrl"}
}

provide和inject
$parent和$children
console.log(this.$parent) //可以拿到 parent 的属性和方法
console.log(this.$children) //可以拿到 一级子组件的属性和方法
$refs
  console.log(this.$refs.home) //即可拿到子组件的实例,就可以直接操作 data 和 methods
$root
console.log(this.$root) //获取根实例,最后所有组件都是挂载到根实例上
.sync
 // 父组件
<home :title.sync="title" />
//编译时会被扩展为
<home :title="title"  @update:title="val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}

EventBus
// 在 main.js
Vue.prototype.$eventBus=new Vue()

// 传值组件
this.$eventBus.$emit('eventTarget','这是eventTarget传过来的值')

// 接收组件
this.$eventBus.$on("eventTarget",v=>{
  console.log('eventTarget',v);//这是eventTarget传过来的值
})
```

### 4、路由懒加载

```js
webpack< 2.4 时
{
  path:'/',
  name:'home',
  components:resolve=>require(['@/components/home'],resolve)
}

webpack> 2.4 时
{
  path:'/',
  name:'home',
  components:()=>import('@/components/home')
}
```

### 5、递归组件

递归组件必须设置 name 和结束的阀值

### 6、函数式组件

定义:无状态,无法实例化，内部没有任何生命周期处理方法
规则:在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。
在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的特性都会被自动隐式解析为 prop
在 2.5.0 及以上版本中，如果你使用了单文件组件(就是普通的.vue 文件),可以直接在 template 上声明 functional 组件需要的一切都是通过 context 参数传递

context 属性有:
1.props：提供所有 prop 的对象
2.children: VNode 子节点的数组
3.slots: 一个函数，返回了包含所有插槽的对象
4.scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
5.data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
6.parent：对父组件的引用
7.listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
8.injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性

```html
<template functional>
  <div v-for="(item,index) in props.arr">{{item}}</div>
</template>
```

### 7、Vue.version

```js
var version = Number(Vue.version.split(".")[0]);

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

### 8、v-pre

```html
<!-- vue 是响应式系统,但是有些静态的标签不需要多次编译,这样可以节省性能 -->
<span v-pre>{{ this will not be compiled }}</span> 显示的是{{ this will not be
compiled }}
<span v-pre>{{msg}}</span> 即使data里面定义了msg这里仍然是显示的{{msg}}
```

### 9、v-once

```html
<!-- 有些 template 中的静态 dom 没有改变,这时就只需要渲染一次,可以降低性能开销 -->
<span v-once> 这时只需要加载一次的标签</span>
<!-- v-once 和 v-pre 的区别: v-once只渲染一次；v-pre不编译,原样输出 -->
```

### 10、v-cloak

```
在网速慢的情况下,在使用vue绑定数据的时候，渲染页面时会出现变量闪烁
用法:这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none }
一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕
// template 中
<div class="#app" v-cloak>
    <p>{{value.name}}</p>
</div>

// css 中
[v-cloak] {
    display: none;
}
```

### 11、router-view 的 key

```html
<!-- 由于 Vue 会复用相同组件, 即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子 -->
<router-view :key="$route.fullPath"></router-view>
<!-- 这样组件的 created 和 mounted 就都会执行 -->
```

### 12、调试 template

在 Vue 开发过程中, 经常会遇到 template 模板渲染时 JavaScript 变量出错的问题, 此时也许你会通过 console.log 来进行调试 这时可以在开发环境挂载一个 log 函数

```js
// main.js
Vue.prototype.$log = window.console.log;

// 组件内部
<div>{{$log(info)}}</div>
```

### 13、vue-loader 小技巧 preserveWhitespace

开发 vue 代码一般会有空格,这个时候打包压缩如果不去掉空格会加大包的体积 配置 preserveWhitespace 可以减小包的体积

```js
{
  vue: {
    preserveWhitespace: false;
  }
}
```

### 14、vue-loader 小技巧 transformToRequire

以前在写 Vue 的时候经常会写到这样的代码：把图片提前 require 传给一个变量再传给组件

```
// page 代码
<template>
  <div>
    <avatar :img-src="imgSrc"></avatar>
  </div>
</template>
<script>
  export default {
    created () {
      this.imgSrc = require('./assets/default-avatar.png')
    }
  }
</script>
```

现在:通过配置 transformToRequire 后，就可以直接配置，这样 vue-loader 会把对应的属性自动 require 之后传给组件

```
// vue-cli 2.x在vue-loader.conf.js 默认配置是
transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
}

// 配置文件,如果是vue-cli2.x 在vue-loader.conf.js里面修改
  avatar: ['default-src']

// vue-cli 3.x 在vue.config.js
// vue-cli 3.x 将transformToRequire属性换为了transformAssetUrls
module.exports = {
  pages,
  chainWebpack: config => {
    config
      .module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
      options.transformAssetUrls = {
        avatar: 'img-src',
      }
      return options;
      });
  }
}

// page 代码可以简化为
<template>
  <div>
    <avatar img-src="./assets/default-avatar.png"></avatar>
  </div>
</template>
```

### 15、为路径设置别名

```js
// vue-cli 2.x 配置
// 在 webpack.base.config.js中的 resolve 配置项，在其 alias 中增加别名
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
  }
}

// vue-cli 3.x 配置
// 在根目录下创建vue.config.js
var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set(key, value) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}
```

### 16、img 加载失败

有些时候后台返回图片地址不一定能打开,所以这个时候应该加一张默认图片

```js
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:''
    }
  },
  methods:{
    handleError(e){
      e.target.src=reqiure('图片路径')
    }
  }
}
</script>
```
