### 1、什么是 vue.js,vue.js 的优点

vue.js 是一套用于构建用户界面的渐进式框架.渐进式的意思是可以由浅入深 由简单到复杂

- 优点是
  - 体积小 压缩后的 vue.js 只有 33k
  - 运行效率高 采用虚拟 dom 技术。没有操作真实的 dom，而是操作 dom 的 javascript 对象，并优化计算出真实的 dom。
  - 采用双向数据绑定技术，开发人员不需要操作 dom 就可以更新视图。

### 2、生命周期

- 什么是 vue 的生命周期
  - Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。
- vue 生命周期的作用是什么
  - 它的生命周期中有多个事件钩子，让我们更容易控制整个 Vue 实例的生命过程
- vue 生命周期总共有几个阶段
  - beforeCreate 此时获取不到 prop 和 data 中的数据。在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。有生命周期函数和一些默认事件。
  - created 可以获取到 prop 和 data 中的数据。在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，\$el 属性目前不可见。
  - beforeMount 相关的 render 函数首次被调用 获取到了 VDOM
  - mounted VDOM 解析成了真实 DOM，能获取 dom，能进行 dom 操作
  - beforeUpdate 数据更新时调用，能获取到新数据，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
  - updated 当这个钩子被调用时，组件 DOM 已经更新
  - activated keep-alive 里面的组件被激活时调用
  - deactivated keep-alive 里面的组件停止时调用
  - beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。函数 data prop 都能用。
  - destroyed Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  - errorCaptured 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
- 第一次页面加载会触发哪几个钩子
  - 第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这四个钩子
- dom 渲染在哪个周期完成
  - mounted

### 3、插值绑定

    v-text 全部当文本处理
    {{}} 能解析html，但是会出现{{}}
    v-html 会解析html

### 4、属性绑定

    v-bind: 或 :

### 5、类名和样式的绑定

    :class 有字符串 对象 数组方式
    :style 有字符串 对象 数组方式

### 6、事件的绑定

    v-on: 或 @

### 7、事件修饰符

    .stop 阻止事件冒泡
    .capture 设置事件为捕获，默认的事件是冒泡，父元素设置.capture后事件就会是事件捕获
    .prevent 阻止默认事件
    .self 自身才能触发事件 不想事件冒泡可以使用该方法
    .once 事件只触发一次
    .native 组件绑定原生事件

### 8、按键修饰符

    @keyup.delete 或 @keyup.8 或 @keyup.46
    @keyup.tab 或 @keyup.9
    @keyup.enter 或 @keyup.13
    @keyup.esc 或 @keyup.27
    @keyup.space 或 @keyup.32
    @keyup.left 或 @keyup.37
    @keyup.up 或 @keyup.38
    @keyup.right 或 @keyup.39
    @keyup.down 或 @keyup.40

### 9、组合修饰符

    @click.ctrl ctrl+点击触发
    @click.alt alt+点击触发
    @click.shift shift+点击触发

### 10、获取事件对象本身 两种方式

- 1. 调用的地方直接写方法名 不带括号 默认就会有事件对象 @keyup="handleKeyUp"
- 2. 或者在调用的地方传$event参数 这个参数名字固定不能变 @keyup="handleKeyUp($event)"

### 11、双向绑定

v-model

### 12、v-model 修饰符

    v-model.number 自动转换用户输入为数值类型
    v-model.trim 去除用户输入两端的空格
    v-model.lazy 将用户输入的数据赋值于变量的时机由输入时延迟到数据改变时

### 13、methods computed watch

- methods 方法， 不能用箭头函数定义方法
- computed 只有相关的属性值变化才会重新计算， 必须有返回值。 不能用箭头函数定义方法。xx(){return xxxx} 具有缓存特性
- watch 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。 xx(){xxxx} 或者 xx(newValue, oldValue) {xxxx}

### 14、v-if v-show

- v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。display:none / block

### 15、v-for 循环

    v-for="item in items"
    v-for="item of items"
    v-for="(item, index) in items"
    v-for="(item, index) of items"

### 16、数组变异方法

Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新

- push()
- pop()
- shift()
- unshift()
- splice()
- sort(callback) callback(a, b){return a-b 升序排列; return b-a 降序排列}
- reverse()

```js
var vm = new Vue({
  data: {
    items: ["a", "b", "c"]
  }
});
vm.items[1] = "x"; // 不是响应性的
vm.items.length = 2; // 不是响应性的

//需要使用
Vue.set(vm.items, indexOfItem, newValue);
this.$set(vm.items, indexOfItem, newValue);
```

