### 什么是 vue.js,vue.js 的优点

vue.js 是一套用于构建用户界面的渐进式框架.渐进式的意思是可以由浅入深 由简单到复杂

- 优点是
  - 体积小 压缩后的 vue.js 只有 33k
  - 运行效率高 采用虚拟 dom 技术。没有操作真实的 dom，而是操作 dom 的 javascript 对象，并优化计算出真实的 dom。
  - 采用双向数据绑定技术，开发人员不需要操作 dom 就可以更新视图。

### 生命周期

- 什么是 vue 的生命周期
  - Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。
- vue 生命周期的作用是什么
  - 它的生命周期中有多个事件钩子，让我们更容易控制整个 Vue 实例的生命过程
- vue 生命周期总共有几个阶段
  - beforeCreate 此时获取不到 prop 和 data 中的数据。在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。有生命周期函数和一些默认事件。
  - created 可以获取到 prop 和 data 中的数据。在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见。
  - beforeMount 相关的 render 函数首次被调用 获取到了 VDOM
  - mounted VDOM 解析成了真实 DOM，能获取 dom，能进行 dom 操作
  - beforeUpdate 数据更新时调用，能获取到新数据，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
  - updated 当这个钩子被调用时，组件 DOM 已经更新
  - activated keep-alive 里面的组件被激活时调用
  - deactivated keep-alive 里面的组件停止时调用
  - beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。函数 data prop 都能用。
  - destroyed Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  - errorCaptured 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

### 插值绑定

- v-text 全部当文本处理
- `{{}}` 能解析 html，但是会出现`{{}}`
- v-html 会解析 html

### 属性绑定

    v-bind: 或 :

### 类名和样式的绑定

```js
  // :class 有字符串 对象 数组方式
  // :style 有字符串 对象 数组方式
  Class对象语法：
    <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
    data: {
      isActive: true,
      hasError: false
    }
  Class数组语法：
    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  Style对象语法：
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    data: {
      activeColor: 'red',
      fontSize: 30
    }
  Style数组语法：
    <div v-bind:style="[styleColor, styleSize]"></div>
    data: {
      styleColor: {
        color: 'red'
      },
      styleSize:{
        fontSize:'23px'
      }
    }
```

### 事件的绑定

    v-on: 或 @

### 事件修饰符

    .stop 阻止事件冒泡
    .capture 设置事件为捕获，默认的事件是冒泡，父元素设置.capture后事件就会是事件捕获
    .prevent 阻止默认事件
    .self 自身才能触发事件 不想事件冒泡可以使用该方法
    .once 事件只触发一次
    .native 组件绑定原生事件

### 按键修饰符

    @keyup.delete 或 @keyup.8 或 @keyup.46
    @keyup.tab 或 @keyup.9
    @keyup.enter 或 @keyup.13
    @keyup.esc 或 @keyup.27
    @keyup.space 或 @keyup.32
    @keyup.left 或 @keyup.37
    @keyup.up 或 @keyup.38
    @keyup.right 或 @keyup.39
    @keyup.down 或 @keyup.40

### 组合修饰符

    @click.ctrl ctrl+点击触发
    @click.alt alt+点击触发
    @click.shift shift+点击触发

### 获取事件对象本身 两种方式

- 1. 调用的地方直接写方法名 不带括号 默认就会有事件对象 @keyup="handleKeyUp"
- 2. 或者在调用的地方传$event参数 这个参数名字固定不能变 @keyup="handleKeyUp($event)"

### 双向绑定

v-model

### v-model 修饰符

    v-model.number 自动转换用户输入为数值类型
    v-model.trim 去除用户输入两端的空格
    v-model.lazy 将用户输入的数据赋值于变量的时机由输入时延迟到数据改变时

### methods computed watch

- methods 方法， 不能用箭头函数定义方法
- computed 只有相关的属性值变化才会重新计算， 必须有返回值。 不能用箭头函数定义方法。xx(){return xxxx} 具有缓存特性
- watch 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。 xx(){xxxx} 或者 xx(newValue, oldValue) {xxxx}

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