### 17、DOM 渲染

    挂载
      el: css选择器或者dom节点
      vm.$mount(css选择器或者dom节点)
    template 视图字符串模板 挂载后模板将替换挂载元素。
    渲染函数render

### 18、过滤器 filter

    改变数据，可以用做数据格式化
    全局注册
        Vue.filter('capitalize', function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        })
    局部注册
        filters: {
          capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
          }
        }

    使用
        <!-- 在双花括号中 -->
        {{ message | capitalize }}

        <!-- 在 `v-bind` 中 -->
        <div v-bind:id="rawId | formatId"></div>

    如果要传参可以这样
        {{ message | filterA('arg1', arg2) }}
        filters: {
          capitalize: function (value，arg1, arg2) { //message会默认作为第一个参数value==message
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
          }
        }

### 19、指令 directive 自定义指令

    全局注册
      Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      })
    局部注册
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          }
        }
      }
    调用统一加v-前缀  v-focus
    生命周期函数
      bind 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      inserted 被绑定元素插入父节点时调用
      update 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
      componentUpdated 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      unbind 只调用一次，指令与元素解绑时调用。
    方法属性
      el 指令所绑定的元素，可以用来直接操作 DOM 。
      binding 一个对象，包含很多属性 name value
      vnode Vue 编译生成的虚拟节点
      oldVnode 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

### 20、组件

    父向子传数据 属性 子props接受
    子向父传数据 方法 this.$emit()
    非父子用bus
      定义一个新的vue实例 bus export default new Vue()
      在A组件引入bus 然后用bus.$emit(事件名, 数据)暴露一个事件，默认参数是event对象，也可以自定义传参
      在B组件引入bus 然后用bus.$on(事件名, function(val){}) 监听事件，就能通过val拿到传过来的数据，需要注意的是function(val){this}里面的this
      是bus不是我们的vue，如果要设置vue实例上的属性，需要在外面吧this接收一下 const that=this
      移除事件监听用bus.$off(事件名)

    组件需要绑定原生事件的时候需要加上.native
      <base-input v-on:focus.native="onFocus"></base-input>

    属性验证
      props: {
        propsA: {
          type: Array,
          required: false,
          default: function() {
            return []//对象或数组默认值必须是函数返回，基本数据类型可以直接写默认值
          },
          validator: function(value){
            return value.length >= 2 //自定义函数验证
          }
        }
      }

### 21、混入 mixin

- 主要是代码重用
- 定义公共的 mixin 对象，类似一个的 export default{}部分。混入对象可以包含任意组件选项。
- 在需要的地方使用 mixins: `[mixin]`引入，然后就可以使用里面的属性方法等等。mixin 为文件
- 合并时
  - data 数据，值为对象的选项，例如 methods, computed, filters, components 和 directives，在 mixins 和组件的数据发生冲突时以组件数据优先。
  - 钩子函数和 watch 全部调用 且先调用 mixins 里面的 watch 方法和钩子函数
  - 以上合并策略可以通过 Vue.config.optionMergeStrategies 修改

### 22、mode

允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

```js
Vue.component("my-checkbox", {
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  }
  // ...
});
```

### 23、响应式增删

    Vue.set()或this.$set()
      对象 set(obj, key, value)
      数组 set(arr, index, value)
    Vue.delete()或this.$delete()
      对象 delete(obj, key)
      数组 delete(arr, index)

### 24、nextTick

this.nextTick()或者 Vue.nextTick()，将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

```js
new Vue({
  // ...
  methods: {
    // ...
    example: function() {
      // 修改数据，dom不会立马更新，因为更新是异步操作，同步任务执行完后再回执行异步任务。
      this.message = "changed";
      // DOM 还没有更新,使用this.$refs.span.innerHtml != 'changed'得到的还是以前的值。
      this.$nextTick(function() {
        // DOM 现在更新了、在nextTick的回调里面dom是百分百更新完成了的
        // `this` 绑定到当前实例
        this.doSomethingElse();
      });
    }
  }
});
```

### 25、keep-alive

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

### 26、第一次页面加载会触发哪几个钩子？

第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

### 27、vue 生命周期的作用是什么？

它的生命周期中有多个事件钩子，让我们在控制整个 Vue 实例的过程时更容易形成好的逻辑。

### 28、vue-loader 是什么？使用它的用途有哪些？

解析.vue 文件的一个加载器，跟 template/js/style 转换成 js 模块。

### 29、请说出 vue.cli 项目中 src 目录每个文件夹和文件的用法？

assets 文件夹是放静态资源 components 是放组件 router 是定义路由相关的配置 store 存放数据 view 视图 App.vue 是一个应用主组件 main.js 是入口文件

### 30、transition 过渡

    使用<transition></transition>包裹
    v-enter 元素展示,开始过渡瞬间
    v-enter-to 开始过渡一直到开始过渡完成
    v-leave 离开过渡开始的瞬间
    v-leave-to 离开过渡一直到离开过渡完成
    v-enter-active 元素展示,过渡运行之间 用来定义进入过渡的过程时间，延迟和曲线函数。
    v-leave-active 元素消失,过渡运行之间 用来定义离开过渡的过程时间，延迟和曲线函数。
    默认值是v，如果给transition定义了name属性，则为name-enter name-enter-to等等。
    过渡模式 model
      out-in 当前元素先进行过渡，完成之后新元素过渡进入。
      in-out 新元素先进行过渡，完成之后当前元素过渡离开。

### 31、为什么组件的 data 是方法?

因为组件是不断复用的，同一个组件在不同的地方数据应该是相互独立的。组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果。

### 32、动态组件

    <component is="组件名"> 动态加载组件

### 33、插槽 slot

在调用的地方写在组件中间 可以用 slot="xx"指定 slot 名字
定义组件的地方使用`<slot name="xx"></slot>`来引用 slot

### 34、watch 监听属性变化

```js
watch: {
  a: (newValue, oldValue) => {
    console.log(newValue);
    console.log(oldValue);
  };
}
或者使用这种方法;
let unwatch = this.$watch("a", function(newValue, oldValue) {
  console.log(newValue);
  console.log(oldValue);
});
```

### 35、extends

允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。这和 mixins 类似。

- extends: CompA
- extends 和 mixins 的区别
  - 都是为了扩展组件的功能
  - mixins 可以混入多个 mixin，extends 只能继承一个
  - extends 的优先级高于 mixins 优先级 extend>extends>mixins

### 36、name

- 允许组件模板递归地调用自身。
- 指定 name 选项的另一个好处是便于调试。

### 37、key

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。避免就地复用。
有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。

### 38、你对 vue 项目进行过哪些优化

    代码层面的优化
      v-if 和 v-show 区分使用场景
      computed 和 watch 区分使用场景
      v-for 遍历必须为 item 添加唯一的key，且避免同时使用 v-if
      事件的销毁
      图片资源懒加载
      路由懒加载 () => import(xxx) 或者 (resolve) => require([xxx], resolve)
      第三方插件的按需引入
      重复功能模块抽离成组件
      提取公共代码，公共代码用mixin或extend
      使用css预处理器，css代码公共部分复用
      css尽量不用calc函数和!important
      图片根据实际情况选取jpg还是png图片
    webpack层面
    web技术层面
      开启gzip压缩
      开启浏览器缓存
      使用cdn，CDN可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN具有更好的可用性，更低的网络延迟和丢包率
      使用 Chrome Performance 查找性能瓶颈。

### 39、vue 图片问题

- 在 data 里面定义图片路径，然后在 img 里面通过:src 绑定图片地址，图片是显示不出来的。因为 webpack 在打包的时候回检测引用图片的地方，并把图片压缩成 base64 的形式放在引用的地方，如果我们通过后面的 vue 动态绑定，我们是拿不到图片的。如果需要在 data 里面通过:src 的方式使用图片，我们可以使用 import 或 require 先把图片引进来，然后在使用。

- assets 和 static 两个文件都是静态的，但是它们是有区别的，static 文件夹下面的文件都是不能被 webpack 处理的，
  你必须使用绝对路径来引用这些文件，取决于在 config.js 里面加入的 build.assetsPublicPath 和 build.assetsSubDirectory 这两个属性设置的。其他地方的文件或图片都会被 webpack 解析成模块依赖，这时候就可以用 url-loader 和 css-loader 去处理。如果在 js 中引用图片，因为 js 是动态的所以没有办法去处理，但是我可以使用 require 或 import 将图片当成模块加载进来，就会被 webpack 当成静态文件解析，这时候就可以被 url-loader 处理。

- url-loader 会将引入的图片编码，生成 dataURI。相当于把图片数据翻译成一串字符，再把这些字符打包到文件当中，最终只需要引入这个文件就可以访问这个图片。当然如果图片较大，编码会消耗性能，因此 url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 进行 copy，一般会放在 static 文件夹下面。

### 40、在 Vue 实例中编写生命周期 hook 或其他 option/propertie 时，为什么不使用箭头函数？

箭头函数自己没有定义 this 上下文，而是绑定到其父函数的上下文中。当你在 Vue 程序中使用箭头函数（=>）时，this 关键字病不会绑定到 Vue 实例，因此会引发错误。所以强烈建议改用标准函数声明。