### v-if v-show

- v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。display:none / block

### v-for 循环

    v-for="item in items"
    v-for="item of items"
    v-for="(item, index) in items"
    v-for="(item, index) of items"

### 数组变异方法

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
    items: ["a", "b", "c"],
  },
});
vm.items[1] = "x"; // 不是响应性的
vm.items.length = 2; // 不是响应性的

//需要使用
Vue.set(vm.items, indexOfItem, newValue);
this.$set(vm.items, indexOfItem, newValue);
```

### DOM 渲染

    挂载
      el: css选择器或者dom节点
      vm.$mount(css选择器或者dom节点)
    template 视图字符串模板 挂载后模板将替换挂载元素。
    渲染函数render

### 过滤器 filter

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

### 指令 directive 自定义指令

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

### 组件

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

### 混入 mixin

- 主要是代码重用
- 定义公共的 mixin 对象，类似一个的 export default{}部分。混入对象可以包含任意组件选项。
- 在需要的地方使用 mixins: `[mixin]`引入，然后就可以使用里面的属性方法等等。mixin 为文件
- 合并时
  - 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。例如 data, methods, computed, filters, components 和 directives，在 mixin 和组件的数据发生冲突时以组件数据优先。
  - 生命周期函数和 watch 会全部调用。且先调用 mixin 里面的 watch 方法和生命周期函数。
  - 以上合并策略可以通过 Vue.config.optionMergeStrategies 修改

### model

允许一个自定义组件在使用 v-model 时定制 prop 和 event。所以当我们在一个自定义组件上使用 v-model 并不能实现双向绑定，因为自定的组件并没有默认的 value 和 input 事件，在使用时我们需要使用 model 显示的改变 v-model 绑定属性和方法。

- 从官网上看到，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
  - text 和 textarea 元素使用 value 属性和 input 事件
  - checkbox 和 radio 使用 checked 属性和 change 事件
  - select 使用 value 和 change 事件

### 响应式增删

    Vue.set()或this.$set()
      对象 set(obj, key, value)
      数组 set(arr, index, value)
    Vue.delete()或this.$delete()
      对象 delete(obj, key)
      数组 delete(arr, index)

### nextTick

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
    },
  },
});
```

### keep-alive

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

### transition 过渡

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

### 动态组件

`<component is="组件名">` 动态加载组件

### 插槽 slot

默认插槽不需要定义名字 直接使用 slot 标签就能接收全部。

具名插槽
在调用的地方写在组件中间 可以用 slot="xx"指定 slot 名字
或者使用 2.6 新增的 v-slot:xxx 也可以简写为 #xxx，但是 v-slot 只能添加在 `<template>标签` 上。

定义组件的地方使用`<slot name="xx"></slot>`来引用 slot

作用域插槽 使用 v-bind 把数据传送出去，使用 v-slot="scope"就收

```html
<!-- 组件内部 -->
<div>
  <!--通过v-bind 可以向外传递参数-->
  <slot name="toilet" v-bind="{ washer: true }"></slot>
</div>

<!-- 外部调用组件的时候 -->
<!--卫生间插槽，通过v-slot="scope"可以获取组件内部通过v-bind传的值-->
<template v-slot:toilet="scope">
  <!--判断是否可以放洗衣机-->
  <span v-if="scope.washer">这里放洗衣机</span>
</template>
```

### extends

允许声明扩展另一个组件(可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。这和 mixins 类似。

- extends: CompA
- extends 和 mixins 的区别
  - 都是为了扩展组件的功能
  - mixins 可以混入多个 mixin，extends 只能继承一个
  - extends 的优先级高于 mixins 优先级 extend>extends>mixins

### name

- 允许组件模板递归地调用自身。
- 指定 name 选项的另一个好处是便于调试。

### `v-pre`

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

### `v-once`

只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
